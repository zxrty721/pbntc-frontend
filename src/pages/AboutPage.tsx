import React from 'react';
import { FaUsers, FaCode, FaLightbulb, FaGithub, FaFacebook, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const AboutPage: React.FC = () => {
  const { styles } = useTheme();

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border ${styles.border} ${styles.badge}`}>
          About Project
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
          เกี่ยวกับ <span className={`text-transparent bg-clip-text bg-linear-to-r ${styles.bgGradient}`}>โครงการของเรา</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
          ระบบแผนที่ดิจิทัลอัจฉริยะ เพื่อการนำทางภายในวิทยาลัยเทคนิคเพชรบูรณ์ 
        </p>
      </div>

      {/* Mission Cards (สีขาว) */}
      <div className="grid md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: <FaLightbulb />, title: "วิสัยทัศน์", desc: "มุ่งสู่การเป็นผู้นำด้านเทคโนโลยีสารสนเทศเพื่อการศึกษา 4.0" },
          { icon: <FaCode />, title: "เทคโนโลยี", desc: "พัฒนาด้วย React, Tailwind CSS และสถาปัตยกรรม Modern Web" },
          { icon: <FaUsers />, title: "เป้าหมาย", desc: "สร้างประสบการณ์การใช้งานที่ดีที่สุด รวดเร็ว และเข้าถึงง่าย" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 bg-linear-to-br ${styles.bgGradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className={`text-xl font-bold mb-3 text-slate-800`}>{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Team Section (สีขาว) */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200 p-10 md:p-16 text-center shadow-xl">
        <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${styles.bgGradient}`}></div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-16">ทีมผู้พัฒนา</h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 justify-center">
          {[
            { name: "นายเอกภพ", role: "Fullstack Developer", img: "ice" },
            { name: "นายนราเทพ", role: "UX/UI Designer", img: "tar" },
            { name: "นายวัชรสิทธิ์", role: "Project Advisor", img: "khun" }
          ].map((member, i) => (
            <div key={i} className="group">
              <div className={`w-28 h-28 mx-auto mb-6 rounded-full p-1 bg-linear-to-br ${styles.bgGradient} shadow-lg shadow-indigo-500/20`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                   <img src={`/${member.img}.jfif`} alt={member.name} className="w-full h-full" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h4>
              <p className={`text-sm font-medium ${styles.primary} mb-4`}>{member.role}</p>
              {i < 2 && (
                <div className="flex justify-center gap-4 text-slate-400">
                   <FaGithub className="w-5 h-5 hover:text-slate-800 cursor-pointer transition-colors" />
                   <FaFacebook className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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

export default AboutPage;