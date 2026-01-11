import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
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
  MousePointer2,
  Lock,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  X,
  Map as MapIcon,
} from "lucide-react";

// --- Assets & Components ---
import mapBg from "/map.jpeg";
import { locations } from "../data/locations";
import { teachersData } from "../data/teachers";
import type { MapLocation } from "../types";
import MapPinComponent from "../components/ui/MapPin";
import LocationDetailCard from "../components/ui/LocationDetailCard";

type MapMode = "static" | "interactive" | "developer";

const MapPage: React.FC = () => {
  // --- Refs & States ---
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<MapMode>("static");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null,
  );
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [devCoords, setDevCoords] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  // --- Initialize & Event Listeners ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Logic: Search & Filter ---
  const filteredLocations = useMemo(() => {
    if (!searchTerm) return [];
    const lowerTerm = searchTerm.toLowerCase();

    return locations.filter((loc) => {
      // 1. ค้นหาจาก Title, Label, ID (พื้นฐาน)
      const matchBasic =
        loc.title.toLowerCase().includes(lowerTerm) ||
        loc.label.toLowerCase().includes(lowerTerm) ||
        loc.id.toString().includes(lowerTerm);

      if (matchBasic) return true;

      // 2. ค้นหาจากข้อมูลครู (ชื่อ และ แผนก) โดยดูจาก locationId
      const teachersInLoc = Object.values(teachersData).filter(
        (t) => t.locationId === loc.id,
      );

      if (teachersInLoc.length > 0) {
        return teachersInLoc.some((teacher) => {
          // เช็คชื่อครู
          const isNameMatch = teacher.name.toLowerCase().includes(lowerTerm);
          // เช็คชื่อแผนก
          const isDeptMatch = teacher.department
            .toLowerCase()
            .includes(lowerTerm);

          return isNameMatch || isDeptMatch;
        });
      }

      return false;
    });
  }, [searchTerm]);

  // --- Helper: ดึงข้อความอธิบาย (Subtitle) ในผลลัพธ์การค้นหา ---
  const getLocationSubtitle = (loc: MapLocation) => {
    // ดึงครูทั้งหมดที่อยู่ตึกนี้
    const teachersInLoc = Object.values(teachersData).filter(
      (t) => t.locationId === loc.id,
    );

    // ถ้าค้นหาแล้วเจอชื่อครู ให้โชว์ชื่อครูคนแรกที่ตรงกับคำค้น
    if (searchTerm && teachersInLoc.length > 0) {
      const lowerTerm = searchTerm.toLowerCase();
      const matchedTeacher = teachersInLoc.find((t) =>
        t.name.toLowerCase().includes(lowerTerm),
      );

      if (matchedTeacher) {
        return `พบ: ${matchedTeacher.name}`;
      }
    }

    // ถ้าไม่เจอชื่อครู (เช่นค้นหาแผนก หรือดูทั่วไป) ให้โชว์รายชื่อแผนก
    if (teachersInLoc.length > 0) {
      const departments = [
        ...new Set(teachersInLoc.map((t) => t.department).filter(Boolean)),
      ];
      if (departments.length > 0) {
        return departments.join(", ");
      }
    }

    return loc.category;
  };

  // --- Logic: Map Interaction ---
  const handleSelectLocation = useCallback(
    (loc: MapLocation) => {
      if (mode === "developer") return;

      setSelectedLocation(loc);
      setSearchTerm(""); // เคลียร์คำค้นหาเมื่อเลือกสถานที่แล้ว

      if (mode === "interactive" && transformRef.current) {
        transformRef.current.zoomToElement(
          `pin-${loc.id}`,
          2.5,
          800,
          "easeInOutQuad",
        );
      }
    },
    [mode],
  );

  const handleModeChange = (newMode: MapMode) => {
    setMode(newMode);
    setSearchTerm("");
    setSelectedLocation(null);
    setDevCoords(null);
    setTimeout(() => transformRef.current?.centerView(1, 500), 50);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== "developer" || !mapWrapperRef.current) {
      if (
        (e.target as HTMLElement).tagName === "IMG" ||
        e.target === mapWrapperRef.current
      ) {
        setSelectedLocation(null);
      }
      return;
    }

    const rect = mapWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = Number(((x / rect.width) * 100).toFixed(2));
    const yPercent = Number(((y / rect.height) * 100).toFixed(2));

    const safeX = Math.max(0, Math.min(100, xPercent));
    const safeY = Math.max(0, Math.min(100, yPercent));

    setDevCoords({ x: safeX, y: safeY });
    navigator.clipboard.writeText(`x: ${safeX}, y: ${safeY},`);
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 1500);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch((e) => console.error(e));
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // --- Rendered Pins ---
  const renderedPins = useMemo(() => {
    return locations.map((loc) => {
      const isMatch = filteredLocations.some((f) => f.id === loc.id);
      const isSelected = selectedLocation?.id === loc.id;
      // ถ้ามีการค้นหา ให้ Dim ตัวที่ไม่เกี่ยว, ถ้ามีการเลือกสถานที่ ให้ Dim ตัวอื่น
      const isDimmed =
        (searchTerm && !isMatch) || (selectedLocation && !isSelected);

      return (
        <div
          key={loc.id}
          id={`pin-${loc.id}`}
          className="absolute z-10"
          style={{
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <MapPinComponent
            location={loc}
            isActive={isSelected}
            isDimmed={!!isDimmed}
            isDevMode={mode === "developer"}
            onClick={() => handleSelectLocation(loc)}
          />
        </div>
      );
    });
  }, [
    locations,
    filteredLocations,
    selectedLocation,
    mode,
    searchTerm,
    handleSelectLocation,
  ]);

  return (
    <div
      className={`flex flex-col w-full h-[100dvh] bg-slate-50 overflow-hidden font-sans ${isFullScreen ? "p-0" : "p-2 md:p-6"}`}
    >
      {!isFullScreen && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6 px-1">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto z-50">
            {/* Logo/Title */}
            <div className="hidden md:flex items-center gap-3 text-slate-700 mr-4">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-blue-200 shadow-lg">
                <MapIcon size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none">
                  PBNTC
                </h1>
                <p className="text-xs font-semibold text-slate-400">
                  Digital Map
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                <div className="pl-3 text-slate-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาอาคาร, แผนก, ชื่อครู..."
                  className="w-full py-2.5 px-3 text-sm font-bold text-slate-600 bg-transparent outline-none placeholder:text-slate-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="pr-3 text-slate-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Dropdown Result */}
              <AnimatePresence>
                {filteredLocations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto custom-scrollbar z-[60]"
                  >
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => handleSelectLocation(loc)}
                        className="w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-blue-50 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex flex-col overflow-hidden">
                          {/* Title */}
                          <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 truncate">
                            {loc.title}
                          </span>
                          {/* Subtitle: แสดงชื่อครูที่เจอ หรือ แผนก */}
                          <span className="text-xs text-slate-400 truncate mt-0.5">
                            {getLocationSubtitle(loc)}
                          </span>
                        </div>

                        {/* Label Badge */}
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                          {loc.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
            <ModeButton
              active={mode === "static"}
              onClick={() => handleModeChange("static")}
              icon={<Lock size={16} />}
              label="ล็อค"
            />
            <ModeButton
              active={mode === "interactive"}
              onClick={() => handleModeChange("interactive")}
              icon={<MousePointer2 size={16} />}
              label="สำรวจ"
            />
            <ModeButton
              active={mode === "developer"}
              onClick={() => handleModeChange("developer")}
              icon={<Crosshair size={16} />}
              label="Dev"
              isDev
            />
          </div>
        </div>
      )}

      {/* Map Content */}
      <div
        className={`
        relative flex-1 w-full overflow-hidden bg-slate-200/50
        transition-all duration-500 ease-in-out
        ${
          isFullScreen
            ? "rounded-none border-0 shadow-none"
            : "rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] border-white shadow-2xl shadow-slate-200"
        }
      `}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.2}
          maxScale={8}
          centerOnInit={true}
          disabled={mode === "static"}
          limitToBounds={false}
          smooth={true}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col gap-2">
                {mode === "interactive" && (
                  <div className="flex flex-col bg-white/90 backdrop-blur shadow-lg rounded-xl overflow-hidden border border-white/50">
                    <ControlButton
                      onClick={() => zoomIn()}
                      icon={<Plus size={20} />}
                    />
                    <ControlButton
                      onClick={() => zoomOut()}
                      icon={<Minus size={20} />}
                    />
                    <ControlButton
                      onClick={() => resetTransform()}
                      icon={<RotateCcw size={18} />}
                    />
                  </div>
                )}
                <button
                  onClick={toggleFullScreen}
                  className="p-3 bg-slate-800 text-white shadow-lg rounded-xl hover:bg-slate-700 active:scale-95 transition-all"
                  title="Full Screen"
                >
                  {isFullScreen ? (
                    <Minimize size={20} />
                  ) : (
                    <Maximize size={20} />
                  )}
                </button>
              </div>

              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <div
                  ref={mapWrapperRef}
                  className={`relative shadow-xl transition-shadow duration-300 ${mode === "developer" ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing"}`}
                  onClick={handleMapClick}
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  <img
                    src={mapBg}
                    alt="School Map"
                    className="block select-none pointer-events-none"
                    draggable={false}
                    style={{
                      minWidth: isMobile ? "150vw" : "auto",
                      minHeight: isMobile ? "auto" : "85vh",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                  <div
                    className={`absolute inset-0 z-10 ${mode === "developer" ? "opacity-50 grayscale" : "opacity-100"}`}
                  >
                    {renderedPins}
                  </div>
                  {mode === "developer" && devCoords && (
                    <div
                      className="absolute z-50 pointer-events-none"
                      style={{
                        left: `${devCoords.x}%`,
                        top: `${devCoords.y}%`,
                      }}
                    >
                      <span className="relative flex h-4 w-4 -translate-x-1/2 -translate-y-1/2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white shadow-sm"></span>
                      </span>
                    </div>
                  )}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        <AnimatePresence>
          {selectedLocation && mode !== "developer" && (
            <LocationDetailCard
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {copyStatus && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm"
            >
              <CheckCircle2 size={16} className="text-green-400" />
              <span className="text-xs font-bold">Coordinates Copied!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ModeButton = ({ active, onClick, icon, label, isDev }: any) => (
  <button
    onClick={onClick}
    className={`
      flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all
      ${
        active
          ? isDev
            ? "bg-red-500 text-white shadow-md"
            : "bg-slate-800 text-white shadow-md"
          : "text-slate-500 hover:bg-slate-50"
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const ControlButton = ({ onClick, icon }: any) => (
  <button
    onClick={onClick}
    className="p-3 hover:bg-slate-50 text-slate-700 border-b border-slate-100 last:border-0 active:bg-blue-50"
  >
    {icon}
  </button>
);

export default MapPage;