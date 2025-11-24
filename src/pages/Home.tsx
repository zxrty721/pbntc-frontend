import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaMapMarkedAlt, FaInfoCircle, FaMobileAlt, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { styles } = useTheme();

  return (
    <div className="w-full py-16 md:py-24 flex flex-col items-center">
      
      {/* Hero Section (เก็บสีไว้ให้เด่น) */}
      <section className={`relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-linear-to-br ${styles.bgGradient} p-8 md:p-20 text-center text-white mb-20`}>
        {/* ... Background Decorations (เหมือนเดิม) ... */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 border border-white/30 text-sm font-bold tracking-wider mb-6 uppercase backdrop-blur-sm">
            Welcome to PTC Digital Campus
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-md">
            สำรวจโลกใบใหม่แห่ง<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-white">
              การนำทางอัจฉริยะ
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            เปิดประสบการณ์การค้นหาอาคารเรียนและสถานที่สำคัญภายในวิทยาลัยเทคนิคเพชรบูรณ์ 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/map" className={`px-8 py-4 bg-white ${styles.primary.replace('text-', 'text-')} font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 transition-all flex items-center gap-2`}>
              <FaMapMarkedAlt /> เริ่มต้นใช้งานแผนที่
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-black/20 text-white font-bold rounded-xl border border-white/30 hover:bg-black/30 transition-all flex items-center gap-2 backdrop-blur-sm">
              <FaInfoCircle /> ติดต่อสอบถาม
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid (เปลี่ยนเป็นสีขาว) */}
      <section className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">ฟีเจอร์ที่น่าสนใจ</h2>
          <p className="text-slate-500">ระบบของเราถูกออกแบบมาเพื่อทุกคน</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <FaMapMarkedAlt />, title: "ค้นหาง่ายดาย", desc: "ระบุพิกัดอาคารเรียน โรงฝึกงาน และหอพัก ได้อย่างแม่นยำ" },
            { icon: <FaInfoCircle />, title: "ข้อมูลเจาะลึก", desc: "ดูรูปภาพอาคารจริง ประวัติความเป็นมา และสิ่งอำนวยความสะดวก" },
            { icon: <FaMobileAlt />, title: "รองรับทุกอุปกรณ์", desc: "ใช้งานได้ลื่นไหลทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน" }
          ].map((item, idx) => (
            // ✅ การ์ดสีขาว เงาฟุ้งๆ
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 bg-linear-to-br ${styles.bgGradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* Footer Note */}
      <div className="py-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800">
            <FaGraduationCap className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-500 font-medium">Educational Project • จัดทำเพื่อการศึกษา</span>
        </div>
      </div>
    </div>
  );
};

export default Home;