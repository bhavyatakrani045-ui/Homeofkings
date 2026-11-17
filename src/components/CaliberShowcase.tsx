import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { CALIBER_MACRO_IMAGE, CALIBER_PILLARS } from '../data/watches';
import { WatchImage } from './WatchImage';

interface CaliberShowcaseProps {
  onAskCaliber: (pillarTitle: string) => void;
}

export const CaliberShowcase: React.FC<CaliberShowcaseProps> = ({ onAskCaliber }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activePillar = CALIBER_PILLARS[selectedIndex];

  return (
    <section id="caliber" className="py-20 lg:py-24 bg-[#0E1014] border-b border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-mono tracking-[0.22em] text-[#C4B5A0]">
            ARCHITECTURE &amp; CRAFTSMANSHIP
          </p>
          <h2
            className="mt-2 font-display text-3xl sm:text-4xl lg:text-[42px] font-medium text-[#F5F7FA] leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            Built to Reward Every Glance Through the Loupe
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9DA5B4] leading-relaxed">
            Explore the four mechanical pillars behind every Home of King&apos;s automatic caliber—engineered to sustain timeless visual depth years into ownership.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: High-Contrast Exhibition Caseback Macro */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="relative flex-1 min-h-[300px] lg:min-h-[420px] rounded-xl overflow-hidden border border-white/10 bg-[#131519]">
              <WatchImage
                src={CALIBER_MACRO_IMAGE}
                alt="Home of King's automatic movement sapphire exhibition caseback showing platinum rotor and Geneva stripes"
                title="Caliber HK-01 Exhibition Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-[#C4B5A0]">
                    {activePillar.index}. {activePillar.subtitle}
                  </span>
                  <p className="font-display text-2xl text-white mt-0.5">
                    {activePillar.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive 4-Pillar Selector & Live Telemetry */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-3" role="tablist" aria-label="Caliber craftsmanship pillars">
              {CALIBER_PILLARS.map((pillar, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-5 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] ${
                      isSelected
                        ? 'bg-[#161920] border-[#C4B5A0]/50'
                        : 'bg-[#131519] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-xl text-[#F5F7FA]">
                        <span className="font-mono text-xs text-[#C4B5A0] mr-2.5">
                          {pillar.index}.
                        </span>
                        {pillar.title}
                      </span>
                      <span className="text-xs font-mono text-[#8A919E] whitespace-nowrap shrink-0">
                        {pillar.subtitle}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-white/[0.08]">
                        <p className="text-sm text-[#B8BFCC] leading-relaxed">
                          {pillar.description}
                        </p>
                        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {pillar.metrics.map((metric) => (
                            <div key={metric.label}>
                              <span className="block text-[11px] text-[#8A919E]">
                                {metric.label}
                              </span>
                              <span className="mt-0.5 block font-mono tabular-nums text-sm text-[#F1F3F6] font-medium">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <span className="text-xs text-[#8A919E]">
                Want deeper technical tolerances?
              </span>
              <button
                type="button"
                onClick={() => onAskCaliber(activePillar.title)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A1D24] hover:bg-[#232730] border border-white/15 text-xs font-medium text-[#F1F3F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#C4B5A0]" aria-hidden="true" />
                <span>Discuss Caliber With Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
