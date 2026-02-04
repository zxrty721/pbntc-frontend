"use client";

import { useState } from "react";
import {
    Phone, Mail, MapPin, Clock, Send, Loader2,
    CheckCircle, AlertCircle, Building2, User, FileText, Tag, GraduationCap
} from "lucide-react";

const WORKER_URL = "https://contact.pbntc.site";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading" || status === "success") return;
        setStatus("loading");
        setErrorMessage("");
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                message: `[หัวข้อ: ${formData.subject}]\n\n${formData.message}`,
            };
            const response = await fetch(WORKER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "เกิดข้อผิดพลาด");
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error: unknown) {
            setStatus("error");
            let msg = "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
            if (error instanceof Error) msg = error.message;
            setErrorMessage(msg);
        }
    };

    const contactInfo = [
        { icon: Building2, title: "ที่อยู่ไปรษณีย์", desc: "วิทยาลัยเทคนิคเพชรบูรณ์ เลขที่ 212 ถนนสระบุรี-หล่มสัก ตำบลในเมือง อำเภอเมือง จังหวัดเพชรบูรณ์ 67000" },
        { icon: Phone, title: "โทรศัพท์", desc: "056-711455 (งานประชาสัมพันธ์)" },
        { icon: Mail, title: "อีเมลสารบรรณ", desc: "pbntc212@pbntc.ac.th" },
        { icon: Clock, title: "เวลาทำการ", desc: "วันจันทร์ - วันศุกร์: 08:30 - 16:30 น. (เว้นวันหยุดราชการ)" },
    ];

    return (
        // ✅ ใช้ flex-col + min-h-screen เพื่อจัด Layout ให้ Footer อยู่ล่างสุดเสมอ
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 anim-enter">

            {/* 1. ส่วนหัว (Header) - ใส่รูปภาพพื้นหลัง */}
            <div className="relative w-full h-100 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-amber-500/20">
                {/* ✅ Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://img.pbntc.site/ice.webp" // ใส่ URL รูปตึกสวยๆ ของวิทยาลัยที่นี่
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => e.currentTarget.style.display = 'none'} // ถ้าไม่มีรูปให้ซ่อน
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-slate-900/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/50 border border-amber-500/50 rounded-full shadow-lg backdrop-blur-none">
                        <Mail size={12} /> Official Project Team
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                        ศูนย์บริการข้อมูลและติดต่อสอบถาม
                    </h1>
                    <p className="text-slate-300 text-lg font-light max-w-2xl mx-auto drop-shadow-md">
                        โครงการระบบแผนที่ดิจิทัล <span className="text-amber-400 font-semibold">PBNTC Map</span> เพื่อการศึกษาและพัฒนาเทคโนโลยีสารสนเทศ
                    </p>
                </div>
            </div>

            {/* Main Content (ใช้ flex-grow ดัน Footer) */}
            <div className="grow w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* Left: Info & Map (Animation Delay 100ms) */}
                    <div className="lg:col-span-2 space-y-6 anim-enter delay-100">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 items-center gap-2 border-b-2 border-amber-500 pb-2 inline-block">
                                <MapPin className="text-amber-500" /> ข้อมูลการติดต่อ
                            </h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-amber-600 border border-slate-200 dark:border-slate-700">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wide mb-1">
                                                {info.title}
                                            </h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {info.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-xl relative">
                            <div className="absolute top-3 left-3 z-10 bg-slate-900/90 text-amber-400 px-3 py-1 rounded text-xs font-bold shadow-md border border-amber-500/30">
                                แผนที่วิทยาลัย
                            </div>
                            <iframe
                                title="PBNTC Map"
                                src="https://maps.google.com/maps?q=วิทยาลัยเทคนิคเพชรบูรณ์&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Form (Animation Delay 200ms) */}
                    <div className="lg:col-span-3 anim-enter delay-200">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[80px] pointer-events-none"></div>

                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 relative z-10">
                                แบบฟอร์มติดต่อสอบถาม
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 relative z-10">
                                กรุณากรอกข้อมูลให้ครบถ้วน เจ้าหน้าที่จะติดต่อกลับทางอีเมลโดยเร็วที่สุด
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <User className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
                                            <input
                                                type="text" name="name" required value={formData.name} onChange={handleChange} disabled={status === "loading"}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                                placeholder="ระบุชื่อผู้ติดต่อ"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">อีเมล <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
                                            <input
                                                type="email" name="email" required value={formData.email} onChange={handleChange} disabled={status === "loading"}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">หัวข้อเรื่อง <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Tag className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
                                        <input
                                            type="text" name="subject" required value={formData.subject} onChange={handleChange} disabled={status === "loading"}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                            placeholder="ระบุเรื่องที่ต้องการติดต่อ"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">รายละเอียด <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <FileText className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
                                        <textarea
                                            name="message" required rows={5} value={formData.message} onChange={handleChange} disabled={status === "loading"}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none leading-relaxed"
                                            placeholder="พิมพ์ข้อความของคุณที่นี่..."
                                        ></textarea>
                                    </div>
                                </div>

                                {status === "error" && (
                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-200 dark:border-red-800 text-sm flex items-center gap-3">
                                        <AlertCircle size={20} /> {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wide shadow-lg flex items-center justify-center gap-2 mt-4 transition-all active:scale-[0.98] ${status === "success"
                                        ? "bg-emerald-600 text-white cursor-default"
                                        : status === "loading"
                                            ? "bg-slate-400 text-white cursor-wait"
                                            : "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20"
                                        }`}
                                >
                                    {status === "loading" ? <><Loader2 className="animate-spin" size={20} /> กำลังส่งข้อมูล...</> : status === "success" ? <><CheckCircle size={20} /> ส่งเรียบร้อยแล้ว</> : <><Send size={20} /> ส่งข้อความ</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full py-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center shrink-0">
                <div className="flex items-center justify-center gap-2 mb-2 text-amber-600 dark:text-amber-500">
                    <GraduationCap size={20} />
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide">วิทยาลัยเทคนิคเพชรบูรณ์</span>
                </div>
                <p className="text-slate-500 text-xs">© 2024 PBNTC Map Project. All rights reserved.</p>
            </div>
        </div>
    );
}