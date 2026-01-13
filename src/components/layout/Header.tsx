import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaMapMarkedAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUniversity,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const MENU_ITEMS = [
  { label: "หน้าหลัก", to: "/", icon: <FaHome /> },
  { label: "แผนที่", to: "/map", icon: <FaMapMarkedAlt /> },
  { label: "เกี่ยวกับเรา", to: "/about", icon: <FaUniversity /> },
  { label: "ติดต่อ", to: "/contact", icon: <FaEnvelope /> },
];

export default function Header() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, styles } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // เช็ค Scroll เพื่อใส่เงาให้ Header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ FIX: ล็อค Scroll ของ Body เมื่อเปิด Mobile Menu กันหน้าจอเลื่อน
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // ปิดเมนูเมื่อเปลี่ยนหน้า
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ================= NAVBAR หลัก ================= */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${
          scrolled
            ? `${styles.bgHeader} backdrop-blur-xl shadow-lg border-slate-200/10 py-2`
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-50">
            <div className={`p-2 rounded-xl transition-all ${styles.card}`}>
              <img
                src="https://img.pbntc.site/og-pbntc.svg"
                alt="pbntc logo"
                className="w-15 h-15 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-r ${styles.bgGradient}`}
              >
                PBNTC
              </span>
              <span className="text-[0.6rem] font-bold tracking-widest uppercase mt-0.5 opacity-60">
                Smart Map
              </span>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 md:gap-4 relative z-50">
            {/* Desktop Nav */}
            <nav
              className={`hidden lg:flex items-center gap-2 p-1.5 rounded-full border shadow-sm ${styles.card}`}
            >
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all
                      ${
                        isActive
                          ? `text-white shadow-md bg-gradient-to-r ${styles.bgGradient}`
                          : `${styles.textBody} hover:${styles.primary}`
                      }
                    `}
                  >
                    {isActive ? item.icon : null}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all border ${styles.card} ${styles.iconBtn}`}
            >
              {theme === "light" ? (
                <FaMoon className="text-violet-600" />
              ) : (
                <FaSun className="text-yellow-400" />
              )}
            </button>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-3 rounded-full transition-all border ${styles.card} ${styles.iconBtn}`}
            >
              <FaBars size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU OVERLAY (แก้ใหม่) ================= */}
      {/* ใช้ z-index 100 เพื่อให้ทับทุกอย่างแน่นอน และแยกออกมาจาก Header */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 ${styles.bgBody} ${
          mobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-5"
        }`}
      >
        {/* Header ของ Mobile Menu (ปุ่มปิด) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/10">
          <span
            className={`text-xl font-black bg-clip-text text-transparent bg-gradient-to-r ${styles.bgGradient}`}
          >
            MENU
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`p-3 rounded-full border transition-all ${styles.card} ${styles.iconBtn} hover:bg-red-50 hover:text-red-500`}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Links List */}
        <div className="flex flex-col items-center justify-center h-[80vh] gap-8 p-6">
          {MENU_ITEMS.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-black flex items-center gap-4 transition-all duration-300 transform
                ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                ${pathname === item.to ? styles.primary : styles.textHeading}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className={`text-3xl ${styles.primary}`}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
