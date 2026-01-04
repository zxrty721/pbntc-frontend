import React, { memo } from "react";
import { CATEGORY_PIN_COLORS } from "../../data/constants"; // Import สีที่ตั้งไว้
import type { MapLocation } from "../../types";

interface MapPinProps {
  location: MapLocation;
  isActive: boolean;
  isDimmed?: boolean;
  isDevMode: boolean;
  onClick: () => void;
}

const MapPin: React.FC<MapPinProps> = memo(({
  location,
  isActive,
  isDimmed = false,
  isDevMode,
  onClick,
}) => {
  // ดึงค่าสี Hex Code ตาม Category โดยตรง (ถ้าไม่มีให้ใช้สีเทา facility)
  const baseColor = CATEGORY_PIN_COLORS[location.category] || CATEGORY_PIN_COLORS.facility;

  return (
    <div
      className={`
        absolute flex flex-col items-center justify-end group
        transition-all duration-200 ease-out
        ${isDevMode ? "pointer-events-none opacity-50" : "cursor-pointer"}
        /* Effect: กดแล้วเด้งลง */
        active:scale-95 active:translate-y-1
      `}
      style={{
        left: `${location.x}%`,
        top: `${location.y}%`,
        transform: "translate(-50%, -100%)", // จุด Anchor อยู่ที่ปลายแหลม
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
      
      {/* -------------------------------------------
          1. THE LABEL (ป้ายชื่อ) - ลอยอยู่ด้านบน
         ------------------------------------------- */}
      <div 
        className={`
          mb-1 px-2.5 py-1 rounded-md shadow-md bg-white border border-slate-200
          transition-all duration-200 origin-bottom
          ${isActive 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-100 opacity-100 group-hover:-translate-y-1"
          }
        `}
      >
        <span className={`
          block text-xs md:text-sm font-bold whitespace-nowrap leading-none 
          ${isActive ? "text-slate-900" : "text-slate-700"}
        `}>
          {location.label}
        </span>
        
        {/* สามเหลี่ยมเล็กๆ ใต้ป้ายชื่อ (ชี้ลงมาหาหมุด) */}
        <div 
          className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white"
        />
        {/* เงาสามเหลี่ยม */}
        <div 
          className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-200 -z-10"
        />
      </div>

      {/* -------------------------------------------
          2. THE PIN (ตัวหมุดทรงหยดน้ำ) - ใช้ SVG
         ------------------------------------------- */}
      <div className={`relative filter drop-shadow-md transition-all duration-300 ${isActive ? "drop-shadow-xl -translate-y-1" : ""}`}>
        <svg 
          width="36" 
          height="36" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transform origin-bottom"
        >
          {/* รูปทรงหยดน้ำ */}
          <path 
            d="M12 0C7.58 0 4 3.58 4 8C4 13.5 12 24 12 24C12 24 20 13.5 20 8C20 3.58 16.42 0 12 0Z" 
            fill={baseColor}
            stroke="white" 
            strokeWidth="1.5"
          />
          {/* วงกลมตรงกลาง */}
          <circle cx="12" cy="8" r="3.5" fill="white" />
        </svg>
      </div>

      {/* เงาที่พื้น (Ground Shadow) */}
      <div 
        className={`
          w-4 h-1.5 bg-black/30 rounded-full blur-[1.5px] -mt-1 transition-all duration-300
          ${isActive ? "w-6 opacity-50 scale-110" : "opacity-30 group-hover:opacity-40"}
        `} 
      />
      
    </div>
  );
});

export default MapPin;