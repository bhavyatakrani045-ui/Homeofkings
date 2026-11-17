import React, { useMemo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { WATCH_CATALOG, WatchCategory, WatchReference } from '../data/watches';
import { WatchImage } from './WatchImage';

interface CollectionSectionProps {
  onSelectWatch: (watch: WatchReference) => void;
  onQuickAdd: (watch: WatchReference) => void;
  bagCount: number;
  onOpenBag: () => void;
}

type FilterOption = 'All Automatics' | WatchCategory;

const FILTERS: FilterOption[] = [
  'All Automatics',
  'Perpetual Dress',
  'Chronograph',
  'Openworked',
  'Sport Diver',
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectWatch,
  onQuickAdd,
  bagCount,
  onOpenBag,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Automatics');

  const filteredWatches = useMemo(() => {
    if (activeFilter === 'All Automatics') {
      return WATCH_CATALOG;
    }
    return WATCH_CATALOG.filter((w) => w.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="collection" className="py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Heading & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="max-w-xl">
            <p className="text-xs font-mono tracking-[0.22em] text-[#C4B5A0]">
              SELF-WINDING MANUFACTURE
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#F5F7FA] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              The Platinum Automatic Collection
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#9DA5B4] leading-relaxed">
              Six numbered automatic architectures forged in solid 950 platinum. Select any timepiece to inspect its caliber tolerances or reserve for private salon viewing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            {/* Functional Filter Segmented Bar */}
            <div
              role="tablist"
              aria-label="Filter automatic collection"
              className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#131519] border border-white/[0.08]"
            >
              {FILTERS.map((filter) => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] ${
                      active
                        ? 'bg-[#21252D] text-white'
                        : 'text-[#8E96A4] hover:text-[#E6E8EC]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Acquisition Bag Trigger */}
            <button
              type="button"
              onClick={onOpenBag}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15181E] hover:bg-[#1E222A] border border-white/15 text-xs font-medium text-[#F1F3F6] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C4B5A0]" aria-hidden="true" />
              <span>Acquisition Bag</span>
              <span className="font-mono tabular-nums text-[#C4B5A0]">({bagCount})</span>
            </button>
          </div>
        </div>

        {/* 3-Column Uniform Watch Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWatches.map((watch) => (
            <article
              key={watch.id}
              className="group flex flex-col bg-[#131519] border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
            >
              {/* Uniform 4:3 Studio Macro Image */}
              <div
                onClick={() => onSelectWatch(watch)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectWatch(watch);
                  }
                }}
                aria-label={`Inspect ${watch.name}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E1014] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C4B5A0]"
              >
                <WatchImage
                  src={watch.image}
                  alt={`${watch.name} — ${watch.subtitle}`}
                  title={watch.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131519]/75 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-4 text-[11px] font-mono tracking-wider text-[#D9DDE4]">
                  {watch.editionNote}
                </span>
              </div>

              {/* Unboxed Clean Card Metadata */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#8A919E] font-mono">
                    <span>{watch.reference}</span>
                    <span aria-hidden="true">·</span>
                    <span>{watch.category}</span>
                  </div>

                  <h3
                    onClick={() => onSelectWatch(watch)}
                    className="mt-2 font-display text-2xl font-medium text-[#F5F7FA] group-hover:text-[#C4B5A0] transition-colors cursor-pointer"
                  >
                    {watch.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#9DA5B4]">{watch.subtitle}</p>

                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono tabular-nums text-[#B2B8C4]">
                    <span>{watch.diameter}</span>
                    <span aria-hidden="true">·</span>
                    <span>{watch.powerReserve}</span>
                    <span aria-hidden="true">·</span>
                    <span>{watch.waterResistance}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="font-mono tabular-nums text-base font-medium text-[#F5F7FA]">
                    {formatPrice(watch.price)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectWatch(watch)}
                      className="px-3.5 py-2 rounded-md text-xs font-medium text-[#D4D8E0] hover:text-white border border-white/10 hover:border-white/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
                    >
                      Specs
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickAdd(watch)}
                      className="px-3.5 py-2 rounded-md text-xs font-semibold text-[#0B0C0E] bg-[#E8EAEE] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
