"use client";
export const runtime = 'edge';

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Building2, Phone, Search, X,
    ChevronLeft, ChevronRight, Maximize2, MapPin,
    Cpu, Wrench, Zap, Calculator, PenTool, Briefcase, BookOpen, Layers
} from "lucide-react";

import { locations } from "../../../data/locations";
import { teachersData } from "../../../data/teachers";
import { DEPARTMENTS } from "../../../data/departments";
import TeacherModal from "../../../components/ui/TeacherModal";
import type { Teacher } from "../../../types";

// 🛠️ Helper: เลือก Icon ตามรหัสแผนก
const getDepartmentIcon = (deptId: string) => {
    // แปลงเป็น lowercase เพื่อ check ง่ายๆ (สมมติรหัสเป็น IT, MECH, ELEC ฯลฯ)
    const id = deptId.toLowerCase();

    if (id.includes("it") || id.includes("com")) return Cpu;
    if (id.includes("mech") || id.includes("auto")) return Wrench;
    if (id.includes("elec") || id.includes("power")) return Zap;
    if (id.includes("acc") || id.includes("account")) return Calculator;
    if (id.includes("arch") || id.includes("const")) return PenTool;
    if (id.includes("manage")) return Briefcase;

    return BookOpen; // Default Icon
};

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

    // 2. หาครูในตึกนี้
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

    // 3. จัดกลุ่มครูตามแผนก (สำหรับการแสดงผลแบบแยกหัวข้อ)
    const groupedTeachers = useMemo(() => {
        // กรองตามคำค้นหา (Search) ก่อน
        const filteredBySearch = teachersInBuilding.filter(t =>
            t.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
            t.position.toLowerCase().includes(teacherSearch.toLowerCase())
        );

        // Grouping
        const groups: Record<string, Teacher[]> = {};

        filteredBySearch.forEach(t => {
            // ถ้าเลือก Filter แผนกอยู่ และไม่ตรงกับแผนกของครูคนนี้ -> ข้าม
            if (selectedDept !== "all" && t.departmentId !== selectedDept) return;

            if (!groups[t.departmentId]) {
                groups[t.departmentId] = [];
            }
            groups[t.departmentId].push(t);
        });

        return groups;
    }, [teachersInBuilding, teacherSearch, selectedDept]);

    // 4. รายชื่อแผนกที่มีในตึกนี้ (สำหรับ Dropdown Filter)
    const availableDepartments = useMemo(() => {
        const deptCounts: Record<string, number> = {};
        teachersInBuilding.forEach(t => {
            deptCounts[t.departmentId] = (deptCounts[t.departmentId] || 0) + 1;
        });
        return Object.entries(deptCounts).map(([id, count]) => ({ id, count }));
    }, [teachersInBuilding]);

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

            {/* ✅ Image Lightbox */}
            {isLightboxOpen && galleryImages.length > 0 && (
                <div className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-200" onClick={() => setIsLightboxOpen(false)}>
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

            {/* 🟢 1. HERO SECTION: รูปเดียว เต็มตา + รหัสตึก */}
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-slate-900 overflow-hidden group">

                {/* Back Button */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                    <Link href="/map" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-all">
                        <ArrowLeft size={24} />
                    </Link>
                </div>

                {/* Main Image */}
                <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => galleryImages.length > 0 && openLightbox(0)}
                >
                    {galleryImages.length > 0 ? (
                        <img
                            src={`https://zone.pbntc.site/${galleryImages[0]}`}
                            alt={location.name}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800">
                            <Building2 size={64} className="text-slate-600 opacity-50" />
                        </div>
                    )}

                    {/* Hover Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                        <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm flex items-center gap-2">
                            <Maximize2 size={16} /> ดูรูปภาพทั้งหมด
                        </div>
                    </div>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-linear-to-t from-black via-black/70 to-transparent pt-32 pointer-events-none">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            {/* Building Code Badge */}
                            <span className="inline-block px-3 py-1 bg-amber-500 text-slate-900 text-sm font-black uppercase tracking-wider rounded-lg mb-3 shadow-lg shadow-amber-500/20 transform translate-y-1">
                                อาคาร {location.code}
                            </span>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                                {location.name}
                            </h1>
                            <p className="text-slate-300 flex items-center gap-1.5 mt-2 text-sm md:text-base">
                                <MapPin size={16} className="text-amber-400" /> วิทยาลัยเทคนิคเพชรบูรณ์
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟢 2. MAIN CONTENT */}
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-10">

                {/* Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            รายละเอียดอาคาร
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                            {location.description || "ไม่มีข้อมูลรายละเอียดสังเขปสำหรับอาคารนี้"}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 h-fit">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                            <Layers size={18} className="text-purple-600" /> สิ่งอำนวยความสะดวก
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {location.facilities && location.facilities.length > 0 ? (
                                location.facilities.map((fac, i) => (
                                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        {fac}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-400 text-sm">- ไม่มีข้อมูล -</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="h-px w-full bg-slate-200 dark:bg-slate-800"></div>

                {/* 👥 TEACHERS SECTION (GROUPED) */}
                <div className="space-y-6">

                    {/* Header & Filters */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                บุคลากรประจำอาคาร
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">รายชื่อครูและเจ้าหน้าที่แยกตามแผนกวิชา</p>
                        </div>

                        {/* Search & Filter Inputs */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative w-full sm:w-56">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="ค้นหาชื่อครู..."
                                    value={teacherSearch}
                                    onChange={(e) => setTeacherSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            {/* Department Filter */}
                            <div className="relative w-full sm:w-64">
                                <select
                                    value={selectedDept}
                                    onChange={(e) => setSelectedDept(e.target.value)}
                                    className="w-full pl-3 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer appearance-none truncate"
                                >
                                    <option value="all">ทุกแผนกวิชา ({teachersInBuilding.length})</option>
                                    {availableDepartments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {DEPARTMENTS[dept.id as keyof typeof DEPARTMENTS]} ({dept.count})
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronRight size={16} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teacher Groups */}
                    <div className="space-y-8">
                        {Object.keys(groupedTeachers).length > 0 ? (
                            Object.entries(groupedTeachers).map(([deptId, teachers]) => {
                                const DeptIcon = getDepartmentIcon(deptId);
                                return (
                                    <div key={deptId} className="animate-in fade-in slide-in-from-bottom-4 duration-500">

                                        {/* Department Header */}
                                        <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                                                <DeptIcon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                                                    {DEPARTMENTS[deptId as keyof typeof DEPARTMENTS] || deptId}
                                                </h3>
                                                <p className="text-xs text-slate-500">จำนวน {teachers.length} ท่าน</p>
                                            </div>
                                        </div>

                                        {/* Teachers Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {teachers.map((teacher) => (
                                                <div
                                                    key={teacher.id}
                                                    onClick={() => setSelectedTeacher(teacher)}
                                                    className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                                                >
                                                    {/* Hover Effect Background */}
                                                    <div className="absolute inset-0 bg-purple-50 dark:bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                                    {/* Avatar */}
                                                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0 border-2 border-slate-100 dark:border-slate-700 group-hover:border-purple-500 transition-colors z-10">
                                                        <img
                                                            src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                            alt={teacher.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                                        />
                                                    </div>

                                                    {/* Text Info */}
                                                    <div className="min-w-0 z-10">
                                                        <h4 className="font-bold text-slate-800 dark:text-white truncate group-hover:text-purple-700 transition-colors">
                                                            {teacher.name}
                                                        </h4>
                                                        <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold truncate mb-0.5">
                                                            {teacher.position}
                                                        </p>
                                                        {/* Optional Contact Icon */}
                                                        {teacher.contact?.phone && (
                                                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                                <Phone size={10} /> {teacher.contact.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                                <Search size={40} className="mx-auto text-slate-300 mb-3" />
                                <h3 className="text-slate-900 dark:text-white font-bold">ไม่พบข้อมูล</h3>
                                <p className="text-slate-500 text-sm">ไม่มีครูที่ตรงกับเงื่อนไขการค้นหา</p>
                                <button
                                    onClick={() => { setTeacherSearch(""); setSelectedDept("all"); }}
                                    className="mt-4 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-purple-600 font-bold hover:bg-purple-50 transition-colors"
                                >
                                    ล้างค่าการค้นหา
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 📞 Contact Footer */}
                <div className="mt-8 bg-linear-to-r from-purple-700 to-indigo-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="flex items-center gap-5 relative z-10">
                        <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                            <Phone size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl">ติดต่อสอบถามเพิ่มเติม</h3>
                            <p className="text-purple-100 text-sm mt-1 opacity-90 max-w-md">
                                หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับอาคารเรียน หรือติดต่อบุคลากร กรุณาติดต่อส่วนกลาง
                            </p>
                        </div>
                    </div>
                    <a
                        href="tel:056711455"
                        className="relative z-10 px-8 py-3 bg-white text-purple-900 font-bold rounded-xl hover:bg-purple-50 transition-transform hover:scale-105 shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        <Phone size={18} className="fill-purple-900" /> 056-711455
                    </a>
                </div>

            </div>
        </div>
    );
}