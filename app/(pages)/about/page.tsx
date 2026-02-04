"use client";

import React from "react";
import { Facebook, Code, Cpu, Database, GraduationCap, Globe, Palette, Users } from "lucide-react";

export default function AboutPage() {
    const teamMembers = [
        {
            name: "นายเอกภพ",
            role: "หัวหน้าทีมพัฒนา (Lead Developer)",
            desc: "รับผิดชอบด้านโครงสร้างระบบ (System Architecture) และการเขียนโปรแกรมทั้งส่วนหน้าและหลังบ้าน",
            img: "ice",
            facebook: "https://www.facebook.com/share/19NegsSmh2/"
        },
        {
            name: "นายนราเทพ",
            role: "หัวหน้าฝ่ายออกแบบ (Lead UX/UI)",
            desc: "รับผิดชอบด้านการออกแบบประสบการณ์ผู้ใช้งาน (UX) และส่วนติดต่อผู้ใช้งาน (UI) ให้สวยงามและใช้งานง่าย",
            img: "tar",
            facebook: "https://www.facebook.com/share/1Mj5r6Y1zs/"
        },
        {
            name: "นายวัชรสิทธิ์",
            role: "ที่ปรึกษาโครงการ (Project Advisor)",
            desc: "ให้คำปรึกษาและตรวจสอบความถูกต้องของระบบ เพื่อให้โครงการดำเนินไปตามวัตถุประสงค์",
            img: "khun",
            facebook: "https://www.facebook.com/share/17yJpL7Ptu/"
        },
    ];

    const techStack = [
        { name: "Next.js & React", category: "Core Framework", icon: Globe, color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
        { name: "Tailwind CSS", category: "UI & Styling", icon: Palette, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        { name: "TypeScript", category: "Programming Language", icon: Code, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { name: "JSON Static Data", category: "Data Structure", icon: Database, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    ];

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans anim-enter">

            {/* 1. ส่วนหัว (Header) - ใส่รูปภาพพื้นหลัง */}
            <div className="relative w-full h-100 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-amber-500/20">
                {/* ✅ Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://img.pbntc.site/tar.webp" // ใส่ URL รูปตึกสวยๆ ของวิทยาลัยที่นี่
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => e.currentTarget.style.display = 'none'} // ถ้าไม่มีรูปให้ซ่อน
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-slate-900/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/50 border border-amber-500/50 rounded-full shadow-lg backdrop-blur-none">
                        <Users size={12} /> Official Project Team
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
                        คณะผู้จัดทำโครงการ
                    </h1>
                    <p className="text-slate-300 text-lg font-light max-w-2xl mx-auto drop-shadow-md">
                        โครงการระบบแผนที่ดิจิทัล <span className="text-amber-400 font-semibold">PBNTC Map</span> เพื่อการศึกษาและพัฒนาเทคโนโลยีสารสนเทศ
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 space-y-20">

                {/* 2. คณะผู้จัดทำ (Project Team) */}
                <section className="anim-enter delay-100">
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col hover:-translate-y-1">
                                <div className="h-32 bg-slate-100 dark:bg-slate-800 relative">
                                    <div className="absolute inset-0 bg-slate-900/5 pattern-grid-lg"></div>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-400 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="px-6 pb-8 flex-1 flex flex-col relative">
                                    <div className="-mt-16 mb-4 inline-block p-1.5 bg-white dark:bg-slate-900 rounded-full self-center shadow-md border border-slate-100 dark:border-slate-700 group-hover:border-amber-500 transition-colors">
                                        <img
                                            src={`https://img.pbntc.site/${member.img}.webp`}
                                            alt={member.name}
                                            className="w-28 h-28 rounded-full object-cover"
                                        />
                                    </div>

                                    <div className="text-center flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{member.name}</h3>
                                        <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4 border border-slate-200 dark:border-slate-700">
                                            {member.role}
                                        </span>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                                            {member.desc}
                                        </p>
                                    </div>

                                    <div className="pt-5 border-t border-slate-100 dark:border-slate-800">
                                        <a
                                            href={member.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-[#1877F2] hover:text-white text-slate-600 dark:text-slate-300 transition-all text-sm font-bold group-hover/btn border border-slate-200 dark:border-slate-700"
                                        >
                                            <Facebook size={18} /> ติดต่อ Facebook
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Tech Stack */}
                <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 anim-enter delay-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>

                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                            <Cpu className="text-amber-500" /> เทคโนโลยีที่ใช้พัฒนา (Tech Stack)
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            เลือกใช้เครื่องมือมาตรฐานระดับอุตสาหกรรม (Industry Standard) เพื่อประสิทธิภาพสูงสุด
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {techStack.map((tech, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-default border border-transparent hover:border-amber-200 dark:hover:border-amber-900/50">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${tech.bg} ${tech.color}`}>
                                    <tech.icon size={28} />
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{tech.name}</h4>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{tech.category}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <div className="text-center text-slate-400 text-sm pt-8 border-t border-slate-200 dark:border-slate-800 anim-enter delay-300">
                    <div className="flex items-center justify-center gap-2 mb-2 text-amber-600 dark:text-amber-500">
                        <GraduationCap size={18} />
                        <span className="font-bold text-slate-700 dark:text-slate-300">แผนกวิชาเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคเพชรบูรณ์</span>
                    </div>
                    <p>© 2024 PBNTC Map Project. All rights reserved.</p>
                </div>

            </div>
        </div>
    );
}