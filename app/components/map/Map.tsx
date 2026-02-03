"use client";

import { useState, useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapPin, X, Building2, ArrowRight, Search, User } from "lucide-react";
import Link from "next/link";

import { locations } from "../../data/locations";
import { teachersData } from "../../data/teachers";
import type { MapLocation } from "../../types";

export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // 🟢 Logic ค้นหา
    const matchedLocationIds = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return new Set(locations.map(l => l.id));

        const matched = new Set<string | number>();
        locations.forEach(loc => {
            let isMatch = false;

            // 1. ค้นหาจากข้อมูลตึก
            if (
                loc.name.toLowerCase().includes(term) ||
                loc.code.toLowerCase().includes(term) ||
                loc.description?.toLowerCase().includes(term) ||
                loc.facilities?.some(f => f.toLowerCase().includes(term))
            ) {
                isMatch = true;
            }

            // 2. ค้นหาจาก "ชื่อครู"
            if (!isMatch) {
                const teachersInLoc = Object.values(teachersData).filter(t => {
                    // รองรับทั้งแบบ Array และแบบเดี่ยว
                    if (t.locationIds && Array.isArray(t.locationIds)) {
                        return t.locationIds.includes(loc.id);
                    }
                    // @ts-ignore
                    return t.locationId === loc.id;
                });

                if (teachersInLoc.some(t => t.name.toLowerCase().includes(term))) {
                    isMatch = true;
                }
            }

            if (isMatch) matched.add(loc.id);
        });
        return matched;
    }, [searchTerm]);

    return (
        <div className="relative w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] bg-slate-100 dark:bg-slate-900 overflow-hidden">

            {/* 🔍 Search Bar */}
            <div className="absolute top-4 left-4 right-4 md:right-auto md:left-6 md:w-80 z-20">
                <div className="relative shadow-xl shadow-slate-300/50 dark:shadow-black/50 rounded-2xl">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหาตึก, ชื่อครู..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md text-slate-800 dark:text-white border-none rounded-2xl py-3 pl-12 pr-10 focus:ring-2 focus:ring-purple-500 shadow-sm transition-all text-sm md:text-base"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-slate-200 dark:bg-slate-700 rounded-full text-slate-500 hover:text-red-500 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* 🗺️ Map Area */}
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit
                wheel={{ step: 0.1 }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        {/* 🎮 ปุ่ม Zoom */}
                        <div className="absolute bottom-32 right-4 md:bottom-6 md:right-6 flex flex-col gap-2 z-10">
                            <button onClick={() => zoomIn()} className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg hover:bg-slate-50 transition-all active:scale-95">+</button>
                            <button onClick={() => zoomOut()} className="p-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-white rounded-xl shadow-lg hover:bg-slate-50 transition-all active:scale-95">-</button>
                            <button onClick={() => { resetTransform(); setSearchTerm(""); }} className="px-3 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all active:scale-95">Reset</button>
                        </div>

                        <TransformComponent
                            wrapperStyle={{ width: "100%", height: "100%" }}
                            contentStyle={{ width: "100%", height: "100%" }}
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-900" onClick={() => setSelectedLocation(null)}>

                                <div className="relative w-full md:w-375 max-w-none" onClick={(e) => e.stopPropagation()}>
                                    <img
                                        src="/map.jpeg"
                                        alt="College Map"
                                        className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 ${searchTerm && 'grayscale-[0.8] opacity-50'}`}
                                    />

                                    {/* 📍 Markers */}
                                    {locations.map((loc) => {
                                        const isMatch = matchedLocationIds.has(loc.id);
                                        const isSearching = searchTerm.length > 0;
                                        const isSelected = selectedLocation?.id === loc.id;

                                        const opacityClass = isSearching && !isMatch ? 'opacity-20 blur-[1px]' : 'opacity-100';
                                        const zIndex = (isSearching && isMatch) || isSelected ? 'z-50' : 'z-20 hover:z-40';

                                        return (
                                            <button
                                                key={loc.id}
                                                // ✅ Group: Hover Effect เฉพาะปุ่มนี้
                                                className={`
                                                    absolute -translate-x-1/2 -translate-y-full focus:outline-none transition-all duration-300 ease-in-out group
                                                    ${zIndex} ${opacityClass}
                                                `}
                                                style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedLocation(loc);
                                                }}
                                            >
                                                <div className={`
                                                    relative flex items-center justify-center transition-transform duration-300
                                                    ${isSelected || (isSearching && isMatch) ? '-translate-y-2 scale-110' : 'group-hover:-translate-y-1 group-hover:scale-105'}
                                                `}>
                                                    {/* 📍 หมุด */}
                                                    <MapPin
                                                        size={isSelected || (isSearching && isMatch) ? 36 : 28}
                                                        className={`
                                                            stroke-white stroke-[2px] drop-shadow-md
                                                            ${isSelected || (isSearching && isMatch)
                                                                ? 'text-amber-500 fill-amber-500'
                                                                : 'text-purple-600 fill-purple-600'}
                                                        `}
                                                    />

                                                    {/* 🏷️ ป้ายข้อความ */}
                                                    <span className={`
                                                        absolute top-full mt-0.5 px-2 py-0.5 
                                                        bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700
                                                        text-slate-900 dark:text-white 
                                                        text-[10px] md:text-xs font-bold 
                                                        rounded-md shadow-sm whitespace-nowrap 
                                                        transition-all duration-200 pointer-events-none origin-top
                                                    `}>
                                                        {(isSearching && isMatch) || isSelected ? (
                                                            // โชว์ชื่อตึก (Search / Select)
                                                            <span>{loc.name}</span>
                                                        ) : (
                                                            <>
                                                                {/* ปกติ: เลขตึก */}
                                                                <span className="block group-hover:hidden font-mono text-[9px] md:text-[10px]">{loc.code}</span>
                                                                {/* Hover: ชื่อตึก */}
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

            {/* 📝 Popup Detail */}
            {selectedLocation && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 z-30 md:hidden animate-in fade-in"
                        onClick={() => setSelectedLocation(null)}
                    ></div>

                    <div className="
                        fixed bottom-0 left-0 right-0 z-40 
                        bg-white dark:bg-slate-900 
                        rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.2)] 
                        animate-in slide-in-from-bottom-full duration-300
                        md:absolute md:top-20 md:left-6 md:right-auto md:bottom-auto md:w-96 md:rounded-2xl md:shadow-2xl md:border md:border-slate-200 md:dark:border-slate-800
                    ">
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
                                className="hidden md:block absolute top-3 right-3 p-1.5 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-all"
                            >
                                <X size={18} />
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                                <span className="inline-block px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-1">
                                    Code: {selectedLocation.code}
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

                            {/* ✅ Link: แก้ให้ชี้ไปที่ /map/[id] โดยตรง */}
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