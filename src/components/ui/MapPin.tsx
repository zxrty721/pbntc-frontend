import React from 'react';
import { type MapLocation } from '../../types';
import { CATEGORY_STYLES } from '../../data/constants';

interface MapPinProps {
  location: MapLocation;
  isActive: boolean;
  isDevMode: boolean;
  onClick: () => void;
}

const MapPin: React.FC<MapPinProps> = ({ location, isActive, isDevMode, onClick }) => {
  const style = CATEGORY_STYLES[location.category];

  return (
    <button
      onClick={(e) => {
        if (isDevMode) e.stopPropagation(); 
        else onClick();
      }}
      className={`
        absolute flex items-center justify-center -translate-x-1/2 -translate-y-[85%]
        /* ✅ ปรับขนาด: มือถือเล็กลง (w-8 h-8), desktop ใหญ่ขึ้นเล็กน้อย */
        w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 transition-all duration-300 group
        ${isDevMode ? 'opacity-40 grayscale pointer-events-none' : 'hover:scale-110 hover:-translate-y-[95%] z-10 cursor-pointer'}
        ${isActive ? 'scale-125 -translate-y-full z-20' : ''}
      `}
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
    >
      {/* เงา */}
      <div className="absolute bottom-2 w-3/4 h-2 bg-black/30 rounded-full blur-[2px]"></div>
      
      {/* SVG Shape */}
      <svg viewBox="0 0 24 24" fill="currentColor" className={`w-full h-full drop-shadow-md ${style.pinColor}`}>
        <path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 8 12 8 12s8-7.58 8-12c0-4.42-3.58-8-8-8z" stroke="white" strokeWidth="1.5" />
      </svg>

      {/* Label */}
      <div className="absolute top-[15%] w-[55%] h-[55%] bg-white rounded-full shadow-inner flex items-center justify-center">
        {/* ✅ ปรับขนาดตัวอักษร: เล็กลง (text-[9px]), desktop ใหญ่ขึ้น (md:text-sm) */}
        <span className={`font-black text-[9px] md:text-sm leading-none ${style.text.replace('text-', 'text-slate-800')}`}>
          {location.label}
        </span>
      </div>
    </button>
  );
};

export default MapPin;