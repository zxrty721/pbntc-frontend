"use client";
export const runtime = 'edge';

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Phone, Search, X,
    ChevronLeft, ChevronRight, Maximize2, MapPin, Layers,
    GraduationCap, Info, ExternalLink, Building2
} from "lucide-react";

import { locations } from "../../../data/locations";
import { teachersData } from "../../../data/teachers";
import { DEPARTMENTS } from "../../../data/departments";
import TeacherModal from "../../../components/ui/TeacherModal";
import type { Teacher } from "../../../types";

interface DeptCount {
    id: string;
    count: number;
}

export default function LocationDetailPage() {
    const params = useParams();

    // States
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [teacherSearch, setTeacherSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("all");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Data Memoization
    const location = useMemo(() => {
        const searchId = Number(params.id);
        return locations.find(l => l.id === searchId);
    }, [params.id]);

    const teachersInBuilding = useMemo(() => {
        if (!location) return [];
        return Object.values(teachersData).filter(t => t.locationIds?.includes(location.id));
    }, [location]);

    const availableDepartments = useMemo<DeptCount[]>(() => {
        const deptCounts: Record<string, number> = {};
        teachersInBuilding.forEach(t => {
            deptCounts[t.departmentId] = (deptCounts[t.departmentId] || 0) + 1;
        });
        return Object.entries(deptCounts).map(([id, count]) => ({ id, count }));
    }, [teachersInBuilding]);

    const groupedTeachers = useMemo(() => {
        const term = teacherSearch.toLowerCase().trim();
        const filtered = teachersInBuilding.filter(t =>
            (t.name.toLowerCase().includes(term) || t.position.toLowerCase().includes(term)) &&
            (selectedDept === "all" || t.departmentId === selectedDept)
        );
        const groups: Record<string, Teacher[]> = {};
        filtered.forEach(t => {
            if (!groups[t.departmentId]) groups[t.departmentId] = [];
            groups[t.departmentId].push(t);
        });
        return groups;
    }, [teachersInBuilding, teacherSearch, selectedDept]);

    // Handlers
    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!location?.images?.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % location.images!.length);
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!location?.images?.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + location.images!.length) % location.images!.length);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [location]);

    if (!location) return null;

    const galleryImages = location.images && location.images.length > 0
        ? location.images
        : ['default.jpg'];

    const currentImageSrc = `https://zone.pbntc.site/${galleryImages[currentImageIndex]}`;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-200">
            <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />

            {/* 🟢 LIGHTBOX */}
            {isLightboxOpen && (
                // แก้ไข class z-[100] -> z-100 ตามคำแนะนำ
                <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-200">
                    <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-red-500 rounded-full text-white z-50 transition-colors">
                        <X size={24} />
                    </button>
                    {galleryImages.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-6 p-4 bg-white/10 hover:bg-amber-500 rounded-full text-white z-50 transition-colors"><ChevronLeft size={32} /></button>
                            <button onClick={nextImage} className="absolute right-6 p-4 bg-white/10 hover:bg-amber-500 rounded-full text-white z-50 transition-colors"><ChevronRight size={32} /></button>
                        </>
                    )}
                    <img src={currentImageSrc} alt={location.name} className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" />
                    <div className="absolute bottom-8 px-6 py-2 bg-black/50 text-white font-mono text-sm rounded-full backdrop-blur-md border border-white/10">
                        {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                </div>
            )}

            {/* 🟢 1. HERO SLIDER (แก้ปัญหาบังตึก + ปรับ Class ตาม Standard) */}
            <section className="relative w-full bg-slate-900 group">
                {/* แก้ไขความสูงตามคำแนะนำ:
                   h-[320px] -> h-80
                   md:h-[480px] -> md:h-120
                   lg:h-[550px] -> lg:h-137.5
                */}
                <div className="relative w-full h-80 md:h-120 lg:h-137.5 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                        style={{ backgroundImage: `url('${currentImageSrc}')` }}
                    ></div>

                    {/* Gradient ปรับปรุงใหม่:
                       1. ใช้ bg-linear-to-t (v4 syntax)
                       2. ปรับความสูงของ Gradient ให้อยู่แค่ 50% ด้านล่าง (h-1/2 bottom-0) เพื่อไม่ให้บังส่วนบนของตึก
                       3. ไล่สีจากดำสนิท -> ใส เพื่อให้ตัวหนังสืออ่านออกแต่ไม่กินพื้นที่ภาพ
                    */}
                    <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

                    {/* Gradient ด้านบนนิดหน่อยเพื่อกันปุ่ม Back จม */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-slate-950/40 to-transparent pointer-events-none"></div>

                    {/* Top Bar */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                        <Link href="/map" className="flex items-center gap-2 px-4 py-2 bg-slate-950/50 hover:bg-amber-500 hover:text-slate-950 rounded-full text-white text-xs font-black uppercase transition-all border border-white/10 backdrop-blur-md">
                            <ArrowLeft size={14} /> กลับ
                        </Link>

                        {galleryImages.length > 1 && (
                            <div className="hidden md:flex px-3 py-1 bg-black/40 rounded-full text-white text-[10px] font-mono backdrop-blur-md border border-white/10">
                                {currentImageIndex + 1} / {galleryImages.length}
                            </div>
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    {galleryImages.length > 1 && (
                        <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-6 pointer-events-none">
                            <button onClick={prevImage} className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-amber-500 text-white hover:text-black backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"><ChevronLeft size={24} /></button>
                            <button onClick={nextImage} className="pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-amber-500 text-white hover:text-black backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"><ChevronRight size={24} /></button>
                        </div>
                    )}

                    {/* Bottom Info (ปรับ Layout ไม่ให้บังตึก) */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-1 max-w-4xl">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase rounded shadow-lg">
                                        <Building2 size={12} /> อาคาร: {location.code}
                                    </span>
                                    {galleryImages.length > 1 && (
                                        <span className="md:hidden px-2 py-0.5 bg-black/40 text-white text-[10px] rounded backdrop-blur-md border border-white/10">
                                            {currentImageIndex + 1}/{galleryImages.length}
                                        </span>
                                    )}
                                </div>

                                {/* ลดขนาด Font ลงเล็กน้อยเพื่อให้ไม่กินพื้นที่ภาพมากเกินไป */}
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-xl py-1">
                                    {location.name}
                                </h1>
                                <p className="text-slate-200 text-xs md:text-sm font-bold flex items-center gap-1.5 opacity-90">
                                    <MapPin size={14} className="text-amber-500" /> วิทยาลัยเทคนิคเพชรบูรณ์
                                </p>
                            </div>

                            <button
                                onClick={() => setIsLightboxOpen(true)}
                                className="self-start md:self-end px-5 py-2 bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold uppercase rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 shrink-0 mb-1"
                            >
                                <Maximize2 size={16} /> <span className="hidden sm:inline">เปิดดู</span>รูปขยาย
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🟢 2. MAIN CONTENT (max-w-400 ตามคำแนะนำ) */}
            <main className="w-full max-w-400 mx-auto px-4 md:px-8 mt-8 space-y-10">

                {/* Info & Facilities */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    {/* ข้อมูลอาคาร */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center gap-2 text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                            <Info size={18} className="text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest">ข้อมูลอาคาร</h2>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                {location.description || "อาคารเรียนและปฏิบัติการหลัก รองรับการเรียนการสอนหลากหลายสาขาวิชา พร้อมอุปกรณ์และครุภัณฑ์ที่ทันสมัย เพื่อพัฒนาทักษะวิชาชีพของผู้เรียน"}
                            </p>
                        </div>
                    </div>

                    {/* สิ่งอำนวยความสะดวก */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-2 text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                            <Layers size={18} className="text-purple-500" />
                            <h3 className="text-sm font-black uppercase tracking-widest">สิ่งอำนวยความสะดวก</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 content-start">
                            {location.facilities?.map((fac, i) => (
                                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300">{fac}</span>
                                </div>
                            ))}
                            {!location.facilities?.length && (
                                <span className="text-sm text-slate-400 italic px-2">ไม่มีข้อมูล</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-slate-200 dark:bg-slate-800"></div>

                {/* Teachers Section */}
                <section className="space-y-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                                บุคลากรประจำอาคาร
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold pl-5">
                                ค้นหารายชื่อครูและเจ้าหน้าที่ในอาคารนี้
                            </p>
                        </div>

                        {/* Search Bar - lg:min-w-150 ตามคำแนะนำ */}
                        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-1 lg:flex-none lg:min-w-150">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="ค้นหาชื่อครู หรือตำแหน่งงาน"
                                    className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold outline-none focus:border-amber-500 transition-all shadow-sm"
                                    onChange={(e) => setTeacherSearch(e.target.value)}
                                />
                            </div>
                            <select
                                className="px-4 py-3.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold outline-none focus:border-amber-500 cursor-pointer shadow-sm sm:w-64"
                                onChange={(e) => setSelectedDept(e.target.value)}
                            >
                                <option value="all">ทุกแผนกวิชา</option>
                                {availableDepartments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{DEPARTMENTS[dept.id as keyof typeof DEPARTMENTS]} ({dept.count})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {Object.entries(groupedTeachers).map(([deptId, teachers]) => (
                            <div key={deptId} className="space-y-4">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {DEPARTMENTS[deptId as keyof typeof DEPARTMENTS]}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {teachers.map(teacher => (
                                        <div
                                            key={teacher.id}
                                            onClick={() => setSelectedTeacher(teacher)}
                                            className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 hover:border-amber-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                        >
                                            <img
                                                src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-100 dark:border-slate-700"
                                                alt={teacher.name}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-amber-600 transition-colors">
                                                    {teacher.name}
                                                </h4>
                                                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate uppercase mt-0.5">
                                                    {teacher.position}
                                                </p>
                                            </div>
                                            <div className="text-slate-300 group-hover:text-amber-500 transition-colors">
                                                <ExternalLink size={16} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {Object.keys(groupedTeachers).length === 0 && (
                            <div className="py-16 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <Search size={48} className="mx-auto text-slate-300 mb-3 opacity-50" />
                                <h3 className="text-lg font-black text-slate-400">ไม่พบข้อมูลที่ค้นหา</h3>
                            </div>
                        )}
                    </div>
                </section>

                {/* 🟢 3. CONTACT FOOTER */}
                <section className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                    <div className="text-center sm:text-left relative z-10">
                        <h2 className="text-lg md:text-xl font-black text-white">ต้องการข้อมูลเพิ่มเติม?</h2>
                        <p className="text-xs md:text-sm text-slate-400 font-bold mt-1">ติดต่อประชาสัมพันธ์ วิทยาลัยเทคนิคเพชรบูรณ์</p>
                    </div>
                    <a
                        href="tel:056711455"
                        className="relative z-10 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs md:text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 shrink-0"
                    >
                        <Phone size={18} /> 056-711455
                    </a>
                </section>
            </main>

            <footer className="w-full py-10 text-center opacity-40">
                <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <GraduationCap size={16} /> PBNTC Map Project
                </div>
            </footer>
        </div>
    );
}