"use client";

import {
    Menu, Search, Moon, Sun, Phone, Mail, Facebook, Globe,
    User, Building2, BookOpen, FileText, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUI } from "../../contexts/UIContext";

// Import Data
import { teachersData } from "../../data/teachers";
import { locations } from "../../data/locations";
import { DEPARTMENTS } from "../../data/departments";

type SearchResult = {
    id: string;
    type: "teacher" | "location" | "department" | "page";
    title: string;
    subtitle?: string;
    url: string;
};

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { toggleSidebar } = useUI();

    // Search States
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (text: string) => {
        setQuery(text);
        if (text.length < 2) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const lowerText = text.toLowerCase();
        const searchResults: SearchResult[] = [];

        // 1. Pages
        const pages = [
            { title: "หน้าหลัก", url: "/" },
            { title: "แผนที่วิทยาลัย", url: "/map" },
            { title: "บุคลากร", url: "/teachers" },
            { title: "ติดต่อเรา", url: "/contact" },
            { title: "เกี่ยวกับผู้จัดทำ", url: "/about" },
        ];
        pages.forEach(p => {
            if (p.title.includes(text)) {
                searchResults.push({ id: p.url, type: "page", title: p.title, url: p.url });
            }
        });

        // 2. Locations
        locations.forEach(loc => {
            if (loc.name.toLowerCase().includes(lowerText) || loc.code.toLowerCase().includes(lowerText)) {
                searchResults.push({
                    id: `loc-${loc.id}`,
                    type: "location",
                    title: loc.name,
                    subtitle: `อาคาร ${loc.code}`,
                    url: `/map?location=${loc.id}`
                });
            }
        });

        // 3. Teachers
        Object.values(teachersData).forEach(teacher => {
            if (teacher.name.toLowerCase().includes(lowerText)) {
                searchResults.push({
                    id: teacher.id,
                    type: "teacher",
                    title: teacher.name,
                    subtitle: teacher.position,
                    url: `/teachers`
                });
            }
        });

        // 4. Departments
        Object.entries(DEPARTMENTS).forEach(([key, name]) => {
            if (name.toLowerCase().includes(lowerText)) {
                searchResults.push({
                    id: key,
                    type: "department",
                    title: name,
                    url: `/teachers`
                });
            }
        });

        setResults(searchResults.slice(0, 8));
        setShowDropdown(true);
    };

    const handleSelectResult = (url: string) => {
        router.push(url);
        setShowDropdown(false);
        setQuery("");
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "teacher": return <User size={16} className="text-purple-600" />;
            case "location": return <Building2 size={16} className="text-blue-600" />;
            case "department": return <BookOpen size={16} className="text-emerald-600" />;
            default: return <FileText size={16} className="text-slate-500" />;
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-md">

            {/* TOP BAR */}
            <div className="w-full bg-[#2e1065] text-white text-[11px] md:text-xs py-2 px-4 md:px-6 flex justify-between items-center border-b border-purple-900">
                <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
                    <span className="flex items-center gap-2 whitespace-nowrap opacity-90 hover:opacity-100 cursor-default">
                        <Phone size={12} className="text-amber-400" /> 056-711455
                    </span>
                    <span className="flex items-center gap-2 whitespace-nowrap opacity-90 hover:opacity-100 cursor-default">
                        <Mail size={12} className="text-amber-400" /> pbntc212@pbntc.ac.th
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <a href="#" className="hover:text-amber-400 transition-colors">สำหรับนักศึกษา</a>
                    <a href="#" className="hover:text-amber-400 transition-colors">สำหรับบุคลากร</a>
                    <div className="h-3 w-px bg-purple-700"></div>
                    <div className="flex gap-3">
                        <a href="#" className="opacity-80 hover:opacity-100 hover:text-blue-400"><Facebook size={14} /></a>
                        <a href="#" className="opacity-80 hover:opacity-100 hover:text-green-400"><Globe size={14} /></a>
                    </div>
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 h-16 md:h-20 transition-all">
                <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">

                    {/* Left: Toggle & Logo */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <Link href="/" className="flex items-center gap-3 group">
                            {/* ✅ LOGO ใหม่: ใช้ img tag ดึงจากลิงก์โดยตรง */}
                            <img
                                src="https://img.pbntc.site/og-pbntc.svg"
                                alt="PBNTC Logo"
                                className="h-10 md:h-12 w-auto drop-shadow-sm transition-transform group-hover:scale-105"
                            />

                            <div className="flex flex-col">
                                <h1 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white leading-none tracking-tight group-hover:text-purple-700 dark:group-hover:text-amber-400 transition-colors">
                                    PBNTC <span className="text-purple-700 dark:text-purple-400">Map</span>
                                </h1>
                                <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 tracking-wide">
                                    วิทยาลัยเทคนิคเพชรบูรณ์
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Center: Global Search */}
                    <div className="hidden lg:flex flex-1 max-w-xl px-8 relative" ref={searchRef}>
                        <div className="relative w-full group">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => query.length >= 2 && setShowDropdown(true)}
                                placeholder="ค้นหาทุกอย่าง... (เช่น ชื่อครู, ตึก, แผนก)"
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600 transition-all shadow-sm"
                            />
                            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4 group-focus-within:text-purple-600 transition-colors" />
                        </div>

                        {/* Search Dropdown Results */}
                        {showDropdown && results.length > 0 && (
                            <div className="absolute top-full left-8 right-8 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                <div className="py-2">
                                    <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">ผลการค้นหา</p>
                                    {results.map((result) => (
                                        <button
                                            key={result.id}
                                            onClick={() => handleSelectResult(result.url)}
                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/50 last:border-none group"
                                        >
                                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                                                {getTypeIcon(result.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                    {result.title}
                                                </p>
                                                {result.subtitle && (
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                                        {result.subtitle}
                                                    </p>
                                                )}
                                            </div>
                                            <ChevronRight size={14} className="text-slate-300 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-all"
                        >
                            {mounted && theme === "dark" ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-purple-700" />}
                        </button>

                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden md:block"></div>

                        <Link href="/contact" className="hidden md:flex items-center gap-2 bg-[#2e1065] hover:bg-purple-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95">
                            <Mail size={16} /> ติดต่อเรา
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}