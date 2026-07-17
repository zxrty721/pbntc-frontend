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
        /* 🚀 เปลี่ยน transition-all เป็น transition-opacity ลดภาระตอนเปิดปิด */
        <div className={`fixed inset-0 z-100 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="fixed inset-0 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 sm:p-6 md:p-8">
                <div className="flex min-h-full items-end md:items-center justify-center">
                    {/* 🚀 เปลี่ยน transition-all เป็น transition-transform ป้องกันการคำนวณ CSS หนักๆ */}
                    {/* 🎨 ตัว Modal เป็นกล่องขาว (bg-surface) จะเด่นมากๆ เมื่อพื้นหลังเว็บเป็นสีเข้ม */}
                    <div className={`relative bg-surface w-full max-w-[calc(100vw-2rem)] md:max-w-5xl rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 transform transition-transform duration-300 flex flex-col md:flex-row overflow-hidden ${isVisible ? "translate-y-0 scale-100" : "translate-y-12 scale-95"}`}>
                        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2.5 bg-slate-100 hover:bg-primary hover:text-white rounded-full text-slate-500 transition-colors hidden md:flex shadow-sm">
                            <X size={24} strokeWidth={2.5} />
                        </button>

                        <div className="w-full md:w-[40%] h-[40vh] min-h-62.5 max-h-87.5 md:h-auto md:max-h-none md:min-h-125 bg-slate-100 shrink-0 relative border-b md:border-b-0 md:border-r border-slate-200">
                            {!imageError ? (
                                /* 🚀 เพิ่ม loading="lazy" ให้เปิด modal ได้ปุ๊บปั๊บ ไม่ต้องรอโหลดรูปเสร็จ */
                                <img src={`https://teacher.pbntc.site/${teacher.id}.jpg`} loading="lazy" decoding="async" alt={teacher.name} className="w-full h-full object-cover object-top" onError={() => setImageError(true)} />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                    <User size={80} className="opacity-40" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent md:hidden"></div>

                            <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-black/70 text-white rounded-full md:hidden transition-colors shadow-lg active:scale-95">
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>

                        <div className="flex-1 p-5 sm:p-8 md:p-10 bg-surface">
                            <div className="space-y-6 md:space-y-8 w-full">
                                <div className="space-y-3">
                                    <div className="inline-block px-3 py-1.5 rounded-lg bg-secondary/20 text-primary-dark text-xs font-black uppercase tracking-widest border border-secondary/30">{deptName}</div>
                                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight wrap-break-word">{teacher.name}</h2>
                                    <p className="text-primary text-lg font-bold">{teacher.position}</p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 border-b border-slate-100 pb-2">ช่องทางการติดต่อ</h4>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 group hover:border-primary/30 transition-colors w-full overflow-hidden">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Phone size={20} className="md:w-6 md:h-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[10px] text-slate-400 font-black uppercase mb-0.5 truncate">เบอร์โทรศัพท์</p>
                                            <a href={`tel:${teacher.contact?.phone || ""}`} className="text-lg md:text-xl font-black text-slate-800 hover:text-primary transition-colors truncate block">
                                                {teacher.contact?.phone || "ไม่มีข้อมูล"}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {teacher.locationIds && teacher.locationIds.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 border-b border-slate-100 pb-2">สถานที่ประจำ / ห้องพักครู</h4>
                                        <div className="grid gap-3">
                                            {teacher.locationIds.map((locId, idx) => {
                                                const locInfo = getLocationInfo(locId);
                                                return (
                                                    <button key={idx} type="button" onClick={onClose} className="w-full text-left flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all group overflow-hidden">
                                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                                            <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                                                <MapPin size={18} />
                                                            </div>
                                                            <span className="font-black text-slate-800 text-sm md:text-base group-hover:text-primary-dark transition-colors truncate">{locInfo.name}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-400 group-hover:text-primary shrink-0 ml-2">
                                                            <span className="hidden sm:inline">อาคาร:</span> {locInfo.code} <ExternalLink size={14} />
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
        </div>
    );
}
