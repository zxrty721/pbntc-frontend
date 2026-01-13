// src/components/layouts/Footer.tsx
import { memo, type ReactNode } from "react"; // ✅ เพิ่ม import ReactNode
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGlobe,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function Footer() {
  const { theme, styles } = useTheme();
  const year = new Date().getFullYear();
  const isDark = theme === "dark";

  // Configuration สีแบบ Minimal
  const borderClass = isDark ? "border-slate-800" : "border-slate-100";
  const bgClass = isDark ? "bg-slate-950" : "bg-white";
  const textSub = isDark ? "text-slate-500" : "text-slate-400";
  // ❌ ลบ textMain ออกเพราะไม่ได้ใช้ (แก้ error TS6133)
  const hoverColor = isDark ? "hover:text-blue-400" : "hover:text-violet-600";

  return (
    <footer
      className={`pt-16 pb-8 border-t transition-colors duration-300 ${bgClass} ${borderClass}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 mb-16">
          {/* --- ฝั่งซ้าย: Brand & Philosophy --- */}
          <div className="lg:w-1/3 space-y-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br ${styles.bgGradient}`}
              >
                <span className="text-white font-bold text-lg">PT</span>
              </div>
              <div>
                <h3
                  className={`text-xl font-black tracking-tight ${styles.textHeading}`}
                >
                  PTC MAP
                </h3>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-50">
                  Smart Navigation
                </p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed ${textSub} max-w-xs`}>
              แผนที่ดิจิทัลอัจฉริยะวิทยาลัยเทคนิคเพชรบูรณ์
              เชื่อมต่อทุกการเดินทาง สนับสนุนการเรียนรู้ในยุคใหม่
            </p>

            {/* Social Icons (Minimal Style) */}
            <div className="flex gap-4">
              <SocialLink
                href="https://www.facebook.com/pbntc212"
                icon={<FaFacebook />}
              />
              <SocialLink href="http://www.pbntc.ac.th/" icon={<FaGlobe />} />
            </div>
          </div>

          {/* --- ฝั่งขวา: Links & Contact --- */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {/* Quick Menu */}
            <div>
              <h4
                className={`font-bold mb-6 text-sm uppercase tracking-wider ${styles.textHeading}`}
              >
                เมนูหลัก
              </h4>
              <ul className="space-y-3">
                {["หน้าหลัก", "แผนที่", "เกี่ยวกับเรา", "ติดต่อ"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <Link
                        to="/"
                        className={`text-sm transition-colors ${textSub} ${hoverColor}`}
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                className={`font-bold mb-6 text-sm uppercase tracking-wider ${styles.textHeading}`}
              >
                ข้อมูลติดต่อ
              </h4>
              <ul className="space-y-4 text-sm">
                <ContactItem
                  icon={<FaMapMarkerAlt />}
                  text="222 หมู่ 9 ต.ในเมือง อ.เมือง จ.เพชรบูรณ์ 67000"
                  textColor={textSub}
                />
                <ContactItem
                  icon={<FaPhone />}
                  text="056-711455"
                  textColor={textSub}
                />
                <ContactItem
                  icon={<FaEnvelope />}
                  text="pbntc212@pbntc.ac.th"
                  textColor={textSub}
                />
              </ul>
            </div>
          </div>
        </div>

        {/* --- Copyright Section --- */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs ${borderClass} ${textSub}`}
        >
          <p>© {year} Phetchabun Technical College. All rights reserved.</p>
          <p className="opacity-70 hover:opacity-100 transition-opacity cursor-default">
            Designed by IT Students
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components ---

const SocialLink = ({ href, icon }: { href: string; icon: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`p-2 rounded-full border transition-all duration-300
        ${
          theme === "dark"
            ? "border-slate-800 text-slate-400 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-900"
            : "border-slate-200 text-slate-500 hover:border-violet-500 hover:text-violet-600 hover:bg-slate-50"
        }
      `}
    >
      {icon}
    </a>
  );
};

const ContactItem = ({
  icon,
  text,
  textColor,
}: {
  icon: ReactNode;
  text: string;
  textColor: string;
}) => (
  <li className={`flex items-start gap-3 ${textColor}`}>
    <span className="mt-0.5 opacity-70 shrink-0">{icon}</span>
    <span className="leading-relaxed">{text}</span>
  </li>
);

export default memo(Footer);
