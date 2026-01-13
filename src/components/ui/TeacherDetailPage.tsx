import React, { useEffect } from "react";
import { 
  ArrowLeft, Phone, Building2, Briefcase, 
  UserCircle2, GraduationCap, X 
} from "lucide-react";
import { teachersData } from "../../data/teachers";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

interface Props {
  teacherId: number;
  onClose: () => void;
}

const TeacherDetailOverlay: React.FC<Props> = ({ teacherId, onClose }) => {
  const { styles, theme } = useTheme();
  const teacher = teachersData[teacherId];

  // ล็อคการเลื่อนหน้าจอหลัก
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!teacher) return null;

  const dynamicImageUrl = `https://teacher.pbntc.site/${teacher.id}.jpg`;
  
  // Helper Colors
  const isDark = theme === "dark";
  const bgBase = isDark ? "bg-slate-950" : "bg-slate-50";
  const contentBg = isDark ? "bg-slate-900" : "bg-white";
  const borderColor = isDark ? "border-slate-800" : "border-slate-200";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`fixed inset-0 z-[300] overflow-y-auto ${bgBase} font-sans`}
    >
      {/* --- Sticky Header --- */}
      <div className={`sticky top-0 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-xl border-b ${isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"}`}>
        <button 
          onClick={onClose}
          className={`p-2 rounded-full transition-all ${isDark ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"}`}
        >
          <ArrowLeft size={24} />
        </button>
        <span className={`font-bold text-sm uppercase tracking-wider ${textMuted}`}>Teacher Profile</span>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* --- Hero Section with Cover --- */}
      <div className="relative">
        {/* Cover Background (Abstract) */}
        <div className={`h-48 md:h-64 w-full overflow-hidden relative bg-gradient-to-r ${styles.bgGradient}`}>
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        </div>

        {/* Profile Container */}
        <div className="px-6 md:px-10 -mt-20 md:-mt-24 relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end">
           {/* Profile Image */}
           <div className={`p-1.5 rounded-[2rem] shadow-2xl ${contentBg}`}>
              <img 
                src={dynamicImageUrl} 
                alt={teacher.name}
                className="w-40 h-52 md:w-56 md:h-72 object-cover rounded-[1.7rem] bg-slate-200"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x400?text=User"; }}
              />
           </div>

           {/* Name & Title (Desktop View) */}
           <div className="hidden md:block pb-6 space-y-2">
              <h1 className={`text-5xl font-black tracking-tight ${styles.textHeading}`}>{teacher.name}</h1>
              <div className="flex items-center gap-3">
                 <span className={`px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-md ${styles.primaryBg}`}>
                    {teacher.position}
                 </span>
                 <span className={`text-lg ${textMuted}`}>แผนก{teacher.department}</span>
              </div>
           </div>
        </div>
      </div>

      {/* --- Content Body --- */}
      <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto space-y-8">
         
         {/* Name (Mobile View) */}
         <div className="md:hidden text-center space-y-3">
            <h1 className={`text-3xl font-black ${styles.textHeading}`}>{teacher.name}</h1>
            <div className="flex flex-wrap justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm ${styles.primaryBg}`}>
                  {teacher.position}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${borderColor} ${textMuted}`}>
                  แผนก{teacher.department}
                </span>
            </div>
         </div>

         {/* Info Cards Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Contact Info */}
            <div className={`p-6 rounded-3xl border ${contentBg} ${borderColor} shadow-sm`}>
               <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${styles.primary}`}>
                  <Phone size={18}/> ข้อมูลการติดต่อ
               </h3>
               
               {teacher.phone ? (
                 <a href={`tel:${teacher.phone}`} className={`flex items-center gap-5 p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isDark ? "bg-slate-800/50 hover:bg-slate-800" : "bg-slate-50 hover:bg-slate-100"}`}>
                    <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                       <Phone size={24} />
                    </div>
                    <div>
                       <p className={`text-xs font-bold uppercase mb-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>เบอร์โทรศัพท์</p>
                       <p className={`text-2xl font-black tracking-tight ${styles.textHeading}`}>{teacher.phone}</p>
                    </div>
                 </a>
               ) : (
                 <div className={`flex items-center gap-4 p-4 rounded-2xl opacity-60 border border-dashed ${borderColor}`}>
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                       <Phone size={20} />
                    </div>
                    <span className={styles.textBody}>ไม่มีเบอร์โทรศัพท์</span>
                 </div>
               )}
            </div>

            {/* 2. Professional Info */}
            <div className={`p-6 rounded-3xl border ${contentBg} ${borderColor} shadow-sm`}>
               <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${styles.primary}`}>
                  <Briefcase size={18}/> ข้อมูลสังกัด
               </h3>
               
               <div className="space-y-4">
                  <div className="flex items-start gap-4">
                     <div className={`p-2.5 rounded-xl ${isDark ? "bg-slate-800" : "bg-slate-100"} ${styles.primary}`}>
                        <Building2 size={20} />
                     </div>
                     <div>
                        <p className={`text-xs font-bold uppercase ${textMuted}`}>แผนกวิชา</p>
                        <p className={`text-lg font-bold ${styles.textHeading}`}>{teacher.department}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className={`p-2.5 rounded-xl ${isDark ? "bg-slate-800" : "bg-slate-100"} ${styles.primary}`}>
                        <UserCircle2 size={20} />
                     </div>
                     <div>
                        <p className={`text-xs font-bold uppercase ${textMuted}`}>สถานะบุคลากร</p>
                        <p className={`text-lg font-bold ${styles.textHeading}`}>ครูประจำการ / เจ้าหน้าที่</p>
                     </div>
                  </div>
               </div>
            </div>

         </div>

         {/* Footer / Quote */}
         <div className="text-center py-10 opacity-60">
            <GraduationCap size={40} className={`mx-auto mb-3 ${textMuted}`} />
            <p className={`text-sm ${textMuted}`}>วิทยาลัยเทคนิคเพชรบูรณ์</p>
         </div>
      </div>
    </motion.div>
  );
};

export default TeacherDetailOverlay;