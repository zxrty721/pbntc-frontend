import React, { memo } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  FaMapMarkedAlt,
  FaInfoCircle,
  FaMobileAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { styles, theme } = useTheme();

  return (
    <div
      className={`w-full min-h-screen py-16 md:py-24 px-4 md:px-8 overflow-y-auto transition-colors duration-300 ${styles.bgBody}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Hero Section */}
        <section
          className={`relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${styles.bgGradient} p-8 md:p-20 text-center text-white mb-20`}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-4 rounded-full bg-white/20 border border-white/30 text-sm font-bold tracking-wider mb-6 uppercase backdrop-blur-sm">
              Welcome to PTC Digital Campus
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-md">
              สำรวจโลกใบใหม่แห่ง
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">
                การนำทางอัจฉริยะ
              </span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
              เปิดประสบการณ์การค้นหาอาคารเรียนและสถานที่สำคัญภายในวิทยาลัยเทคนิคเพชรบูรณ์
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/map"
                className={`px-8 py-4 bg-white ${styles.primary} font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 transition-all flex items-center gap-2`}
              >
                <FaMapMarkedAlt /> เริ่มต้นใช้งานแผนที่
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-black/20 text-white font-bold rounded-xl border border-white/30 hover:bg-black/30 transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <FaInfoCircle /> ติดต่อสอบถาม
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full mb-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${styles.textHeading}`}>
              ฟีเจอร์ที่น่าสนใจ
            </h2>
            <p className={styles.textBody}>ระบบของเราถูกออกแบบมาเพื่อทุกคน</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMapMarkedAlt />,
                title: "ค้นหาง่ายดาย",
                desc: "ระบุพิกัดอาคารเรียน โรงฝึกงาน และหอพัก ได้อย่างแม่นยำ",
              },
              {
                icon: <FaInfoCircle />,
                title: "ข้อมูลเจาะลึก",
                desc: "ดูรูปภาพอาคารจริง ประวัติความเป็นมา และสิ่งอำนวยความสะดวก",
              },
              {
                icon: <FaMobileAlt />,
                title: "รองรับทุกอุปกรณ์",
                desc: "ใช้งานได้ลื่นไหลทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl transition-all hover:-translate-y-2 group ${styles.card}`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-gradient-to-br ${styles.bgGradient} text-white shadow-md group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${styles.textHeading}`}>
                  {item.title}
                </h3>
                <p className={`leading-relaxed ${styles.textBody}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <div
          className={`py-8 text-center border-t w-full ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
          >
            <FaGraduationCap className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">
              Educational Project • จัดทำเพื่อการศึกษา
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
