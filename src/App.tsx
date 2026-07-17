import { useState, useMemo, useRef, useEffect, useDeferredValue } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X, Building2, ArrowRight, Maximize, Minimize } from "lucide-react";

import Header from "./components/layout/Header";
import MapSidebar from "./components/map/MapSidebar";
import MapVisual from "./components/map/MapVisual";
import TeacherModal from "./components/ui/TeacherModal";
import { locations } from "./assets/data/locations";
import { teachersData } from "./assets/data/teachers"; // 🚀 1. Import ข้อมูลอาจารย์เข้ามาใช้งาน
import type { MapLocation, Teacher } from "./assets/types";

export default function App() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const deferredSearch = useDeferredValue(searchTerm);

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

    const isDimmed = !!(deferredSearch || selectedLocation);

    /* 🚀 1. เตรียม Index สำหรับค้นหา (แก้ไข: จับคู่เฉพาะ loc.id เพื่อป้องกันการเขียนทับกันของตึก!) */
    const { teacherSearchIndex, locationLookup } = useMemo(() => {
        const teacherList = Object.values(teachersData) as Teacher[];
        const locMap = new Map<string, MapLocation>();

        // 🌟 แก้ไขจุดนี้: Map เฉพาะ "id" ของตึกเท่านั้น ห้ามใส่ code เข้ามา
        // เพื่อป้องกันไม่ให้อาคารที่รหัสซ้ำกับ ID ไปทับข้อมูลกันเอง
        locations.forEach((loc) => {
            if (loc.id !== undefined && loc.id !== null) {
                locMap.set(String(loc.id).trim().toLowerCase(), loc);
            }
        });

        const tIndex = teacherList.map((t) => ({
            ...t,
            cleanLocIds: (t.locationIds || []).map((id) => String(id).trim().toLowerCase()),
            // รวมทุกชื่อ-นามสกุล-ตำแหน่ง สำหรับค้นหา
            searchText: `${t.title || ""} ${t.firstName || ""} ${t.lastName || ""} ${t.name || ""} ${t.position || ""}`.toLowerCase(),
        }));

        return { teacherSearchIndex: tIndex, locationLookup: locMap };
    }, []);

    /* 🚀 2. ระบบค้นหาอัจฉริยะ (ส่งทั้งตึกที่เจอ และ อาจารย์ที่ค้นเจอออกไปแสดงผล) */
    const { filteredLocations, matchedIds, searchedTeachers } = useMemo(() => {
        const term = deferredSearch.toLowerCase().trim();

        if (!term) {
            return {
                filteredLocations: locations,
                matchedIds: new Set<string | number>(),
                searchedTeachers: [] as Teacher[],
            };
        }

        const searchWords = term.split(/\s+/).filter(Boolean);
        const matchedBuildingIds = new Set<string | number>();
        const matchedLocationsSet = new Set<MapLocation>();

        // 🌟 สเต็ป 1: หาอาจารย์ และเก็บรายชื่ออาจารย์ที่ค้นเจอไว้ด้วย!
        const matchedTeachers = teacherSearchIndex.filter((t) => searchWords.every((word) => t.searchText.includes(word)));

        matchedTeachers.forEach((t) => {
            t.cleanLocIds.forEach((locId) => {
                const targetLoc = locationLookup.get(locId);
                if (targetLoc) {
                    matchedLocationsSet.add(targetLoc);
                    matchedBuildingIds.add(targetLoc.id);
                }
            });
        });

        // สเต็ป 2: หาจากชื่อตึก/รหัสตึกโดยตรง
        locations.forEach((loc) => {
            const fullLocText = `${loc.name || ""} ${loc.code || ""} ${(loc.facilities || []).join(" ")}`.toLowerCase();
            if (searchWords.every((word) => fullLocText.includes(word))) {
                matchedLocationsSet.add(loc);
                matchedBuildingIds.add(loc.id);
            }
        });

        return {
            filteredLocations: Array.from(matchedLocationsSet),
            matchedIds: matchedBuildingIds,
            searchedTeachers: matchedTeachers, // 👈 ส่งรายชื่ออาจารย์ที่ค้นเจอออกไป
        };
    }, [deferredSearch, teacherSearchIndex, locationLookup]);

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
                            <div className="absolute bottom-4 right-3 md:bottom-8 md:right-8 flex flex-col gap-2 md:gap-3 z-20">
                                <div className="flex flex-col bg-white rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
                                    <button onClick={() => zoomIn()} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-50 font-medium transition-colors border-b border-slate-100 active:bg-slate-100">
                                        <span className="text-lg md:text-xl leading-none">+</span>
                                    </button>
                                    <button onClick={() => zoomOut()} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-50 font-medium transition-colors active:bg-slate-100">
                                        <span className="text-xl md:text-2xl leading-none">-</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        resetTransform();
                                        handleBackgroundClick();
                                    }}
                                    className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-primary-dark text-white hover:bg-primary text-[9px] md:text-[11px] font-bold rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] active:scale-95 transition-all tracking-wider"
                                >
                                    RESET
                                </button>

                                <button onClick={toggleFullscreen} className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-white text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] border border-slate-200 transition-colors active:scale-95">
                                    {isFullscreen ? <Minimize size={16} className="md:w-5 md:h-5" /> : <Maximize size={16} className="md:w-5 md:h-5" />}
                                </button>
                            </div>

                            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                                <div className="relative flex items-center justify-center cursor-grab active:cursor-grabbing p-4 md:p-8" style={{ minWidth: "100vw", minHeight: "100vh", width: "max-content", height: "max-content" }} onClick={handleBackgroundClick}>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <MapVisual searchTerm={deferredSearch} selectedLocation={selectedLocation} matchedIds={matchedIds} showPins={showPins} onSelect={handleSelectLocation} isMobile={isMobile} />
                                    </div>
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>

            {selectedLocation && (
                <>
                    <div className="fixed inset-0 z-30 md:hidden transition-opacity duration-300" style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }} onClick={() => setSelectedLocation(null)}></div>

                    <div
                        className="fixed z-40 bg-surface overflow-y-auto custom-scrollbar transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in border border-slate-200
                                                bottom-4 left-4 right-4 rounded-3xl max-h-[calc(100dvh-130px)] slide-in-from-bottom-8
                                                md:bottom-auto md:top-32 md:right-8 md:left-auto md:w-95 md:rounded-2xl md:max-h-[calc(100vh-140px)] md:slide-in-from-right-8"
                    >
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

                            <button onClick={() => setSelectedLocation(null)} className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors shadow-lg active:scale-95 z-10">
                                <X size={18} strokeWidth={2.5} />
                            </button>

                            <div className="absolute bottom-4 left-5 right-5 text-white z-10">
                                <span className="inline-block px-2.5 py-1 bg-secondary text-primary-dark text-xs font-extrabold uppercase tracking-widest rounded-md mb-2 shadow-sm">{selectedLocation.code}</span>
                                <h3 className="text-xl md:text-2xl font-bold leading-tight drop-shadow-md">{selectedLocation.name}</h3>
                            </div>
                        </div>

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

            <MapSidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} filteredLocations={filteredLocations} selectedLocation={selectedLocation} onSelectLocation={handleSelectLocation} searchedTeachers={searchedTeachers} onSelectTeacher={(t) => setSelectedTeacher(t)} />
            <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
        </div>
    );
}
