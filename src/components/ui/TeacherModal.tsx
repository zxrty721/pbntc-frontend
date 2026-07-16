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
        <div className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="absolute inset-0 bg-slate-950/90" onClick={onClose}></div>

            <div className={`relative bg-white dark:bg-slate-900 w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] transform transition-transform duration-500 ${isVisible ? "translate-y-0" : "translate-y-12"}`}>
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-red-500 hover:text-white rounded-full text-slate-600 transition-all hidden md:flex">
                    <X size={24} />
                </button>

                <div className="w-full md:w-[42%] h-72 md:h-auto bg-slate-200 dark:bg-slate-800 shrink-0 relative">
                    {!imageError ? (
                        <img src={`https://teacher.pbntc.site/${teacher.id}.jpg`} alt={teacher.name} className="w-full h-full object-cover object-top" onError={() => setImageError(true)} />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                            <User size={80} className="opacity-20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-white dark:from-slate-900 via-transparent to-transparent md:hidden"></div>
                    <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-slate-950/60 text-white rounded-full md:hidden">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900">
                    <div className="space-y-10">
                        <div className="space-y-3">
                            <div className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-black uppercase tracking-widest">{deptName}</div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.1]">{teacher.name}</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-xl font-bold italic">{teacher.position}</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">ช่องทางการติดต่อ</h4>
                            <div className="flex items-center gap-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 group">
                                <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-amber-600 shrink-0 border border-slate-200 dark:border-slate-600">
                                    <Phone size={28} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-black uppercase mb-1">เบอร์โทรศัพท์</p>
                                    <a href={`tel:${teacher.contact?.phone || ""}`} className="text-2xl font-black text-slate-900 dark:text-white hover:text-amber-600 transition-colors">
                                        {teacher.contact?.phone || "ไม่มีข้อมูล"}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {teacher.locationIds && teacher.locationIds.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">สถานที่ประจำ / ห้องพักครู</h4>
                                <div className="grid gap-3">
                                    {teacher.locationIds.map((locId, idx) => {
                                        const locInfo = getLocationInfo(locId);
                                        return (
                                            <button key={idx} type="button" onClick={onClose} className="w-full text-left flex items-center justify-between p-5 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-amber-500 transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                                        <MapPin size={22} />
                                                    </div>
                                                    <span className="font-black text-slate-800 dark:text-slate-100 text-base">{locInfo.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-black text-slate-400 group-hover:text-amber-500">
                                                    อาคาร: {locInfo.code} <ExternalLink size={14} />
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">PBNTC IT DEPARTMENT STAFF DIRECTORY</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
