import React from 'react';
import { FaUsers, FaCode, FaLightbulb, FaFacebook, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const AboutPage: React.FC = () => {
  const { styles } = useTheme();

  const teamMembers = [
    {
      name: "นายเอกภพ",
      role: "Fullstack Developer",
      img: "ice",
      facebook: "https://www.facebook.com/share/19NegsSmh2/"
    },
    {
      name: "นายนราเทพ",
      role: "UX/UI Designer",
      img: "tar",
      facebook: "https://www.facebook.com/share/1Mj5r6Y1zs/"
    },
    {
      name: "นายวัชรสิทธิ์",
      role: "Project Advisor",
      img: "khun",
      facebook: "https://www.facebook.com/share/17yJpL7Ptu/"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 py-16 md:py-24 px-4 md:px-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">

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

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: <FaLightbulb />, title: "วิสัยทัศน์", desc: "มุ่งสู่การเป็นผู้นำด้านเทคโนโลยีสารสนเทศเพื่อการศึกษา 4.0" },
            { icon: <FaCode />, title: "เทคโนโลยี", desc: "พัฒนาด้วย React, Tailwind CSS และสถาปัตยกรรม Modern Web" },
            { icon: <FaUsers />, title: "เป้าหมาย", desc: "สร้างประสบการณ์การใช้งานที่ดีที่สุด รวดเร็ว และเข้าถึงง่าย" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 bg-linear-to-br ${styles.bgGradient} text-white shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 text-slate-800`}>{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden bg-white border border-slate-200 p-10 md:p-16 text-center shadow-xl mb-20">
          <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${styles.bgGradient}`}></div>

          <h2 className="text-3xl font-bold text-slate-800 mb-16">ทีมผู้พัฒนา</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 justify-center">
            {teamMembers.map((member, i) => (
              <div key={i} className="group flex flex-col items-center">
                {/* Profile Image */}
                <div className={`w-28 h-28 mx-auto mb-6 rounded-full p-1 bg-linear-to-br ${styles.bgGradient} shadow-lg shadow-indigo-500/20`}>
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                    <img
                      src={`/${member.img}.jfif`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                {/* Name & Role */}
                <h4 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h4>
                <p className={`text-sm font-medium ${styles.primary} mb-5`}>{member.role}</p>
                {/* Facebook Button */}
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 transform hover:-translate-y-0.5"
                >
                  <FaFacebook /> Facebook
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note (Standardized) */}
        <div className="py-8 text-center border-t border-slate-200 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm">
            <FaGraduationCap className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Educational Project • จัดทำเพื่อการศึกษา</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
