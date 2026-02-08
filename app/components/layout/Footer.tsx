"use client";

import { MapPin, Phone, Mail, Facebook, Github, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const teamMembers = [
        { name: "นายเอกภพ หนูเสริม", role: "Fullstack Dev", facebook: "https://www.facebook.com/share/19NegsSmh2/" },
        { name: "นายนราเทพ ยิ้มศรี", role: "UX/UI Designer", facebook: "https://www.facebook.com/share/1Mj5r6Y1zs/" },
        { name: "นายวัชรสิทธิ์ บุ้นประสิทธิ์ชัย", role: "Project Advisor", facebook: "https://www.facebook.com/share/17yJpL7Ptu/" },
    ];

    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="grid md:grid-cols-3 gap-12 mb-12">

                    {/* 🟢 Column 1: เกี่ยวกับวิทยาลัย (ดึงจากหน้า Contact) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-amber-500 flex items-center justify-center text-white">
                                <GraduationCap size={18} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 dark:text-white">วิทยาลัยเทคนิคเพชรบูรณ์</h3>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            มุ่งมั่นจัดการอาชีวศึกษาให้มีคุณภาพ ได้มาตรฐานสากล
                            ผลิตกำลังคนด้านวิชาชีพที่มีสมรรถนะสูง ตอบสนองความต้องการของตลาดแรงงาน
                        </p>
                        <div className="space-y-2 pt-2">
                            <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <MapPin size={16} className="text-purple-600 mt-1 shrink-0" />
                                <span>212 ถนนสระบุรี-หล่มสัก ตำบลในเมือง <br /> อำเภอเมืองเพชรบูรณ์ จังหวัดเพชรบูรณ์ 67000</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <Phone size={16} className="text-amber-500 shrink-0" />
                                <span>056-711455</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <Mail size={16} className="text-purple-600 shrink-0" />
                                <span>pbntc212@pbntc.ac.th</span>
                            </div>
                        </div>
                    </div>

                    {/* 🟢 Column 2: เมนูลัด */}
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-6 border-l-4 border-amber-500 pl-3">เมนูหลัก</h4>
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">หน้าหลัก</Link></li>
                            <li><Link href="/map" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">แผนที่/อาคารเรียน</Link></li>
                            <li><Link href="/teachers" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">ทำเนียบบุคลากร</Link></li>
                            <li><Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">ติดต่อสอบถาม</Link></li>
                        </ul>
                    </div>

                    {/* 🟢 Column 3: คณะผู้จัดทำ (ดึงจากหน้า About) */}
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-white mb-6 border-l-4 border-purple-600 pl-3">พัฒนาโดย</h4>
                        <ul className="space-y-4">
                            {teamMembers.map((member, idx) => (
                                <li key={idx} className="flex items-center justify-between group">
                                    <div>
                                        <span className="block text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {member.name}
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-500">
                                            {member.role}
                                        </span>
                                    </div>
                                    <a
                                        href={member.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 hover:bg-blue-600 hover:text-white transition-all opacity-80 group-hover:opacity-100"
                                    >
                                        <Facebook size={16} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                    <p>© 2026 Phetchabun Technical College Map Project. All rights reserved.</p>
                    <div className="flex items-center gap-1">
                        <span>Created with ❤️ by</span>
                        <span className="font-bold text-slate-700 dark:text-slate-400">PBNTC Dev Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}