import React from 'react';

interface PlatinumLogoProps {
  variant?: 'compact' | 'monument';
  showTagline?: boolean;
}

export const PlatinumEmblemSvg: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ptRing" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="32%" stopColor="#D3D7DF" />
        <stop offset="65%" stopColor="#7E8694" />
        <stop offset="100%" stopColor="#F1F4F8" />
      </linearGradient>
      <linearGradient id="ptCrown" x1="16" y1="18" x2="48" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="45%" stopColor="#E1E5EC" />
        <stop offset="78%" stopColor="#9DA5B4" />
        <stop offset="100%" stopColor="#F5F7FA" />
      </linearGradient>
      <linearGradient id="ptAccent" x1="20" y1="22" x2="44" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E5D8C5" />
        <stop offset="100%" stopColor="#A6957E" />
      </linearGradient>
    </defs>

    {/* Outer brushed platinum bezel */}
    <circle cx="32" cy="32" r="29" stroke="url(#ptRing)" strokeWidth="1.6" />
    <circle cx="32" cy="32" r="24.5" stroke="url(#ptRing)" strokeOpacity="0.45" strokeWidth="0.85" />

    {/* Cardinal horological chapter markers */}
    <path d="M32 4.5V8.5M32 55.5V59.5M4.5 32H8.5M55.5 32H59.5" stroke="url(#ptRing)" strokeWidth="1.4" strokeLinecap="round" />

    {/* Diagonal minute ticks */}
    <path
      d="M12.6 12.6L14.8 14.8M51.4 12.6L49.2 14.8M12.6 51.4L14.8 49.2M51.4 51.4L49.2 49.2"
      stroke="url(#ptRing)"
      strokeOpacity="0.55"
      strokeWidth="1"
      strokeLinecap="round"
    />

    {/* Sovereign Crown geometry */}
    <path
      d="M19 40.5L16.5 24.5L25.5 31.5L32 20L38.5 31.5L47.5 24.5L45 40.5H19Z"
      stroke="url(#ptCrown)"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="url(#ptCrown)"
      fillOpacity="0.12"
    />

    {/* Crown base bar & balance jewel */}
    <line x1="19" y1="44.5" x2="45" y2="44.5" stroke="url(#ptAccent)" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="32" cy="20" r="1.6" fill="url(#ptAccent)" />
    <circle cx="16.5" cy="24.5" r="1.3" fill="url(#ptCrown)" />
    <circle cx="47.5" cy="24.5" r="1.3" fill="url(#ptCrown)" />
  </svg>
);

export const PlatinumLogo: React.FC<PlatinumLogoProps> = ({
  variant = 'compact',
  showTagline = false,
}) => {
  if (variant === 'compact') {
    return (
      <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
        <PlatinumEmblemSvg className="w-8 h-8 shrink-0" />
        <span className="font-display text-xl tracking-[0.06em] font-semibold platinum-text">
          Home of King&apos;s
        </span>
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-3">
      <div className="inline-flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-[#131519] border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          <PlatinumEmblemSvg className="w-12 h-12" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-mono tracking-[0.26em] text-[#C4B5A0]">
            PT 950 · MANUFACTURE AUTOMATIQUE
          </span>
          <span className="font-display text-3xl sm:text-4xl font-semibold tracking-[0.04em] platinum-text">
            Home of King&apos;s
          </span>
        </div>
      </div>
      {showTagline && (
        <p className="font-display italic text-lg sm:text-xl text-[#D4D8E0] tracking-[0.03em]">
          &ldquo;Nothing better than king&apos;s&rdquo;
        </p>
      )}
    </div>
  );
};
