import { Building2, Search, X, User, ExternalLink, Share2, Check } from "lucide-react";
import { useState, useMemo } from "react"; // 🚀 CPU Optimization: เพิ่ม useMemo
import type { MapLocation, Teacher } from "../../assets/types";

interface MapSidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    filteredLocations: MapLocation[];
    selectedLocation: MapLocation | null;
    onSelectLocation: (loc: MapLocation) => void;
    searchedTeachers?: Teacher[];
    onSelectTeacher?: (teacher: Teacher) => void;
}

const BADGE_COLORS = [
    { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
    { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
    { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
    { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
    { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
    { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-200" },
    { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
];

// 🚀 CPU Optimization: Cache ผลการคำนวณสี ลดภาระ CPU ในการคำนวณ Hash สำหรับ 100+ ตึก
const colorCache = new Map<string, typeof BADGE_COLORS[0]>();

const getColorForId = (id: string | number) => {
    const stringId = String(id);
    if (colorCache.has(stringId)) return colorCache.get(stringId)!; // ดึงค่าที่เคยคิดแล้วมาใช้ทันที

    let hash = 0;
    for (let i = 0; i < stringId.length; i++) {
        hash = stringId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % BADGE_COLORS.length;
    const color = BADGE_COLORS[index];
    
    colorCache.set(stringId, color); // บันทึกค่าไว้ใช้รอบหน้า
    return color;
};

export default function MapSidebar({ isSidebarOpen, setSidebarOpen, filteredLocations, selectedLocation, onSelectLocation, searchedTeachers = [], onSelectTeacher }: MapSidebarProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // 🚀 CPU Optimization: ใช้ useMemo ป้องกันการ .sort() ใหม่ทุกๆ รอบที่ Render 
    const sortedLocations = useMemo(() => {
        return [...filteredLocations].sort((a, b) => a.code.localeCompare(b.code));
    }, [filteredLocations]);

    const handleCopyLink = (e: React.MouseEvent, locId: string | number) => {
        e.stopPropagation();
        const url = `${window.location.origin}${window.location.pathname}?loc=${locId}`;
        navigator.clipboard.writeText(url);

        setCopiedId(String(locId));
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div
            className={`absolute z-30 flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-out
            bottom-0 left-0 right-0 rounded-t-3xl max-h-[75vh] min-h-[50vh]
            md:top-28 md:bottom-0 md:left-0 md:w-85 md:rounded-none md:max-h-none md:border-r md:border-slate-300
            transform-gpu will-change-transform /* 🚀 GPU Optimization: ให้การ์ดจอรับผิดชอบ Animation นี้ */
            ${isSidebarOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:-translate-x-full"}
        `}
        >
            <div className="flex flex-col shrink-0 bg-white z-10 border-b border-slate-200 rounded-t-3xl md:rounded-none">
                <div className="w-full flex justify-center pt-2.5 pb-1 md:hidden cursor-grab active:cursor-grabbing" onClick={() => setSidebarOpen(false)}>
                    <div className="w-10 h-1.5 bg-slate-200 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between px-4 pb-3 md:pt-4 md:px-5">
                    <div className="flex items-center gap-2.5 text-slate-800 font-black">
                        <div className="p-1.5 md:p-2 bg-primary/10 rounded-lg md:rounded-xl">
                            <Building2 className="text-primary w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <span className="text-sm md:text-base tracking-tight">{searchedTeachers.length > 0 ? `พบอาจารย์ (${searchedTeachers.length} ท่าน)` : `รายชื่ออาคาร (${filteredLocations.length})`}</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="p-1.5 bg-slate-100 text-slate-500 rounded-full hover:bg-primary/10 hover:text-primary transition-colors active:scale-95">
                        <X size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-4 space-y-3 bg-slate-50/80 pb-16 md:pb-6">
                {sortedLocations.length > 0 ? ( // 🚀 เรียกใช้ข้อมูลที่ถูก sort เอาไว้ใน useMemo แล้ว
                    sortedLocations.map((loc) => {
                            const isActive = selectedLocation?.id === loc.id;
                            const teachersInThisBuilding = searchedTeachers.filter((t) => (t.locationIds || []).some((id) => String(id).trim().toLowerCase() === String(loc.id).trim().toLowerCase()));
                            const isCopied = copiedId === String(loc.id);

                            const badgeColor = getColorForId(loc.id); // จะทำงานเร็วขึ้นมากเพราะดึงจาก Cache

                            return (
                                <div key={loc.id} className={`flex flex-col rounded-2xl transition-all duration-300 border-2 overflow-hidden bg-white shadow-xs hover:shadow-md ${isActive ? "border-primary shadow-primary/10" : "border-slate-100 hover:border-primary/30"}`}>
                                    <div role="button" onClick={() => onSelectLocation(loc)} className={`w-full flex items-center gap-3 p-3 md:p-3.5 text-left transition-all cursor-pointer ${isActive ? "bg-primary text-white" : "hover:bg-slate-50 text-slate-700"}`}>
                                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm transition-all shadow-xs border ${isActive ? "bg-secondary text-primary-dark border-secondary" : `${badgeColor.bg} ${badgeColor.text} ${badgeColor.border}`}`}>{loc.code}</div>

                                        <div className="flex-1 min-w-0">
                                            <div className={`font-black text-sm truncate ${isActive ? "text-white" : "text-slate-800"}`}>{loc.name}</div>
                                            {teachersInThisBuilding.length > 0 && !isActive && (
                                                <div className="text-[11px] font-bold text-primary mt-1 flex items-center gap-1.5 bg-primary/5 w-fit px-2 py-0.5 rounded-md">
                                                    <User size={12} /> พบ {teachersInThisBuilding.length} ท่าน
                                                </div>
                                            )}
                                        </div>

                                        <button onClick={(e) => handleCopyLink(e, loc.id)} className={`p-2 rounded-xl transition-all active:scale-90 shadow-xs ${isActive ? "bg-white/10 text-white hover:bg-white/20 border border-white/20" : "bg-white text-slate-400 hover:bg-slate-100 hover:text-primary border border-slate-200"}`} title="คัดลอกลิงก์ไปยังอาคารนี้">
                                            {isCopied ? <Check size={16} className={isActive ? "text-secondary" : "text-green-600"} strokeWidth={3} /> : <Share2 size={16} />}
                                        </button>
                                    </div>

                                    {teachersInThisBuilding.length > 0 && (
                                        <div className={`p-3 space-y-2 border-t ${isActive ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-100"}`}>
                                            {teachersInThisBuilding.map((teacher) => (
                                                <div
                                                    key={teacher.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onSelectTeacher?.(teacher);
                                                    }}
                                                    className={`group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all shadow-sm border ${isActive ? "bg-white hover:bg-primary/5 border-primary/20 hover:border-primary/40 text-slate-800" : "bg-white hover:bg-primary/5 border-slate-200/80 hover:border-primary/20 text-slate-700"}`}
                                                >
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-colors ${isActive ? "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white" : "bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-primary group-hover:text-white group-hover:border-primary"}`}>
                                                        <User size={16} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-bold truncate transition-colors">{teacher.name}</div>
                                                        <div className={`text-[10px] font-semibold truncate mt-0.5 ${isActive ? "text-primary/70" : "text-slate-500"}`}>{teacher.position || "บุคลากร"}</div>
                                                    </div>
                                                    <ExternalLink size={14} className={`shrink-0 mr-1 transition-colors ${isActive ? "text-primary/40 group-hover:text-primary" : "text-slate-400 group-hover:text-primary"}`} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-50 text-slate-400 space-y-3 opacity-70">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
                            <Search size={32} className="stroke-1 text-slate-400" />
                        </div>
                        <span className="text-sm font-black text-slate-500">ไม่พบข้อมูลที่ค้นหา</span>
                        <span className="text-[10px] font-medium text-slate-400">ลองใช้คำค้นหาอื่นดูอีกครั้ง</span>
                    </div>
                )}
            </div>
        </div>
    );
}