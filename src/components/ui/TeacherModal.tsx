import { X, Phone, MapPin, User, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type { Teacher } from "../../assets/types";
import { DEPARTMENTS } from "../../assets/data/departments";
import { locations } from "../../assets/data/locations";

interface TeacherModalProps {
    teacher: Teacher | null;
    onClose: () => void;
}

export default function TeacherModal({ teacher, onClose }: TeacherModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (teacher) {
            setImageError(false);
            setTimeout(() => setIsVisible(true), 10);
            document.body.style.overflow = "hidden";
        } else {
            setIsVisible(false);
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [teacher]);

    if (!teacher) return null;

    const deptName = DEPARTMENTS[teacher.departmentId as keyof typeof DEPARTMENTS] || "ไม่ระบุแผนก";

    const getLocationInfo = (id: string | number) => {
        const loc = locations.find((l) => l.id.toString() === id.toString());
        return loc ? { name: loc.name, code: loc.code } : { name: `อาคารเรียน`, code: "N/A" };
    };

    return (
        <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* เงาดำมืดด้านหลัง */}
            <div className="absolute inset-0 bg-slate-900/60" onClick={onClose}></div>

            {/* 🚀 โครงสร้างกล่องหลัก: ล็อกขนาด w-[calc(100%-1.5rem)] และ max-h-[85vh], ใช้ flex flex-col เพื่อล็อกปุ่ม X ให้อยู่กับที่ */}
            <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
                <div className={`relative bg-surface w-full max-w-lg md:max-w-3xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200/80 flex flex-col overflow-hidden max-h-[85vh] pointer-events-auto transition-all duration-300 ${isVisible ? "translate-y-0 scale-100" : "translate-y-8 scale-95"}`}>
                    {/* 🔴 ปุ่ม X ลอยติดหนึบ (Sticky Close Button) อยู่มุมขวาบนเสมอ ไม่เลื่อนหายไปไหนทั้งในมือถือและคอม */}
                    <button onClick={onClose} aria-label="ปิดหน้าต่าง" className="absolute top-3.5 right-3.5 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-all shadow-md active:scale-95 z-50 border border-white/20">
                        <X size={18} strokeWidth={2.5} />
                    </button>

                    {/* 🟢 พื้นที่เนื้อหาที่เลื่อนได้ (Scrollable Area) */}
                    <div className="overflow-y-auto custom-scrollbar flex-1 w-full flex flex-col md:flex-row">
                        {/* ด้านซ้าย/บน: รูปภาพอาจารย์ */}
                        <div className="w-full md:w-[45%] h-64 sm:h-72 md:h-auto md:min-h-100 bg-slate-100 shrink-0 relative border-b md:border-b-0 md:border-r border-slate-200">
                            {!imageError ? (
                                <img src={`https://teacher.pbntc.site/${teacher.id}.jpg`} loading="lazy" decoding="async" alt={teacher.name} className="w-full h-full object-cover object-top" onError={() => setImageError(true)} />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-100">
                                    <User size={80} className="opacity-40" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent md:hidden"></div>
                        </div>

                        {/* ด้านขวา/ล่าง: รายละเอียดข้อมูล */}
                        <div className="flex-1 p-5 sm:p-6 md:p-8 bg-surface space-y-6">
                            <div className="space-y-2.5 pr-6">
                                <div className="inline-block px-2.5 py-1 rounded-lg bg-secondary/20 text-primary-dark text-xs font-black uppercase tracking-widest border border-secondary/30">{deptName}</div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight wrap-break-word">{teacher.name}</h2>
                                <p className="text-primary text-base md:text-lg font-bold">{teacher.position}</p>
                            </div>

                            {/* ช่องทางการติดต่อ */}
                            <div className="space-y-2.5">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 border-b border-slate-100 pb-1.5">ช่องทางการติดต่อ</h4>
                                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 group hover:border-primary/30 transition-colors w-full overflow-hidden">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5 truncate">เบอร์โทรศัพท์</p>
                                        <a href={`tel:${teacher.contact?.phone || ""}`} className="text-base sm:text-lg font-black text-slate-800 hover:text-primary transition-colors truncate block">
                                            {teacher.contact?.phone || "ไม่มีข้อมูล"}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* สถานที่ประจำ / ห้องพักครู */}
                            {teacher.locationIds && teacher.locationIds.length > 0 && (
                                <div className="space-y-2.5">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 border-b border-slate-100 pb-1.5">สถานที่ประจำ / ห้องพักครู</h4>
                                    <div className="grid gap-2.5">
                                        {teacher.locationIds.map((locId, idx) => {
                                            const locInfo = getLocationInfo(locId);
                                            return (
                                                <button key={idx} type="button" onClick={onClose} className="w-full text-left flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all group overflow-hidden">
                                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                        <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                                            <MapPin size={16} />
                                                        </div>
                                                        <span className="font-black text-slate-800 text-xs sm:text-sm group-hover:text-primary-dark transition-colors truncate">{locInfo.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[11px] font-black text-slate-400 group-hover:text-primary shrink-0 ml-2">
                                                        <span className="hidden sm:inline">อาคาร:</span> {locInfo.code} <ExternalLink size={13} />
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
