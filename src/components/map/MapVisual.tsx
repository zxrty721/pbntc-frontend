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
    // เช็คว่าผู้ใช้กำลังค้นหาอยู่หรือไม่
    const isSearching = searchTerm.trim().length > 0;

    return (
        <div className="relative w-375 max-w-none">
            <img src="/map.svg" alt="College Map" className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 drop-shadow-2xl ${isSearching || selectedLocation ? "grayscale opacity-60" : "grayscale-0 opacity-100"}`} />

            {showPins &&
                locations.map((loc) => {
                    // 🚀 1. เช็คว่าตึกนี้อยู่ในลิสต์ที่ค้นเจอหรือไม่ (รวมถึงตึกที่อาจารย์ที่ค้นหาอยู่ด้วย)
                    const isMatch = matchedIds.has(loc.id);
                    const isSelected = selectedLocation?.id === loc.id;

                    // 🚀 2. ไฮไลต์หมุดถ้า: ถูกคลิกเลือกอยู่ OR (กำลังค้นหา AND ตึกนี้ตรงกับผลการค้นหา/อาจารย์ที่ค้นเจอ)
                    const isHighlighted = isSelected || (isSearching && isMatch);

                    // ถ้ากำลังค้นหาอยู่ แต่ตึกนี้ไม่ตรงกับเงื่อนไข ให้จางลงเหลือ 20%
                    const opacityClass = isSearching && !isMatch ? "opacity-20 scale-75 pointer-events-none" : "opacity-100 scale-100";
                    const zIndex = isSelected ? "z-50" : isHighlighted ? "z-40" : "z-20 hover:z-30";
                    const iconSize = isHighlighted ? 40 : 32;

                    return <MapPinMarker key={loc.id} loc={loc} isSelected={isSelected} isHighlighted={isHighlighted} opacityClass={opacityClass} zIndex={zIndex} iconSize={iconSize} onSelect={onSelect} />;
                })}
        </div>
    );
}
