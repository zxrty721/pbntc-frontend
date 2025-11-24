import React from 'react';
import { type MapLocation } from '../../types';
import { CATEGORY_STYLES } from '../../data/constants';

interface MapModalProps {
  location: MapLocation;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ location, onClose }) => {
  const style = CATEGORY_STYLES[location.category];

  return (
    // ปรับ: z-index สูง, ใช้ items-end เพื่อให้มือถืออยู่ด้านล่าง, sm:items-center เพื่อให้ desktop อยู่ตรงกลาง
    // ปรับ: p-0 บนมือถือเพื่อให้ชิดขอบ, p-4 บน desktop
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      
      {/* Click Overlay to Close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div 
        className="
          bg-white w-full max-w-md relative flex flex-col shadow-2xl overflow-hidden
          animate-[scaleIn_0.2s_ease-out]
          
          /* Mobile Styling: ติดล่าง, โค้งแค่บน, สูงเกือบเต็มจอ */
          rounded-t-2xl rounded-b-none max-h-[90vh]
          
          /* Desktop Styling: ลอยตรงกลาง, โค้งทั้งใบ, สูงพอประมาณ */
          sm:rounded-2xl sm:max-h-[85vh]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Image Cover --- */}
        <div className="relative h-48 sm:h-56 bg-slate-100 shrink-0">
          {location.imageUrl ? (
            <img src={location.imageUrl} alt={location.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${style.bg} opacity-50`}>
               <span className="text-5xl">🏛️</span>
            </div>
          )}
          
          {/* ปุ่มปิดมุมขวาบน (เพิ่มขนาดปุ่มให้กดง่ายขึ้นบนมือถือ) */}
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 w-10 h-10 bg-black/30 hover:bg-black/50 active:bg-black/60 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-colors z-10"
          >
            ✕
          </button>

          <span className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-bold uppercase rounded-lg shadow-sm bg-white/90 ${style.text}`}>
            {location.category}
          </span>
        </div>

        {/* --- Content --- */}
        <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar overscroll-contain">
          <h2 className="text-2xl font-bold text-slate-800 leading-tight">{location.title}</h2>
          {location.subtitle && <p className="text-slate-500 text-sm mt-1">{location.subtitle}</p>}
          
          <div className="mt-4 space-y-3 text-slate-600 text-sm leading-relaxed">
            <p>{location.description}</p>
            {location.detail && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs sm:text-sm">
                {location.detail}
              </div>
            )}
          </div>

          {/* Tags (Facilities) */}
          <div className="mt-5 flex flex-wrap gap-2">
            {location.operatingTime && (
              <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 border border-slate-200">
                🕒 {location.operatingTime}
              </span>
            )}
            {location.facilities?.map((f, i) => (
              <span key={i} className="bg-slate-100 px-2.5 py-1 rounded-md text-xs text-slate-600 border border-slate-200">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* --- Footer --- */}
        {/* เพิ่ม padding-bottom สำหรับ iPhone ที่มี Home indicator (pb-safe) หรือเผื่อที่ไว้หน่อย */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 pb-6 sm:pb-4">
          <button 
            onClick={onClose}
            className={`w-full py-3.5 rounded-xl text-white font-bold shadow-md active:scale-[0.98] transition-transform ${style.pinColor.replace('text-', 'bg-')}`}
          >
            ตกลง / ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;