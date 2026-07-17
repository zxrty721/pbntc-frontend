import React, { useState, useMemo, useEffect, useDeferredValue } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, Search, X, ChevronLeft, ChevronRight, Maximize2, MapPin, Layers, GraduationCap, Info, ExternalLink, Building2 } from "lucide-react";

import { locations } from "../../assets/data/locations";
import { teachersData } from "../../assets/data/teachers";
import { DEPARTMENTS } from "../../assets/data/departments";
import TeacherModal from "../../components/ui/TeacherModal";
import type { Teacher, MapLocation } from "../../assets/types";

interface DeptCount {
    id: string;
    count: number;
}

/* 🚀 1. สร้าง Component ย่อยสำหรับการ์ดครู และใช้ React.memo เพื่อป้องกันการ Render ซ้ำซ้อนตอนพิมพ์ค้นหา */
const TeacherCard = React.memo(({ teacher, onClick }: { teacher: Teacher; onClick: () => void }) => {
    return (
        <div onClick={onClick} className="group relative bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-4 hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
            <img src={`https://teacher.pbntc.site/${teacher.id}.jpg`} loading="lazy" decoding="async" className="w-14 h-14 rounded-full object-cover bg-slate-200 border-2 border-white shadow-sm shrink-0" alt={teacher.name} />
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-slate-800 truncate group-hover:text-primary transition-colors">{teacher.name}</h4>
                <p className="text-[11px] font-bold text-slate-500 truncate uppercase mt-0.5 group-hover:text-primary/70">{teacher.position}</p>
            </div>
            <div className="text-slate-300 group-hover:text-primary transition-colors shrink-0">
                <ExternalLink size={16} />
            </div>
        </div>
    );
});

export default function LocationDetailPage() {
    const params = useParams();

    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [teacherSearch, setTeacherSearch] = useState("");

    /* 🚀 2. ใช้ DeferredValue หน่วงเวลาการพิมพ์ ไม่ให้ UI ค้าง */
    const deferredSearch = useDeferredValue(teacherSearch);
    const [selectedDept, setSelectedDept] = useState("all");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const location = useMemo(() => {
        if (!params?.id) return undefined;
        return locations.find((l: MapLocation) => String(l.id) === String(params.id));
    }, [params?.id]);

    const teachersInBuilding = useMemo(() => {
        if (!location) return [];
        return (Object.values(teachersData) as Teacher[]).filter((t: Teacher) => t.locationIds?.includes(location.id));
    }, [location]);

    const availableDepartments = useMemo<DeptCount[]>(() => {
        const deptCounts: Record<string, number> = {};
        teachersInBuilding.forEach((t: Teacher) => {
            deptCounts[t.departmentId] = (deptCounts[t.departmentId] || 0) + 1;
        });
        return Object.entries(deptCounts).map(([id, count]) => ({ id, count }));
    }, [teachersInBuilding]);

    const groupedTeachers = useMemo(() => {
        const term = deferredSearch.toLowerCase().trim();
        // 💡 แบ่งคำค้นหาด้วยช่องว่างเช่นเดียวกัน
        const searchWords = term.split(/\s+/).filter(Boolean);

        const filtered = teachersInBuilding.filter((t: Teacher) => {
            // 🚀 เอารายละเอียดครูมารวมกัน แล้วเช็คว่าตรงกับคำค้นหาทุกคำหรือไม่
            const fullTeacherText = `${t.title || ""} ${t.firstName || ""} ${t.lastName || ""} ${t.name || ""} ${t.position || ""}`.toLowerCase();
            const matchSearch = searchWords.every((word) => fullTeacherText.includes(word));

            const matchDept = selectedDept === "all" || t.departmentId === selectedDept;

            return matchSearch && matchDept;
        });

        const groups: Record<string, Teacher[]> = {};
        filtered.forEach((t: Teacher) => {
            if (!groups[t.departmentId]) groups[t.departmentId] = [];
            groups[t.departmentId].push(t);
        });

        return groups;
    }, [teachersInBuilding, deferredSearch, selectedDept]);

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

    const galleryImages = location.images && location.images.length > 0 ? location.images : ["default.jpg"];
    const currentImageSrc = `https://zone.pbntc.site/${galleryImages[currentImageIndex]}`;

    return (
        <div className="flex flex-col min-h-screen pb-20 transition-colors duration-200 font-sans overflow-x-hidden bg-primary-dark">
            <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />

            {/* LIGHTBOX (ไม่มี Backdrop Blur ตามที่กำหนด) */}
            {isLightboxOpen && (
                <div className="fixed inset-0 bg-black/95 flex items-center justify-center animate-in fade-in duration-200 z-100">
                    <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-primary rounded-full text-white z-50 transition-colors">
                        <X size={24} />
                    </button>
                    {galleryImages.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-6 p-4 bg-white/10 hover:bg-primary rounded-full text-white z-50 transition-colors">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={nextImage} className="absolute right-6 p-4 bg-white/10 hover:bg-primary rounded-full text-white z-50 transition-colors">
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}
                    <img src={currentImageSrc} alt={location.name} className="object-contain rounded-lg shadow-2xl" style={{ maxWidth: "95vw", maxHeight: "85vh" }} />
                    <div className="absolute bottom-8 px-6 py-2 bg-black/50 text-white font-mono text-sm rounded-full border border-white/10">
                        {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                </div>
            )}

            {/* HERO SLIDER */}
            <section className="relative w-full bg-primary-dark group z-10 overflow-hidden">
                <div className="relative w-full h-[45vh] min-h-87.5 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out" style={{ backgroundImage: `url('${currentImageSrc}')` }}></div>

                    {/* เงาดำบางๆ 40% และไล่สีแดงที่ขอบล่างให้เข้ากับพื้นหลัง */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-primary-dark to-transparent"></div>

                    <div className="relative z-20 p-4 w-full">
                        <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-white hover:text-primary-dark rounded-full text-white text-xs font-black uppercase transition-all shadow-sm w-fit border border-white/10">
                            <ArrowLeft size={14} /> กลับสู่แผนที่
                        </Link>
                    </div>

                    <div className="relative z-20 w-full p-5 pb-12 sm:p-6 md:p-10 md:pb-16 mt-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-7xl mx-auto">
                            <div className="space-y-2 max-w-4xl w-full">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-primary-dark text-xs font-black uppercase rounded-lg shadow-md">
                                    <Building2 size={14} /> อาคาร {location.code}
                                </span>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-xl">{location.name}</h1>
                                <p className="text-secondary-light text-xs md:text-sm font-bold flex items-center gap-1.5 drop-shadow-md">
                                    <MapPin size={16} /> วิทยาลัยเทคนิคเพชรบูรณ์ (PBNTC)
                                </p>
                            </div>
                            <button onClick={() => setIsLightboxOpen(true)} className="px-5 py-2.5 bg-white/20 hover:bg-white hover:text-primary-dark text-white text-xs font-bold uppercase rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95 w-fit shrink-0 mt-2 md:mt-0 backdrop-filter-none">
                                <Maximize2 size={16} /> เปิดดูรูปขยาย
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 -mt-7.5 relative z-20 space-y-6">
                <div className="bg-surface rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-6 md:p-8 w-full overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center gap-2 text-primary border-b-2 border-primary/10 pb-3">
                                <Info size={20} />
                                <h2 className="text-base font-black uppercase tracking-widest text-slate-800">ข้อมูลอาคาร</h2>
                            </div>
                            <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">{location.description || "อาคารเรียนและปฏิบัติการหลัก รองรับการเรียนการสอนหลากหลายสาขาวิชา พร้อมอุปกรณ์และครุภัณฑ์ที่ทันสมัย เพื่อพัฒนาทักษะวิชาชีพของผู้เรียน"}</p>
                        </div>

                        <div className="lg:col-span-4 space-y-4">
                            <div className="flex items-center gap-2 text-primary border-b-2 border-primary/10 pb-3">
                                <Layers size={20} />
                                <h3 className="text-base font-black uppercase tracking-widest text-slate-800">สิ่งอำนวยความสะดวก</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                                {location.facilities?.map((fac, i) => (
                                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl">
                                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                                        <span className="text-sm font-bold text-primary-dark">{fac}</span>
                                    </div>
                                ))}
                                {!location.facilities?.length && <span className="text-sm text-slate-400 italic px-2">ไม่มีข้อมูล</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-surface rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-6 md:p-8 space-y-8 w-full overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-primary-dark uppercase tracking-tight flex items-center gap-3">
                                <span className="w-2.5 h-8 bg-secondary rounded-full"></span>
                                บุคลากรประจำอาคาร
                            </h2>
                            <p className="text-sm text-slate-500 font-medium pl-5">ค้นหารายชื่อครูและเจ้าหน้าที่ในอาคารนี้</p>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-1 lg:flex-none lg:min-w-105">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input type="text" placeholder="ค้นหาชื่อครู..." className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" onChange={(e) => setTeacherSearch(e.target.value)} />
                            </div>
                            <select className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer sm:w-60" onChange={(e) => setSelectedDept(e.target.value)}>
                                <option value="all">ทุกแผนกวิชา</option>
                                {availableDepartments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {DEPARTMENTS[dept.id as keyof typeof DEPARTMENTS]} ({dept.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-8">
                        {Object.entries(groupedTeachers).map(([deptId, teachers]) => (
                            <div key={deptId} className="space-y-4">
                                <h3 className="text-sm font-black text-primary bg-primary/5 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-primary/10">
                                    <GraduationCap size={18} />
                                    {DEPARTMENTS[deptId as keyof typeof DEPARTMENTS]}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {teachers.map((teacher) => (
                                        /* 🚀 3. เรียกใช้งาน TeacherCard ตรงนี้แทน div เดิม */
                                        <TeacherCard key={teacher.id} teacher={teacher} onClick={() => setSelectedTeacher(teacher)} />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {Object.keys(groupedTeachers).length === 0 && (
                            <div className="py-12 text-center bg-surface rounded-2xl border-2 border-dashed border-slate-200">
                                <Search size={40} className="mx-auto text-slate-300 mb-2 opacity-60" />
                                <h3 className="text-sm font-black text-slate-500">ไม่พบข้อมูลบุคลากรที่ค้นหา</h3>
                            </div>
                        )}
                    </div>
                </div>

                <section className="bg-surface rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative overflow-hidden w-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="text-center sm:text-left relative z-10 w-full">
                        <h2 className="text-lg md:text-xl font-black text-slate-800">ต้องการข้อมูลเพิ่มเติมเกี่ยวกับอาคารนี้?</h2>
                        <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">ติดต่อฝ่ายประชาสัมพันธ์ วิทยาลัยเทคนิคเพชรบูรณ์</p>
                    </div>
                    <a href="tel:056711455" className="relative z-10 px-6 py-3 bg-secondary hover:bg-secondary-light text-primary-dark font-black text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95 shrink-0">
                        <Phone size={18} /> 056-711455
                    </a>
                </section>
            </main>

            <footer className="w-full py-10 mt-10 text-center relative z-20">
                <div className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-surface rounded-full text-primary-dark text-xs font-black uppercase tracking-widest shadow-md">
                    <GraduationCap size={16} className="text-primary" /> PBNTC Map Project
                </div>
            </footer>
        </div>
    );
}
