"use client";

import {
    X, Phone, MapPin, Building2,
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
    const [imageError, setImageError] = useState(false); // ✅ ใช้ State คุมรูปภาพ
    const modalRef = useRef<HTMLDivElement>(null);

    // Reset state เมื่อเปลี่ยนคน
    useEffect(() => {
        if (teacher) {
            setImageError(false); // รีเซ็ตสถานะรูป
            setTimeout(() => setIsVisible(true), 10);
            document.body.style.overflow = "hidden";
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [teacher]);

    if (!teacher) return null;

    const deptName = DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS] || "ไม่ระบุแผนก";

    const getLocationName = (id: string | number) => {
        const loc = locations.find(l => l.id.toString() === id.toString());
        return loc ? loc.name : `อาคาร ${id}`;
    };

    return (
        <div
            className={`fixed inset-0 z-9999 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div
                ref={modalRef}
                className={`
                  relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[85vh]
                  transform transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
                  ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"}
                `}
            >
                {/* 🔴 Desktop Close Button (Floating Outside Content) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-red-500 transition-colors hidden md:flex cursor-pointer backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                {/* Left: Image Section */}
                <div className="w-full md:w-2/5 h-72 md:h-auto bg-slate-100 dark:bg-slate-800 relative shrink-0">

                    {/* ✅ Logic แสดงรูปภาพแบบ React State */}
                    {!imageError ? (
                        <img
                            key={teacher.id} // บังคับ Re-render เมื่อเปลี่ยน ID
                            src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                            alt={teacher.name}
                            className="w-full h-full object-cover object-top"
                            onError={() => setImageError(true)} // ถ้ารูปเสีย ให้เซ็ต State
                            loading="eager"
                        />
                    ) : (
                        // Fallback เมื่อรูปเสีย
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-200 dark:bg-slate-800">
                            <User size={64} className="mb-2 opacity-50" />
                            <span className="text-sm font-medium opacity-70">ไม่มีรูปภาพ</span>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent md:hidden pointer-events-none"></div>

                    {/* 🔴 Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full md:hidden backdrop-blur-md cursor-pointer hover:bg-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Right: Info Section */}
                <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar">
                    <div className="space-y-8 pb-4 mt-4 md:mt-0">

                        {/* Header Info */}
                        <div className="anim-enter delay-100">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2 pr-8">
                                {teacher.name}
                            </h2>
                            <p className="text-amber-600 dark:text-amber-400 font-bold text-lg md:text-xl mb-4">
                                {teacher.position}
                            </p>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700">
                                <Building2 size={16} className="text-amber-500" /> {deptName}
                            </span>
                        </div>

                        {/* Contact & Location */}
                        <div className="space-y-4 anim-enter delay-200">

                            {/* Phone */}
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-900 transition-colors">
                                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-amber-600 dark:text-amber-500 shrink-0 border border-slate-100 dark:border-slate-700">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">เบอร์โทรศัพท์</p>
                                    <a href={`tel:${teacher.contact?.phone || ''}`} className="text-lg font-bold text-slate-900 dark:text-white hover:text-amber-600 transition-colors">
                                        {teacher.contact?.phone || "-"}
                                    </a>
                                </div>
                            </div>

                            {/* Locations */}
                            {teacher.locationIds && teacher.locationIds.length > 0 && (
                                <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20">
                                    <div className="flex items-center gap-2 mb-3 text-slate-800 dark:text-white font-bold text-sm">
                                        <MapPin size={18} className="text-amber-500" /> สถานที่ประจำ / ห้องพักครู
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {teacher.locationIds.map((locId, idx) => (
                                            <Link
                                                key={idx}
                                                href={`/map?location=${locId}`}
                                                className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-700 hover:text-amber-700 dark:hover:text-amber-400 transition-all group border border-transparent hover:border-amber-200 dark:hover:border-slate-600"
                                            >
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:translate-x-1 transition-transform">
                                                    {getLocationName(locId)}
                                                </span>
                                                <span className="text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-500 group-hover:text-amber-600 group-hover:border-amber-200 transition-colors">
                                                    อาคาร {locId}
                                                </span>
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