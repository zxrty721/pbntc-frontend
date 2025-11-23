import { Link } from "react-router-dom";
import { FaFacebook, FaGlobe, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { styles } = useTheme();

  const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <li>
      <Link 
        to={to} 
        className={`text-slate-500 hover:text-slate-900 transition-colors text-sm flex items-center gap-2 group`}
      >
        <span className={`w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:${styles.primary.replace('text-', 'bg-')} transition-colors`}></span>
        {children}
      </Link>
    </li>
  );

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
               <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${styles.bgGradient} flex items-center justify-center shadow-md`}>
                 <span className="text-white font-bold text-sm">PT</span>
               </div>
               <span className="text-lg font-bold text-slate-800">PTC MAP</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              ระบบแผนที่ดิจิทัลเพื่อการนำทางภายในวิทยาลัยเทคนิคเพชรบูรณ์
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/pbntc212" target="_blank" className={`text-slate-400 hover:${styles.primary} transition-colors`}><FaFacebook size={20} /></a>
              <a href="http://www.pbntc.ac.th/" target="_blank" className={`text-slate-400 hover:${styles.primary} transition-colors`}><FaGlobe size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-slate-800 font-bold mb-6">เมนูลัด</h3>
            <ul className="space-y-3">
              <FooterLink to="/">หน้าหลัก</FooterLink>
              <FooterLink to="/map">แผนที่วิทยาลัย</FooterLink>
              <FooterLink to="/about">เกี่ยวกับเรา</FooterLink>
              <FooterLink to="/contact">ติดต่อสอบถาม</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-slate-800 font-bold mb-6">บริการ</h3>
            <ul className="space-y-3">
              <li className="text-slate-500 text-sm">ค้นหาอาคารเรียน</li>
              <li className="text-slate-500 text-sm">ข้อมูลหอพักนักศึกษา</li>
              <li className="text-slate-500 text-sm">ระบบนำทาง (เร็วๆ นี้)</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-slate-800 font-bold mb-6">ติดต่อเรา</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500 text-sm">
                <FaMapMarkerAlt className={`mt-1 ${styles.primary}`} />
                <span>222 หมู่ 9 ต.ในเมือง อ.เมือง<br/>จ.เพชรบูรณ์ 67000</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <FaPhone className={styles.primary} />
                <span>056-711455</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500 text-sm">
                <FaEnvelope className={styles.primary} />
                <span>pbntc212@pbntc.ac.th</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left">
            © {year} Phetchabun Technical College. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Developed by <span className={`font-medium ${styles.primary}`}>IT Student Project</span>
          </p>
        </div>

      </div>
    </footer>
  );
}