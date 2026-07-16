// "use client";
// export const runtime = "edge";

// import { useState, useMemo, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, Phone, Search, X, ChevronLeft, ChevronRight, Maximize2, MapPin, Layers, GraduationCap, Info, ExternalLink, Building2 } from "lucide-react";

// import { locations } from "../../../assets/data/locations";
// import { teachersData } from "../../../assets/data/teachers";
// import { DEPARTMENTS } from "../../../assets/data/departments";
// import TeacherModal from "../../../components/ui/TeacherModal";
// import type { Teacher } from "../../../assets/types";

// interface DeptCount {
//     id: string;
//     count: number;
// }

// export default function LocationDetailPage() {
//     const params = useParams();

//     const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
//     const [teacherSearch, setTeacherSearch] = useState("");
//     const [selectedDept, setSelectedDept] = useState("all");
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [isLightboxOpen, setIsLightboxOpen] = useState(false);

//     const location = useMemo(() => {
//         if (!params?.id) return undefined;
//         // 🟢 แก้ไข: เช็คให้รองรับแบบ String (เผื่อรหัสอาคารเป็นอักษร) จะได้ไม่บัค
//         return locations.find((l) => String(l.id) === String(params.id));
//     }, [params?.id]);

//     const teachersInBuilding = useMemo(() => {
//         if (!location) return [];
//         return Object.values(teachersData).filter((t) => t.locationIds?.includes(location.id));
//     }, [location]);

//     const availableDepartments = useMemo<DeptCount[]>(() => {
//         const deptCounts: Record<string, number> = {};
//         teachersInBuilding.forEach((t) => {
//             deptCounts[t.departmentId] = (deptCounts[t.departmentId] || 0) + 1;
//         });
//         return Object.entries(deptCounts).map(([id, count]) => ({ id, count }));
//     }, [teachersInBuilding]);

//     const groupedTeachers = useMemo(() => {
//         const term = teacherSearch.toLowerCase().trim();
//         const filtered = teachersInBuilding.filter((t) => (t.name.toLowerCase().includes(term) || t.position.toLowerCase().includes(term)) && (selectedDept === "all" || t.departmentId === selectedDept));
//         const groups: Record<string, Teacher[]> = {};
//         filtered.forEach((t) => {
//             if (!groups[t.departmentId]) groups[t.departmentId] = [];
//             groups[t.departmentId].push(t);
//         });
//         return groups;
//     }, [teachersInBuilding, teacherSearch, selectedDept]);

//     const nextImage = (e?: React.MouseEvent) => {
//         e?.stopPropagation();
//         if (!location?.images?.length) return;
//         setCurrentImageIndex((prev) => (prev + 1) % location.images!.length);
//     };

//     const prevImage = (e?: React.MouseEvent) => {
//         e?.stopPropagation();
//         if (!location?.images?.length) return;
//         setCurrentImageIndex((prev) => (prev - 1 + location.images!.length) % location.images!.length);
//     };

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === "ArrowRight") nextImage();
//             if (e.key === "ArrowLeft") prevImage();
//         };
//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, [location]);

//     if (!location) return null;

//     const galleryImages = location.images && location.images.length > 0 ? location.images : ["default.jpg"];
//     const currentImageSrc = `https://zone.pbntc.site/${galleryImages[currentImageIndex]}`;

//     return (
//         <div className="flex flex-col min-h-screen pb-20 transition-colors duration-200 font-sans" style={{ backgroundColor: "var(--color-app-bg)" }}>
//             <TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />

//             {/* 🟢 LIGHTBOX (เอา z-[100], max-w-[95vw], max-h-[85vh] ไปไว้ใน style) */}
//             {isLightboxOpen && (
//                 <div className="fixed inset-0 bg-black/95 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-200" style={{ zIndex: 100 }}>
//                     <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-red-500 rounded-full text-white z-50 transition-colors">
//                         <X size={24} />
//                     </button>
//                     {galleryImages.length > 1 && (
//                         <>
//                             <button onClick={prevImage} className="absolute left-6 p-4 bg-white/10 hover:bg-primary rounded-full text-white z-50 transition-colors">
//                                 <ChevronLeft size={32} />
//                             </button>
//                             <button onClick={nextImage} className="absolute right-6 p-4 bg-white/10 hover:bg-primary rounded-full text-white z-50 transition-colors">
//                                 <ChevronRight size={32} />
//                             </button>
//                         </>
//                     )}
//                     <img src={currentImageSrc} alt={location.name} className="object-contain rounded-lg shadow-2xl" style={{ maxWidth: "95vw", maxHeight: "85vh" }} />
//                     <div className="absolute bottom-8 px-6 py-2 bg-black/50 text-white font-mono text-sm rounded-full backdrop-blur-md border border-white/10">
//                         {currentImageIndex + 1} / {galleryImages.length}
//                     </div>
//                 </div>
//             )}

//             {/* 🟢 1. HERO SLIDER (เอา h-120 และ lg:h-137.5 ไปไว้ใน style) */}
//             <section className="relative w-full bg-primary-dark group">
//                 <div className="relative w-full h-80 overflow-hidden" style={{ height: "min(35rem, 60vh)" }}>
//                     <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out" style={{ backgroundImage: `url('${currentImageSrc}')` }}></div>

//                     <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-primary-dark via-primary-dark/70 to-transparent"></div>
//                     <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

//                     <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
//                         <Link href="/app" className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-primary hover:text-white rounded-full text-white text-xs font-black uppercase transition-all border border-white/15 backdrop-blur-md shadow-sm">
//                             <ArrowLeft size={14} /> กลับสู่แผนที่
//                         </Link>

//                         {galleryImages.length > 1 && (
//                             <div className="hidden md:flex px-3 py-1 bg-black/40 rounded-full text-white text-xs font-mono backdrop-blur-md border border-white/10">
//                                 {currentImageIndex + 1} / {galleryImages.length}
//                             </div>
//                         )}
//                     </div>

//                     {galleryImages.length > 1 && (
//                         <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-6 pointer-events-none">
//                             <button onClick={prevImage} className="pointer-events-auto p-3 rounded-full bg-black/30 hover:bg-primary text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-md">
//                                 <ChevronLeft size={24} />
//                             </button>
//                             <button onClick={nextImage} className="pointer-events-auto p-3 rounded-full bg-black/30 hover:bg-primary text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-md">
//                                 <ChevronRight size={24} />
//                             </button>
//                         </div>
//                     )}

//                     <div className="absolute bottom-0 left-0 w-full p-4 md:p-10 z-10">
//                         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//                             <div className="space-y-1.5 max-w-4xl">
//                                 <div className="flex flex-wrap items-center gap-2">
//                                     <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-primary-dark text-xs font-black uppercase rounded-md shadow-md">
//                                         <Building2 size={14} /> อาคาร {location.code}
//                                     </span>
//                                     {galleryImages.length > 1 && (
//                                         <span className="md:hidden px-2 py-0.5 bg-black/40 text-white text-xs rounded backdrop-blur-md border border-white/10">
//                                             {currentImageIndex + 1}/{galleryImages.length}
//                                         </span>
//                                     )}
//                                 </div>

//                                 <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-xl py-1">{location.name}</h1>
//                                 <p className="text-slate-200 text-xs md:text-sm font-bold flex items-center gap-1.5 opacity-90">
//                                     <MapPin size={16} className="text-secondary" /> วิทยาลัยเทคนิคเพชรบูรณ์ (PBNTC)
//                                 </p>
//                             </div>

//                             <button onClick={() => setIsLightboxOpen(true)} className="self-start md:self-end px-5 py-2.5 bg-white/15 hover:bg-primary text-white text-xs font-bold uppercase rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 shrink-0 mb-1 shadow-lg active:scale-95">
//                                 <Maximize2 size={16} /> <span className="hidden sm:inline">เปิดดู</span>รูปขยาย
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* 🟢 2. MAIN CONTENT (เปลี่ยน max-w-[1280px] เป็น max-w-7xl) */}
//             <main className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-10">
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
//                     <div className="lg:col-span-8 space-y-3">
//                         <div className="flex items-center gap-2 text-slate-500 border-b border-slate-200/80 pb-2">
//                             <Info size={18} className="text-primary" />
//                             <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">ข้อมูลอาคาร</h2>
//                         </div>
//                         <div className="bg-surface p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
//                             <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">{location.description || "อาคารเรียนและปฏิบัติการหลัก รองรับการเรียนการสอนหลากหลายสาขาวิชา พร้อมอุปกรณ์และครุภัณฑ์ที่ทันสมัย เพื่อพัฒนาทักษะวิชาชีพของผู้เรียน"}</p>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-4 space-y-3">
//                         <div className="flex items-center gap-2 text-slate-500 border-b border-slate-200/80 pb-2">
//                             <Layers size={18} className="text-primary" />
//                             <h3 className="text-sm font-black uppercase tracking-widest text-slate-700">สิ่งอำนวยความสะดวก</h3>
//                         </div>
//                         <div className="flex flex-wrap gap-2 content-start pt-1">
//                             {location.facilities?.map((fac, i) => (
//                                 <div key={i} className="flex items-center gap-2 px-3.5 py-2 bg-surface border border-slate-200/80 rounded-xl shadow-xs">
//                                     <div className="w-2 h-2 rounded-full bg-primary"></div>
//                                     <span className="text-xs md:text-sm font-bold text-slate-700">{fac}</span>
//                                 </div>
//                             ))}
//                             {!location.facilities?.length && <span className="text-sm text-slate-400 italic px-2 py-4">ไม่มีข้อมูลสิ่งอำนวยความสะดวก</span>}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="h-px w-full bg-slate-200/80"></div>

//                 <section className="space-y-8">
//                     <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
//                         <div className="space-y-1">
//                             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
//                                 <span className="w-2.5 h-8 bg-primary rounded-full"></span>
//                                 บุคลากรประจำอาคาร
//                             </h2>
//                             <p className="text-sm text-slate-500 font-bold pl-5">ค้นหารายชื่อครูและเจ้าหน้าที่ในอาคารนี้</p>
//                         </div>

//                         {/* 🟢 เปลี่ยน min-w-[420px] ไปเป็น style */}
//                         <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-1 lg:flex-none" style={{ minWidth: "420px" }}>
//                             <div className="relative flex-1">
//                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                                 <input type="text" placeholder="ค้นหาชื่อครู หรือตำแหน่งงาน..." className="w-full pl-11 pr-4 py-3 bg-surface border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs" onChange={(e) => setTeacherSearch(e.target.value)} />
//                             </div>
//                             <select className="px-4 py-3 bg-surface border border-slate-200/80 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-xs sm:w-60" onChange={(e) => setSelectedDept(e.target.value)}>
//                                 <option value="all">ทุกแผนกวิชา</option>
//                                 {availableDepartments.map((dept) => (
//                                     <option key={dept.id} value={dept.id}>
//                                         {DEPARTMENTS[dept.id as keyof typeof DEPARTMENTS]} ({dept.count})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="grid gap-8">
//                         {Object.entries(groupedTeachers).map(([deptId, teachers]) => (
//                             <div key={deptId} className="space-y-3">
//                                 <h3 className="text-xs font-black text-primary-dark uppercase tracking-wider border-b border-slate-200/80 pb-2 flex items-center gap-2">
//                                     <GraduationCap size={16} className="text-primary" />
//                                     {DEPARTMENTS[deptId as keyof typeof DEPARTMENTS]}
//                                 </h3>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                                     {teachers.map((teacher) => (
//                                         <div key={teacher.id} onClick={() => setSelectedTeacher(teacher)} className="group relative bg-surface border border-slate-200/80 p-4 rounded-2xl flex items-center gap-4 hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
//                                             <img src={`https://teacher.pbntc.site/${teacher.id}.jpg`} className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-100 shrink-0" alt={teacher.name} />
//                                             <div className="flex-1 min-w-0">
//                                                 <h4 className="text-sm font-black text-slate-800 truncate group-hover:text-primary transition-colors">{teacher.name}</h4>
//                                                 {/* 🟢 เคลียร์ text-[11px] เป็น text-xs */}
//                                                 <p className="text-xs font-bold text-slate-500 truncate uppercase mt-0.5">{teacher.position}</p>
//                                             </div>
//                                             <div className="text-slate-300 group-hover:text-primary transition-colors shrink-0">
//                                                 <ExternalLink size={16} />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}

//                         {Object.keys(groupedTeachers).length === 0 && (
//                             <div className="py-16 text-center bg-surface/60 rounded-2xl border-2 border-dashed border-slate-200">
//                                 <Search size={48} className="mx-auto text-slate-300 mb-3 opacity-60" />
//                                 <h3 className="text-base font-black text-slate-500">ไม่พบข้อมูลบุคลากรที่ค้นหา</h3>
//                                 <p className="text-xs font-bold text-slate-400 mt-1">ลองเปลี่ยนคำค้นหา หรือเลือกดูทุกแผนกวิชา</p>
//                             </div>
//                         )}
//                     </div>
//                 </section>

//                 <section className="bg-primary-dark rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden text-white">
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

//                     <div className="text-center sm:text-left relative z-10">
//                         <h2 className="text-lg md:text-xl font-black">ต้องการข้อมูลเพิ่มเติมเกี่ยวกับอาคารนี้?</h2>
//                         <p className="text-xs md:text-sm text-slate-300 font-bold mt-1">ติดต่อฝ่ายประชาสัมพันธ์ วิทยาลัยเทคนิคเพชรบูรณ์</p>
//                     </div>
//                     <a href="tel:056711455" className="relative z-10 px-6 py-3 bg-secondary hover:bg-secondary/90 text-primary-dark font-black text-xs md:text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg active:scale-95 shrink-0">
//                         <Phone size={18} /> 056-711455
//                     </a>
//                 </section>
//             </main>

//             <footer className="w-full py-10 text-center opacity-60">
//                 <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-black uppercase tracking-wider">
//                     <GraduationCap size={16} className="text-primary" /> PBNTC Map Project
//                 </div>
//             </footer>
//         </div>
//     );
// }
