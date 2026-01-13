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

// --- Context ---
import { useTheme } from "../context/ThemeContext";

type MapMode = "static" | "interactive" | "developer";

const MapPage: React.FC = () => {
  // --- Theme Hook ---
  const { theme, styles } = useTheme();
  const isDark = theme === "dark";

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
      const matchBasic =
        loc.title.toLowerCase().includes(lowerTerm) ||
        loc.label.toLowerCase().includes(lowerTerm) ||
        loc.id.toString().includes(lowerTerm);

      if (matchBasic) return true;

      const teachersInLoc = Object.values(teachersData).filter(
        (t) => t.locationId === loc.id,
      );

      if (teachersInLoc.length > 0) {
        return teachersInLoc.some((teacher) => {
          const isNameMatch = teacher.name.toLowerCase().includes(lowerTerm);
          const isDeptMatch = teacher.department
            .toLowerCase()
            .includes(lowerTerm);
          return isNameMatch || isDeptMatch;
        });
      }

      return false;
    });
  }, [searchTerm]);

  const getLocationSubtitle = (loc: MapLocation) => {
    const teachersInLoc = Object.values(teachersData).filter(
      (t) => t.locationId === loc.id,
    );

    if (searchTerm && teachersInLoc.length > 0) {
      const lowerTerm = searchTerm.toLowerCase();
      const matchedTeacher = teachersInLoc.find((t) =>
        t.name.toLowerCase().includes(lowerTerm),
      );
      if (matchedTeacher) {
        return `พบ: ${matchedTeacher.name}`;
      }
    }

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
      setSearchTerm("");

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
      className={`flex flex-col w-full min-h-screen overflow-x-hidden font-sans transition-colors duration-300
        ${isFullScreen ? "p-0" : "px-2 pb-6 md:px-6 md:pb-8"}
        ${styles.bgBody}
      `}
    >
      {!isFullScreen && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 md:mb-6 px-1">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto z-50">
            {/* Logo/Title */}
            <div
              className={`hidden md:flex items-center gap-3 mr-4 transition-colors ${styles.textHeading}`}
            >
              <div
                className={`p-2 rounded-xl text-white shadow-lg ${
                  isDark
                    ? "bg-blue-600 shadow-blue-900/50"
                    : "bg-blue-600 shadow-blue-200"
                }`}
              >
                <MapIcon size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none">
                  PBNTC
                </h1>
                <p
                  className={`text-xs font-semibold ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Digital Map
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80 group">
              <div
                className={`flex items-center border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all
                  ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-200 text-slate-700"
                  }
                `}
              >
                <div className="pl-3 text-slate-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาอาคาร, แผนก, ชื่อครู..."
                  className={`w-full py-2.5 px-3 text-sm font-bold bg-transparent outline-none placeholder:text-slate-400 ${
                    isDark ? "text-white" : "text-slate-600"
                  }`}
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
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border max-h-60 overflow-y-auto custom-scrollbar z-[60]
                      ${
                        isDark
                          ? "bg-slate-800 border-slate-700 text-white"
                          : "bg-white border-slate-100 text-slate-800"
                      }
                    `}
                  >
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => handleSelectLocation(loc)}
                        className={`w-full text-left px-4 py-3 border-b last:border-0 transition-colors flex items-center justify-between group
                          ${
                            isDark
                              ? "border-slate-700 hover:bg-slate-700/50"
                              : "border-slate-50 hover:bg-blue-50"
                          }
                        `}
                      >
                        <div className="flex flex-col overflow-hidden">
                          {/* Title */}
                          <span
                            className={`text-sm font-bold truncate ${
                              isDark
                                ? "text-slate-200 group-hover:text-blue-400"
                                : "text-slate-700 group-hover:text-blue-600"
                            }`}
                          >
                            {loc.title}
                          </span>
                          {/* Subtitle */}
                          <span className="text-xs text-slate-400 truncate mt-0.5">
                            {getLocationSubtitle(loc)}
                          </span>
                        </div>

                        {/* Label Badge */}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ml-2
                          ${
                            isDark
                              ? "bg-slate-700 text-slate-300"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
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
          <div
            className={`flex p-1 rounded-xl border shadow-sm w-full md:w-auto transition-colors
            ${
              isDark
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <ModeButton
              active={mode === "static"}
              onClick={() => handleModeChange("static")}
              icon={<Lock size={16} />}
              label="ล็อค"
              isDark={isDark}
            />
            <ModeButton
              active={mode === "interactive"}
              onClick={() => handleModeChange("interactive")}
              icon={<MousePointer2 size={16} />}
              label="สำรวจ"
              isDark={isDark}
            />
            <ModeButton
              active={mode === "developer"}
              onClick={() => handleModeChange("developer")}
              icon={<Crosshair size={16} />}
              label="Dev"
              isDev
              isDark={isDark}
            />
          </div>
        </div>
      )}

      {/* Map Content Container */}
      <div
        className={`
        relative w-full overflow-hidden
        h-[75vh] min-h-[500px] md:h-[80vh]
        transition-all duration-500 ease-in-out
        ${
          isDark
            ? "bg-slate-900/50 border-slate-700 shadow-slate-950/50"
            : "bg-slate-200/50 shadow-slate-200 border-white"
        }
        ${
          isFullScreen
            ? "!h-[100dvh] !w-full rounded-none border-0 shadow-none fixed top-0 left-0 z-[100]"
            : "rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] shadow-2xl"
        }
      `}
      >
        {/* Grid Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none z-0"
          style={{
            backgroundImage: `radial-gradient(${
              isDark ? "#94a3b8" : "#64748b"
            } 1px, transparent 1px)`,
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
              {/* Controls */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex flex-col gap-2">
                {mode === "interactive" && (
                  <div
                    className={`flex flex-col backdrop-blur shadow-lg rounded-xl overflow-hidden border
                    ${
                      isDark
                        ? "bg-slate-800/90 border-slate-700 text-white"
                        : "bg-white/90 border-white/50 text-slate-700"
                    }`}
                  >
                    <ControlButton
                      onClick={() => zoomIn()}
                      icon={<Plus size={20} />}
                      isDark={isDark}
                    />
                    <ControlButton
                      onClick={() => zoomOut()}
                      icon={<Minus size={20} />}
                      isDark={isDark}
                    />
                    <ControlButton
                      onClick={() => resetTransform()}
                      icon={<RotateCcw size={18} />}
                      isDark={isDark}
                    />
                  </div>
                )}
                <button
                  onClick={toggleFullScreen}
                  className={`p-3 shadow-lg rounded-xl active:scale-95 transition-all
                    ${
                      isDark
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : "bg-slate-800 text-white hover:bg-slate-700"
                    }`}
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
                  className={`relative shadow-xl transition-shadow duration-300
                    ${mode === "developer" ? "cursor-crosshair" : "cursor-grab active:cursor-grabbing"}
                  `}
                  onClick={handleMapClick}
                  style={{ width: "fit-content", height: "fit-content" }}
                >
                  <img
                    src={mapBg}
                    alt="School Map"
                    className={`block select-none pointer-events-none transition-all duration-300
                       ${isDark ? "opacity-90 brightness-90" : ""}
                    `}
                    draggable={false}
                    style={{
                      minWidth: isMobile ? "150vw" : "auto",
                      minHeight: isMobile ? "auto" : "85vh",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                  <div
                    className={`absolute inset-0 z-10 ${
                      mode === "developer"
                        ? "opacity-50 grayscale"
                        : "opacity-100"
                    }`}
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

        {/* Location Detail Card (Modal) */}
        <AnimatePresence>
          {selectedLocation && mode !== "developer" && (
            <LocationDetailCard
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
            />
          )}
        </AnimatePresence>

        {/* Copy Toast */}
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

// --- Sub-components (Typed) ---

interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isDev?: boolean;
  isDark: boolean;
}

const ModeButton: React.FC<ModeButtonProps> = ({
  active,
  onClick,
  icon,
  label,
  isDev,
  isDark,
}) => (
  <button
    onClick={onClick}
    className={`
      flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all
      ${
        active
          ? isDev
            ? "bg-red-500 text-white shadow-md"
            : isDark
              ? "bg-blue-600 text-white shadow-md"
              : "bg-slate-800 text-white shadow-md"
          : isDark
            ? "text-slate-400 hover:bg-slate-700"
            : "text-slate-500 hover:bg-slate-50"
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface ControlButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  isDark: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  icon,
  isDark,
}) => (
  <button
    onClick={onClick}
    className={`p-3 transition-colors
      ${
        isDark
          ? "hover:bg-slate-700 border-b border-slate-700 last:border-0 active:bg-slate-600"
          : "hover:bg-slate-50 border-b border-slate-100 last:border-0 active:bg-blue-50"
      }
    `}
  >
    {icon}
  </button>
);

export default MapPage;
