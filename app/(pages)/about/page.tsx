"use client";

import React from "react";
import {
    Facebook, Code, Cpu, Database, GraduationCap,
    Globe, Palette, Users, ArrowRight, UserCheck
} from "lucide-react";

export default function AboutPage() {
    const teamMembers = [
        {
            name: "นายเอกภพ หนูเสริม",
            role: "Lead Developer",
            desc: "รับผิดชอบด้านโครงสร้างระบบ (System Architecture) และการเขียนโปรแกรมทั้งส่วนหน้าและหลังบ้าน",
            img: "ice",
            facebook: "https://www.facebook.com/share/19NegsSmh2/"
        },
        {
            name: "นายนราเทพ ยิ้มศรี",
            role: "Lead UX/UI Design",
            desc: "รับผิดชอบด้านการออกแบบประสบการณ์ผู้ใช้งาน (UX) และส่วนติดต่อผู้ใช้งาน (UI) ให้สวยงามและใช้งานง่าย",
            img: "tar",
            facebook: "https://www.facebook.com/share/1Mj5r6Y1zs/"
        },
        {
            name: "นายวัชรสิทธิ์ บุ้นประสิทธิ์ชัย",
            role: "Project Advisor",
            desc: "ให้คำปรึกษาและตรวจสอบความถูกต้องของระบบ เพื่อให้โครงการดำเนินไปตามวัตถุประสงค์",
            img: "khun",
            facebook: "https://www.facebook.com/share/17yJpL7Ptu/"
        },
    ];

    const techStack = [
        { name: "Next.js & React", category: "Core Framework", icon: Globe, color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
        { name: "Tailwind CSS v4", category: "UI & Styling", icon: Palette, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        { name: "TypeScript", category: "Programming", icon: Code, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
        { name: "JSON Data", category: "Data Storage", icon: Database, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 gap-10 md:gap-16 pb-20 pt-4 overflow-x-hidden transition-colors duration-300">

            {/* 🟢 HERO SECTION - โค้งมนเหมือนหน้า Home และ Contact */}
            <section className="px-4 md:px-8 anim-enter">
                <div className="relative rounded-4xl overflow-hidden bg-slate-900 text-white shadow-2xl min-h-112.5 md:min-h-125 flex items-center group">

                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"
                        style={{ backgroundImage: "url('https://img.pbntc.site/sign.jpg')" }}
                    ></div>

                    {/* Gradient Overlay v4 */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/70 to-transparent md:bg-linear-to-r md:from-slate-950 md:via-slate-900/80 md:to-transparent"></div>

                    <div className="relative z-10 w-full max-w-4xl px-6 md:px-16 flex flex-col items-center text-center md:items-start md:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
                            <Users size={14} /> Official Project Team
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
                            คณะผู้จัดทำ <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                                PBNTC Map
                            </span>
                        </h1>

                        <p className="text-slate-300 text-sm md:text-lg font-light max-w-md md:max-w-xl md:border-l-4 md:border-amber-500/50 md:pl-6 leading-relaxed">
                            ทีมพัฒนาคอมพิวเตอร์และเทคโนโลยีธรุกิจดิจิทัล วิทยาลัยเทคนิคเพชรบูรณ์ <br className="hidden md:block" />
                            มุ่งสร้างสรรค์นวัตกรรมเพื่อยกระดับการศึกษาและการให้บริการในยุคดิจิทัล
                        </p>
                    </div>
                </div>
            </section>

            {/* 🟢 TEAM SECTION - แก้ไข Layout มือถือ */}
            <section className="w-full max-w-7xl mx-auto px-5 md:px-8">
                <div className="flex items-center mb-10 anim-enter" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white border-l-4 border-amber-500 pl-4 flex items-center gap-2">
                        สมาชิกในทีม <span className="text-slate-400 font-medium text-sm hidden sm:inline">Development Team</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {teamMembers.map((member, i) => (
                        <div
                            key={i}
                            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 anim-enter flex flex-col"
                            style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}
                        >
                            {/* Card Header Color */}
                            <div className="h-24 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-800/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-amber-500/20 transition-all"></div>
                            </div>

                            {/* Profile Image & Info */}
                            <div className="px-6 pb-8 flex-1 flex flex-col items-center text-center">
                                <div className="-mt-12 mb-5 relative">
                                    <div className="absolute inset-0 bg-amber-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-all"></div>
                                    <img
                                        src={`https://img.pbntc.site/${member.img}.webp`}
                                        alt={member.name}
                                        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-lg relative z-10"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md z-20">
                                        <UserCheck size={14} />
                                    </div>
                                </div>

                                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-amber-600 dark:text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">
                                    {member.role}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                                    {member.desc}
                                </p>

                                <a
                                    href={member.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-[#1877F2] hover:text-white transition-all border border-slate-200 dark:border-slate-700"
                                >
                                    <Facebook size={18} /> ติดต่อ Facebook
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 🟢 TECH STACK SECTION - ปรับให้เหมือนหน้าแรก */}
            <section className="px-4 md:px-8 anim-enter" style={{ animationDelay: '0.5s' }}>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl max-w-7xl mx-auto w-full">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600 rounded-full blur-[80px] opacity-20"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                                <Cpu className="text-amber-500" /> เทคโนโลยีที่ใช้พัฒนา
                            </h2>
                            <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                            {techStack.map((tech, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 ${tech.bg} ${tech.color} shadow-lg transition-transform group-hover:scale-110`}>
                                        <tech.icon size={26} />
                                    </div>
                                    <h4 className="font-bold text-white text-sm md:text-base mb-1">{tech.name}</h4>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-tight">{tech.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 🟢 FOOTER */}
            <footer className="w-full py-10 text-center anim-enter" style={{ animationDelay: '0.6s' }}>
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
                        <GraduationCap size={24} />
                        <span className="font-black text-slate-800 dark:text-slate-200 text-lg">PBNTC IT DEPARTMENT</span>
                    </div>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">
                        แผนกวิชาเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคเพชรบูรณ์ <br />
                        © 2026 PBNTC Map Project. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] mt-2">
                        <span>Made with</span>
                        <span className="text-red-500">❤️</span>
                        <span>by IT Students</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}