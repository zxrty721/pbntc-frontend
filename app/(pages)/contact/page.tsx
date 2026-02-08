"use client";

import { useState } from "react";
import {
    Phone, Mail, MapPin, Clock, Send, Loader2,
    CheckCircle, AlertCircle, Building2, User, FileText, Tag, GraduationCap, ArrowRight
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
        { icon: MapPin, title: "ที่อยู่", desc: "212 ถ.สระบุรี-หล่มสัก ต.ในเมือง อ.เมือง จ.เพชรบูรณ์ 67000" },
        { icon: Phone, title: "โทรศัพท์", desc: "056-711455 (งานประชาสัมพันธ์)" },
        { icon: Mail, title: "อีเมล", desc: "pbntc212@pbntc.ac.th" },
        { icon: Clock, title: "เวลาทำการ", desc: "จันทร์ - ศุกร์: 08:30 - 16:30 น." },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 gap-8 md:gap-12 pb-20 pt-4 overflow-x-hidden">

            {/* 🟢 HERO SECTION - ปรับให้โค้งเหมือนหน้า Home ในคอม */}
            <section className="px-4 md:px-8 anim-enter">
                <div className="relative rounded-4xl overflow-hidden bg-slate-900 text-white shadow-2xl min-h-100 md:min-h-125 flex items-center group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"
                        style={{ backgroundImage: "url('https://img.pbntc.site/sign.jpg')" }}
                    ></div>
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent md:bg-linear-to-r md:from-slate-950 md:via-slate-900/80 md:to-transparent"></div>
                    <div className="relative z-10 w-full max-w-4xl px-6 md:px-16 flex flex-col items-center text-center md:items-start md:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                            <Mail size={14} /> Contact
                        </div>
                        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight">
                            ติดต่อสอบถาม <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                PBNTC Map
                            </span>
                        </h1>
                        <p className="text-slate-300 text-sm md:text-lg font-light max-w-md md:max-w-xl md:border-l-4 md:border-amber-500/50 md:pl-6 leading-relaxed">
                            โครงการระบบแผนที่ดิจิทัล PBNTC Map <br className="hidden md:block" /> เพื่อการศึกษาและพัฒนาเทคโนโลยีสารสนเทศ
                        </p>
                    </div>
                </div>
            </section>

            {/* 🟢 MAIN CONTENT - แก้ไข Layout มือถือไม่ให้ทับซ้อน */}
            <main className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-10">

                    {/* LEFT SIDE: ข้อมูลการติดต่อ */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-xl anim-enter" style={{ animationDelay: '0.1s' }}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 border-l-4 border-amber-500 pl-4">
                                ช่องทางติดต่อ
                            </h3>

                            <div className="grid gap-6">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl shrink-0 flex items-center justify-center bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-amber-500 shadow-sm transition-transform group-hover:scale-105">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider mb-1">
                                                {info.title}
                                            </h4>
                                            <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                                                {info.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* แผนที่แบบย่อ */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl anim-enter h-60 md:h-72" style={{ animationDelay: '0.2s' }}>
                            <iframe
                                title="PBNTC Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1352.9801472550344!2d101.15453306857776!3d16.434689085898462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31202552e2dbf8ab%3A0xec71f6b1ccc837ea!2sPhetchabun%20Technical%20College!5e0!3m2!1sen!2sth!4v1770553016620!5m2!1sen!2sth"
                                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* RIGHT SIDE: แบบฟอร์ม */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl anim-enter" style={{ animationDelay: '0.3s' }}>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                ส่งข้อความถึงเรา
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                                กรุณากรอกข้อมูลให้ครบถ้วน เราจะตอบกลับทางอีเมลโดยเร็วที่สุด
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-400 ml-1">ชื่อ-นามสกุล</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
                                            <input
                                                type="text" name="name" required value={formData.name} onChange={handleChange} disabled={status === "loading"}
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                                placeholder="ระบุชื่อของคุณ"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-slate-400 ml-1">อีเมลติดต่อ</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
                                            <input
                                                type="email" name="email" required value={formData.email} onChange={handleChange} disabled={status === "loading"}
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">หัวข้อเรื่อง</label>
                                    <div className="relative group">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <input
                                            type="text" name="subject" required value={formData.subject} onChange={handleChange} disabled={status === "loading"}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                                            placeholder="เช่น สอบถามเรื่องตึกเรียน"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">รายละเอียด</label>
                                    <div className="relative group">
                                        <FileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={18} />
                                        <textarea
                                            name="message" required rows={4} value={formData.message} onChange={handleChange} disabled={status === "loading"}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none transition-all"
                                            placeholder="พิมพ์ข้อความของคุณที่นี่..."
                                        ></textarea>
                                    </div>
                                </div>

                                {status === "error" && (
                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 text-sm flex items-center gap-3">
                                        <AlertCircle size={20} /> {errorMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 ${status === "success"
                                        ? "bg-emerald-600 text-white"
                                        : status === "loading"
                                            ? "bg-slate-400 text-white"
                                            : "bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-amber-500/20"
                                        }`}
                                >
                                    {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : status === "success" ? <CheckCircle size={20} /> : <Send size={20} />}
                                    {status === "loading" ? "กำลังส่ง..." : status === "success" ? "ส่งสำเร็จแล้ว" : "ส่งข้อความ"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* 🟢 FOOTER - กระชับขึ้นเพื่อให้เหมาะกับทุกจอ */}
            <footer className="w-full py-8 text-center anim-enter">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600">
                        <GraduationCap size={20} />
                        <span className="font-bold text-xs uppercase tracking-widest">วิทยาลัยเทคนิคเพชรบูรณ์</span>
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px]">
                        © 2026 PBNTC Map Project. Digital Campus Experience.
                    </p>
                </div>
            </footer>
        </div>
    );
}