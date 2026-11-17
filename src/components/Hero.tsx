import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { HERO_IMAGE } from '../data/watches';
import { PlatinumLogo } from './PlatinumLogo';
import { WatchImage } from './WatchImage';

interface HeroProps {
  onOpenConcierge: () => void;
  onInspectFlagship: () => void;
}

const BENCHMARKS = [
  { label: 'Case Alloy', value: '950 Platinum' },
  { label: 'Winding Architecture', value: '72h Automatic' },
  { label: 'Oscillation Rate', value: '28,800 vph' },
  { label: 'Chronometry', value: '-1 / +2 s/day' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenConcierge, onInspectFlagship }) => {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-12 pb-10 lg:pt-16 lg:pb-14">
        {/* 2-Column Stretched Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Platinum Lockup, Editorial Headline, Tagline & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <PlatinumLogo variant="monument" showTagline={true} />

              <h1
                className="mt-8 font-display font-medium tracking-[-0.015em] text-[#F5F7FA] leading-[1.06]"
                style={{
                  fontSize: 'clamp(2.5rem, 4.3vw, 4.1rem)',
                  textWrap: 'balance',
                }}
              >
                Self-Winding Sovereignty in Solid 950 Platinum.
              </h1>

              <p className="mt-5 text-base sm:text-[17px] leading-[1.65] text-[#A9B0BD] max-w-xl">
                Every Home of King&apos;s timepiece houses an in-house mechanical automatic caliber, regulated across six positions and encased in hand-chamfered platinum that catches light differently from every angle.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#C4B5A0] hover:bg-[#D5C7B3] text-[#0B0C0E] text-sm font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Explore Automatics</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenConcierge}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#15181E] hover:bg-[#1D2129] border border-white/15 text-[#E8EAEE] text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
              >
                <MessageSquare className="w-4 h-4 text-[#C4B5A0]" aria-hidden="true" />
                <span>Ask the Horologist</span>
              </button>
            </div>
          </div>

          {/* Right Column: Full-Height Stretched Studio Showcase */}
          <div className="lg:col-span-6 flex">
            <div
              onClick={onInspectFlagship}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onInspectFlagship();
                }
              }}
              aria-label="Inspect Sovereign Automatic I flagship watch"
              className="group relative w-full min-h-[320px] lg:min-h-[470px] rounded-xl overflow-hidden border border-white/10 bg-[#131519] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
            >
              <WatchImage
                src={HERO_IMAGE}
                alt="Home of King's Sovereign Automatic 950 Platinum Watch on dark basalt stone"
                title="Sovereign Automatic I"
                className="w-full h-full lg:h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-[#C4B5A0] tracking-wider">
                    REF. HK-01-PT · AUTOMATIC
                  </p>
                  <p className="font-display text-2xl text-white mt-0.5">
                    Sovereign Automatic I
                  </p>
                </div>
                <span className="text-xs font-medium text-[#E8EAEE] border-b border-[#C4B5A0]/60 pb-0.5 whitespace-nowrap shrink-0 group-hover:border-[#C4B5A0] transition-colors">
                  Inspect Reference
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Horological Benchmark Strip */}
        <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BENCHMARKS.map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-xs text-[#8A919E] tracking-wide">
                {item.label}
              </span>
              <span className="mt-1 font-mono tabular-nums text-lg sm:text-xl font-medium text-[#EEF0F4]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
