"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X, Building2, ArrowRight, Maximize, Minimize } from "lucide-react";
import Link from "next/link";

import MapVisual from "../../components/map/MapVisual";
import MapControls from "../../components/map/MapControls";
import MapSidebar from "../../components/map/MapSidebar";

import { locations } from "../../data/locations";
import { teachersData } from "../../data/teachers";
import type { MapLocation } from "../../types";

// ==========================================
// 1️⃣ ส่วนเนื้อหาหลัก (ย้าย Logic มาไว้ในนี้)
// ==========================================
function MapContent() {
    const searchParams = useSearchParams();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const locationId = searchParams.get("location");
        if (locationId) {
            const targetLoc = locations.find(l => l.id.toString() === locationId);
            if (targetLoc) {
                setSelectedLocation(targetLoc);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
            }
        }
    }, [searchParams]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            mapContainerRef.current?.requestFullscreen().catch(err => console.error(err));
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const filteredLocations = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return locations;
        return locations.filter(loc => {
            const matchBuilding = loc.name.toLowerCase().includes(term) || loc.code.toLowerCase().includes(term) || loc.description?.toLowerCase().includes(term) || loc.facilities?.some(f => f.toLowerCase().includes(term));
            const teachersInLoc = Object.values(teachersData).filter(t => {
                if (t.locationIds && Array.isArray(t.locationIds)) return t.locationIds.includes(loc.id);
                // @ts-ignore
                return t.locationId === loc.id;
            });
            const matchTeacher = teachersInLoc.some(t => t.name.toLowerCase().includes(term));
            return matchBuilding || matchTeacher;
        });
    }, [searchTerm]);

    const matchedIds = useMemo(() => new Set(filteredLocations.map(l => l.id)), [filteredLocations]);

    const handleSelectLocation = (loc: MapLocation) => {
        setSelectedLocation(loc);
        if (isMobile) setIsSidebarOpen(false);
    };

    const handleBackgroundClick = () => {
        setSelectedLocation(null);
        setSearchTerm("");
    };

    return (
        <div
            ref={mapContainerRef}
            className={`
                relative w-full overflow-hidden flex bg-slate-100 dark:bg-slate-950 font-sans transition-colors duration-300
                ${isFullscreen ? 'h-screen w-screen fixed inset-0 z-50' : 'h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]'}
            `}
        >
            <MapControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex-1 w-full h-full z-0">
                <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit wheel={{ step: 0.1 }}>
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <div className="absolute bottom-24 right-4 md:bottom-8 md:right-8 flex flex-col gap-2 z-20">
                                <button onClick={() => zoomIn()} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 transition-colors">+</button>
                                <button onClick={() => zoomOut()} className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 transition-colors">-</button>
                                <button onClick={() => { resetTransform(); handleBackgroundClick(); }} className="px-2 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] md:text-xs font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all mt-2">Reset</button>
                                <button onClick={toggleFullscreen} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 mt-1">
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                </button>
                            </div>

                            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                                <div className="relative w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-950" onClick={handleBackgroundClick}>
                                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <MapVisual searchTerm={searchTerm} selectedLocation={selectedLocation} matchedIds={matchedIds} isMobile={isMobile} onSelect={handleSelectLocation} />
                                    </div>
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>

            {selectedLocation && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-30 md:hidden animate-in fade-in" onClick={() => setSelectedLocation(null)}></div>
                    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-full duration-300 md:absolute md:top-24 md:left-auto md:right-8 md:bottom-auto md:w-80 md:rounded-2xl md:shadow-2xl md:border md:border-slate-200 md:dark:border-slate-700">
                        <div className="w-full flex justify-center pt-3 pb-1 md:hidden" onClick={() => setSelectedLocation(null)}><div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div></div>
                        <div className="h-32 md:h-40 bg-slate-200 dark:bg-slate-800 relative group overflow-hidden md:rounded-t-2xl">
                            {selectedLocation.images?.[0] ? (<img src={`https://zone.pbntc.site/${selectedLocation.images[0]}`} alt={selectedLocation.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => e.currentTarget.style.display = 'none'} />) : (<div className="w-full h-full flex flex-col items-center justify-center text-slate-400"><Building2 size={32} className="mb-2 opacity-50" /><span className="text-[10px]">ไม่มีรูปภาพ</span></div>)}
                            <button onClick={() => setSelectedLocation(null)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-all"><X size={16} /></button>
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-slate-900 to-transparent"><span className="inline-block px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold uppercase rounded mb-1 shadow-sm">{selectedLocation.code}</span><h3 className="text-white font-bold leading-tight truncate">{selectedLocation.name}</h3></div>
                        </div>
                        <div className="p-4 max-h-[40vh] md:max-h-[50vh] overflow-y-auto custom-scrollbar">
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed line-clamp-3">{selectedLocation.description || "ไม่มีรายละเอียดสังเขป"}</p>
                            <div className="flex flex-wrap gap-1.5 mb-4">{selectedLocation.facilities?.slice(0, 3).map((fac, i) => (<span key={i} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">{fac}</span>))}</div>
                            <Link href={`/map/${selectedLocation.id}`} className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs md:text-sm font-bold rounded-xl transition-all shadow-lg active:scale-[0.98]">ดูรายละเอียดเพิ่มเติม <ArrowRight size={14} /></Link>
                        </div>
                    </div>
                </>
            )}

            <MapSidebar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setIsSidebarOpen}
                filteredLocations={filteredLocations}
                selectedLocation={selectedLocation}
                onSelectLocation={handleSelectLocation}
            />
        </div>
    );
}

// ==========================================
// 2️⃣ Loading Fallback (หน้าโหลดระหว่างรอ URL)
// ==========================================
function MapLoading() {
    return (
        <div className="w-full h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-3">
            <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="animate-pulse font-medium text-sm text-slate-400">กำลังโหลดแผนที่...</p>
        </div>
    );
}

// ==========================================
// 3️⃣ Main Export (ครอบ Suspense แก้ Error)
// ==========================================
export default function MapPage() {
    return (
        <Suspense fallback={<MapLoading />}>
            <MapContent />
        </Suspense>
    );
}