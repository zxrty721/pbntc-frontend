"use client";

import { Building2, Search, X } from "lucide-react";
import type { MapLocation } from "../../types";

interface MapSidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    filteredLocations: MapLocation[];
    selectedLocation: MapLocation | null;
    onSelectLocation: (loc: MapLocation) => void;
}

export default function MapSidebar({
    isSidebarOpen,
    setSidebarOpen,
    filteredLocations,
    selectedLocation,
    onSelectLocation
}: MapSidebarProps) {
    return (
        <div
            className={`
                absolute z-30 flex flex-col
                bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
                border-slate-200 dark:border-slate-700 shadow-2xl
                transition-all duration-500 cubic-bezier(0.32, 0.72, 0, 1)
                
                bottom-0 left-0 right-0 
                rounded-t-3xl border-t
                max-h-[55vh]
                ${isSidebarOpen ? 'translate-y-0' : 'translate-y-full opacity-0 pointer-events-none'}

                md:top-24 md:bottom-6 md:left-4 md:right-auto 
                md:w-80 md:rounded-2xl md:border md:max-h-none md:translate-y-0
                ${isSidebarOpen ? 'md:translate-x-0 md:opacity-100' : 'md:-translate-x-[120%] md:opacity-0 md:pointer-events-none'}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2.5 text-slate-800 dark:text-white font-bold">
                    <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Building2 className="text-amber-600 dark:text-amber-500" size={20} />
                    </div>
                    <span className="text-base">รายชื่ออาคาร ({filteredLocations.length})</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                >
                    <X size={24} />
                </button>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 min-h-0">
                {filteredLocations.length > 0 ? (
                    // ✅ แก้ไขตรงนี้: ใส่ [... ] ครอบเพื่อ Clone array ก่อน Sort
                    [...filteredLocations]
                        .sort((a, b) => a.code.localeCompare(b.code))
                        .map((loc) => {
                            const isActive = selectedLocation?.id === loc.id;
                            return (
                                <button
                                    key={loc.id}
                                    onClick={() => onSelectLocation(loc)}
                                    className={`
                                        w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group border
                                        ${isActive
                                            ? 'bg-amber-500 text-white border-amber-500 shadow-md translate-x-1'
                                            : 'bg-white dark:bg-slate-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}
                                    `}
                                >
                                    <div className={`
                                        w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs shadow-sm
                                        ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:text-amber-600'}
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
                    <div className="flex flex-col items-center justify-center h-40 text-slate-400 space-y-3 opacity-70">
                        <Search size={36} className="stroke-1" />
                        <span className="text-sm font-medium">ไม่พบข้อมูล</span>
                    </div>
                )}
            </div>
        </div>
    );
}