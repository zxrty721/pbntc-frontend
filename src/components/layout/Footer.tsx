import { memo } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaGlobe,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function Footer() {
  const { theme, styles } = useTheme();
  const year = new Date().getFullYear();

  // Helper สี
  const footerBg =
    theme === "dark"
      ? "bg-slate-950 border-slate-800"
      : "bg-white border-slate-200";
  const footerText = theme === "dark" ? "text-slate-400" : "text-slate-500";
  const headingColor = styles.textHeading;

  return (
    <footer
      className={`pt-20 pb-8 relative overflow-hidden border-t transition-colors duration-300 ${footerBg}`}
    >
      {/* Decoration BG */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${styles.bgGradient}`}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section (4 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${styles.bgGradient} flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold">PT</span>
              </div>
              <span
                className={`text-2xl font-black tracking-tight ${headingColor}`}
              >
                PTC MAP
              </span>
            </div>
            <p className={`${footerText} text-sm leading-relaxed max-w-sm`}>
              ยกระดับการนำทางในวิทยาลัยด้วยระบบดิจิทัล
              แผนที่อัจฉริยะเพื่อทุกคนในวิทยาลัยเทคนิคเพชรบูรณ์
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/pbntc212"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${theme === "dark" ? "border-slate-700 hover:bg-blue-600 hover:text-white" : "border-slate-200 hover:bg-violet-600 hover:text-white"}`}
              >
                <FaFacebook />
              </a>
              <a
                href="http://www.pbntc.ac.th/"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${theme === "dark" ? "border-slate-700 hover:bg-blue-600 hover:text-white" : "border-slate-200 hover:bg-violet-600 hover:text-white"}`}
              >
                <FaGlobe />
              </a>
            </div>
          </div>

          {/* Links Section (เหลือ 2 คอลัมน์) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* เมนูลัด */}
            <div>
              <h4 className={`font-bold mb-6 text-lg ${headingColor}`}>
                เมนูลัด
              </h4>
              <ul className="space-y-4">
                {["หน้าหลัก", "แผนที่", "เกี่ยวกับเรา", "ติดต่อ"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/"
                        className={`${footerText} hover:${styles.primary} text-sm transition-colors flex items-center gap-2 group`}
                      >
                        <FaArrowRight
                          size={10}
                          className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        />
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* ติดต่อ */}
            <div>
              <h4 className={`font-bold mb-6 text-lg ${headingColor}`}>
                ติดต่อ
              </h4>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <FaMapMarkerAlt
                    className={`${styles.primary} shrink-0 mt-1`}
                  />
                  <span className={footerText}>
                    222 หมู่ 9 ต.ในเมือง อ.เมือง จ.เพชรบูรณ์ 67000
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <FaPhone className={`${styles.primary} shrink-0`} />
                  <span className={footerText}>056-711455</span>
                </li>
                <li className="flex items-center gap-4">
                  <FaEnvelope className={`${styles.primary} shrink-0`} />
                  <span className={footerText}>pbntc212@pbntc.ac.th</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs ${theme === "dark" ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-400"}`}
        >
          <p>© {year} Phetchabun Technical College.</p>
          <p className="flex items-center gap-2">Designed by IT Students</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
