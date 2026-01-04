import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    FaHome,
    FaMapMarkedAlt,
    FaEnvelope,
    FaBars,
    FaTimes,
    FaUniversity,
    FaPalette,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const MENU_ITEMS = [
    { label: "หน้าหลัก", to: "/", icon: <FaHome className="w-4 h-4" /> },
    {
        label: "แผนที่วิทยาลัย",
        to: "/map",
        icon: <FaMapMarkedAlt className="w-4 h-4" />,
    },
    {
        label: "เกี่ยวกับเรา",
        to: "/about",
        icon: <FaUniversity className="w-4 h-4" />,
    },
    {
        label: "ติดต่อ",
        to: "/contact",
        icon: <FaEnvelope className="w-4 h-4" />,
    },
];

export default function Header() {
    const { pathname } = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme, styles } = useTheme();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getLinkClass = (path: string) => {
        const isActive = pathname === path;
        return `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
            isActive
                ? `bg-white shadow-sm border border-slate-200 ${styles.primary}`
                : `text-slate-500 hover:text-slate-900 hover:bg-slate-100`
        }`;
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 h-16">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className="w-5 h-5" />
                        ) : (
                            <FaBars className="w-5 h-5" />
                        )}
                    </button>

                    <Link
                        to="/"
                        className="flex items-center gap-3 group"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <img
                            src="/pbntc-og.svg"
                            alt="pbntc logo"
                            width="48"
                            height="48"
                            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                            loading="eager"
                        />
                        <div className="flex flex-col justify-center h-full">
                            {/* ✅ v4 Fix: ใช้ bg-linear-to-r */}
                            <span
                                className={`text-lg font-extrabold text-transparent bg-clip-text bg-linear-to-r ${styles.bgGradient} leading-none`}
                            >
                                PBNTC
                            </span>
                            <span className="text-[0.65rem] font-medium tracking-widest uppercase leading-none mt-1 text-slate-400">
                                Technical College
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg border border-slate-200">
                    {MENU_ITEMS.map((p) => (
                        <Link
                            key={p.to}
                            to={p.to}
                            className={getLinkClass(p.to)}
                        >
                            <span
                                className={
                                    pathname === p.to
                                        ? styles.primary
                                        : "text-slate-400"
                                }
                            >
                                {p.icon}
                            </span>
                            <span>{p.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Theme Switcher */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-xs font-medium text-slate-600 shadow-sm cursor-pointer"
                    >
                        <FaPalette className={styles.icon} />
                        <span className="hidden sm:inline">
                            {theme === "purple" ? "Purple" : "Yellow"}
                        </span>
                        {/* ✅ v4 Fix: ใช้ bg-linear-to-r */}
                        <div
                            className={`w-3 h-3 rounded-full bg-linear-to-r ${styles.bgGradient}`}
                        ></div>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-200 bg-white ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="px-4 py-4 space-y-1">
                    {MENU_ITEMS.map((p) => (
                        <Link
                            key={p.to}
                            to={p.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                                pathname === p.to
                                    ? "bg-slate-50 text-slate-900 border border-slate-200"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                            <span
                                className={
                                    pathname === p.to
                                        ? styles.primary
                                        : "text-slate-400"
                                }
                            >
                                {p.icon}
                            </span>
                            <span>{p.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
