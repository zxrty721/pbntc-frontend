"use client";

import { useState, useMemo } from "react";
import {
    Search, MapPin, Filter, X, Building2, ChevronDown, User, ExternalLink,
    // Icons
    Zap, Wrench, HardHat, Calculator, Monitor, Briefcase,
    Utensils, Plane, Scissors, BookOpen, Award, Megaphone,
    Library, PenTool
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

    const departmentOptions = useMemo(() => {
        const depts = new Set(allTeachers.map(t => DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS]));
        return Array.from(depts).filter(Boolean).sort();
    }, [allTeachers]);

    const groupedData = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        const filtered = allTeachers.filter(t => {
            const deptName = DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "";
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
        <div className="w-full min-h-screen pb-20 px-4 md:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

            <TeacherModal
                teacher={selectedTeacher}
                onClose={() => setSelectedTeacher(null)}
            />

            <div className="max-w-7xl mx-auto pt-8">

                {/* Header */}
                <div className="mb-8 md:mb-10 anim-enter">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-2 md:mb-3">
                        ทำเนียบบุคลากร
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-base md:text-lg">
                        <Building2 size={20} className="text-purple-600" />
                        วิทยาลัยเทคนิคเพชรบูรณ์
                    </p>
                </div>

                {/* Filter Bar */}
                {/* ✅ แก้ไขตรงนี้: เปลี่ยน z-40 เป็น z-20 เพื่อให้ต่ำกว่า Sidebar (ที่เป็น z-40) */}
                <div className="sticky top-16 md:top-20 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-3 md:p-4 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 mb-8 anim-enter delay-100">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                        <div className="relative flex-1 group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="ค้นหาชื่อครู, ตำแหน่ง..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 text-slate-800 dark:text-white px-5 py-3 md:py-3.5 pl-12 rounded-xl focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-400 text-sm md:text-base"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors">
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <div className="relative w-full md:w-72">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <Filter size={18} />
                            </div>
                            <select
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                                className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 text-slate-800 dark:text-white px-5 py-3 md:py-3.5 pl-12 pr-10 rounded-xl focus:ring-2 focus:ring-purple-500 cursor-pointer transition-all text-sm md:text-base truncate"
                            >
                                <option value="all">ทุกแผนกวิชา</option>
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

                {/* List */}
                <div className="space-y-12">
                    {sortedDeptKeys.length > 0 ? (
                        sortedDeptKeys.map((deptName, idx) => (
                            <div key={idx} className="anim-enter" style={{ animationDelay: `${idx * 100}ms` }}>

                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                                        {deptName}
                                    </h2>
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                                        {groupedData[deptName].length}
                                    </span>
                                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                                </div>

                                {/* Grid Card */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                    {groupedData[deptName].map((teacher) => (
                                        <div
                                            key={teacher.id}
                                            onClick={() => setSelectedTeacher(teacher)}
                                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center gap-4 md:gap-5 cursor-pointer relative overflow-hidden min-h-35"
                                        >
                                            {/* รูปภาพ */}
                                            <div className="relative shrink-0 self-center">
                                                <div className="w-20 h-24 md:w-24 md:h-28 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-700 group-hover:border-purple-500 transition-colors bg-slate-100 dark:bg-slate-800 shadow-md">
                                                    <img
                                                        src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                        alt={teacher.name}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 items-center justify-center bg-slate-100 dark:bg-slate-800 hidden">
                                                        <User className="text-slate-400 w-10 h-10" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ข้อมูล */}
                                            <div className="min-w-0 flex-1 z-10 pr-2">
                                                <h3 className="font-bold text-slate-800 dark:text-white text-base md:text-lg leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                                    {teacher.name}
                                                </h3>
                                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium mb-1">
                                                    {teacher.position}
                                                </p>

                                                {/* แสดงแผนก */}
                                                <div className="inline-flex items-center gap-1.5 mt-2 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md max-w-full">
                                                    <div className="text-purple-600 dark:text-purple-400 shrink-0">
                                                        <Building2 size={12} />
                                                    </div>
                                                    <span className="text-[10px] md:text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">
                                                        {DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS]}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Icon Badge มุมขวาล่าง Block */}
                                            <div className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 z-10 shadow-sm group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500 transition-colors">
                                                {getDeptIcon(teacher.departmentId)}
                                            </div>

                                            {/* Decoration */}
                                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-linear-to-br from-purple-500/10 to-transparent rounded-full transition-transform group-hover:scale-150"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center anim-enter">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <Search size={36} className="text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                                ไม่พบข้อมูลที่ค้นหา
                            </h3>
                            <button onClick={() => { setSearchTerm(""); setSelectedDept("all"); }} className="mt-6 text-purple-600 dark:text-purple-400 font-bold text-sm hover:underline">
                                ล้างคำค้นหาทั้งหมด
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}