import React, { useState } from 'react';
// ลบ: TransformWrapper, TransformComponent (เนื่องจากไม่ต้องการ Zoom/Pan)
import { locations } from '../../data/locations';
import { type MapLocation } from '../../types';
import mapImg from '../../assets/map.png'; 
import DevTools from './DevTools';
import MapPin from '../ui/MapPin';
import MapModal from '../ui/MapModal';
import { FaExpand, FaRedoAlt } from 'react-icons/fa'; // Import Icon ที่จำเป็น

const CampusMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  // ⭐ NEW STATE: สถานะสำหรับโหมด Full Screen (ถูกเรียกจากปุ่มบนมือถือ)
  const [isFullScreen, setIsFullScreen] = useState(false); 
  
  // DevMode Logic (คงเดิม)
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
  
  // Content for the Map Area - ถูกใช้ซ้ำใน 2 โหมด
  const renderMapContent = () => (
    <div 
        className={`
            relative w-full h-full transition-all duration-300 
            ${isFullScreen ? 'object-contain' : ''}
        `} 
        onMouseMove={handleMouseMove} 
        onClick={handleMapClick}
    >
      <img 
        src={mapImg} 
        alt="Map" 
        // ✅ ในโหมด Full Screen ต้องใช้ object-contain เพื่อไม่ให้ภาพบิดเบือนและแสดงภาพเต็ม
        className={`w-full h-full block ${isMapLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 object-contain`} 
        onLoad={() => setIsMapLoaded(true)} 
        draggable={false}
      />
      {isMapLoaded && locations.map((loc) => (
        <MapPin 
          key={loc.id} 
          location={loc} 
          isActive={activeLocation?.id === loc.id} 
          isDevMode={isDevMode}
          onClick={() => { 
            setActiveLocation(loc);
          }} 
        />
      ))}
      
      {/* DevMode Overlay */}
      {isDevMode && <div className="absolute inset-0 z-50 cursor-crosshair"></div>}
    </div>
  );

  // --- Mobile Activator Overlay ---
  const MobileMapActivator = () => (
    // แสดงเฉพาะเมื่อจอเล็กกว่า sm (Mobile) และไม่ได้อยู่ใน Dev Mode
    <div className="absolute inset-0 sm:hidden z-30 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-[2px]">
      <button
        onClick={() => setIsFullScreen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold shadow-2xl transition-all bg-indigo-600 hover:bg-indigo-700 active:scale-95"
      >
        <FaExpand /> ดูแผนที่วิทยาลัย
      </button>
      <p className="mt-3 text-xs text-white/80">แตะเพื่อแสดงแผนที่เต็มจอ (แนะนำแนวนอน)</p>
    </div>
  );

  // --- Main Render ---
  
  // ⭐ โหมด 1: Full Screen View (เมื่อปุ่มถูกกด)
  if (isFullScreen) {
      return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-auto">
            
            {/* Close Button (ปุ่ม X) */}
            <button 
                onClick={() => setIsFullScreen(false)}
                className="absolute top-4 right-4 z-[110] w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full text-white font-bold text-xl flex items-center justify-center active:scale-90 transition-transform"
            >
                ✕
            </button>
            
            {/* Map Content Container: จัดให้อยู่ตรงกลางจอ Full Screen */}
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
                {renderMapContent()}
            </div>

            {/* Modal (ถ้ามีการกด Pin ในโหมด Full Screen) */}
            {activeLocation && !isDevMode && (
                <div className="absolute inset-0 z-[120]">
                    <MapModal location={activeLocation} onClose={() => setActiveLocation(null)} />
                </div>
            )}
            
            {/* Landscape Suggestion/Warning (Custom CSS for Portrait) */}
            {/* ใช้ CSS เพื่อเตือนให้หมุนจอ (แสดงเฉพาะ Mobile Portrait) */}
            <style>{`
                /* ซ่อนตัวเตือนเป็นค่าเริ่มต้น */
                .landscape-warning-overlay { display: none; } 
                /* แสดงตัวเตือนเมื่อเป็นจอเล็ก (mobile) และอยู่ในแนวตั้ง (portrait) */
                @media (max-width: 639px) and (orientation: portrait) {
                    .landscape-warning-overlay { display: flex; }
                }
            `}</style>

            <div className="landscape-warning-overlay fixed inset-0 z-[130] items-center justify-center bg-slate-900/90 text-white p-8">
                <div className="text-center">
                    <FaRedoAlt className="w-8 h-8 mx-auto mb-4 animate-[spin_4s_linear_infinite]" />
                    <h3 className="text-xl font-bold">โปรดหมุนหน้าจอ</h3>
                    <p className="text-sm mt-2">เพื่อมุมมองแผนที่เต็มจอที่ดีที่สุด</p>
                </div>
            </div>

        </div>
      );
  }

  // ⭐ โหมด 2: Normal Page View (Default)
  return (
    <div className="relative w-full max-w-[1100px] mx-auto bg-slate-100 sm:bg-slate-200 sm:rounded-2xl shadow-xl overflow-hidden border-2 sm:border-4 border-white select-none group">
      
      <DevTools isDevMode={isDevMode} onToggle={() => setIsDevMode(!isDevMode)} cursorPos={cursorPos} copiedText={copiedText} />

      {/* Map Container */}
      <div className="w-full aspect-[4/3] sm:aspect-auto relative"> 
        {renderMapContent()}
        
        {/* Mobile Overlay Button */}
        {!isDevMode && <MobileMapActivator />}
      </div>

      {/* Modal แสดงรายละเอียด */}
      {activeLocation && !isDevMode && (
        <MapModal location={activeLocation} onClose={() => setActiveLocation(null)} />
      )}
    </div>
  );
};

export default CampusMap;