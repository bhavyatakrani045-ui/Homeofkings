import React from 'react';
import { PlatinumLogo } from './PlatinumLogo';

interface HeaderProps {
  onOpenConcierge: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConcierge }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0C0E]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] rounded-md"
          aria-label="Home of King's Home"
        >
          <PlatinumLogo variant="compact" />
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#B2B8C4]"
        >
          <a
            href="#collection"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] rounded-sm py-1"
          >
            Collection
          </a>
          <a
            href="#caliber"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] rounded-sm py-1"
          >
            Caliber
          </a>
          <a
            href="#analyzer"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] rounded-sm py-1"
          >
            Analyzer
          </a>
          <a
            href="#maison"
            className="hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0] rounded-sm py-1"
          >
            Maison
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenConcierge}
            className="px-5 py-2.5 text-xs font-semibold tracking-wide text-[#0B0C0E] bg-[#E8EAEE] hover:bg-white transition-colors duration-150 rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5A0]"
          >
            Horology Concierge
          </button>
        </div>
      </div>
    </header>
  );
};
