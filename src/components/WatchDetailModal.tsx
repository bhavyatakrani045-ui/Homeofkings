import React, { useState } from 'react';
import { MessageSquare, ShoppingBag, X } from 'lucide-react';
import { WatchReference } from '../data/watches';
import { WatchImage } from './WatchImage';

interface WatchDetailModalProps {
  watch: WatchReference | null;
  onClose: () => void;
  onAddToBag: (watch: WatchReference, strap: string) => void;
  onConsultConcierge: (watch: WatchReference) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

export const WatchDetailModal: React.FC<WatchDetailModalProps> = ({
  watch,
  onClose,
  onAddToBag,
  onConsultConcierge,
}) => {
  const [selectedStrap, setSelectedStrap] = useState<string>('');

  if (!watch) return null;

  const activeStrap =
    selectedStrap && watch.strapOptions.includes(selectedStrap)
      ? selectedStrap
      : watch.strapOptions[0];

  const specs = [
    { label: 'Caliber', value: watch.caliber },
    { label: 'Power Reserve', value: watch.powerReserve },
    { label: 'Frequency', value: watch.frequency },
    { label: 'Case Dimensions', value: `${watch.diameter} x ${watch.thickness}` },
    { label: 'Case Alloy', value: watch.caseMaterial },
    { label: 'Water Resistance', value: `${watch.waterResistance} · ${watch.jewels} Jewels` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${watch.name} specifications`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#131519] border border-white/15 rounded-2xl shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#131519]/95 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C4B5A0]">
            <span>{watch.reference}</span>
            <span aria-hidden="true">·</span>
            <span>{watch.category}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close timepiece modal"
            className="p-2 rounded-lg text-[#9DA5B4] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Macro Image & Technical Table */}
          <div className="lg:col-span-6 space-y-6">
            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 bg-[#0B0C0E]">
              <WatchImage
                src={watch.image}
                alt={`${watch.name} — ${watch.subtitle}`}
                title={watch.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.08]">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <span className="block text-[11px] text-[#8A919E]">
                    {spec.label}
                  </span>
                  <span className="mt-0.5 block font-mono tabular-nums text-xs sm:text-sm text-[#EEF0F4]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contiguous Purchase & Concierge Module */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#F5F7FA]">
                {watch.name}
              </h2>
              <p className="mt-1 text-sm text-[#C4B5A0]">{watch.subtitle}</p>
              <p className="mt-4 font-mono tabular-nums text-2xl font-medium text-white">
                {formatPrice(watch.price)}
              </p>

              <p className="mt-4 text-sm text-[#B2B8C4] leading-relaxed">
                {watch.description}
              </p>

              <ul className="mt-5 space-y-2 text-xs text-[#9DA5B4]">
                {watch.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#C4B5A0] mt-0.5" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <label className="block text-xs font-medium text-[#D4D8E0] mb-2.5">
                  Strap &amp; Bracelet Configuration
                </label>
                <div className="flex flex-col gap-2">
                  {watch.strapOptions.map((option) => {
                    const active = activeStrap === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedStrap(option)}
                        className={`px-4 py-2.5 rounded-lg text-left text-xs font-medium border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#1D2129] border-[#C4B5A0] text-white'
                            : 'bg-[#0E1014] border-white/10 text-[#9DA5B4] hover:border-white/25'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onAddToBag(watch, activeStrap);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#C4B5A0] hover:bg-[#D5C7B3] text-[#0B0C0E] text-sm font-semibold transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                <span>Add to Acquisition Bag</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onConsultConcierge(watch);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#1A1D24] hover:bg-[#232730] border border-white/15 text-sm font-medium text-[#F1F3F6] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#C4B5A0]" aria-hidden="true" />
                <span>Consult Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
