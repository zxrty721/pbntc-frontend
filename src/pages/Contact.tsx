import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaPaperPlane,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const Contact: React.FC = () => {
  const { styles } = useTheme();

  return (
    <div className="w-full min-h-screen bg-slate-50 py-16 md:py-24 px-4 md:px-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border ${styles.border} ${styles.badge}`}
          >
            Contact Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-6">
            ติดต่อสอบถาม
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            มีข้อสงสัยเกี่ยวกับเส้นทาง อาคารเรียน หรือข้อมูลอื่นๆ
            ติดต่อเราได้หลากหลายช่องทาง
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* --- Left: Info & Map --- */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100/50">
              <h3
                className={`text-xl font-bold mb-6 flex items-center gap-3 ${styles.primary}`}
              >
                <FaMapMarkerAlt /> ข้อมูลการติดต่อ
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "ที่อยู่",
                    desc: "222 หมู่ 9 ต.ในเมือง อ.เมือง จ.เพชรบูรณ์ 67000",
                  },
                  {
                    icon: <FaPhoneAlt />,
                    title: "เบอร์โทรศัพท์",
                    desc: "056-711455",
                  },
                  {
                    icon: <FaEnvelope />,
                    title: "อีเมล",
                    desc: "pbntc212@pbntc.ac.th",
                  },
                  {
                    icon: <FaClock />,
                    title: "เวลาทำการ",
                    desc: "จันทร์ - ศุกร์: 08:30 - 16:30 น.",
                  },
                ].map((info, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div
                      className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center bg-slate-50 ${styles.primary} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {info.title}
                      </h4>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                        {info.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="w-full h-80 bg-slate-200 rounded-3xl overflow-hidden shadow-lg border border-white/50 relative group">
              <iframe
                title="Phetchabun Technical College Map"
                src="https://maps.google.com/maps?q=Phetchabun%20Technical%20College&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* --- Right: Contact Form --- */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100/50 h-full flex flex-col">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800">
                ส่งข้อความถึงเรา
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                กรอกข้อมูลด้านล่างเพื่อติดต่อเจ้าหน้าที่
              </p>
            </div>

            <form className="space-y-5 grow flex flex-col justify-center">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    ชื่อ-นามสกุล
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    placeholder="ระบุชื่อของคุณ"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  หัวข้อเรื่อง
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                  placeholder="เช่น สอบถามเรื่องการรับสมัคร"
                />
              </div>

              <div className="space-y-2 grow">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  ข้อความ
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder:text-slate-400"
                  placeholder="รายละเอียดที่ต้องการสอบถาม..."
                ></textarea>
              </div>

              <button
                type="button"
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 ${styles.button}`}
              >
                <FaPaperPlane className="text-sm" /> ส่งข้อความ
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note (Standardized) */}
        <div className="py-8 text-center border-t border-slate-200 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm">
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

export default Contact;
