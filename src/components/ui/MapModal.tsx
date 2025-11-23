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
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-[scaleIn_0.2s_ease-out] flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Image Cover --- */}
        <div className="relative h-48 bg-slate-100 shrink-0">
          {location.imageUrl ? (
            <img src={location.imageUrl} alt={location.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${style.bg} opacity-50`}>
               <span className="text-4xl">🏛️</span>
            </div>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full text-white flex items-center justify-center">✕</button>
          <span className={`absolute bottom-3 left-3 px-3 py-1 text-xs font-bold uppercase rounded-lg shadow-sm bg-white/90 ${style.text}`}>
            {location.category}
          </span>
        </div>

        {/* --- Content --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold text-slate-800">{location.title}</h2>
          {location.subtitle && <p className="text-slate-500 text-sm">{location.subtitle}</p>}
          
          <div className="mt-4 space-y-3 text-slate-600 text-sm">
            <p>{location.description}</p>
            {location.detail && <p className="bg-slate-50 p-3 rounded-lg border border-slate-100">{location.detail}</p>}
          </div>

          {/* Tags (Facilities) */}
          <div className="mt-4 flex flex-wrap gap-2">
            {location.operatingTime && <span className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-500">🕒 {location.operatingTime}</span>}
            {location.facilities?.map((f, i) => (
              <span key={i} className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-500">{f}</span>
            ))}
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
          <button 
            onClick={onClose}
            className={`w-full py-3 rounded-xl text-white font-bold shadow-md active:scale-95 transition-transform ${style.pinColor.replace('text-', 'bg-')}`}
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
      {/* Click Overlay to Close */}
      <div className="absolute inset-0 -z-10 cursor-pointer" onClick={onClose}></div>
    </div>
  );
};

export default MapModal;