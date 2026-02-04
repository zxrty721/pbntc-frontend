"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation"; // ✅ เพิ่ม import นี้
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapPin, X, Building2, ArrowRight, Search, List, Menu, Maximize, Minimize } from "lucide-react";
import Link from "next/link";

import { locations } from "../../data/locations";
import { teachersData } from "../../data/teachers";
import type { MapLocation } from "../../types";

export default function Map() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams(); // ✅ เรียกใช้ hook อ่านค่า URL

    const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // UI States
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // 📱 Check Mobile
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

    // 🔗 ✅ Effect: ตรวจสอบ URL เพื่อ Auto-Select อาคาร
    useEffect(() => {
        const locationId = searchParams.get("location"); // อ่านค่า ?location=...
        if (locationId) {
            const targetLoc = locations.find(l => l.id.toString() === locationId);
            if (targetLoc) {
                setSelectedLocation(targetLoc);
                // ถ้าเป็นมือถือ ให้ปิด Sidebar เพื่อไม่ให้บัง
                if (window.innerWidth < 768) {
                    setIsSidebarOpen(false);
                }
            }
        }
    }, [searchParams]);

    // 🖥️ Fullscreen Logic
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            mapContainerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
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

    // 🟢 Logic ค้นหาและกรอง
    const filteredLocations = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return locations;

        return locations.filter(loc => {
            const matchBuilding =
                loc.name.toLowerCase().includes(term) ||
                loc.code.toLowerCase().includes(term) ||
                loc.description?.toLowerCase().includes(term) ||
                loc.facilities?.some(f => f.toLowerCase().includes(term));

            const teachersInLoc = Object.values(teachersData).filter(t => {
                if (t.locationIds && Array.isArray(t.locationIds)) {
                    return t.locationIds.includes(loc.id);
                }
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

    return (
        <div
            ref={mapContainerRef}
            className={`
                relative w-full overflow-hidden flex bg-sky-200 dark:bg-sky-200 transition-all duration-300
                ${isFullscreen ? 'h-screen w-screen fixed inset-0 z-9999' : 'h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]'}
            `}
        >

            {/* =========================================
               🎛️ TOP CONTROLS (Floating)
               ========================================= */}

            {/* 1. Menu Toggle Button (Top Left) */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`
                    absolute top-4 left-4 z-40
                    h-12 w-12 md:h-14 md:w-14 flex items-center justify-center
                    bg-white dark:bg-slate-900 text-slate-700 dark:text-white
                    rounded-2xl shadow-lg border border-white/50 dark:border-slate-700
                    hover:bg-purple-50 hover:text-purple-600 transition-all
                    ${isSidebarOpen ? 'bg-purple-600 text-white dark:bg-purple-600' : ''}
                `}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* 2. Fullscreen Toggle Button (Top Right) */}
            <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-40 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center bg-white dark:bg-slate-900 text-slate-700 dark:text-white rounded-2xl shadow-lg border border-white/50 dark:border-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-all"
            >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>

            {/* 3. Search Bar (CENTERED) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-[65%] md:max-w-md pointer-events-none">
                <div className="relative pointer-events-auto shadow-2xl shadow-sky-900/10 dark:shadow-black/50 rounded-2xl">
                    <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={20} className="md:w-6 md:h-6" />
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหาอาคาร, ห้องเรียน หรือชื่อครู"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 md:h-14 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md text-slate-800 dark:text-white border-none rounded-2xl pl-10 md:pl-12 pr-10 focus:ring-2 focus:ring-purple-500 shadow-sm transition-all text-sm md:text-base font-medium placeholder:text-slate-400 placeholder:opacity-70"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 hover:text-red-500 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* =========================================
               🎛️ SIDEBAR (FILTER LIST)
               ========================================= */}
            <div
                className={`
                    absolute top-20 bottom-4 left-4 z-20
                    flex flex-col
                    w-[calc(100vw-32px)] md:w-72
                    bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                    border border-white/50 dark:border-slate-800 shadow-2xl rounded-2xl
                    transition-all duration-300 ease-out origin-top-left
                    ${isSidebarOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold">
                        <List className="text-purple-600" size={20} />
                        <span>รายชื่ออาคาร ({filteredLocations.length})</span>
                    </div>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {filteredLocations.length > 0 ? (
                        filteredLocations
                            .sort((a, b) => a.code.localeCompare(b.code))
                            .map((loc) => {
                                const isActive = selectedLocation?.id === loc.id;
                                return (
                                    <button
                                        key={loc.id}
                                        onClick={() => handleSelectLocation(loc)}
                                        className={`
                                            w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group
                                            ${isActive
                                                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                                                : 'bg-transparent hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'}
                                        `}
                                    >
                                        <div className={`
                                            w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs
                                            ${isActive
                                                ? 'bg-white/20 text-white'
                                                : 'bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-slate-400'}
                                        `}>
                                            {loc.code}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-sm truncate">{loc.name}</div>
                                        </div>
                                    </button>
                                );
                            })
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
                            ไม่พบข้อมูล
                        </div>
                    )}
                </div>
            </div>

            {/* =========================================
               🗺️ MAP AREA
               ========================================= */}
            <div className="flex-1 w-full h-full">
                <TransformWrapper
                    initialScale={1}
                    minScale={0.5}
                    maxScale={4}
                    centerOnInit
                    wheel={{ step: 0.1 }}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            {/* Zoom Controls (Bottom Right) */}
                            <div className="absolute bottom-24 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 z-10">
                                <button onClick={() => zoomIn()} className="p-2 md:p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg hover:bg-slate-50 active:scale-95 border border-slate-100 dark:border-slate-700">+</button>
                                <button onClick={() => zoomOut()} className="p-2 md:p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg hover:bg-slate-50 active:scale-95 border border-slate-100 dark:border-slate-700">-</button>
                                <button onClick={() => { resetTransform(); setSearchTerm(""); setSelectedLocation(null); }} className="px-2 py-1.5 md:px-3 md:py-2 bg-purple-600 text-white text-[10px] md:text-xs font-bold rounded-xl shadow-lg hover:bg-purple-700 active:scale-95">Reset</button>
                            </div>

                            <TransformComponent
                                wrapperStyle={{ width: "100%", height: "100%" }}
                                contentStyle={{ width: "100%", height: "100%" }}
                            >
                                <div
                                    className="relative w-full h-full flex items-center justify-center bg-sky-200 dark:bg-sky-200"
                                    onClick={() => setSelectedLocation(null)}
                                >
                                    <div className="relative w-full md:w-375 max-w-none" onClick={(e) => e.stopPropagation()}>
                                        <img
                                            src="/map.jpeg"
                                            alt="College Map"
                                            className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 ${(searchTerm || selectedLocation) ? 'grayscale-[0.8] opacity-50' : ''}`}
                                        />

                                        {/* 📍 PINS */}
                                        {locations.map((loc) => {
                                            const isMatch = matchedIds.has(loc.id);
                                            const isSearching = searchTerm.length > 0;
                                            const isSelected = selectedLocation?.id === loc.id;

                                            const opacityClass = isSearching && !isMatch ? 'opacity-20 blur-[1px]' : 'opacity-100';
                                            const zIndex = (isSearching && isMatch) || isSelected ? 'z-50' : 'z-20 hover:z-40';
                                            const isHighlighted = isSelected || (isSearching && isMatch);

                                            // 📏 Dynamic Size for Mobile/Desktop
                                            const pinSize = isMobile
                                                ? (isHighlighted ? 20 : 14)
                                                : (isHighlighted ? 36 : 28);

                                            return (
                                                <button
                                                    key={loc.id}
                                                    className={`
                                                        absolute -translate-x-1/2 -translate-y-full focus:outline-none transition-all duration-300 ease-in-out group
                                                        ${zIndex} ${opacityClass}
                                                    `}
                                                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSelectLocation(loc);
                                                    }}
                                                >
                                                    <div className={`
                                                        relative flex items-center justify-center transition-transform duration-300
                                                        ${isHighlighted ? '-translate-y-1 scale-110' : 'group-hover:-translate-y-1 group-hover:scale-105'}
                                                    `}>
                                                        {/* MapPin */}
                                                        <MapPin
                                                            size={pinSize}
                                                            strokeWidth={isMobile ? 2.5 : 2}
                                                            className={`
                                                                stroke-white drop-shadow-md
                                                                ${isHighlighted
                                                                    ? 'text-amber-500 fill-amber-500'
                                                                    : 'text-purple-600 fill-purple-600'}
                                                            `}
                                                        />

                                                        {/* Label (เลขตึก) */}
                                                        <span className={`
                                                            absolute top-full mt-0.5 px-1 py-0.5 
                                                            bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700
                                                            text-slate-900 dark:text-white 
                                                            rounded-md shadow-sm whitespace-nowrap 
                                                            transition-all duration-200 pointer-events-none origin-top
                                                            ${isMobile ? 'text-[7px] leading-none px-1 py-0' : 'text-[10px] md:text-xs font-bold'}
                                                        `}>
                                                            {isHighlighted ? (
                                                                <span>{loc.name}</span>
                                                            ) : (
                                                                <>
                                                                    <span className="block group-hover:hidden font-mono">{loc.code}</span>
                                                                    <span className="hidden group-hover:block">{loc.name}</span>
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>

            {/* =========================================
               📝 POPUP DETAIL
               ========================================= */}
            {selectedLocation && (
                <>
                    {/* Mobile Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden animate-in fade-in"
                        onClick={() => setSelectedLocation(null)}
                    ></div>

                    <div className="
                        fixed bottom-0 left-0 right-0 z-50 
                        bg-white dark:bg-slate-900 
                        rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.2)] 
                        animate-in slide-in-from-bottom-full duration-300
                        md:absolute md:top-20 md:left-auto md:right-6 md:bottom-auto md:w-96 md:rounded-2xl md:shadow-2xl md:border md:border-slate-200 md:dark:border-slate-800
                    ">
                        {/* Drag Handle for Mobile */}
                        <div className="w-full flex justify-center pt-3 pb-1 md:hidden" onClick={() => setSelectedLocation(null)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                        </div>

                        <div className="h-32 md:h-40 bg-slate-200 dark:bg-slate-800 relative group overflow-hidden md:rounded-t-2xl">
                            {selectedLocation.images && selectedLocation.images.length > 0 ? (
                                <img
                                    src={`https://zone.pbntc.site/${selectedLocation.images[0]}`}
                                    alt={selectedLocation.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.currentTarget.style.display = 'none'}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                    <Building2 size={32} className="mb-2 opacity-50" />
                                    <span className="text-[10px]">ไม่มีรูปภาพ</span>
                                </div>
                            )}

                            <button
                                onClick={() => setSelectedLocation(null)}
                                className="absolute top-2 right-2 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all"
                            >
                                <X size={16} />
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                                <span className="inline-block px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-1">
                                    {selectedLocation.code}
                                </span>
                                <h3 className="text-lg md:text-xl font-bold text-white leading-tight line-clamp-1">
                                    {selectedLocation.name}
                                </h3>
                            </div>
                        </div>

                        <div className="p-5 max-h-[50vh] md:max-h-[60vh] overflow-y-auto custom-scrollbar">
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                                {selectedLocation.description || "ไม่มีรายละเอียดสังเขป"}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {selectedLocation.facilities?.slice(0, 3).map((fac, i) => (
                                    <span key={i} className="text-[10px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
                                        {fac}
                                    </span>
                                ))}
                                {selectedLocation.facilities && selectedLocation.facilities.length > 3 && (
                                    <span className="text-[10px] px-2 py-1 text-slate-400">+{selectedLocation.facilities.length - 3}</span>
                                )}
                            </div>

                            <Link
                                href={`/map/${selectedLocation.id}`}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-purple-600/30 active:scale-[0.98]"
                            >
                                ดูรายละเอียดเพิ่มเติม <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}