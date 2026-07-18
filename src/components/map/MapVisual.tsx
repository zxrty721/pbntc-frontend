import { locations } from "../../assets/data/locations";
import type { MapLocation } from "../../assets/types";
import MapPinMarker from "./MapPinMarker";

interface MapVisualProps {
    searchTerm: string;
    selectedLocation: MapLocation | null;
    matchedIds: Set<string | number>;
    isMobile: boolean;
    showPins: boolean;
    onSelect: (loc: MapLocation) => void;
}

export default function MapVisual({ searchTerm, selectedLocation, matchedIds, showPins, onSelect }: MapVisualProps) {
    const isSearching = searchTerm.trim().length > 0;

    // 🚀 นับจำนวนตึกที่ค้นหาเจอ (เพื่อนเอาไปเช็คว่าเกิน 5 ตึกไหม)
    const matchedCount = matchedIds.size;

    return (
        <div className="relative w-375 max-w-none">
            <img src="/map.svg" alt="College Map" className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 drop-shadow-2xl ${isSearching || selectedLocation ? "grayscale brightness-75 opacity-95" : "grayscale-0 brightness-100 opacity-100"}`} />
            {showPins &&
                locations.map((loc) => {
                    const isMatch = matchedIds.has(loc.id);
                    const isSelected = selectedLocation?.id === loc.id;
                    const isHighlighted = isSelected || (isSearching && isMatch);

                    const opacityClass = isSearching && !isMatch ? "opacity-20 scale-75 pointer-events-none" : "opacity-100 scale-100";
                    const zIndex = isSelected ? "z-50" : isHighlighted ? "z-40" : "z-20 hover:z-30";
                    const iconSize = isHighlighted ? 40 : 32;

                    return (
                        <MapPinMarker
                            key={loc.id}
                            loc={loc}
                            isSelected={isSelected}
                            isHighlighted={isHighlighted}
                            opacityClass={opacityClass}
                            zIndex={zIndex}
                            iconSize={iconSize}
                            onSelect={onSelect}
                            // 🚀 ส่ง 2 ตัวนี้เพิ่มไปให้ Pin เอาไปตัดสินใจเรื่องการโชว์รูป
                            isSearching={isSearching}
                            matchedCount={matchedCount}
                        />
                    );
                })}
        </div>
    );
}
