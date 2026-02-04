"use client";

import { Home, Map, Users, Contact, UserSquare2, LogOut, ChevronRight } from "lucide-react";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "../../contexts/UIContext"; // ✅ เรียกใช้ Context

export default function Sidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, closeSidebar } = useUI(); // ✅ รับสถานะเปิด/ปิด

    const menuItems = [
        { icon: Home, label: "หน้าหลัก", href: "/" },
        { icon: Map, label: "แผนที่/ตึก", href: "/map" },
        { icon: UserSquare2, label: "บุคลากร", href: "/teachers" },
        { icon: Users, label: "ผู้จัดทำ", href: "/about" },
        { icon: Contact, label: "ติดต่อเรา", href: "/contact" },
    ];

    // CSS สำหรับ Sidebar (รองรับ Mobile Drawer)
    const sidebarClasses = `
        fixed top-[104px] md:top-28 left-0 h-[calc(100vh-104px)] md:h-[calc(100vh-112px)] 
        bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        z-40 transition-transform duration-300 ease-in-out
        w-64 lg:w-24 flex flex-col py-6 shadow-xl lg:shadow-none
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `;

    // Backdrop สำหรับ Mobile
    const backdropClasses = `
        fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300 backdrop-blur-sm
        ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}
    `;

    return (
        <>
            {/* 🟢 Backdrop (คลิกเพื่อปิด) */}
            <div className={backdropClasses} onClick={closeSidebar}></div>

            {/* 🟢 Sidebar Panel */}
            <aside className={sidebarClasses}>

                {/* Menu List */}
                <div className="flex-1 px-3 space-y-2 overflow-y-auto">
                    {/* Header ใน Mobile ที่บอกว่าเมนูคืออะไร */}
                    <div className="lg:hidden px-4 mb-4">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">เมนูนำทาง</p>
                    </div>

                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;

                        return (
                            <a
                                key={index}
                                href={item.href}
                                onClick={closeSidebar} // ปิดเมนูเมื่อกดเลือก (Mobile)
                                className={`
                                    group flex items-center gap-4 lg:flex-col lg:gap-1 
                                    p-3 rounded-xl transition-all duration-200 relative overflow-hidden
                                    ${isActive
                                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-bold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}
                                `}
                            >
                                {/* Active Bar (Left border style) */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-600 rounded-r-full lg:hidden" />
                                )}

                                <div className={`
                                    p-2 rounded-lg transition-all duration-200
                                    ${isActive ? 'bg-white dark:bg-purple-900/30 shadow-sm' : 'group-hover:bg-white dark:group-hover:bg-slate-700'}
                                `}>
                                    <item.icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                                </div>

                                <span className="text-sm lg:text-[10px] lg:font-medium whitespace-nowrap flex-1 lg:flex-none">
                                    {item.label}
                                </span>

                                {/* Arrow icon for Mobile */}
                                <ChevronRight size={16} className="lg:hidden text-slate-300 ml-auto" />
                            </a>
                        );
                    })}
                </div>

                {/* Footer Actions (Logout / Settings placeholder) */}
                <div className="mt-auto px-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                    <button className="flex items-center gap-4 lg:justify-center w-full p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                        <LogOut size={20} />
                        <span className="text-sm font-medium lg:hidden">ออกจากระบบ</span>
                    </button>
                </div>
            </aside>
        </>
    );
}