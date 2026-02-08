// components/map/MapVisual.tsx
"use client";

import { MapPin } from "lucide-react";
import { locations } from "../../data/locations";
import type { MapLocation } from "../../types";

interface MapVisualProps {
    searchTerm: string;
    selectedLocation: MapLocation | null;
    matchedIds: Set<string | number>; // ✅ รองรับทั้ง string/number กัน Error
    isMobile: boolean;
    onSelect: (loc: MapLocation) => void;
}

export default function MapVisual({
    searchTerm,
    selectedLocation,
    matchedIds,
    isMobile,
    onSelect
}: MapVisualProps) {
    return (
        <div className="relative w-full md:w-375 max-w-none">
            {/* 🗺️ รูปแผนที่ */}
            <img
                src="/map.jpeg"
                alt="College Map"
                className={`
                    w-full h-auto object-contain pointer-events-none select-none transition-all duration-500
                    drop-shadow-2xl
                    ${(searchTerm || selectedLocation) ? 'grayscale opacity-60 blur-[1px]' : 'grayscale-0 opacity-100'}
                `}
            />

            {/* 📍 PINS */}
            {locations.map((loc) => {
                const isMatch = matchedIds.has(loc.id);
                const isSearching = searchTerm.length > 0;
                const isSelected = selectedLocation?.id === loc.id;

                // Logic การแสดงผล (ถ้า Search อยู่แล้วไม่ตรง ให้จางลงเยอะๆ)
                const opacityClass = isSearching && !isMatch ? 'opacity-10 scale-75 blur-[1px]' : 'opacity-100 scale-100';

                // Z-Index: ตัวที่เลือกต้องอยู่บนสุดเสมอ (z-50), ตัวที่ Match การค้นหาอยู่รองลงมา (z-40)
                const zIndex = isSelected ? 'z-50' : (isMatch && isSearching ? 'z-40' : 'z-20 hover:z-30');

                // Highlight State
                const isHighlighted = isSelected || (isSearching && isMatch);

                // ขนาด Pin (ปรับให้พอดี ไม่ใหญ่เทอะทะ)
                const iconSize = isMobile ? (isHighlighted ? 32 : 24) : (isHighlighted ? 40 : 32);

                return (
                    <button
                        key={loc.id}
                        className={`
                            absolute -translate-x-1/2 -translate-y-full focus:outline-none group transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)
                            ${zIndex} ${opacityClass}
                        `}
                        style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(loc);
                        }}
                    >
                        <div className={`
                            relative flex flex-col items-center justify-center transition-transform duration-300
                            ${isHighlighted ? '-translate-y-3 scale-110' : 'group-hover:-translate-y-1 group-hover:scale-110'}
                        `}>
                            {/* 🎨 ICON PIN DESIGN ใหม่ */}
                            <div className="relative">
                                {/* เงาใต้หมุด (เฉพาะตอนเลือก) */}
                                {isHighlighted && (
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/30 rounded-full blur-[2px]"></div>
                                )}

                                <MapPin
                                    size={iconSize}
                                    strokeWidth={isSelected ? 1.5 : 2} // ถ้าเลือกแล้วเส้นบางลงนิดนึงเพื่อให้เห็นสีข้างในชัด
                                    className={`
                                        filter drop-shadow-md transition-all duration-300
                                        ${isHighlighted
                                            ? 'text-slate-50 fill-amber-500 stroke-slate-50' // ✅ Active: ขอบขาว ไส้ทอง (ดูแพง เห็นทรงชัด)
                                            : 'text-slate-700 fill-slate-100 stroke-slate-700 dark:fill-slate-800'} // ⚪️ Normal: ขอบเทา ไส้ขาว
                                    `}
                                />

                                {/* จุดสีตรงกลางหมุด (ลูกเล่นเพิ่ม) */}
                                {isHighlighted && (
                                    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-inner"></div>
                                )}
                            </div>

                            {/* 🏷️ LABEL (ชื่อ/เลขตึก) */}
                            <div className="flex flex-col items-center mt-1 pointer-events-none">
                                {/* 1. เลขตึก (Code) - โชว์ตลอด แต่เปลี่ยนสีตอนเลือก */}
                                <span className={`
                                    px-2 py-0.5 rounded-md shadow-sm text-[10px] md:text-xs font-bold leading-none
                                    transition-all duration-300 border
                                    ${isHighlighted
                                        ? 'bg-amber-500 text-white border-amber-400 shadow-amber-500/40 translate-y-0'
                                        : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}
                                `}>
                                    {loc.code}
                                </span>

                                {/* 2. ชื่อเต็ม (Name) - โชว์เมื่อเลือก หรือ Mouse Over */}
                                <span className={`
                                    absolute top-full mt-1 w-max max-w-37.5 text-center
                                    bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl
                                    transition-all duration-200 z-50 origin-top
                                    ${isHighlighted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'}
                                `}>
                                    {loc.name}
                                    {/* ลูกศรชี้ขึ้นเล็กๆ ของ Tooltip */}
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                </span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}