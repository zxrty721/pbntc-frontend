"use client";

import Link from "next/link";
import {
  ArrowRight, Map, Users, Search,
  Phone, GraduationCap, Building2, Info
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-24 pt-8 overflow-x-hidden">

      {/* 🟢 HERO SECTION */}
      <section className="px-4 md:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl shadow-slate-900/20 min-h-120 flex items-center anim-enter group">

          {/* ✅ Background Image: ใช้ไฟล์ pai.jpeg */}
          {/* ⚠️ อย่าลืม: นำไฟล์รูปไปวางในโฟลเดอร์ public และตั้งชื่อว่า pai.jpeg */}
          <div className="absolute inset-0 bg-[url('/pai.jpeg')] bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"></div>

          {/* Overlay Gradient (ปรับให้เข้มขึ้นเพื่อให้ตัวหนังสืออ่านง่าย) */}
          <div className="absolute inset-0 bg-linear-to-r from-[#2e1065]/90 via-slate-900/80 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl px-8 md:px-16 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Digital Campus 2026
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              ระบบแผนที่และสารสนเทศ <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 to-amber-500 drop-shadow-sm">
                วิทยาลัยเทคนิคเพชรบูรณ์
              </span>
            </h1>

            <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl border-l-4 border-amber-500 pl-6 bg-black/20 py-2 pr-4 backdrop-blur-sm rounded-r-lg">
              ค้นหาตำแหน่งอาคารเรียน ตรวจสอบข้อมูลบุคลากร และติดต่อสอบถาม
              สะดวกรวดเร็ว แม่นยำ ผ่านระบบออนไลน์
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/map" className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 active:scale-95">
                <Map size={22} /> ค้นหาอาคารเรียน
              </Link>
              <Link href="/contact" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-medium transition-all backdrop-blur-md active:scale-95">
                ติดต่อสอบถาม <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🟢 QUICK SERVICES */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white border-l-4 border-purple-600 pl-4">
            บริการหลัก (Main Services)
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Map, label: "แผนที่/อาคาร", color: "bg-blue-600", link: "/map", desc: "ค้นหาตึกเรียน" },
            { icon: Users, label: "ทำเนียบบุคลากร", color: "bg-purple-600", link: "/teachers", desc: "ค้นหารายชื่อครู" },
            { icon: Info, label: "คณะผู้จัดทำ", color: "bg-emerald-600", link: "/about", desc: "ทีมพัฒนา" },
            { icon: Phone, label: "ติดต่อเรา", color: "bg-amber-600", link: "/contact", desc: "ช่องทางติดต่อ" },
          ].map((item, i) => (
            <Link
              href={item.link}
              key={i}
              className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center gap-3 text-center anim-enter"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon size={26} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {item.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {item.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🟢 STATS SECTION */}
      <section className="px-4 md:px-8">
        <div className="bg-slate-900 dark:bg-black rounded-3xl p-8 md:p-12 relative overflow-hidden anim-enter delay-200 shadow-xl border border-slate-800">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600 rounded-full blur-[100px] opacity-20"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            {[
              { num: "30+", label: "อาคารเรียน" },
              { num: "150+", label: "คณาจารย์" },
              { num: "4,000+", label: "นักศึกษา" },
              { num: "100%", label: "บริการออนไลน์" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-3xl md:text-5xl font-black text-white">{stat.num}</span>
                <span className="text-sm md:text-base text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟢 HIGHLIGHTS */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all anim-enter delay-300 group">
            <div className="h-1.5 bg-purple-600 group-hover:h-2 transition-all"></div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <Building2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">แผนที่อัจฉริยะ</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                ค้นหาอาคารเรียน ห้องพักครู และจุดสำคัญต่างๆ ภายในวิทยาลัยได้อย่างแม่นยำ
                รองรับการแสดงผลทั้งโหมดกลางวันและกลางคืน
              </p>
              <Link href="/map" className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                เริ่มใช้งานแผนที่ <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all anim-enter delay-300 group">
            <div className="h-1.5 bg-amber-500 group-hover:h-2 transition-all"></div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">ข้อมูลวิทยาลัย</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                ติดตามข้อมูลรายชื่อบุคลากร โครงสร้างการบริหาร และช่องทางการติดต่อหน่วยงานต่างๆ
                ภายในวิทยาลัยเทคนิคเพชรบูรณ์
              </p>
              <Link href="/contact" className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                ดูข้อมูลการติดต่อ <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}