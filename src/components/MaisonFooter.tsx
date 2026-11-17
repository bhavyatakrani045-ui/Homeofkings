import React from 'react';
import { PlatinumLogo } from './PlatinumLogo';

interface MaisonFooterProps {
  onOpenConcierge: () => void;
}

export const MaisonFooter: React.FC<MaisonFooterProps> = ({ onOpenConcierge }) => {
  return (
    <footer id="maison" className="bg-[#08090B]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/[0.08]">
          <div className="lg:col-span-6 space-y-5">
            <PlatinumLogo variant="monument" showTagline={true} />
            <p className="text-sm text-[#9DA5B4] max-w-md leading-relaxed">
              Independent manufacture dedicated exclusively to mechanical automatic timepieces machined from solid 950 platinum. Backed by a lifetime caliber provenance guarantee.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-[0.2em] text-[#C4B5A0]">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B2B8C4]">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Automatic Collection
                </a>
              </li>
              <li>
                <a href="#caliber" className="hover:text-white transition-colors">
                  Caliber Architecture
                </a>
              </li>
              <li>
                <a href="#analyzer" className="hover:text-white transition-colors">
                  Photo Analyzer
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenConcierge}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Horology Concierge
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-[0.2em] text-[#C4B5A0]">
              PRIVATE SALONS
            </h3>
            <ul className="space-y-2 text-sm text-[#B2B8C4]">
              <li>Geneva · Rue du Rhone</li>
              <li>London · Mount Street, Mayfair</li>
              <li>New York · Madison Avenue</li>
              <li>Tokyo · Ginza Chuo-ku</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6F7684]">
          <span>
            &copy; {new Date().getFullYear()} Home of King&apos;s Manufacture. All rights reserved.
          </span>
          <span className="font-display italic text-sm text-[#9DA5B4]">
            Nothing better than king&apos;s
          </span>
        </div>
      </div>
    </footer>
  );
};
