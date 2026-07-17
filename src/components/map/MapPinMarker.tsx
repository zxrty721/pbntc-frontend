import { MapPin } from "lucide-react";
import type { MapLocation } from "../../assets/types";

interface MapPinMarkerProps {
    loc: MapLocation;
    isSelected: boolean;
    isHighlighted: boolean;
    opacityClass: string;
    zIndex: string;
    iconSize: number;
    onSelect: (loc: MapLocation) => void;
}

export default function MapPinMarker({ loc, isSelected, isHighlighted, opacityClass, zIndex, iconSize, onSelect }: MapPinMarkerProps) {
    return (
        <button
            className={`absolute focus:outline-none group transition-all duration-300 ${zIndex} ${opacityClass}`}
            style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
                transform: "translate(-50%, -100%)",
            }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(loc);
            }}
        >
            <div className={`relative flex flex-col items-center justify-center transition-transform duration-300 ${isHighlighted ? "-translate-y-3 scale-110" : "group-hover:-translate-y-1 group-hover:scale-110"}`}>
                <div className="relative">
                    {/* เงาใต้หมุด */}
                    {isHighlighted && <div className="absolute top-full left-1/2 w-4 h-1 bg-black/30 rounded-full "></div>}

                    {/* ตัวไอคอนหมุด MapPin */}
                    <MapPin size={iconSize} strokeWidth={isSelected ? 1.5 : 2} className={`filter drop-shadow-md transition-all duration-300 ${isHighlighted ? "text-surface fill-primary stroke-surface" : "text-primary fill-surface stroke-primary"}`} />

                    {/* จุดสีเหลืองตรงกลางหมุด (ตอนถูกเลือก) */}
                    {isHighlighted && <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-secondary rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2"></div>}
                </div>

                <div className="flex flex-col items-center mt-1 pointer-events-none">
                    {/* การ์ดสีขาวแสดงรหัสอาคาร */}
                    <span className={`px-2 py-1 rounded-md shadow-sm text-xs font-bold leading-none transition-all duration-300 border ${isHighlighted ? "bg-primary text-secondary border-primary-dark" : "bg-surface text-slate-700 border-slate-200"}`}>{loc.code}</span>

                    {/* 🌟 Tooltip แบบใหม่: มีรูปภาพ (แสดงเฉพาะจอคอม) */}
                    <div
                        className={`absolute top-full mt-2 flex flex-col items-center bg-slate-800 text-white rounded-xl shadow-2xl transition-all duration-300 z-50 origin-top border border-slate-700
                        ${isHighlighted ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"}
                    `}
                    >
                        {/* สามเหลี่ยมชี้ขึ้นไปหาหมุด */}
                        <div className="absolute w-2.5 h-2.5 bg-slate-800 rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-l border-t border-slate-700"></div>

                        {/* กล่องเนื้อหา Tooltip (ถ้ามีรูปจะขยายกว้างขึ้นในจอคอม) */}
                        <div className={`flex flex-col w-max ${loc.images?.[0] ? "md:w-37.5" : "max-w-37.5"}`}>
                            {/* ชื่ออาคาร */}
                            <div className="px-3 py-1.5 text-center z-10 w-full">
                                <span className="text-[11px] font-bold leading-tight drop-shadow-sm whitespace-normal">{loc.name}</span>
                            </div>

                            {/* 🖼️ รูปภาพ (ซ่อนในมือถือ แสดงแค่จอ md ขึ้นไป) */}
                            {loc.images?.[0] && (
                                <div className="hidden md:block w-full h-24 relative rounded-b-xl overflow-hidden border-t border-slate-700 bg-slate-900 shrink-0">
                                    <img src={`https://zone.pbntc.site/${loc.images[0]}`} alt={loc.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
}
