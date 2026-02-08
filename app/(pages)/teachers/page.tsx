"use client";

import { useState, useMemo, useEffect } from "react";
import {
    Search, Users, Check, Filter, X,
    Zap, Wrench, HardHat, Award, Monitor, Building2, GraduationCap,
    SlidersHorizontal // เพิ่มไอคอนใหม่
} from "lucide-react";
import { teachersData } from "../../data/teachers";
import { DEPARTMENTS } from "../../data/departments";
import type { Teacher } from "../../types";
import TeacherModal from "../../components/ui/TeacherModal";

export default function TeachersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    // 🟢 State สำหรับเปิด/ปิด Filter ในมือถือ
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // ป้องกันการเลื่อนหน้าจอหลักเมื่อเปิด Filter Modal
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileFilterOpen]);

    const allTeachers = useMemo(() => Object.values(teachersData), []);

    const uniqueDepartments = useMemo(() => {
        const depts = new Set(allTeachers.map(t => DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ"));
        return Array.from(depts).sort();
    }, [allTeachers]);

    const filteredGroups = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        const filtered = allTeachers.filter(t => {
            const deptName = DEPARTMENTS[t.departmentId as keyof typeof DEPARTMENTS] || "อื่นๆ";
            const matchesSearch = t.name.toLowerCase().includes(term) || t.position.toLowerCase().includes(term) || deptName.toLowerCase().includes(term);
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

    const sortedDeptKeys = Object.keys(filteredGroups).sort((a, b) => {
        const priority = ["ผู้อำนวยการ", "ผู้บริหาร"];
        const getScore = (name: string) => {
            const idx = priority.findIndex(p => name.includes(p));
            return idx !== -1 ? idx : 999;
        };
        return getScore(a) - getScore(b) || a.localeCompare(b);
    });

    const toggleDept = (dept: string) => {
        setSelectedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]);
    };

    const getDeptIcon = (deptId: string) => {
        const id = deptId.toUpperCase();
        if (id.includes("DIRECTOR") || id.includes("ADMIN")) return <Award size={14} />;
        if (id.includes("ELEC")) return <Zap size={14} />;
        if (id.includes("MECHANIC")) return <Wrench size={14} />;
        if (id.includes("CONSTRUCTION")) return <HardHat size={14} />;
        if (id.includes("COMPUTER")) return <Monitor size={14} />;
        return <Building2 size={14} />;
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 gap-8 pb-24 pt-4 transition-colors duration-300 overflow-x-hidden relative">

            {selectedTeacher && <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />}

            {/* 🟢 HERO SECTION */}
            <section className="px-4 md:px-8 anim-enter">
                <div className="relative rounded-4xl overflow-hidden bg-slate-900 text-white shadow-2xl min-h-100 md:min-h-125 flex items-center group">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105" style={{ backgroundImage: "url('https://img.pbntc.site/sign.jpg')" }}></div>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/70 to-transparent md:bg-linear-to-r md:from-slate-950 md:via-slate-900/80 md:to-transparent"></div>
                    <div className="relative z-10 w-full max-w-4xl px-6 md:px-16 flex flex-col items-center text-center md:items-start md:text-left space-y-4 md:space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                            <Users size={14} /> PBNTC Staff
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                            ทำเนียบบุคลากร <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">PBNTC Map</span>
                        </h1>
                        <p className="text-slate-300 text-sm md:text-base font-light max-w-md md:max-w-xl md:border-l-4 md:border-amber-500/50 md:pl-6 leading-relaxed">
                            สืบค้นข้อมูลคณาจารย์และเจ้าหน้าที่ <br className="hidden md:block" /> วิทยาลัยเทคนิคเพชรบูรณ์
                        </p>
                    </div>
                </div>
            </section>

            {/* 🟢 MAIN CONTENT AREA */}
            <main className="w-full px-4 md:px-8 space-y-8 pb-12">

                {/* Search Bar (Desktop Only - ซ่อนในมือถือเพราะเราจะย้ายไปไว้ในปุ่ม Filter ลอย) */}
                <div className="hidden lg:block bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 anim-enter">
                    <div className="relative flex items-center">
                        <div className="pl-4 text-slate-400"><Search size={20} /></div>
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อครู, ตำแหน่ง, หรือแผนกวิชา..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-4 pr-12 rounded-xl bg-transparent text-slate-900 dark:text-white text-base font-medium focus:outline-none"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="absolute right-4 p-2 text-slate-400 hover:text-red-500 transition-colors">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* 🏷️ FILTER SIDEBAR (Desktop Only) */}
                    <aside className="hidden lg:block w-72 xl:w-80 shrink-0 anim-enter">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm sticky top-8">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                                <Filter size={16} className="text-amber-500" />
                                <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">เลือกแผนก</h3>
                            </div>
                            <div className="space-y-2">
                                <button onClick={() => setSelectedDepts([])} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all border ${selectedDepts.length === 0 ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 hover:border-amber-500/50'}`}>
                                    แสดงทั้งหมด {selectedDepts.length === 0 && <Check size={14} />}
                                </button>
                                <div className="pt-2 flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                                    {uniqueDepartments.map((dept, i) => {
                                        const isSelected = selectedDepts.includes(dept);
                                        return (
                                            <button key={i} onClick={() => toggleDept(dept)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${isSelected ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-600 dark:text-amber-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-500/30'}`}>
                                                <span className="text-left leading-tight truncate">{dept}</span>
                                                <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                                                    {isSelected && <Check size={10} strokeWidth={3} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* 👥 TEACHERS LIST */}
                    <div className="flex-1 space-y-8">
                        {sortedDeptKeys.length > 0 ? (
                            sortedDeptKeys.map((deptName, idx) => (
                                <div key={idx} className="anim-enter" style={{ animationDelay: `${0.1 + (idx * 0.05)}s` }}>
                                    <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                                        <div className="h-5 w-1 bg-amber-500 rounded-full"></div>
                                        <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">{deptName}</h2>
                                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                                            {filteredGroups[deptName].length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {filteredGroups[deptName].map((teacher) => (
                                            <div key={teacher.id} onClick={() => setSelectedTeacher(teacher)} className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center gap-4">
                                                <div className="relative shrink-0">
                                                    <img src={`https://teacher.pbntc.site/${teacher.id}.jpg`} alt={teacher.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-slate-50 dark:border-slate-800 shadow-sm group-hover:scale-105 transition-transform" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('bg-slate-100', 'dark:bg-slate-800', 'rounded-full', 'flex', 'items-center', 'justify-center', 'w-16', 'h-16', 'md:w-20', 'md:h-20'); e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '<svg class="w-8 h-8 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'); }} />
                                                    <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-md border-2 border-white dark:border-slate-900">{getDeptIcon(teacher.departmentId)}</div>
                                                </div>
                                                <div className="flex-1 overflow-hidden min-w-0">
                                                    <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg mb-0.5 group-hover:text-amber-600 transition-colors truncate">{teacher.name}</h3>
                                                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-snug truncate">{teacher.position}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center anim-enter bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <Search size={48} className="text-slate-200 mb-4" />
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">ไม่พบข้อมูลที่ค้นหา</h3>
                                <p className="text-slate-400 text-sm mt-1">กรุณาลองเปลี่ยนคำค้นหา หรือเลือกแผนกใหม่อีกครั้ง</p>
                                <button onClick={() => setIsMobileFilterOpen(true)} className="mt-4 text-amber-500 font-bold underline lg:hidden">ปรับตัวกรอง</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="w-full py-8 text-center anim-enter">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-amber-600">
                        <GraduationCap size={18} />
                        <span className="font-bold text-[10px] uppercase tracking-widest text-slate-500">PBNTC IT Development</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">© 2026 Digital Campus Map Project.</p>
                </div>
            </footer>

            {/* 🟢 MOBILE FLOATING BUTTON - แสดงเฉพาะจอมือถือ */}
            <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="fixed bottom-6 right-6 z-40 lg:hidden bg-slate-900 dark:bg-amber-500 text-white p-4 rounded-full shadow-2xl shadow-slate-900/30 hover:scale-110 active:scale-95 transition-all border-2 border-slate-800 dark:border-white/20"
            >
                {selectedDepts.length > 0 || searchTerm ? (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                ) : null}
                <SlidersHorizontal size={24} />
            </button>

            {/* 🟢 MOBILE FILTER DRAWER - เลื่อนขึ้นมาจากด้านล่าง */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end anim-fade-in">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-950/60" onClick={() => setIsMobileFilterOpen(false)}></div>

                    {/* Drawer Content */}
                    <div className="relative bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] w-full max-h-[85vh] flex flex-col anim-slide-up">

                        {/* Drawer Header */}
                        <div className="flex items-center justify-between p-6 pb-2">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white">ค้นหาและตัวกรอง</h3>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-6 pt-2 overflow-y-auto space-y-6">

                            {/* Search Input ใน Drawer */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">คำค้นหา</label>
                                <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                    <div className="pl-3 text-slate-400"><Search size={20} /></div>
                                    <input
                                        type="text"
                                        placeholder="ชื่อครู, ตำแหน่ง..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full h-10 pl-3 pr-10 bg-transparent text-slate-900 dark:text-white font-medium focus:outline-none"
                                        autoFocus
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm("")} className="absolute right-3 text-slate-400">
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Department List ใน Drawer */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">แผนกวิชา ({uniqueDepartments.length})</label>
                                <div className="grid grid-cols-1 gap-2">
                                    <button
                                        onClick={() => setSelectedDepts([])}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold border transition-all ${selectedDepts.length === 0 ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                                    >
                                        แสดงทั้งหมด {selectedDepts.length === 0 && <Check size={16} />}
                                    </button>

                                    {uniqueDepartments.map((dept, i) => {
                                        const isSelected = selectedDepts.includes(dept);
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => toggleDept(dept)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium border transition-all ${isSelected ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-700 dark:text-amber-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                                            >
                                                {dept}
                                                {isSelected && <div className="bg-amber-500 text-white rounded-md p-0.5"><Check size={12} strokeWidth={3} /></div>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-3xl">
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full py-3 bg-slate-900 dark:bg-amber-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                            >
                                ดูผลลัพธ์ ({Object.values(filteredGroups).reduce((acc, curr) => acc + curr.length, 0)} คน)
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}