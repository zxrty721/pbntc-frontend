"use client";

import {
    Menu, Moon, Sun, Phone, Mail, Facebook, Globe,
    Home, Map, Users, UserSquare2, Contact, X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    // รายการเมนู (รวมจาก Sidebar เดิม)
    const menuItems = [
        { icon: Home, label: "หน้าหลัก", href: "/" },
        { icon: Map, label: "แผนที่/ตึก", href: "/map" },
        { icon: UserSquare2, label: "บุคลากร", href: "/teachers" },
        { icon: Users, label: "ผู้จัดทำ", href: "/about" },
        { icon: Contact, label: "ติดต่อเรา", href: "/contact" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 shadow-md">

                {/* ✅ TOP BAR (นำกลับมาครบถ้วน) */}
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
                        <a target="_blank" href="https://www.facebook.com/pbntc212" className="opacity-80 hover:opacity-100 hover:text-blue-400 transition-colors">
                            <Facebook size={14} />
                        </a>
                        <a target="_blank" href="https://pbntc.ac.th/" className="opacity-80 hover:opacity-100 hover:text-green-400 transition-colors">
                            <Globe size={14} />
                        </a>
                    </div>
                </div>

                {/* MAIN NAVBAR */}
                <div className="w-full bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 h-16 md:h-20 transition-all">
                    <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">

                        {/* Logo Section */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <Link href="/" className="flex items-center gap-3 group">
                                <img
                                    src="https://img.pbntc.site/og-pbntc.svg"
                                    alt="PBNTC Logo"
                                    className="h-10 md:h-12 w-auto drop-shadow-sm transition-transform group-hover:scale-105"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white leading-none tracking-tight group-hover:text-purple-700 dark:group-hover:text-amber-400 transition-colors">
                                        PBNTC <span className="text-purple-700 dark:text-purple-400">Map</span>
                                    </h1>
                                    <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 tracking-wide hidden sm:block">
                                        วิทยาลัยเทคนิคเพชรบูรณ์
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* ✅ CENTER MENU (แสดงเฉพาะ Desktop) */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {menuItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`
                                            px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                                            ${isActive
                                                ? "text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300"
                                                : "text-slate-600 dark:text-slate-400 hover:text-purple-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            }
                                        `}
                                    >
                                        <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-full transition-all"
                            >
                                {mounted && theme === "dark" ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-purple-700" />}
                            </button>

                            {/* Mobile Menu Button (Hamburger) */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ✅ MOBILE MENU DRAWER (แสดงเฉพาะ Mobile เมื่อกดปุ่ม) */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-slate-900 shadow-xl p-4 flex flex-col pt-24 space-y-2 border-l border-slate-200 dark:border-slate-800 animation-slide-in">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">เมนูนำทาง</p>
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-xl transition-colors
                                        ${isActive
                                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-bold"
                                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        }
                                    `}
                                >
                                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}