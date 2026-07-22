import { MapPin, Image as ImageIcon } from "lucide-react";
import { useState, memo } from "react"; // 🚀 CPU Optimization: เพิ่ม memo
import type { MapLocation } from "../../assets/types";

interface MapPinMarkerProps {
    loc: MapLocation;
    isSelected: boolean;
    isHighlighted: boolean;
    opacityClass: string;
    zIndex: string;
    iconSize: number;
    onSelect: (loc: MapLocation) => void;
    isSearching: boolean;
    matchedCount?: number;
}

const MapPinMarker = ({ loc, isSelected, isHighlighted, opacityClass, zIndex, iconSize, onSelect, isSearching, matchedCount }: MapPinMarkerProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isActive = isSelected;
    const isMatched = isHighlighted && !isSelected;

    const forceShowTooltip = isActive || (isSearching && isMatched && matchedCount !== undefined && matchedCount <= 5);
    const showImage = isActive || isHovered || (isSearching && isMatched && matchedCount !== undefined && matchedCount <= 5);

    const pinColorClass = isActive ? "text-surface fill-primary stroke-surface" : isMatched ? "text-primary fill-secondary stroke-primary" : "text-primary fill-surface stroke-primary";

    // 🚀 GPU Optimization: เพิ่ม transform-gpu will-change-transform เพื่อผลักภาระ Animation เด้งดึ๋งไปที่การ์ดจอ
    const pinTransformClass = isActive 
        ? "-translate-y-5 scale-125 transform-gpu will-change-transform" 
        : isMatched 
        ? "-translate-y-3 scale-110 transform-gpu will-change-transform" 
        : "group-hover:-translate-y-1 group-hover:scale-110 transform-gpu will-change-transform";

    const labelColorClass = isActive ? "bg-primary text-white border-primary-dark shadow-md" : isMatched ? "bg-secondary text-primary-dark border-secondary shadow-sm" : "bg-surface text-slate-600 border-slate-200 group-hover:text-primary group-hover:border-primary/30";

    return (
        <button
            className={`absolute focus:outline-none group transition-all duration-300 ${zIndex} ${opacityClass} transform-gpu will-change-transform`} // 🚀 GPU Optimization
            style={{
                left: `${loc.coordinates.x}%`,
                top: `${loc.coordinates.y}%`,
                transform: "translate(-50%, -100%)",
            }}
            onClick={(e) => {
                e.stopPropagation();
                onSelect(loc);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`relative flex flex-col items-center justify-center transition-transform duration-300 ${pinTransformClass}`}>
                <div className="relative">
                    {isActive && <div className="absolute top-[80%] left-1/2 w-6 h-6 bg-primary/40 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping pointer-events-none"></div>}
                    {(isActive || isMatched) && <div className="absolute top-full left-1/2 w-4 h-1 bg-black/30 rounded-full transition-all duration-300"></div>}
                    <MapPin size={iconSize} strokeWidth={isActive ? 1.5 : 2} className={`filter drop-shadow-md transition-all duration-300 ${pinColorClass}`} />
                    {isActive && <div className="absolute top-[35%] left-1/2 w-2.5 h-2.5 bg-secondary rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2"></div>}
                    {isMatched && <div className="absolute top-[35%] left-1/2 w-2 h-2 bg-white rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2"></div>}
                </div>

                <div className="flex flex-col items-center mt-1 pointer-events-none">
                    <span className={`px-2 py-1 rounded-md shadow-sm text-xs font-bold leading-none transition-colors duration-300 border ${labelColorClass}`}>{loc.code}</span>

                    <div
                        className={`absolute top-full mt-2 flex-col items-center bg-slate-800 text-white rounded-xl shadow-2xl transition-all duration-300 z-50 origin-top border border-slate-700
                        hidden md:flex transform-gpu will-change-transform /* 🚀 GPU Optimization สำหรับ Popup */
                        ${forceShowTooltip ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"}
                    `}
                    >
                        <div className="absolute w-2.5 h-2.5 bg-slate-800 rotate-45 -top-1.5 left-1/2 -translate-x-1/2 border-l border-t border-slate-700"></div>

                        <div className={`flex flex-col w-max ${showImage && loc.images?.[0] ? "md:w-37.5" : "max-w-37.5"}`}>
                            <div className="px-3 py-1.5 text-center z-10 w-full">
                                <span className="text-[11px] font-bold leading-tight drop-shadow-sm whitespace-normal">{loc.name}</span>
                            </div>

                            {showImage && loc.images?.[0] && (
                                <div className="flex w-full h-24 relative rounded-b-xl overflow-hidden border-t border-slate-700 bg-slate-900 shrink-0 items-center justify-center">
                                    {!isImageLoaded && !hasError && (
                                        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
                                            <ImageIcon size={20} className="text-slate-600 opacity-50" />
                                        </div>
                                    )}

                                    {hasError && (
                                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                            <ImageIcon size={20} className="text-slate-500 opacity-30" />
                                        </div>
                                    )}

                                    <img src={`https://zone.pbntc.site/${loc.images[0]}`} alt={loc.name} loading="lazy" decoding="async" onLoad={() => setIsImageLoaded(true)} onError={() => setHasError(true)} className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </button>
    );
};

// 🚀 CPU Optimization: ห่อด้วย memo ป้องกันการวาดใหม่ (Re-render) สำหรับตึกที่ไม่ถูกกระทำ
export default memo(MapPinMarker);