import React, { useEffect } from "react";
import { Phone, Building2, X, CheckCircle2, Briefcase } from "lucide-react";
import { teachersData } from "../../data/teachers";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

interface Props {
  teacherId: string; // 1. แก้เป็น string เพื่อรองรับ key เช่น "U", "100"
  onClose: () => void;
}

const TeacherDetailOverlay: React.FC<Props> = ({ teacherId, onClose }) => {
  const { styles, theme } = useTheme();
  
  // ดึงข้อมูลโดยใช้ Key string
  const teacher = teachersData[teacherId];
  const isDark = theme === "dark";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!teacher) return null;                                                 

  // Colors
  const bgCard = isDark ? "bg-slate-900" : "bg-white";
  const textMain = isDark ? "text-slate-100" : "text-slate-800";
  const textSub = isDark ? "text-slate-400" : "text-slate-500";
  const itemBg = isDark ? "bg-slate-800" : "bg-slate-50";
  const borderCol = isDark ? "border-slate-800" : "border-slate-100";
  const closeBtnColor = isDark
    ? "text-slate-400 hover:text-white hover:bg-slate-800"
    : "text-slate-400 hover:text-slate-900 hover:bg-slate-100";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl ${bgCard} flex flex-col max-h-[85vh]`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-50 p-2 rounded-full transition-colors ${closeBtnColor}`}
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pt-12 pb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div
                className={`p-1.5 rounded-[24px] ${bgCard} border-2 ${borderCol} shadow-lg`}
              >
                {/* 2. แก้ URL รูป: ใช้ teacherId ที่รับมาแทน teacher.id */}
                <img
                  src={`https://teacher.pbntc.site/${teacherId}.jpg`} 
                  alt={teacher.name}
                  className="w-40 h-52 object-cover rounded-[18px] bg-slate-200"
                  onError={(e) =>
                    (e.currentTarget.src = `https://ui-avatars.com/api/?name=${teacher.name}&size=256&background=random`)
                  }
                />
              </div>

              <div
                className={`absolute -bottom-3 left-1/2 -translate-x-1/2 ${isDark ? "bg-emerald-600" : "bg-green-600"} text-white text-[11px] font-bold px-3 py-1 rounded-full border-[4px] ${bgCard} flex items-center gap-1 shadow-sm whitespace-nowrap`}
              >
                <CheckCircle2 size={12} strokeWidth={3} /> Active
              </div>
            </div>

            <div className="text-center mt-6">
              <h2
                className={`text-2xl font-black ${textMain} leading-tight mb-2`}
              >
                {teacher.name}
              </h2>
              <span
                className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${styles.bgBody} ${styles.textBody}`}
              >
                {teacher.position}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div
              className={`flex items-center gap-4 p-4 rounded-2xl border ${borderCol} ${itemBg}`}
            >
              <div
                className={`p-2.5 rounded-xl bg-white dark:bg-slate-700 shadow-sm shrink-0 ${styles.primary}`}
              >
                <Building2 size={20} />
              </div>
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider opacity-60 mb-0.5 ${textSub}`}
                >
                  แผนกวิชา
                </p>
                <p className={`text-sm font-bold ${textMain}`}>
                  {teacher.department}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 p-4 rounded-2xl border ${borderCol} ${itemBg}`}
            >
              <div
                className={`p-2.5 rounded-xl bg-white dark:bg-slate-700 shadow-sm shrink-0 ${styles.primary}`}
              >
                <Briefcase size={20} />
              </div>
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider opacity-60 mb-0.5 ${textSub}`}
                >
                  สังกัด
                </p>
                <p className={`text-sm font-bold ${textMain}`}>
                  วิทยาลัยเทคนิคเพชรบูรณ์
                </p>
              </div>
            </div>

            <div className="mt-2">
              <p
                className={`text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2 ml-1 ${textSub}`}
              >
                ติดต่อ
              </p>
              {teacher.phone ? (
                <a
                  href={`tel:${teacher.phone}`}
                  className={`flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-gradient-to-r ${styles.bgGradient} text-white shadow-lg active:scale-[0.98] transition-all`}
                >
                  <Phone size={20} className="fill-current" />
                  <span className="font-bold text-lg">{teacher.phone}</span>
                </a>
              ) : (
                <div
                  className={`flex items-center justify-center gap-2 w-full p-4 rounded-2xl border border-dashed ${borderCol} opacity-50`}
                >
                  <Phone size={18} />
                  <span className="text-sm">ไม่ระบุเบอร์โทร</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDetailOverlay;