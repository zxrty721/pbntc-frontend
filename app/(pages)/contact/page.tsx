"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, GraduationCap, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

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
        { icon: MapPin, title: "ที่อยู่", desc: "วิทยาลัยเทคนิคเพชรบูรณ์ 212 ถนนสระบุรี-หล่มสัก ตำบลในเมือง อำเภอเมืองเพชรบูรณ์ จังหวัดเพชรบูรณ์ 67000" },
        { icon: Phone, title: "เบอร์โทรศัพท์", desc: "056-711455" },
        { icon: Mail, title: "อีเมล", desc: "pbntc212@pbntc.ac.th" },
        { icon: Clock, title: "เวลาทำการ", desc: "จันทร์ - ศุกร์: 08:30 - 16:30 น." },
    ];

    return (
        <div className="w-full min-h-screen pb-24 px-4 md:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto pt-10">

                {/* Header (Animation) */}
                <div className="text-center mb-16 space-y-4 anim-enter">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm">
                        Contact Us
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
                        ติดต่อสอบถาม
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
                        มีข้อสงสัยเกี่ยวกับเส้นทาง อาคารเรียน หรือข้อมูลอื่นๆ ติดต่อเราได้หลากหลายช่องทาง
                    </p>
                </div>

                {/* Content Grid (Animation Delay) */}
                <div className="grid lg:grid-cols-2 gap-10 mb-20 anim-enter delay-100">

                    {/* Left: Info */}
                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-purple-600 dark:text-purple-400">
                                <MapPin /> ข้อมูลการติดต่อ
                            </h3>
                            <div className="space-y-6">
                                {contactInfo.map((info, i) => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            <info.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {info.title}
                                            </h4>
                                            <p className="text-sm mt-1 leading-relaxed text-slate-500 dark:text-slate-400">
                                                {info.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="w-full h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-white/10 relative group transition-transform hover:scale-[1.01]">
                            <iframe
                                title="Map"
                                src="https://maps.google.com/maps?q=Phetchabun%20Technical%20College&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-500 dark:opacity-80 dark:invert-[0.9] dark:hue-rotate-180"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="p-8 md:p-10 rounded-3xl h-full flex flex-col relative overflow-hidden bg-white dark:bg-slate-900 shadow-xl shadow-purple-100/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-purple-500 to-pink-500"></div>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">ส่งข้อความถึงเรา</h3>
                            <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">กรอกข้อมูลด้านล่างเพื่อติดต่อเจ้าหน้าที่</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 grow flex flex-col justify-center">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} disabled={status === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all disabled:opacity-60 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="ระบุชื่อของคุณ" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">อีเมลติดต่อกลับ <span className="text-red-500">*</span></label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} disabled={status === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all disabled:opacity-60 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="name@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">หัวข้อเรื่อง <span className="text-red-500">*</span></label>
                                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} disabled={status === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all disabled:opacity-60 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="เช่น สอบถามเรื่องการรับสมัคร" />
                            </div>
                            <div className="space-y-2 grow">
                                <label className="text-sm font-bold ml-1 text-slate-700 dark:text-slate-300">ข้อความ <span className="text-red-500">*</span></label>
                                <textarea name="message" required rows={6} value={formData.message} onChange={handleChange} disabled={status === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none disabled:opacity-60 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="รายละเอียดที่ต้องการสอบถาม..."></textarea>
                            </div>
                            {status === "error" && (
                                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 text-sm flex items-center gap-2 animate-pulse">
                                    <AlertCircle size={16} /> {errorMessage}
                                </div>
                            )}
                            <button type="submit" disabled={status === "loading" || status === "success"} className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-4 transition-all duration-300 transform active:scale-95 ${status === "success" ? "bg-green-500 text-white cursor-default" : status === "loading" ? "bg-slate-400 text-white cursor-wait" : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 dark:shadow-none"}`}>
                                {status === "loading" ? <><Loader2 className="animate-spin" /> กำลังส่งข้อมูล...</> : status === "success" ? <><CheckCircle /> ส่งเรียบร้อยแล้ว!</> : <><Send size={18} /> ส่งข้อความ</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="py-8 text-center border-t border-slate-200 dark:border-slate-800 w-full anim-enter delay-200">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-default">
                        <GraduationCap className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Phetchabun Technical College • วิทยาลัยเทคนิคเพชรบูรณ์
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}