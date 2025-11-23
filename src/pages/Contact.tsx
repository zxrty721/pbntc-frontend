import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { styles } = useTheme();

  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">ติดต่อสอบถาม</h2>
           <p className="text-slate-500">มีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม ติดต่อเราได้หลากหลายช่องทาง</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* --- Left: Info & Map --- */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${styles.primary}`}>
                <FaMapMarkerAlt /> ข้อมูลวิทยาลัย
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: <FaMapMarkerAlt />, title: "ที่อยู่", desc: "222 หมู่ 9 ต.ในเมือง อ.เมือง จ.เพชรบูรณ์ 67000" },
                  { icon: <FaPhoneAlt />, title: "เบอร์โทรศัพท์", desc: "056-711455" },
                  { icon: <FaEnvelope />, title: "อีเมล", desc: "pbntc212@pbntc.ac.th" },
                  { icon: <FaClock />, title: "เวลาทำการ", desc: "จันทร์ - ศุกร์: 08:30 - 16:30 น." }
                ].map((info, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-slate-50 ${styles.primary}`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700">{info.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{info.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ✅ Google Maps Iframe (ใส่ตรงนี้) */}
            <div className="w-full h-80 bg-slate-100 rounded-2xl overflow-hidden shadow-md border border-slate-200 relative">
              <iframe 
                title="Phetchabun Technical College Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.6982940647583!2d101.15290942227453!3d16.43532717405877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31202552e2dbf8ab%3A0xec71f6b1ccc837ea!2sPhetchabun%20Technical%20College!5e0!3m2!1sen!2sth!4v1763912062416!5m2!1sen!2sth" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* --- Right: Light Form --- */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">ส่งข้อความถึงเรา</h3>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">ชื่อ-นามสกุล</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" placeholder="สมชาย ใจดี" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">อีเมล</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" placeholder="name@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">หัวข้อเรื่อง</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" placeholder="สอบถามเรื่อง..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ข้อความ</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none" placeholder="รายละเอียด..."></textarea>
              </div>

              <button 
                type="button"
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 ${styles.button}`}
              >
                ส่งข้อความ
              </button>
            </form>
          </div>

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

export default Contact;