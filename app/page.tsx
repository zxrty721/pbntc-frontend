"use client";

import Link from "next/link";
import {
  ArrowRight, Map, Users, Phone,
  GraduationCap, Building2, Info
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 md:gap-16 pb-20 pt-4 overflow-x-hidden">

      {/* 🟢 HERO SECTION */}
      <section className="px-4 md:px-8 anim-enter">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-2xl min-h-137.75 md:min-h-125 flex items-center group">

          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"
            style={{ backgroundImage: "url('https://img.pbntc.site/sign.jpg')" }}
          ></div>

          {/* Tailwind v4 ใช้ bg-linear-to-t แทนการเขียนแบบเดิมได้ทันที */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent md:bg-linear-to-r md:from-slate-900 md:via-slate-900/80 md:to-transparent"></div>

          <div className="relative z-10 w-full max-w-4xl px-6 md:px-16 flex flex-col items-center text-center md:items-start md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Digital Campus 2026
            </div>

            <h1 className="text-3xl md:text-6xl font-extrabold md:leading-[1.15]">
              ระบบแผนที่และ <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500">
                สารสนเทศออนไลน์
              </span>
            </h1>

            <p className="text-slate-300 text-sm md:text-lg font-light max-w-md md:max-w-2xl border-amber-500/50 md:border-l-4 md:pl-6 leading-relaxed">
              วิทยาลัยเทคนิคเพชรบูรณ์: ค้นหาอาคารเรียน ข้อมูลบุคลากร และติดต่อสอบถาม
              ได้สะดวกรวดเร็วผ่านระบบออนไลน์
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <Link href="/map" className="flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-sm md:text-base">
                <Map size={20} /> ค้นหาอาคารเรียน
              </Link>
              <Link href="/contact" className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-medium transition-all backdrop-blur-md active:scale-95 text-sm md:text-base">
                ติดต่อสอบถาม <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 QUICK SERVICES - เพิ่ม Staggered Animation Delay */}
      <section className="px-5 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center mb-8 anim-enter" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white border-l-4 border-purple-600 pl-4">
            บริการหลัก
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Map, label: "แผนที่/อาคาร", color: "bg-blue-600", link: "/map", desc: "ค้นหาตึกเรียน" },
            { icon: Users, label: "ทำเนียบครู", color: "bg-purple-600", link: "/teachers", desc: "รายชื่อบุคลากร" },
            { icon: Info, label: "ผู้จัดทำ", color: "bg-emerald-600", link: "/about", desc: "เกี่ยวกับทีมงาน" },
            { icon: Phone, label: "ติดต่อเรา", color: "bg-amber-600", link: "/contact", desc: "ช่องทางติดต่อ" },
          ].map((item, i) => (
            <Link
              href={item.link}
              key={i}
              className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-3 anim-enter"
              style={{ animationDelay: `${0.3 + (i * 0.1)}s` }}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-6`}>
                <item.icon size={24} />
              </div>
              <div>
                <span className="block font-bold text-sm md:text-lg text-slate-800 dark:text-white mb-1">
                  {item.label}
                </span>
                <span className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">
                  {item.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🟢 STATS SECTION */}
      <section className="px-4 md:px-8 anim-enter" style={{ animationDelay: '0.6s' }}>
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600 rounded-full blur-[80px] opacity-20"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-600 rounded-full blur-[80px] opacity-20"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 md:divide-x divide-slate-800">
            {[
              { num: "30+", label: "อาคารเรียน" },
              { num: "150+", label: "คณาจารย์" },
              { num: "4,000+", label: "นักศึกษา" },
              { num: "100%", label: "ออนไลน์" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1 items-center justify-center px-4">
                <span className="text-3xl md:text-5xl font-black text-white">{stat.num}</span>
                <span className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 HIGHLIGHTS */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-10">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {[
            {
              icon: Building2,
              title: "แผนที่อัจฉริยะ",
              desc: "ค้นหาอาคารเรียน ห้องพักครู และจุดสำคัญต่างๆ รองรับการใช้งานผ่านมือถือ",
              link: "/map",
              color: "bg-purple-600",
              lightColor: "bg-purple-100",
              textColor: "text-purple-600",
              delay: '0.7s'
            },
            {
              icon: GraduationCap,
              title: "ข้อมูลวิทยาลัย",
              desc: "ติดตามข้อมูลคณาจารย์ โครงสร้างการบริหาร และช่องทางการติดต่อหน่วยงานต่างๆ",
              link: "/contact",
              color: "bg-amber-500",
              lightColor: "bg-amber-100",
              textColor: "text-amber-600",
              delay: '0.8s'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all group anim-enter" style={{ animationDelay: item.delay }}>
              <div className={`h-1.5 ${item.color}`}></div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 ${item.lightColor} dark:bg-opacity-10 rounded-lg ${item.textColor}`}>
                    <item.icon size={22} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{item.desc}</p>
                <Link href={item.link} className={`text-xs md:text-sm font-bold ${item.textColor} hover:gap-2 transition-all flex items-center gap-1`}>
                  ดูข้อมูลเพิ่มเติม <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}