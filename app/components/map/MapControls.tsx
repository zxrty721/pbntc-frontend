"use client";

import { Search, X, List, ChevronDown, ChevronLeft } from "lucide-react";

interface MapControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function MapControls({
    searchTerm,
    setSearchTerm,
    isSidebarOpen,
    setSidebarOpen,
}: MapControlsProps) {
    return (
        <>
            {/* =======================================
               1. 🔍 SEARCH BAR
               - ใช้ absolute เพื่อให้อยู่ในกรอบ Map เท่านั้น
               - Mobile: ชิดซ้าย เว้นที่ขวาให้ปุ่ม Toggle
               - Desktop: อยู่ตรงกลาง
               ======================================= */}
            <div className={`
                absolute top-4 z-20 transition-all duration-300
                /* 📱 Mobile: ชิดซ้าย-ขวา (เว้นปุ่มขวา) */
                left-4 right-16
                /* 💻 Desktop: ตรงกลาง กว้างจำกัด */
                md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[90%] md:max-w-xl
            `}>
                <div className="relative shadow-lg shadow-slate-900/10 dark:shadow-black/40 rounded-2xl group h-12 md:h-14">
                    <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-700"></div>
                    <div className="relative flex items-center h-full px-3 md:px-4">
                        <Search size={20} className="text-slate-400 shrink-0 group-focus-within:text-amber-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="ค้นหาอาคารและชื่อครูหรือตำแหน่งงาน"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            // เมื่อเริ่มพิมพ์ ให้เปิด Sidebar อัตโนมัติ
                            onFocus={() => setSidebarOpen(true)}
                            className="w-full h-full bg-transparent text-slate-800 dark:text-white border-none focus:ring-0 focus:outline-none pl-2 md:pl-3 pr-8 text-sm md:text-base font-medium placeholder:text-slate-400/80"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-red-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* =======================================
               2. 🎛️ TOGGLE BUTTON
               - Mobile: ขวาบน
               - Desktop: ซ้ายบน
               ======================================= */}
            <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className={`
                    absolute top-4 z-20
                    h-12 w-12 md:h-14 md:w-14 flex items-center justify-center
                    rounded-xl shadow-lg border transition-all duration-300 active:scale-95
                    /* 📱 Mobile: ขวา */
                    right-4
                    /* 💻 Desktop: ซ้าย */
                    md:left-4 md:right-auto
                    ${isSidebarOpen
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50'}
                `}
                title="Toggle List"
            >
                {isSidebarOpen ? (
                    <div className="flex">
                        <ChevronDown className="block md:hidden" size={24} /> {/* Mobile: Icon ลง */}
                        <ChevronLeft className="hidden md:block" size={24} /> {/* Desktop: Icon ซ้าย */}
                    </div>
                ) : (
                    <List size={24} />
                )}
            </button>
        </>
    );
}