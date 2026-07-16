import { useState, useMemo, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X, Building2, ArrowRight, Maximize, Minimize } from "lucide-react";

import Header from "./components/layout/Header";
import MapSidebar from "./components/map/MapSidebar";
import MapVisual from "./components/map/MapVisual";
import TeacherModal from "./components/ui/TeacherModal";
import { locations } from "./assets/data/locations";
import type { MapLocation, Teacher } from "./assets/types";

export default function App() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [showPins, setShowPins] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isDimmed = !!(searchTerm || selectedLocation);

    const filteredLocations = useMemo(() => {
        if (!searchTerm) return locations;
        return locations.filter((loc) => loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || loc.code.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const matchedIds = useMemo(() => {
        return new Set(filteredLocations.map((loc) => loc.id));
    }, [filteredLocations]);

    const handleSelectLocation = (loc: MapLocation) => {
        setSelectedLocation(loc);
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    const handleBackgroundClick = () => {
        setSelectedLocation(null);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            mapContainerRef.current?.requestFullscreen().catch((err) => console.error(err));
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div ref={mapContainerRef} className="w-full h-screen flex flex-col overflow-hidden font-sans relative transition-all duration-500" style={{ backgroundColor: isDimmed ? "#a2a798" : "var(--color-app-bg)" }}>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} showPins={showPins} setShowPins={setShowPins} />

            <div className="relative flex-1 w-full h-full z-0 pt-30 md:pt-20">
                <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit={true} wheel={{ step: 0.1 }}>
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <div className="absolute bottom-8 right-4 md:right-8 flex flex-col gap-2 z-20">
                                <button onClick={() => zoomIn()} className="w-10 h-10 md:w-12 md:h-12 bg-surface text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl shadow-lg border border-slate-200 font-bold transition-colors">
                                    +
                                </button>
                                <button onClick={() => zoomOut()} className="w-10 h-10 md:w-12 md:h-12 bg-surface text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl shadow-lg border border-slate-200 font-bold transition-colors">
                                    -
                                </button>
                                <button
                                    onClick={() => {
                                        resetTransform();
                                        handleBackgroundClick();
                                    }}
                                    className="px-2 py-2 bg-primary-dark text-white hover:bg-primary text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all mt-2"
                                >
                                    Reset
                                </button>
                                <button onClick={toggleFullscreen} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-surface text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl shadow-lg border border-slate-200 mt-1 transition-colors">
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                </button>
                            </div>

                            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                                <div className="relative flex items-center justify-center cursor-grab active:cursor-grabbing p-4 md:p-8" style={{ minWidth: "100vw", minHeight: "100vh", width: "max-content", height: "max-content" }} onClick={handleBackgroundClick}>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <MapVisual searchTerm={searchTerm} selectedLocation={selectedLocation} matchedIds={matchedIds} showPins={showPins} onSelect={handleSelectLocation} isMobile={isMobile} />
                                    </div>
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>

            {selectedLocation && (
                <>
                    <div className="fixed inset-0 z-30 md:hidden" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} onClick={() => setSelectedLocation(null)}></div>

                    <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-1/2 md:-translate-x-1/2 z-40 bg-surface rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-6 max-h-[65vh] md:max-h-[80vh] flex flex-col w-auto md:w-full md:max-w-md">
                        <div className="h-24 sm:h-28 md:h-40 bg-slate-200 relative shrink-0">
                            {selectedLocation.images?.[0] ? (
                                <img src={`https://zone.pbntc.site/${selectedLocation.images[0]}`} alt={selectedLocation.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <Building2 size={28} />
                                </div>
                            )}
                            <button onClick={() => setSelectedLocation(null)} className="absolute top-2 right-2 p-1.5 text-white rounded-full transition-colors hover:scale-110 shadow-md" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
                                <X size={14} />
                            </button>
                        </div>

                        <div className="p-3 md:p-4 overflow-y-auto flex-1 flex flex-col gap-2 md:gap-3">
                            <div>
                                <span className="inline-block px-1.5 py-0.5 bg-secondary text-primary-dark text-xs font-bold uppercase rounded mb-0.5">{selectedLocation.code}</span>
                                <h3 className="text-sm md:text-lg font-bold text-slate-900 leading-tight">{selectedLocation.name}</h3>
                            </div>

                            {selectedLocation.description && <p className="text-xs md:text-sm text-slate-600 line-clamp-2 leading-relaxed">{selectedLocation.description}</p>}

                            {selectedLocation.facilities && selectedLocation.facilities.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-0.5">
                                    {selectedLocation.facilities.map((facility, index) => (
                                        <span key={index} className="px-1.5 py-1.5 bg-primary-dark text-white rounded text-xs font-medium border border-slate-200/60 leading-none">
                                            {facility}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="pt-2 mt-auto border-t border-slate-100 flex justify-end">
                                {/* 🟢 เปลี่ยนปุ่มเดิมเป็น <a> tag ธรรมดา เพื่อแก้บัคของ Vite คราวนี้วิ่งไปหน้าดีเทลได้ฉลุย ไม่มีวันพังแน่นอนครับ */}
                                <a href={`/app/location/${selectedLocation.id}`} className="flex items-center justify-center gap-1.5 w-full md:w-auto px-3 py-2 md:py-2.5 bg-primary hover:bg-primary-dark text-white text-xs md:text-sm font-bold rounded-xl transition-all active:scale-95 shadow-sm text-center">
                                    ดูรายละเอียดทั้งหมด <ArrowRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <MapSidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} filteredLocations={filteredLocations} selectedLocation={selectedLocation} onSelectLocation={handleSelectLocation} />
            <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
        </div>
    );
}
