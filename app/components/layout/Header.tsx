"use client";

import {
    Menu, Moon, Sun, Phone, Mail, Facebook, Globe
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useUI } from "../../contexts/UIContext";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { toggleSidebar } = useUI();

    useEffect(() => setMounted(true), []);

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

                {/* Right Side Socials */}
                <div className="hidden md:flex items-center gap-3">
                    <a target="_blank" href="https://www.facebook.com/pbntc212" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors"><Facebook size={14} /></a>
                    <a target="_blank" href="https://pbntc.ac.th/" className="opacity-80 hover:opacity-100 hover:text-green-400 transition-colors"><Globe size={14} /></a>
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
                            {/* ✅ LOGO */}
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