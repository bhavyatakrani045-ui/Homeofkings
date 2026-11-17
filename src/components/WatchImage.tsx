import React, { useState } from 'react';
import { PlatinumEmblemSvg } from './PlatinumLogo';

interface WatchImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export const WatchImage: React.FC<WatchImageProps> = ({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#161920] via-[#101217] to-[#0B0C0E] flex flex-col items-center justify-center p-6 text-center border border-white/[0.06]">
        <PlatinumEmblemSvg className="w-12 h-12 opacity-75 mb-3" />
        <span className="font-display text-lg text-[#E6E8EC] tracking-wide">
          {title || "Home of King's"}
        </span>
        <span className="text-xs font-mono text-[#8A919E] mt-1">
          950 Platinum Automatic
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
