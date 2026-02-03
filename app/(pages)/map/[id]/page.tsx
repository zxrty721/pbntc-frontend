"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Building2, Users, CheckCircle2,
    Phone, User, Search, Filter, X, ChevronLeft, ChevronRight,
    Maximize2, Image as ImageIcon
} from "lucide-react";

import { locations } from "../../../data/locations";
import { teachersData } from "../../../data/teachers";
import { DEPARTMENTS } from "../../../data/departments";
import TeacherModal from "../../../components/ui/TeacherModal";
import type { Teacher } from "../../../types";

export default function LocationDetailPage() {
    const params = useParams();

    // State
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [teacherSearch, setTeacherSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("all");

    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // 1. หาข้อมูลตึก
    const location = useMemo(() => {
        const searchId = Number(params.id);
        return locations.find(l => l.id === searchId);
    }, [params.id]);

    // 2. หาครู
    const teachersInBuilding = useMemo(() => {
        if (!location) return [];
        return Object.values(teachersData).filter(t => {
            if (t.locationIds && Array.isArray(t.locationIds)) {
                return t.locationIds.includes(location.id);
            }
            // @ts-ignore
            return t.locationId === location.id;
        });
    }, [location]);

    // 3. Departments
    const departmentsInBuilding = useMemo(() => {
        const depts = new Set(teachersInBuilding.map(t => t.departmentId));
        return Array.from(depts);
    }, [teachersInBuilding]);

    // 4. Filter Teachers
    const filteredTeachers = useMemo(() => {
        return teachersInBuilding.filter(t => {
            const matchesName = t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
                t.position.toLowerCase().includes(teacherSearch.toLowerCase());
            const matchesDept = selectedDept === "all" || t.departmentId === selectedDept;
            return matchesName && matchesDept;
        });
    }, [teachersInBuilding, teacherSearch, selectedDept]);

    // --- Lightbox Functions ---
    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };

    const navigateLightbox = (direction: 'next' | 'prev', e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!location?.images) return;
        if (direction === 'next') {
            setCurrentImageIndex((prev) => (prev + 1) % location.images!.length);
        } else {
            setCurrentImageIndex((prev) => (prev - 1 + location.images!.length) % location.images!.length);
        }
    };

    if (!location) return null;

    const galleryImages = location.images && location.images.length > 0 ? location.images : [];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">

            {/* ✅ Teacher Modal */}
            <TeacherModal
                teacher={selectedTeacher}
                onClose={() => setSelectedTeacher(null)}
            />

            {/* ✅ Image Lightbox (Full Screen) */}
            {isLightboxOpen && galleryImages.length > 0 && (
                <div className="fixed inset-0 z-1000 bg-black/95 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-200" onClick={() => setIsLightboxOpen(false)}>
                    <button onClick={() => setIsLightboxOpen(false)} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-50">
                        <X size={24} />
                    </button>

                    {galleryImages.length > 1 && (
                        <>
                            <button onClick={(e) => navigateLightbox('prev', e)} className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-50">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={(e) => navigateLightbox('next', e)} className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full z-50">
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
                        <img
                            src={`https://zone.pbntc.site/${galleryImages[currentImageIndex]}`}
                            alt="Gallery"
                            className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm font-mono">
                            {currentImageIndex + 1} / {galleryImages.length}
                        </div>
                    </div>
                </div>
            )}

            {/* 🟢 1. HERO SECTION (รูปปกด้านบน) - ✅ กดคลิกได้ */}
            <div
                className="relative h-64 md:h-80 lg:h-96 w-full bg-slate-900 group cursor-zoom-in overflow-hidden"
                onClick={() => openLightbox(0)} // คลิกเพื่อเปิดรูปแรก
            >
                {location.images && location.images.length > 0 ? (
                    <img
                        src={`https://zone.pbntc.site/${location.images[0]}`}
                        alt={location.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Building2 size={64} className="text-slate-600" />
                    </div>
                )}

                {/* Overlay Icon On Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-full">
                        <Maximize2 className="text-white" size={32} />
                    </div>
                </div>

                {/* ปุ่มย้อนกลับ */}
                <Link
                    href="/map"
                    className="absolute top-4 left-4 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-all z-10"
                    onClick={(e) => e.stopPropagation()} // ป้องกันไม่ให้กดแล้วเปิด Lightbox
                >
                    <ArrowLeft size={24} />
                </Link>

                {/* ชื่อตึก */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-slate-950 via-slate-900/80 to-transparent pt-20 pointer-events-none">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <span className="inline-block px-3 py-1 bg-amber-500 text-slate-900 text-xs font-black uppercase tracking-wider rounded-md mb-2 shadow-lg shadow-amber-500/20">
                            เลขตึก: {location.code}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-sm">
                            {location.name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* 🟢 2. MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* 👈 LEFT SIDE: ALBUM GALLERY */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <ImageIcon size={20} className="text-purple-600" />
                                <h3 className="font-bold text-slate-800 dark:text-white">อัลบั้มรูปภาพ</h3>
                            </div>
                            <span className="text-xs text-slate-500">{galleryImages.length} รูป</span>
                        </div>

                        {/* ✅ Gallery Container: 
                - Mobile: flex overflow-x-auto (เลื่อนแนวนอน) 
                - Desktop: grid-cols-1 (เรียงลงมา) 
            */}
                        <div className="flex overflow-x-auto pb-4 lg:pb-0 gap-3 lg:grid lg:grid-cols-1 lg:overflow-visible snap-x scrollbar-hide">
                            {galleryImages.length > 0 ? (
                                galleryImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        // Mobile: กำหนดความกว้าง 80% หรือ 60% เพื่อให้เห็นรูปถัดไปนิดนึง (Hint to scroll)
                                        className="min-w-70 w-[80%] sm:w-[45%] lg:w-full shrink-0 snap-center relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-zoom-in bg-slate-200 dark:bg-slate-800 aspect-video lg:aspect-4/3"
                                        onClick={() => openLightbox(idx)}
                                    >
                                        <img
                                            src={`https://zone.pbntc.site/${img}`}
                                            alt={`Album ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <Maximize2 className="text-white drop-shadow-md" size={24} />
                                        </div>
                                        {/* Number Badge */}
                                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] text-white font-mono">
                                            {idx + 1}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
                                    <span className="text-sm">ไม่มีรูปภาพเพิ่มเติม</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 👉 RIGHT SIDE: CONTENT (ข้อมูล + ครู) */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* 1. รายละเอียดตึก */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                                <Building2 className="text-purple-600" size={20} />
                                รายละเอียดอาคาร
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                                {location.description || "ไม่มีข้อมูลรายละเอียดสังเขป"}
                            </p>

                            {/* Facilities */}
                            {location.facilities && location.facilities.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                        สิ่งอำนวยความสะดวก
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {location.facilities.map((fac, i) => (
                                            <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                {fac}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 2. รายชื่อบุคลากร */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">

                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                        <Users className="text-purple-600" size={20} />
                                        บุคลากรประจำอาคาร
                                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full">
                                            {teachersInBuilding.length}
                                        </span>
                                    </h2>
                                </div>

                                {/* Filter Controls */}
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="ค้นหาชื่อครู, ตำแหน่ง..."
                                            value={teacherSearch}
                                            onChange={(e) => setTeacherSearch(e.target.value)}
                                            className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                        />
                                        {teacherSearch && (
                                            <button onClick={() => setTeacherSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="relative md:w-64">
                                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                        <select
                                            value={selectedDept}
                                            onChange={(e) => setSelectedDept(e.target.value)}
                                            className="w-full pl-10 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="all">ทุกแผนกวิชา</option>
                                            {departmentsInBuilding.map((deptId) => (
                                                <option key={deptId} value={deptId}>
                                                    {DEPARTMENTS[deptId as keyof typeof DEPARTMENTS]}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronLeft size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none -rotate-90" />
                                    </div>
                                </div>
                            </div>

                            {/* Grid รายชื่อครู */}
                            <div className="p-6">
                                {filteredTeachers.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                        {filteredTeachers.map((teacher) => (
                                            <div
                                                key={teacher.id}
                                                onClick={() => setSelectedTeacher(teacher)}
                                                className="group flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-700 hover:border-purple-200 dark:hover:border-purple-900 transition-all cursor-pointer shadow-sm hover:shadow-md"
                                            >
                                                {/* Avatar */}
                                                <div className="relative w-14 h-14 shrink-0">
                                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-600 group-hover:border-purple-500 transition-colors bg-slate-200 dark:bg-slate-700">
                                                        <img
                                                            src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                            alt={teacher.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                            }}
                                                        />
                                                        <div className="absolute inset-0 items-center justify-center hidden">
                                                            <User size={24} className="text-slate-400" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                                                </div>

                                                {/* Text Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-purple-700 transition-colors">
                                                        {teacher.name}
                                                    </h3>
                                                    <p className="text-xs text-purple-600 dark:text-purple-400 truncate font-semibold mb-0.5">
                                                        {teacher.position}
                                                    </p>
                                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate bg-slate-100 dark:bg-slate-700/50 inline-block px-1.5 py-0.5 rounded">
                                                        {DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS]}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200 dark:border-slate-700">
                                            <User size={32} className="text-slate-300 dark:text-slate-600" />
                                        </div>
                                        <h3 className="text-slate-900 dark:text-white font-bold mb-1">ไม่พบข้อมูล</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                                            ไม่มีครูที่ตรงกับคำค้นหา หรือแผนกที่เลือก
                                        </p>
                                        <button
                                            onClick={() => { setTeacherSearch(""); setSelectedDept("all"); }}
                                            className="mt-4 text-purple-600 text-sm font-bold hover:underline"
                                        >
                                            ล้างคำค้นหาทั้งหมด
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 3. Contact */}
                        <div className="bg-linear-to-r from-purple-800 to-indigo-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="font-bold text-lg flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <Phone size={20} /> ติดต่อสอบถาม
                                </h3>
                                <p className="text-purple-200 text-sm">ติดต่อส่วนกลางวิทยาลัยเทคนิคเพชรบูรณ์</p>
                            </div>
                            <a href="tel:056711455" className="bg-white text-purple-800 font-extrabold px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-md active:scale-95 flex items-center gap-2">
                                <Phone size={18} className="fill-purple-800" /> 056-711455
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}