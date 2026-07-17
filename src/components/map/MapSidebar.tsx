import { Building2, Search, X, User, ExternalLink } from "lucide-react";
import type { MapLocation, Teacher } from "../../assets/types";

interface MapSidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    filteredLocations: MapLocation[];
    selectedLocation: MapLocation | null;
    onSelectLocation: (loc: MapLocation) => void;
    searchedTeachers?: Teacher[]; // 🚀 รองรับรับข้อมูลอาจารย์ที่ค้นเจอ
    onSelectTeacher?: (teacher: Teacher) => void;
}

export default function MapSidebar({ isSidebarOpen, setSidebarOpen, filteredLocations, selectedLocation, onSelectLocation, searchedTeachers = [], onSelectTeacher }: MapSidebarProps) {
    return (
        <div className={`absolute z-20 flex flex-col bg-surface border-r border-slate-300 transition-all duration-300 bottom-0 left-0 right-0 rounded-t-3xl max-h-[65vh] md:top-28.5 md:bottom-0 md:left-0 md:w-85 md:rounded-none md:max-h-none md:pt-0 ${isSidebarOpen ? "translate-y-0 md:translate-x-0 opacity-100" : "translate-y-full md:translate-y-0 md:-translate-x-full opacity-0 pointer-events-none"}`}>
            <div className="flex items-center justify-between p-5 border-b border-slate-200 shrink-0 bg-surface">
                <div className="flex items-center gap-3 text-slate-800 font-bold">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Building2 className="text-primary" size={20} />
                    </div>
                    <span className="text-base">{searchedTeachers.length > 0 ? `พบอาจารย์ (${searchedTeachers.length} ท่าน)` : `อาคารเรียน (${filteredLocations.length})`}</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-primary">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2 min-h-0 bg-surface">
                {filteredLocations.length > 0 ? (
                    [...filteredLocations]
                        .sort((a, b) => a.code.localeCompare(b.code))
                        .map((loc) => {
                            const isActive = selectedLocation?.id === loc.id;

                            // 🚀 กรองหาว่ามีอาจารย์คนไหนในคำค้นหา ที่สอนอยู่ที่ตึก (loc) นี้บ้าง?
                            const teachersInThisBuilding = searchedTeachers.filter((t) => (t.locationIds || []).some((id) => String(id).trim().toLowerCase() === String(loc.id).trim().toLowerCase()));

                            return (
                                <div key={loc.id} className={`flex flex-col rounded-2xl transition-all duration-200 border-2 overflow-hidden ${isActive ? "bg-primary/5 border-primary shadow-sm" : "bg-transparent border-transparent hover:border-slate-200"}`}>
                                    {/* 🏢 ส่วนปุ่มตึก (กดเพื่อไฮไลต์และซูมไปที่ตึก) */}
                                    <button onClick={() => onSelectLocation(loc)} className={`w-full flex items-center gap-3 p-3 text-left transition-all ${isActive ? "bg-primary text-white" : "hover:bg-slate-50 text-slate-700"}`}>
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-xs transition-colors border shadow-xs ${isActive ? "bg-secondary text-primary border-secondary" : "bg-slate-100 text-slate-600 border-slate-200/80"}`}>{loc.code}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-sm truncate">{loc.name}</div>
                                            {teachersInThisBuilding.length > 0 && !isActive && (
                                                <div className="text-[11px] font-medium text-primary mt-0.5 flex items-center gap-1">
                                                    <User size={12} /> มีอาจารย์ที่ค้นหาอยู่ {teachersInThisBuilding.length} ท่าน
                                                </div>
                                            )}
                                        </div>
                                    </button>

                                    {/* 👨‍🏫 ส่วนแสดงผลการ์ดอาจารย์แบบ Pro & Clean (จะแสดงก็ต่อเมื่อค้นเจออาจารย์ที่ตึกนี้เท่านั้น!) */}
                                    {teachersInThisBuilding.length > 0 && (
                                        <div className="p-2 space-y-1.5 bg-slate-50/80 border-t border-slate-200/60">
                                            {teachersInThisBuilding.map((teacher) => (
                                                <div
                                                    key={teacher.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSelectTeacher?.(teacher); // กดแล้วเปิด Modal รายละเอียดอาจารย์เลย
                                                    }}
                                                    className="group flex items-center gap-2.5 p-2 bg-white hover:bg-primary/10 border border-slate-200/80 hover:border-primary/30 rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-sm"
                                                >
                                                    {/* รูปอาจารย์ตัวเล็กกระทัดรัด */}
                                                    <img
                                                        src={`https://teacher.pbntc.site/${teacher.id}.jpg`}
                                                        onError={(e) => {
                                                            // ถ้ารูปโหลดไม่ขึ้น ให้ใช้ภาพพื้นหลังสีเทาแทนแบบคลีนๆ
                                                            (e.target as HTMLElement).style.display = "none";
                                                        }}
                                                        className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 bg-slate-100"
                                                        alt={teacher.name}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-bold text-slate-800 truncate group-hover:text-primary transition-colors">{teacher.name}</div>
                                                        <div className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">{teacher.position || "บุคลากร"}</div>
                                                    </div>
                                                    <ExternalLink size={14} className="text-slate-400 group-hover:text-primary shrink-0 mr-1 transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-400 space-y-3 opacity-70">
                        <Search size={36} className="stroke-1" />
                        <span className="text-sm font-medium">ไม่พบข้อมูลที่ค้นหา</span>
                    </div>
                )}
            </div>
        </div>
    );
}
