"use client";

import { useState, useMemo } from "react";
import {
    Search, Users, ChevronDown,
    Zap, Wrench, HardHat, Calculator, Monitor, Briefcase,
    Utensils, Plane, Scissors, BookOpen, Award, Megaphone,
    Library, PenTool, LayoutGrid, Building2, User
} from "lucide-react";
import { teachersData } from "../../data/teachers";
import { DEPARTMENTS } from "../../data/departments";
import type { Teacher } from "../../types";
import TeacherModal from "../../components/ui/TeacherModal";

export default function TeachersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDept, setSelectedDept] = useState<string>("all");
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    const allTeachers = useMemo(() => Object.values(teachersData), []);

    // Extract Departments
    const departmentOptions = useMemo(() => {
        const depts = new Set(allTeachers.map(t => {
            return DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";
        }));
        return Array.from(depts).sort();
    }, [allTeachers]);

    // Grouping & Search
    const groupedData = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();

        const filtered = allTeachers.filter(t => {
            const deptName = DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";

            const matchesSearch =
                t.name.toLowerCase().includes(term) ||
                t.position.toLowerCase().includes(term) ||
                deptName.toLowerCase().includes(term);

            const matchesDept = selectedDept === "all" || deptName === selectedDept;

            return matchesSearch && matchesDept;
        });

        const groups: Record<string, Teacher[]> = {};
        filtered.forEach(teacher => {
            const deptName = DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";
            if (!groups[deptName]) groups[deptName] = [];
            groups[deptName].push(teacher);
        });

        return groups;
    }, [allTeachers, searchTerm, selectedDept]);

    const sortedDeptKeys = Object.keys(groupedData).sort((a, b) => {
        const priority = ["ผู้อำนวยการ", "ผู้บริหาร", "ฝ่ายบริหาร"];
        const getScore = (name: string) => {
            const idx = priority.findIndex(p => name.includes(p));
            return idx !== -1 ? idx : 999;
        };
        return getScore(a) - getScore(b) || a.localeCompare(b);
    });

    const getDeptIcon = (deptId: string) => {
        const id = deptId.toUpperCase();
        const size = 18;
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

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">

            {/* Modal */}
            {selectedTeacher && (
                <TeacherModal
                    teacher={selectedTeacher}
                    onClose={() => setSelectedTeacher(null)}
                />
            )}

            {/* 1. ส่วนหัว (Header) - ใส่รูปภาพพื้นหลัง */}
            <div className="relative w-full h-100 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-amber-500/20">
                {/* ✅ Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://img.pbntc.site/khun.webp" // ใส่ URL รูปตึกสวยๆ ของวิทยาลัยที่นี่
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => e.currentTarget.style.display = 'none'} // ถ้าไม่มีรูปให้ซ่อน
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-slate-900/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/50 border border-amber-500/50 rounded-full shadow-lg backdrop-blur-none">
                        <Users size={12} /> Official Project Team
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                        บุคลากรครูและเจ้าหน้าที่
                    </h1>
                    <p className="text-slate-300 text-lg font-light max-w-2xl mx-auto drop-shadow-md">
                        โครงการระบบแผนที่ดิจิทัล <span className="text-amber-400 font-semibold">PBNTC Map</span> เพื่อการศึกษาและพัฒนาเทคโนโลยีสารสนเทศ
                    </p>
                </div>
            </div>

            {/* Main Content (Animation: delay-100) */}
            <div className="grow w-full max-w-7xl mx-auto px-4 md:px-8 py-12 anim-enter delay-100">

                {/* Filter Bar */}
                <div className="sticky top-20 z-30 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 mb-12 ring-1 ring-amber-500/10">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="ค้นหาชื่อครู, ตำแหน่ง..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border-none ring-1 ring-slate-200 dark:ring-slate-800 text-slate-800 dark:text-white px-5 py-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>

                        <div className="relative w-full md:w-80 group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors pointer-events-none">
                                <LayoutGrid size={20} />
                            </div>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="w-full appearance-none bg-slate-50 dark:bg-slate-950 border-none ring-1 ring-slate-200 dark:ring-slate-800 text-slate-800 dark:text-white px-5 py-3.5 pl-12 pr-10 rounded-xl focus:ring-2 focus:ring-amber-500 cursor-pointer transition-all font-medium truncate"
                            >
                                <option value="all">แสดงทุกแผนกวิชา</option>
                                {departmentOptions.map((dept, i) => (
                                    <option key={i} value={dept}>{dept}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* List Grid (Animation: Staggered) */}
                <div className="space-y-14">
                    {sortedDeptKeys.length > 0 ? (
                        sortedDeptKeys.map((deptName, idx) => (
                            <div key={idx} className="anim-enter" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>

                                <div className="flex items-center gap-4 mb-6 group select-none">
                                    <div className="h-10 w-1.5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"></div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            {deptName}
                                        </h2>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                                            {groupedData[deptName].length} บุคลากร
                                        </p>
                                    </div>
                                    <div className="h-px flex-1 bg-linear-to-r from-slate-200 to-transparent dark:from-slate-800"></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {groupedData[deptName].map((teacher) => (
                                        <div
                                            key={teacher.id}
                                            onClick={() => setSelectedTeacher(teacher)}
                                            className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col items-center text-center overflow-hidden z-10"
                                        >
                                            {/* Decoration (Pointer Events None = Click Through) */}
                                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                                            <div className="relative w-28 h-28 mb-5 rounded-full p-1.5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 shadow-inner group-hover:scale-105 transition-transform duration-300 group-hover:border-amber-400 pointer-events-none">
                                                <img
                                                    src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                    alt={teacher.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover rounded-full"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                                        e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<svg class="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>');
                                                    }}
                                                />
                                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center text-amber-600 dark:text-amber-500 shadow-md group-hover:bg-amber-50 dark:group-hover:bg-amber-900/30">
                                                    {getDeptIcon(teacher.departmentId)}
                                                </div>
                                            </div>

                                            <div className="w-full pointer-events-none">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                                                    {teacher.name}
                                                </h3>
                                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 line-clamp-1">
                                                    {teacher.position}
                                                </p>

                                                <span className="inline-block px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 truncate max-w-full">
                                                    {DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS]}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center anim-enter">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <Search size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                                ไม่พบข้อมูลที่ค้นหา
                            </h3>
                            <button onClick={() => { setSearchTerm(""); setSelectedDept("all"); }} className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg transition-all active:scale-95">
                                ล้างคำค้นหาทั้งหมด
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}