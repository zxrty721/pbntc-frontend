"use client";

import {
    X, Phone, MapPin, Share2, Building2,
    Zap, Wrench, HardHat, Calculator, Monitor, Briefcase,
    Utensils, Plane, Scissors, BookOpen, Award, Megaphone,
    Library, PenTool, User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import type { Teacher } from "../../types";
import { DEPARTMENTS } from "../../data/departments";
import { locations } from "../../data/locations";

interface TeacherModalProps {
    teacher: Teacher | null;
    onClose: () => void;
}

export default function TeacherModal({ teacher, onClose }: TeacherModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (teacher) {
            setIsVisible(true);
            document.body.style.overflow = "hidden"; // ล็อก Scroll จอหลัก
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }
    }, [teacher]);

    // ปิดเมื่อคลิกนอก Modal
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!teacher) return null;

    const deptName = DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS] || "ไม่ระบุแผนก";

    const getDeptIcon = (deptId: string) => {
        const id = deptId.toUpperCase();
        const size = 20;
        if (id.includes("DIRECTOR") || id.includes("ADMIN")) return <Award size={size} />;
        if (id.includes("ELEC")) return <Zap size={size} />;
        if (id.includes("MECHANIC") || id.includes("MACHINING") || id.includes("WELDING") || id.includes("BASIC")) return <Wrench size={size} />;
        if (id.includes("CONSTRUCTION")) return <HardHat size={size} />;
        if (id.includes("ARCHITECTURE")) return <PenTool size={size} />;
        if (id.includes("ACCOUNTING") || id.includes("FINANCE")) return <Calculator size={size} />;
        if (id.includes("COMPUTER") || id.includes("DIGITAL") || id.includes("ELECTRONIC") || id.includes("MECHATRONICS")) return <Monitor size={size} />;
        if (id.includes("MARKETING")) return <Megaphone size={size} />;
        if (id.includes("SECRETARY") || id.includes("HR")) return <Briefcase size={size} />;
        if (id.includes("FOOD")) return <Utensils size={size} />;
        if (id.includes("TOURISM") || id.includes("HOTEL")) return <Plane size={size} />;
        if (id.includes("FASHION")) return <Scissors size={size} />;
        if (id.includes("GENERAL")) return <BookOpen size={size} />;
        if (id.includes("LIBRARY")) return <Library size={size} />;
        return <Building2 size={size} />;
    };

    const getLocationName = (id: string | number) => {
        const loc = locations.find(l => l.id.toString() === id.toString());
        return loc ? loc.name : `อาคาร ${id}`;
    };

    return (
        <div
            className={`fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-200 ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 transition-opacity will-change-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div
                ref={modalRef}
                className={`
          relative bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden 
          transform transition-all duration-300 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]
          ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}
        `}
            >

                {/* 🟢 ส่วนรูปภาพ (ซ้าย/บน) - Mobile: เต็มความกว้าง / Desktop: 45% */}
                <div className="relative w-full md:w-[45%] h-72 md:h-auto bg-slate-100 dark:bg-slate-800 shrink-0">
                    <img
                        src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                        alt={teacher.name}
                        loading="eager"
                        className="w-full h-full object-cover object-top md:object-center transition-transform duration-700 hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />
                    {/* Fallback */}
                    <div className="absolute inset-0 items-center justify-center bg-slate-200 dark:bg-slate-700 hidden">
                        <User className="text-slate-400 w-24 h-24" />
                    </div>

                    {/* Gradient Overlay for Text Readability on Mobile */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden"></div>

                    {/* ปุ่มปิด (Mobile Only) */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full md:hidden backdrop-blur-md active:scale-95 transition-transform"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* 🟢 ส่วนข้อมูล (ขวา/ล่าง) - Scrollable */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar relative">

                    {/* ปุ่มปิด (Desktop Only) */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hidden md:block transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                        <X size={28} />
                    </button>

                    <div className="space-y-8 pb-4">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                                {teacher.name}
                            </h2>
                            <p className="text-purple-600 dark:text-purple-400 font-bold text-lg md:text-2xl mb-4">
                                {teacher.position}
                            </p>

                            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 w-full md:w-auto">
                                {getDeptIcon(teacher.departmentId)}
                                <span className="text-sm md:text-base font-semibold">{deptName}</span>
                            </div>
                        </div>

                        <div className="space-y-5">

                            {/* เบอร์โทร */}
                            <div className="flex items-center gap-5 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                                <div className="p-3 bg-white dark:bg-emerald-900/40 rounded-xl shadow-sm text-emerald-600 dark:text-emerald-400 shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-wider font-bold mb-1">เบอร์โทรศัพท์</p>
                                    {teacher.contact?.phone ? (
                                        <a href={`tel:${teacher.contact.phone}`} className="text-xl md:text-2xl font-black text-slate-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors wrap-break-words">
                                            {teacher.contact.phone}
                                        </a>
                                    ) : (
                                        <span className="text-lg font-bold text-slate-400">- ไม่มีข้อมูล -</span>
                                    )}
                                </div>
                            </div>

                            {/* สถานที่ประจำ */}
                            {teacher.locationIds && teacher.locationIds.length > 0 && (
                                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                                    <div className="flex items-center gap-3 mb-4 text-blue-700 dark:text-blue-300">
                                        <MapPin size={24} />
                                        <span className="font-bold text-lg">สถานที่ประจำ / ห้องพักครู</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {teacher.locationIds.map((locId, idx) => (
                                            <Link
                                                key={idx}
                                                href={`/map?location=${locId}`}
                                                className="flex items-center gap-4 px-5 py-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all group active:scale-[0.98]"
                                            >
                                                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-lg shrink-0">
                                                    <Building2 size={20} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-slate-400 font-bold uppercase">รหัสอาคาร {locId}</span>
                                                    <span className="text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                                        {getLocationName(locId)}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}