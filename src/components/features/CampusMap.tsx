import React, { useState } from 'react';
import { locations } from '../../data/locations';
import { type MapLocation } from '../../types';
import mapImg from '../../assets/map.png'; 
import DevTools from './DevTools';
import MapPin from '../ui/MapPin';
import MapModal from '../ui/MapModal';

const CampusMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // DevMode Logic
  const [isDevMode, setIsDevMode] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDevMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleMapClick = () => {
    if (!isDevMode) return;
    const json = `"x": ${cursorPos.x.toFixed(0)}, "y": ${cursorPos.y.toFixed(0)}`;
    navigator.clipboard.writeText(json);
    setCopiedText(`Copied! ${json}`);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <div className="relative w-full max-w-[1100px] bg-slate-200 rounded-2xl shadow-xl overflow-hidden border-4 border-white select-none"
         onMouseMove={handleMouseMove} onClick={handleMapClick}>
      
      <DevTools isDevMode={isDevMode} onToggle={() => setIsDevMode(!isDevMode)} cursorPos={cursorPos} copiedText={copiedText} />

      <img src={mapImg} alt="Map" className={`w-full h-auto object-cover block ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setIsMapLoaded(true)} />

      {isMapLoaded && locations.map((loc) => (
        <MapPin 
          key={loc.id} 
          location={loc} 
          isActive={activeLocation?.id === loc.id} 
          isDevMode={isDevMode}
          onClick={() => setActiveLocation(loc)} 
        />
      ))}

      {activeLocation && !isDevMode && (
        <MapModal location={activeLocation} onClose={() => setActiveLocation(null)} />
      )}
    </div>
  );
};

export default CampusMap;