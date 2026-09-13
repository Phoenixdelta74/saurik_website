import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ 
  size = 42, 
  showSubtitle = true, 
  isLight = false,
  className = '' 
}) => {
  const primaryTextColor = isLight ? '#FFFFFF' : '#102A43';
  const subtitleColor = isLight ? '#94A3B8' : '#829AB1';
  const tagColor = isLight ? '#94A3B8' : '#486174';

  const titleSize = Math.max(17, Math.round(size * 0.46));
  const pvtSize = Math.max(10, Math.round(size * 0.24));
  const tagSize = Math.max(10, Math.round(size * 0.22));

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent-teal rounded-md px-1 py-0.5 transition-opacity ${className}`}
      aria-label="SAURIK IT Private Limited Home"
    >
      {/* Official S-Constellation Mark */}
      <img
        src="/logo-mark.png"
        alt="SAURIK Logo Mark"
        style={{ height: `${size}px`, width: `${size}px` }}
        className="object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Unified Horizontal Typography */}
      <div className="flex flex-col justify-center select-none leading-none">
        <div className="flex items-baseline gap-1.5 font-heading font-extrabold tracking-tight">
          <span 
            style={{ color: primaryTextColor, fontSize: `${titleSize}px` }}
            className="tracking-tight"
          >
            SAURIK
          </span>
          <span 
            style={{ color: '#0043CA', fontSize: `${titleSize}px` }}
            className="font-extrabold"
          >
            IT
          </span>
          <span 
            style={{ color: tagColor, fontSize: `${pvtSize}px` }} 
            className="font-sans font-semibold uppercase tracking-wider ml-0.5"
          >
            Pvt Ltd
          </span>
        </div>

        {showSubtitle && (
          <div 
            style={{ color: subtitleColor, fontSize: `${tagSize}px` }}
            className="font-sans font-medium tracking-tight mt-1 transition-colors"
          >
            Technology, Deliberately.
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
