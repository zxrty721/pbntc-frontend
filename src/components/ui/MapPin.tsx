import React, { memo } from "react";
import { CATEGORY_PIN_COLORS } from "../../data/constants";
import type { MapLocation } from "../../types";

interface MapPinProps {
  location: MapLocation;
  isActive: boolean;
  isDimmed?: boolean;
  isDevMode: boolean;
  onClick: () => void;
}

const MapPin: React.FC<MapPinProps> = memo(
  ({ location, isActive, isDimmed = false, isDevMode, onClick }) => {
    const baseColor =
      CATEGORY_PIN_COLORS[location.category] || CATEGORY_PIN_COLORS.facility;

    return (
      <div
        className={`
        absolute flex flex-col items-center justify-end group
        transition-all duration-200 ease-out
        ${isDevMode ? "pointer-events-none opacity-50" : "cursor-pointer pointer-events-auto"}
        active:scale-95 active:translate-y-1
      `}
        style={{
          left: `${location.x}%`,
          top: `${location.y}%`,
          transform: "translate(-50%, -100%)",
          zIndex: isActive ? 100 : isDimmed ? 10 : 50,
          opacity: isDimmed ? 0.6 : 1,
          filter: isDimmed ? "grayscale(100%)" : "none",
          scale: isActive ? 1.2 : isDimmed ? 0.8 : 1,
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isDevMode) onClick();
        }}
      >
        
        {/* 1. THE LABEL (ป้ายชื่อ) - ปรับให้เล็กจิ๋วสัมพันธ์กับหมุด */}
        <div
          className={`
          mb-[1px] md:mb-0.5 px-[2px] md:px-1.5 py-[1px] md:py-0.5 rounded-[2px] md:rounded shadow-sm bg-white border border-slate-200
          transition-all duration-200 origin-bottom
          ${
            isActive
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-100 opacity-100 group-hover:-translate-y-0.5"
          }
        `}
        >
          {/* 🔥 Mobile Font: 5px (เล็กมากเพื่อให้เท่าๆ กับหมุด) */}
          <span
            className={`
          block text-[5px] md:text-[10px] font-bold whitespace-nowrap leading-none 
          ${isActive ? "text-slate-900" : "text-slate-700"}
        `}
          >
            {location.label}
          </span>

          {/* สามเหลี่ยมเล็กๆ */}
          <div className="absolute -bottom-[2px] md:-bottom-[4px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[2px] md:border-l-[4px] border-l-transparent border-r-[2px] md:border-r-[4px] border-r-transparent border-t-[2px] md:border-t-[5px] border-t-white" />
          <div className="absolute -bottom-[3px] md:-bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[2px] md:border-l-[4px] border-l-transparent border-r-[2px] md:border-r-[4px] border-r-transparent border-t-[2px] md:border-t-[5px] border-t-slate-200 -z-10" />
        </div>

        {/* 2. THE PIN (ตัวหมุด) */}
        <div
          className={`relative filter drop-shadow-sm transition-all duration-300 ${isActive ? "drop-shadow-md -translate-y-1" : ""}`}
        >
          {/* Mobile Size: w-3 h-3 (12px) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform origin-bottom w-3 h-3 md:w-7 md:h-7"
          >
            <path
              d="M12 0C7.58 0 4 3.58 4 8C4 13.5 12 24 12 24C12 24 20 13.5 20 8C20 3.58 16.42 0 12 0Z"
              fill={baseColor}
              stroke="white"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="8" r="3.5" fill="white" />
          </svg>
        </div>

        {/* เงาที่พื้น */}
        <div
          className={`
          bg-black/30 rounded-full blur-[0.5px] -mt-0.5 transition-all duration-300
          w-1.5 h-0.5 md:w-3 md:h-1.5
          ${isActive ? "opacity-50 scale-110" : "opacity-30 group-hover:opacity-40"}
        `}
        />
      </div>
    );
  },
);

export default MapPin;