import React from 'react';

interface ItqanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'white' | 'dark' | 'color';
  showSubtitle?: boolean;
  className?: string;
}

export const ItqanLogo: React.FC<ItqanLogoProps> = ({
  size = 'md',
  variant = 'color',
  showSubtitle = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { height: 28, textSize: 'text-lg', subSize: 'text-[9px]', iconSize: 22 },
    md: { height: 36, textSize: 'text-2xl', subSize: 'text-[10px]', iconSize: 28 },
    lg: { height: 48, textSize: 'text-3xl', subSize: 'text-xs', iconSize: 38 },
    xl: { height: 64, textSize: 'text-4xl', subSize: 'text-sm', iconSize: 52 },
  };

  const currentSize = sizeMap[size];

  const primaryTextColor =
    variant === 'white' ? 'text-white' : variant === 'dark' ? 'text-[#0F172A]' : 'text-[#0F172A]';

  const loopColor =
    variant === 'white' ? '#FFFFFF' : '#214ecf';

  const dotColor =
    variant === 'white' ? '#ea9835' : '#e06045';

  const englishTextColor =
    variant === 'white' ? 'text-white/80' : 'text-slate-800';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} dir="rtl">
      {/* Brand Icon (Arabic stylized loop mark with diamond dot) */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={currentSize.iconSize}
          height={currentSize.iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Stylized Loop Graphic matching Brand Guidelines */}
          <path
            d="M48 20C48 13.3726 42.6274 8 36 8C27.5 8 20 18 16 26C12 34 8 42 8 48C8 54.6274 13.3726 60 20 60C28.5 60 36 50 40 42C44 34 48 26 48 20Z"
            stroke={loopColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 26C16 19.3726 21.3726 14 28 14C36.5 14 44 24 48 32C52 40 56 48 56 54"
            stroke={loopColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          {/* Brand Accent Rhombus/Dot (Arabic letter mark style) */}
          <rect
            x="32"
            y="26"
            width="8.5"
            height="8.5"
            transform="rotate(45 32 26)"
            fill={dotColor}
          />
        </svg>
      </div>

      {/* Typography: Arabic "إتقان" + English "ENGLISH" */}
      <div className="flex flex-col items-start leading-none justify-center">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-extrabold tracking-tight font-arabic ${primaryTextColor} ${currentSize.textSize}`}
            style={{ fontFamily: "'Almarai', 'IBM Plex Sans Arabic', sans-serif" }}
          >
            إتقان
          </span>
          <span className="text-[#ea9835] font-black text-base sm:text-lg">.</span>
        </div>
        {showSubtitle && (
          <span
            className={`font-bold tracking-[0.22em] uppercase font-sans-en text-[9px] sm:text-[10px] ${englishTextColor} -mt-0.5`}
            style={{ fontFamily: "'Garet', 'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            ENGLISH
          </span>
        )}
      </div>
    </div>
  );
};
