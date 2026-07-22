import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import type { MapLocation } from "../../assets/types";
import { locations } from "../../assets/data/locations";

// 📌 1. สร้างโมเดลหมุด 3D ด้วยโค้ด
const Pin3DModel = ({ loc, position, isSelected, isMatched, onClick }: any) => {
    const pinColor = isSelected ? "#0ea5e9" : isMatched ? "#f59e0b" : "#ef4444";
    const scale = isSelected || isMatched ? 1.2 : 1;

    return (
        <group position={position} scale={scale} onClick={(e) => { e.stopPropagation(); onClick(loc); }}>
            <mesh position={[0, 1.4, 0]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color={pinColor} roughness={0.3} metalness={0.1} />
            </mesh>
            
            <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.4, 0.05, 1.3, 32]} />
                <meshStandardMaterial color={pinColor} roughness={0.3} metalness={0.1} />
            </mesh>

            <Html position={[0, 2.2, 0]} center className="pointer-events-none">
                <div className={`px-2 py-1 rounded-md shadow-lg text-xs font-bold border transition-colors ${isSelected ? "bg-primary text-white border-primary-dark scale-110" : isMatched ? "bg-secondary text-primary-dark border-secondary" : "bg-white text-slate-700 border-slate-200"}`}>
                    {loc.code}
                </div>
            </Html>
        </group>
    );
};

// 🗺️ 2. ฉากหลักของแผนที่
const MapScene = ({ searchTerm, selectedLocation, matchedIds, showPins, onSelect }: any) => {
    const texture = useTexture("/map.webp");
    const MAP_WIDTH = 40;
    const MAP_HEIGHT = 25;

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

            <mesh 
                rotation={[-Math.PI / 2, 0, 0]} 
                position={[0, 0, 0]} 
                onClick={() => onSelect(null)}
            >
                <planeGeometry args={[MAP_WIDTH, MAP_HEIGHT]} />
                <meshStandardMaterial 
                    map={texture} 
                    color={(searchTerm || selectedLocation) ? "#a1a1aa" : "#ffffff"} 
                />
            </mesh>

            {showPins && locations.map((loc) => {
                const x3D = (loc.coordinates.x / 100) * MAP_WIDTH - (MAP_WIDTH / 2);
                const z3D = (loc.coordinates.y / 100) * MAP_HEIGHT - (MAP_HEIGHT / 2);

                const isMatch = matchedIds.has(loc.id);
                const isSelected = selectedLocation?.id === loc.id;
                
                if (searchTerm && !isMatch && !isSelected) return null;

                return (
                    <Pin3DModel
                        key={loc.id}
                        loc={loc}
                        position={[x3D, 0, z3D]}
                        isSelected={isSelected}
                        isMatched={isMatch}
                        onClick={onSelect}
                    />
                );
            })}
        </>
    );
};

// 🎮 3. ตัวรวบรวมเพื่อส่งออกไปใช้
interface Map3DVisualProps {
    searchTerm: string;
    selectedLocation: MapLocation | null;
    matchedIds: Set<string | number>;
    showPins: boolean;
    onSelect: (loc: MapLocation) => void;
    controlsRef: any; 
}

export default function Map3DVisual({ searchTerm, selectedLocation, matchedIds, showPins, onSelect, controlsRef }: Map3DVisualProps) {
    return (
        <div className="w-full h-full absolute inset-0 z-0 bg-[#e2e8f0]">
            <Canvas camera={{ position: [0, 15, 20], fov: 45 }}>
                <MapScene 
                    searchTerm={searchTerm} 
                    selectedLocation={selectedLocation} 
                    matchedIds={matchedIds} 
                    showPins={showPins} 
                    onSelect={onSelect} 
                />

                <OrbitControls
                    ref={controlsRef}
                    // 🚀 แก้ไข Type Error ตรงนี้: ใช้ตัวเลขแทน enum ของ THREE เพื่อหลีกเลี่ยง TS Error
                    // 2 = เลื่อน (Pan), 1 = ซูม (Dolly), 0 = หมุน (Rotate)
                    mouseButtons={{
                        LEFT: 2, 
                        MIDDLE: 1, 
                        RIGHT: 0 
                    }}
                    enableDamping
                    dampingFactor={0.05}
                    
                    minPolarAngle={0.1} 
                    maxPolarAngle={Math.PI / 2.3} 
                    
                    minDistance={5} 
                    maxDistance={40} 
                    // 🚀 ลบ maxPan ออกไปแล้วตามที่ TypeScript แจ้งเตือน
                />
            </Canvas>
        </div>
    );
}