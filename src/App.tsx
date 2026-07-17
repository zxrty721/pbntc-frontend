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
                            {/* 🎛️ MAP CONTROLS: ปรับดีไซน์ใหม่ให้คลีนและขนาดพอดีกับมือถือ */}
                            <div className="absolute bottom-4 right-3 md:bottom-8 md:right-8 flex flex-col gap-2 md:gap-3 z-20">
                                {/* กลุ่มปุ่ม Zoom In/Out */}
                                <div className="flex flex-col bg-white rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
                                    <button onClick={() => zoomIn()} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-50 font-medium transition-colors border-b border-slate-100 active:bg-slate-100">
                                        <span className="text-lg md:text-xl leading-none">+</span>
                                    </button>
                                    <button onClick={() => zoomOut()} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-50 font-medium transition-colors active:bg-slate-100">
                                        <span className="text-xl md:text-2xl leading-none">-</span>
                                    </button>
                                </div>

                                {/* ปุ่ม Reset */}
                                <button
                                    onClick={() => {
                                        resetTransform();
                                        handleBackgroundClick();
                                    }}
                                    className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-primary-dark text-white hover:bg-primary text-[9px] md:text-[11px] font-bold rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] active:scale-95 transition-all tracking-wider"
                                >
                                    RESET
                                </button>

                                {/* ปุ่ม Fullscreen */}
                                <button onClick={toggleFullscreen} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-white text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] border border-slate-200 transition-colors active:scale-95">
                                    {isFullscreen ? <Minimize size={16} className="md:w-5 md:h-5" /> : <Maximize size={16} className="md:w-5 md:h-5" />}
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
                    {/* 🌑 พื้นหลังทึบสำหรับมือถือ */}
                    <div className="fixed inset-0 z-30 md:hidden transition-opacity duration-300 backdrop-blur-sm" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }} onClick={() => setSelectedLocation(null)}></div>

                    {/* 📋 กล่องรายละเอียด (Responsive) */}
                    <div
                        className="fixed z-40 bg-surface overflow-y-auto custom-scrollbar transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in border border-slate-200
                                                /* 📱 มือถือ: เป็น Floating Card มี Margin รอบด้าน (bottom-4, left-4, right-4) */
                                                bottom-4 left-4 right-4 rounded-3xl max-h-[calc(100dvh-130px)] slide-in-from-bottom-8
                                                /* 💻 คอมพิวเตอร์: การ์ดลอยมุมขวาบน */
                                                md:bottom-auto md:top-32 md:right-8 md:left-auto md:w-95 md:rounded-2xl md:max-h-[calc(100vh-140px)] md:slide-in-from-right-8"
                    >
                        {/* 🖼️ ส่วนหัว: รูปภาพและ Overlay (ปลดล็อคให้เลื่อนไปพร้อมกับเนื้อหา) */}
                        <div className="h-56 sm:h-64 md:h-56 bg-slate-200 relative w-full">
                            {selectedLocation.images?.[0] ? (
                                <>
                                    <img src={`https://zone.pbntc.site/${selectedLocation.images[0]}`} alt={selectedLocation.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                    <Building2 size={48} className="opacity-40" />
                                </div>
                            )}

                            {/* ❌ ปุ่มปิด */}
                            <button onClick={() => setSelectedLocation(null)} className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors shadow-lg active:scale-95 z-10">
                                <X size={18} strokeWidth={2.5} />
                            </button>

                            {/* 📌 ชื่อและรหัสอาคาร (ทับบนรูป) */}
                            <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                                <span className="inline-block px-2.5 py-1 bg-secondary text-primary-dark text-xs font-extrabold uppercase tracking-widest rounded-md mb-2 shadow-sm">{selectedLocation.code}</span>
                                <h3 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-md">{selectedLocation.name}</h3>
                            </div>
                        </div>

                        {/* 📝 ส่วนเนื้อหา */}
                        <div className="p-5 md:p-6 space-y-5 bg-surface">
                            {selectedLocation.description && <p className="text-sm text-slate-600 leading-relaxed">{selectedLocation.description}</p>}

                            {selectedLocation.facilities && selectedLocation.facilities.length > 0 && (
                                <div className="space-y-2.5">
                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        สิ่งอำนวยความสะดวก <div className="h-px bg-slate-200 flex-1"></div>
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLocation.facilities.map((facility, index) => (
                                            <span key={index} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200/60">
                                                {facility}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-2 pb-2">
                                <a href={`/app/location/${selectedLocation.id}`} className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] active:scale-[0.98]">
                                    ดูรายละเอียดทั้งหมด <ArrowRight size={18} />
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
