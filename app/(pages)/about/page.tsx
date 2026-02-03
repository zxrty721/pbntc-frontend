"use client";

import React from "react";
import { Users, Code, Lightbulb, Facebook, GraduationCap } from "lucide-react";

export default function AboutPage() {
    const teamMembers = [
        { name: "นายเอกภพ", role: "Fullstack Developer", img: "ice", facebook: "https://www.facebook.com/share/19NegsSmh2/" },
        { name: "นายนราเทพ", role: "UX/UI Designer", img: "tar", facebook: "https://www.facebook.com/share/1Mj5r6Y1zs/" },
        { name: "นายวัชรสิทธิ์", role: "Project Advisor", img: "khun", facebook: "https://www.facebook.com/share/17yJpL7Ptu/" },
    ];

    return (
        <div className="w-full min-h-screen pb-24 px-4 md:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto pt-10">

                {/* Header (Animation) */}
                <div className="text-center mb-16 space-y-4 anim-enter">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm">
                        About Project
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
                        เกี่ยวกับ{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 animate-pulse">
                            โครงการของเรา
                        </span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
                        ระบบแผนที่ดิจิทัลอัจฉริยะ เพื่อการนำทางภายในวิทยาลัยเทคนิคเพชรบูรณ์
                    </p>
                </div>

                {/* Mission Cards (Staggered Animation) */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {[
                        { icon: Lightbulb, title: "วิสัยทัศน์", desc: "มุ่งสู่การเป็นผู้นำด้านเทคโนโลยีสารสนเทศเพื่อการศึกษา 4.0" },
                        { icon: Code, title: "เทคโนโลยี", desc: "พัฒนาด้วย React, Tailwind CSS และสถาปัตยกรรม Modern Web" },
                        { icon: Users, title: "เป้าหมาย", desc: "สร้างประสบการณ์การใช้งานที่ดีที่สุด รวดเร็ว และเข้าถึงง่าย" },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:-translate-y-2 group hover:shadow-lg anim-enter"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Team Section (Animation) */}
                <div className="relative rounded-[2.5rem] overflow-hidden p-10 md:p-16 text-center mb-20 bg-white dark:bg-slate-900 shadow-xl shadow-purple-100/50 dark:shadow-none border border-slate-100 dark:border-slate-800 anim-enter delay-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-pink-500"></div>
                    <h2 className="text-3xl font-bold mb-16 text-slate-800 dark:text-white">ทีมผู้พัฒนา</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 justify-center">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="group flex flex-col items-center">
                                <div className="w-28 h-28 mx-auto mb-6 rounded-full p-1 bg-linear-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-500">
                                    <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-800">
                                        <img src={`https://img.pbntc.site/${member.img}.webp`} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-1 text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {member.name}
                                </h4>
                                <p className="text-sm font-medium mb-5 text-purple-600 dark:text-purple-400">
                                    {member.role}
                                </p>
                                <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 transform hover:-translate-y-0.5">
                                    <Facebook size={16} /> Facebook
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="py-8 text-center border-t border-slate-200 dark:border-slate-800 w-full anim-enter delay-300">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-default">
                        <GraduationCap className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            Educational Project • จัดทำเพื่อการศึกษา
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}