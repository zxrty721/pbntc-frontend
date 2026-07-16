import { MapPin } from "lucide-react";
import { locations } from "../../assets/data/locations";
import type { MapLocation } from "../../assets/types";

interface MapVisualProps {
    searchTerm: string;
    selectedLocation: MapLocation | null;
    matchedIds: Set<string | number>;
    isMobile: boolean;
    showPins: boolean;
    onSelect: (loc: MapLocation) => void;
}

export default function MapVisual({ searchTerm, selectedLocation, matchedIds, showPins, onSelect }: MapVisualProps) {
    return (
        <div className="relative w-375 max-w-none">
            <img src="/map.jpeg" alt="College Map" className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 drop-shadow-2xl ${searchTerm || selectedLocation ? "grayscale opacity-60" : "grayscale-0 opacity-100"}`} />

            {showPins &&
                locations.map((loc) => {
                    const isMatch = matchedIds.has(loc.id);
                    const isSearching = searchTerm.length > 0;
                    const isSelected = selectedLocation?.id === loc.id;

                    const opacityClass = isSearching && !isMatch ? "opacity-20 scale-75" : "opacity-100 scale-100";
                    const zIndex = isSelected ? "z-50" : isMatch && isSearching ? "z-40" : "z-20 hover:z-30";
                    const isHighlighted = isSelected || (isSearching && isMatch);
                    const iconSize = isHighlighted ? 40 : 32;

                    return (
                        <button
                            key={loc.id}
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
                                    {isHighlighted && <div className="absolute top-full left-1/2 w-4 h-1 bg-black/30 rounded-full "></div>}

                                    <MapPin size={iconSize} strokeWidth={isSelected ? 1.5 : 2} className={`filter drop-shadow-md transition-all duration-300 ${isHighlighted ? "text-surface fill-primary stroke-surface" : "text-primary fill-surface stroke-primary"}`} />

                                    {isHighlighted && <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-secondary rounded-full shadow-inner -translate-x-1/2 -translate-y-1/2"></div>}
                                </div>

                                <div className="flex flex-col items-center mt-1 pointer-events-none">
                                    <span className={`px-2 py-1 rounded-md shadow-sm text-xs font-bold leading-none transition-all duration-300 border ${isHighlighted ? "bg-primary text-secondary border-primary-dark" : "bg-surface text-slate-700 border-slate-200"}`}>{loc.code}</span>

                                    <span className={`absolute top-full mt-1 w-max text-center bg-slate-800 text-white text-xs px-2 py-1 rounded-lg shadow-xl transition-all duration-200 z-50 origin-top max-w-37.5 ${isHighlighted ? "opacity-100 scale-100" : "opacity-0 scale-90 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0"}`}>
                                        {loc.name}
                                        <div className="absolute w-2 h-2 bg-slate-800 rotate-45 -top-1 left-1/2 -translate-x-1/2"></div>
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
        </div>
    );
}
