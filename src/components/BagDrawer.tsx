import React, { useState } from 'react';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { WatchReference } from '../data/watches';
import { WatchImage } from './WatchImage';

export interface BagItem {
  watch: WatchReference;
  strap: string;
  quantity: number;
}

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onUpdateQty: (watchId: string, strap: string, delta: number) => void;
  onRemoveItem: (watchId: string, strap: string) => void;
  onClearBag: () => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [salonCity, setSalonCity] = useState('Geneva Flagship Salon');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.watch.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!clientName.trim() || !clientEmail.trim()) {
      setFormError('Please provide your full name and private client email.');
      return;
    }
    const code = `HK-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedCode(code);
    onClearBag();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Private Acquisition Bag"
      onClick={onClose}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#0E1014] border-l border-white/15 flex flex-col shadow-2xl"
      >
        <div className="px-6 py-4 border-b border-white/[0.08] bg-[#131519] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-[#C4B5A0]" aria-hidden="true" />
            <h2 className="font-display text-xl text-white">
              Private Acquisition Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedCode(null);
              onClose();
            }}
            aria-label="Close Acquisition Bag"
            className="p-2 rounded-lg text-[#9DA5B4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {confirmedCode ? (
            <div className="p-6 rounded-xl bg-[#131519] border border-[#C4B5A0]/40 space-y-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#C4B5A0]/15 border border-[#C4B5A0]/50 flex items-center justify-center mx-auto text-[#C4B5A0]">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono tracking-wider text-[#C4B5A0]">
                DOSSIER {confirmedCode} CONFIRMED
              </p>
              <h3 className="font-display text-2xl text-white">
                Private Salon Allocation Reserved
              </h3>
              <p className="text-sm text-[#A9B0BD] leading-relaxed">
                Thank you, {clientName}. Your dedicated advisor at the {salonCity} will prepare your 950 platinum timepieces and dispatch dossier {confirmedCode} to {clientEmail}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedCode(null);
                  onClose();
                }}
                className="w-full mt-2 px-5 py-3 rounded-lg bg-[#E8EAEE] hover:bg-white text-[#0B0C0E] text-xs font-semibold cursor-pointer"
              >
                Return to Collection
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="font-display text-2xl text-[#E6E8EC]">
                Your Acquisition Bag is Empty
              </p>
              <p className="text-sm text-[#8A919E] max-w-xs mx-auto">
                Select any automatic platinum timepiece from our collection to prepare a private salon allocation.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.watch.id}-${item.strap}`}
                    className="p-4 rounded-xl bg-[#131519] border border-white/[0.08] flex gap-4"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-[#0B0C0E]">
                      <WatchImage
                        src={item.watch.image}
                        alt={item.watch.name}
                        title={item.watch.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-mono text-[#C4B5A0]">
                            {item.watch.reference}
                          </p>
                          <h3 className="font-display text-lg text-white truncate">
                            {item.watch.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.watch.id, item.strap)}
                          aria-label={`Remove ${item.watch.name}`}
                          className="p-1 text-[#8A919E] hover:text-red-300 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#8A919E] truncate mt-0.5">
                        {item.strap}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-white/15 rounded-md bg-[#0B0C0E]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.watch.id, item.strap, -1)
                            }
                            aria-label="Decrease quantity"
                            className="p-1.5 text-[#B2B8C4] hover:text-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono tabular-nums text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQty(item.watch.id, item.strap, 1)
                            }
                            aria-label="Increase quantity"
                            className="p-1.5 text-[#B2B8C4] hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono tabular-nums text-sm text-[#F5F7FA]">
                          {formatPrice(item.watch.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="pt-5 border-t border-white/[0.08] space-y-4"
              >
                <p className="text-xs font-mono tracking-wider text-[#C4B5A0]">
                  PRIVATE ALLOCATION REQUEST
                </p>

                <div>
                  <label className="block text-xs text-[#B2B8C4] mb-1.5">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Alexander Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#131519] border border-white/15 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#C4B5A0]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#B2B8C4] mb-1.5">
                    Client Email
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="collector@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#131519] border border-white/15 text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#C4B5A0]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#B2B8C4] mb-1.5">
                    Preferred Salon
                  </label>
                  <select
                    value={salonCity}
                    onChange={(e) => setSalonCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#131519] border border-white/15 text-sm text-white focus:outline-none focus:border-[#C4B5A0]"
                  >
                    <option value="Geneva Flagship Salon">Geneva Flagship Salon</option>
                    <option value="London Mayfair Atelier">London Mayfair Atelier</option>
                    <option value="Tokyo Ginza Private Lounge">Tokyo Ginza Private Lounge</option>
                    <option value="New York Madison Salon">New York Madison Salon</option>
                  </select>
                </div>

                {formError && (
                  <p className="text-xs text-red-300" role="alert">
                    {formError}
                  </p>
                )}

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-sm text-[#9DA5B4]">Estimated Total</span>
                  <span className="font-mono tabular-nums text-lg font-medium text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3.5 rounded-lg bg-[#C4B5A0] hover:bg-[#D5C7B3] text-[#0B0C0E] text-sm font-semibold transition-colors cursor-pointer"
                >
                  Confirm Private Reservation
                </button>
              </form>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};
