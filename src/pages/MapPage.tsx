import React, { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import {
  Search,
  Maximize,
  Minimize,
  Crosshair,
  Map as MapIcon,
  MousePointer2,
  Lock,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  X,
} from "lucide-react";

// --- Assets & Components ---
import mapBg from "../assets/map.png";
import mapDataConfig from "../assets/map.json";
import { locations } from "../data/locations";
import type { MapLocation } from "../types";
import MapPinComponent from "../components/ui/MapPin";
import LocationDetailCard from "../components/ui/LocationDetailCard";

type MapMode = "static" | "interactive" | "developer";

const MapPage: React.FC = () => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);

  // States
  const [mode, setMode] = useState<MapMode>("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [devCoords, setDevCoords] = useState<{ x: number; y: number } | null>(null);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  // --- Logic ---

  const handleModeChange = (newMode: MapMode) => {
    setMode(newMode);
    setSearchTerm("");
    setSelectedLocation(null);
    setDevCoords(null);
    
    // Reset View
    if (transformRef.current) {
      setTimeout(() => {
        transformRef.current?.centerView(1, 500);
      }, 100);
    }
  };

  const filteredLocations = useMemo(() => {
    if (!searchTerm) return [];
    const lowerTerm = searchTerm.toLowerCase();
    return locations.filter(
      (loc) =>
        loc.title.toLowerCase().includes(lowerTerm) ||
        loc.label.toLowerCase().includes(lowerTerm) ||
        loc.id.toString().includes(lowerTerm)
    );
  }, [searchTerm]);

  const handleSelectLocation = useCallback((loc: MapLocation) => {
    if (mode === "developer") return;

    setSelectedLocation(loc);
    setSearchTerm("");
    if (mode === "interactive" && transformRef.current) {
      transformRef.current.zoomToElement(`pin-${loc.id}`, 2.5, 800, "easeInOutQuad");
    }
  }, [mode]);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== "developer" || !mapImageRef.current) {
      // ถ้าคลิกพื้นหลัง (ไม่ใช่ Pin) ให้ยกเลิกการเลือก
      if (e.target === mapImageRef.current) setSelectedLocation(null);
      return;
    }

    const rect = mapImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = Number(((x / rect.width) * 100).toFixed(2));
    const yPercent = Number(((y / rect.height) * 100).toFixed(2));

    setDevCoords({ x: xPercent, y: yPercent });
    navigator.clipboard.writeText(`x: ${xPercent}, y: ${yPercent},`);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 1500);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const isMapLocked = mode === "static" || mode === "developer";

  // 🔥 Optimization: แยกการ Render Pin ออกมาเป็น useMemo เพื่อลดการ Re-render
  const renderedPins = useMemo(() => {
    return (
      <div className={`absolute inset-0 z-10 ${mode === "developer" ? "opacity-40 grayscale" : ""}`}>
        {locations.map((loc) => {
            const isMatch = filteredLocations.some(f => f.id === loc.id);
            const isSelected = selectedLocation?.id === loc.id;
            const isDimmed = (searchTerm && !isMatch) || (selectedLocation && !isSelected);

            return (
              <div key={loc.id} id={`pin-${loc.id}`}>
                <MapPinComponent
                  location={loc}
                  isActive={isSelected}
                  isDimmed={!!isDimmed}
                  isDevMode={mode === "developer"}
                  onClick={() => handleSelectLocation(loc)}
                />
              </div>
            );
        })}
      </div>
    );
  }, [locations, filteredLocations, selectedLocation, mode, searchTerm, handleSelectLocation]);


  return (
    <div 
      className={`
        relative w-full h-full overflow-hidden flex flex-col transition-all duration-300 bg-slate-100
        ${isFullScreen 
            ? "fixed inset-0 z-[9999] rounded-none border-0" 
            : "rounded-none border-0 sm:rounded-[30px] sm:border-4 border-white shadow-xl"
        }
      `}
    >
      
      {/* =========================================
          TOP BAR
      ========================================= */}
      <div className="absolute top-0 left-0 right-0 z-40 p-4 pointer-events-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Search */}
        <div className={`pointer-events-auto w-full max-w-xs transition-opacity duration-300 ${mode === "developer" ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <div className="relative group">
            <div className="flex items-center bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <div className="pl-3 text-slate-400"><Search size={18} /></div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหา..."
                className="w-full py-2.5 px-3 text-sm font-bold text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="pr-3 text-slate-400 hover:text-slate-600"><X size={16} /></button>
              )}
            </div>
            <AnimatePresence>
              {filteredLocations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 max-h-52 overflow-y-auto custom-scrollbar"
                >
                  {filteredLocations.map((loc) => (
                    <button key={loc.id} onClick={() => handleSelectLocation(loc)} className="w-full text-left px-4 py-2.5 border-b border-slate-50 hover:bg-blue-50 transition-colors flex items-center justify-between group/item">
                      <span className="text-xs font-bold text-slate-700 group-hover/item:text-blue-600">{loc.title}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-1 mx-auto sm:mx-0">
          <ModeButton active={mode === "static"} onClick={() => handleModeChange("static")} icon={<Lock size={14} />} label="Static" />
          <ModeButton active={mode === "interactive"} onClick={() => handleModeChange("interactive")} icon={<MousePointer2 size={14} />} label="Interactive" />
          <ModeButton active={mode === "developer"} onClick={() => handleModeChange("developer")} icon={<Crosshair size={14} />} label="Dev" isDev />
        </div>
      </div>

      {/* =========================================
          MAP AREA
      ========================================= */}
      <div className={`flex-1 relative overflow-hidden bg-slate-200/50 ${mode === 'developer' ? 'cursor-crosshair' : ''}`}>
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.5}
          maxScale={6}
          centerOnInit={true}
          disabled={isMapLocked}
          wheel={{ disabled: isMapLocked }}
          panning={{ disabled: isMapLocked, velocityDisabled: true }} // ปิด velocity เพื่อความเสถียร
          doubleClick={{ disabled: isMapLocked }}
          // Optimization props
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Controls */}
              <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-3 pointer-events-auto">
                {mode === "interactive" && (
                  <div className="flex flex-col bg-white/90 backdrop-blur shadow-sm rounded-xl overflow-hidden border border-slate-200">
                    <button onClick={() => zoomIn()} className="p-2.5 hover:bg-slate-100 text-slate-600 border-b border-slate-100"><Plus size={18} /></button>
                    <button onClick={() => zoomOut()} className="p-2.5 hover:bg-slate-100 text-slate-600 border-b border-slate-100"><Minus size={18} /></button>
                    <button onClick={() => resetTransform()} className="p-2.5 hover:bg-slate-100 text-slate-600"><RotateCcw size={16} /></button>
                  </div>
                )}
                <button onClick={toggleFullScreen} className="p-2.5 bg-white/90 backdrop-blur shadow-sm rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200">
                  {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
                </button>
              </div>

              <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                <div 
                  className="relative shadow-2xl shadow-slate-400/20"
                  style={{ width: mapDataConfig.width, height: mapDataConfig.height }}
                  onClick={handleMapClick}
                >
                  <img
                    ref={mapImageRef}
                    src={mapBg}
                    alt="Map"
                    className="w-full h-full object-contain select-none pointer-events-none"
                    draggable={false}
                    // Optimize image rendering
                    style={{ willChange: 'transform' }} 
                  />

                  {/* Render Pins (Memoized) */}
                  {renderedPins}

                  {/* Dev Marker */}
                  {mode === "developer" && devCoords && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute w-0 h-0 z-50 flex items-center justify-center pointer-events-none"
                      style={{ left: `${devCoords.x}%`, top: `${devCoords.y}%` }}
                    >
                      <div className="w-4 h-4 rounded-full border-2 border-red-500 bg-red-500/30 animate-ping absolute" />
                      <div className="w-2 h-2 rounded-full bg-red-600 absolute" />
                      <div className="absolute top-4 left-4 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap font-mono z-50">
                        x: {devCoords.x}%, y: {devCoords.y}%
                      </div>
                    </motion.div>
                  )}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      <AnimatePresence>
        {copyStatus && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] bg-slate-800 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-400" /> <span className="text-xs font-bold">Copied!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedLocation && mode !== "developer" && (
          <LocationDetailCard location={selectedLocation} onClose={() => setSelectedLocation(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const ModeButton = ({ active, onClick, icon, label, isDev = false }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 ${active ? (isDev ? 'bg-red-500 text-white shadow-red-200 shadow-md' : 'bg-slate-800 text-white shadow-slate-300 shadow-md') : 'text-slate-500 hover:bg-slate-100'}`}
  >
    {icon} <span className="hidden sm:inline">{label}</span>
  </button>
);

export default MapPage;