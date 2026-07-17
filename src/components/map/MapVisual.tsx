import { locations } from "../../assets/data/locations";
import type { MapLocation } from "../../assets/types";
import MapPinMarker from "./MapPinMarker"; // แก้ไข Path ตรงนี้ให้ตรงกับตำแหน่งไฟล์ที่คุณบันทึกไว้

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
            <img src="/map.svg" alt="College Map" className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 drop-shadow-2xl ${searchTerm || selectedLocation ? "grayscale opacity-60" : "grayscale-0 opacity-100"}`} />

            {showPins &&
                locations.map((loc) => {
                    // คำนวณสถานะต่างๆ ของหมุดแต่ละตัว
                    const isMatch = matchedIds.has(loc.id);
                    const isSearching = searchTerm.length > 0;
                    const isSelected = selectedLocation?.id === loc.id;
                    const isHighlighted = isSelected || (isSearching && isMatch);

                    const opacityClass = isSearching && !isMatch ? "opacity-20 scale-75" : "opacity-100 scale-100";
                    const zIndex = isSelected ? "z-50" : isMatch && isSearching ? "z-40" : "z-20 hover:z-30";
                    const iconSize = isHighlighted ? 40 : 32;

                    return <MapPinMarker key={loc.id} loc={loc} isSelected={isSelected} isHighlighted={isHighlighted} opacityClass={opacityClass} zIndex={zIndex} iconSize={iconSize} onSelect={onSelect} />;
                })}
        </div>
    );
}
