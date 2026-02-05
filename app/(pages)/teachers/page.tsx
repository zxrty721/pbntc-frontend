"use client";

import { useState, useMemo } from "react";
import {
    Search, Users, Check, Filter, X,
    Zap, Wrench, HardHat, Calculator, Monitor, Briefcase,
    Utensils, Plane, Scissors, BookOpen, Award, Megaphone,
    Library, PenTool, Building2
} from "lucide-react";
import { teachersData } from "../../data/teachers";
import { DEPARTMENTS } from "../../data/departments";
import type { Teacher } from "../../types";
import TeacherModal from "../../components/ui/TeacherModal";

export default function TeachersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    const allTeachers = useMemo(() => Object.values(teachersData), []);

    const uniqueDepartments = useMemo(() => {
        const depts = new Set(allTeachers.map(t => {
            return DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";
        }));
        return Array.from(depts).sort();
    }, [allTeachers]);

    const groupedData = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();

        const filtered = allTeachers.filter(t => {
            const deptName = DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";
            const matchesSearch =
                t.name.toLowerCase().includes(term) ||
                t.position.toLowerCase().includes(term) ||
                deptName.toLowerCase().includes(term);
            const matchesDept = selectedDepts.length === 0 || selectedDepts.includes(deptName);
            return matchesSearch && matchesDept;
        });

        const groups: Record<string, Teacher[]> = {};
        filtered.forEach(teacher => {
            const deptName = DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";
            if (!groups[deptName]) groups[deptName] = [];
            groups[deptName].push(teacher);
        });
        return groups;
    }, [allTeachers, searchTerm, selectedDepts]);

    const sortedDeptKeys = Object.keys(groupedData).sort((a, b) => {
        const priority = ["ผู้อำนวยการ", "ผู้บริหาร", "ฝ่ายบริหาร"];
        const getScore = (name: string) => {
            const idx = priority.findIndex(p => name.includes(p));
            return idx !== -1 ? idx : 999;
        };
        return getScore(a) - getScore(b) || a.localeCompare(b);
    });

    const toggleDept = (dept: string) => {
        setSelectedDepts(prev =>
            prev.includes(dept)
                ? prev.filter(d => d !== dept)
                : [...prev, dept]
        );
    };

    const clearFilters = () => {
        setSelectedDepts([]);
        setSearchTerm("");
    };

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

            {selectedTeacher && (
                <TeacherModal
                    teacher={selectedTeacher}
                    onClose={() => setSelectedTeacher(null)}
                />
            )}

            {/* Header */}
            <div className="relative w-full py-16 bg-slate-900 flex flex-col items-center justify-center overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0">
                    <img
                        src="https://img.pbntc.site/khun.webp"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20 blur-[1px]"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-slate-900/40"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto space-y-4 px-4">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 border border-amber-500/50 rounded-full shadow-lg backdrop-blur-md">
                        <Users size={14} /> Official Project Team
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl tracking-tight">
                        บุคลากร<span className="text-amber-400">ครู</span>และเจ้าหน้าที่
                    </h1>
                </div>
            </div>

            {/* Search Section */}
            <div className="relative z-20 -mt-8 px-4 mb-8">
                <div className="w-full max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-700 p-2">
                    <div className="relative flex items-center">
                        <div className="pl-4 text-slate-400">
                            <Search size={24} />
                        </div>
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อครู, แผนก, หรือตำแหน่ง..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-14 pl-4 pr-12 rounded-xl bg-transparent text-slate-800 dark:text-white text-lg font-medium placeholder:text-slate-400 focus:outline-none"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grow w-full px-4 md:px-6 pb-20">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ✅ SIDEBAR FILTER (ซ้ายสุด) */}
                    {/* แก้ไข: เอา sticky ออกแล้ว เพื่อให้เลื่อนลงไปดูรายการยาวๆ ได้ */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                                <Filter size={20} className="text-amber-500" />
                                <h3 className="font-bold text-slate-800 dark:text-white">คัดกรองแผนก</h3>
                            </div>

                            <div className="space-y-1.5">
                                <label className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${selectedDepts.length === 0 ? 'bg-amber-50 dark:bg-amber-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${selectedDepts.length === 0 ? 'bg-amber-500 border-amber-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                        {selectedDepts.length === 0 && <Check size={14} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={selectedDepts.length === 0} onChange={() => setSelectedDepts([])} />
                                    <span className={`text-sm font-medium leading-tight ${selectedDepts.length === 0 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                        แสดงทั้งหมด
                                    </span>
                                </label>

                                {uniqueDepartments.map((dept, i) => {
                                    const isSelected = selectedDepts.includes(dept);
                                    return (
                                        <label key={i} className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-purple-50 dark:bg-purple-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-purple-600 border-purple-600' : 'border-slate-300 dark:border-slate-600'}`}>
                                                {isSelected && <Check size={14} className="text-white" />}
                                            </div>
                                            <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleDept(dept)} />
                                            <span className={`text-sm font-medium leading-tight ${isSelected ? 'text-purple-700 dark:text-purple-300' : 'text-slate-600 dark:text-slate-400'}`}>
                                                {dept}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* ✅ TEACHER DISPLAY AREA (ขวา) */}
                    <div className="flex-1 w-full">
                        {sortedDeptKeys.length > 0 ? (
                            sortedDeptKeys.map((deptName, idx) => (
                                <div key={idx} className="mb-10 anim-enter" style={{ animationDelay: `${idx * 50}ms` }}>

                                    {/* Section Header */}
                                    <div className="flex items-center gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <div className="h-6 w-1 bg-amber-500 rounded-full"></div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {deptName}
                                        </h2>
                                        <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-md">
                                            {groupedData[deptName].length}
                                        </span>
                                    </div>

                                    {/* ✅ Flex Layout: จัดกลาง + เรียงสวย */}
                                    <div className="flex flex-wrap justify-center gap-6">
                                        {groupedData[deptName].map((teacher) => (
                                            <div
                                                key={teacher.id}
                                                onClick={() => setSelectedTeacher(teacher)}
                                                className="w-full sm:w-65 group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center p-6 text-center"
                                            >
                                                <div className="relative w-28 h-28 mb-4">
                                                    <img
                                                        src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                        alt={teacher.name}
                                                        className="w-full h-full object-cover rounded-full border-4 border-slate-50 dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.parentElement?.classList.add('bg-slate-100', 'dark:bg-slate-800', 'rounded-full', 'flex', 'items-center', 'justify-center');
                                                            e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<svg class="w-12 h-12 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>');
                                                        }}
                                                    />
                                                    <div className="absolute bottom-1 right-1 bg-white dark:bg-slate-800 rounded-full p-1.5 border border-slate-100 dark:border-slate-700 text-amber-500 shadow-sm">
                                                        {getDeptIcon(teacher.departmentId)}
                                                    </div>
                                                </div>

                                                <div className="w-full">
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1">
                                                        {teacher.name}
                                                    </h3>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[2.5em]">
                                                        {teacher.position}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <Search size={48} className="text-slate-300 mb-4" />
                                <h3 className="text-lg font-bold text-slate-700 dark:text-white">ไม่พบข้อมูล</h3>
                                <p className="text-slate-500 text-sm mb-4">ลองเปลี่ยนคำค้นหาหรือเลือกแผนกใหม่</p>
                                <button onClick={clearFilters} className="text-amber-600 font-medium hover:underline">
                                    ล้างตัวกรองทั้งหมด
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}