import React, { useRef, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  Building2,
  ChevronRight,
  ChevronLeft,
  Image as ImageIcon,
  Filter,
  ChevronDown,
  Info,
} from "lucide-react";
import type { MapLocation } from "../../types";
import { teachersData } from "../../data/teachers";
import { useTheme } from "../../context/ThemeContext";

// ✅ 1. Import Component ใหม่เข้ามา
import TeacherDetailOverlay from "./TeacherDetailPage";

interface Props {
  location: MapLocation;
  onClose: () => void;
}

const LocationDetailCard: React.FC<Props> = memo(({ location, onClose }) => {
  const { styles, theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- States ---
  const [selectedDept, setSelectedDept] = useState("ทั้งหมด");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<"info" | "personnel">("info");
  
  // ✅ 2. เพิ่ม State สำหรับเก็บ ID ครูที่ถูกเลือก
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);

  // --- Data Logic ---
  const allTeachers = useMemo(() => {
    return Object.values(teachersData).filter(
      (teacher) => teacher.locationId === location.id,
    );
  }, [location.id]);

  const images = useMemo(() => {
    if (!location.images || location.images.length === 0) return [];
    const baseUrl = "https://zone.pbntc.site/";
    return location.images.map((img) =>
      img.startsWith("http") ? img : `${baseUrl}${img}`,
    );
  }, [location.images]);

  const departments = useMemo(() => {
    const deps = new Set(allTeachers.map((t) => t.department).filter(Boolean));
    return ["ทั้งหมด", ...Array.from(deps)];
  }, [allTeachers]);

  const filteredTeachers = useMemo(() => {
    if (selectedDept === "ทั้งหมด") return allTeachers;
    return allTeachers.filter((t) => t.department === selectedDept);
  }, [allTeachers, selectedDept]);

  // --- Handlers ---
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const closeLightbox = () => setLightboxIndex(null);
  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === null || prev === images.length - 1 ? 0 : prev + 1,
    );
  };
  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === null || prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  // Helper Variables
  const bgColor = theme === "dark" ? "bg-slate-900" : "bg-white";
  const subBgColor = theme === "dark" ? "bg-slate-950" : "bg-slate-50";
  const borderColor = theme === "dark" ? "border-slate-800" : "border-slate-200";
  const textColor = styles.textBody;
  const headingColor = styles.textHeading;

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 overflow-hidden">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
        />

        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-[250] p-2.5 rounded-full text-white transition-all shadow-lg hover:opacity-90 border border-white/20 ${styles.primaryBg}`}
        >
          <X size={24} />
        </button>

        <div className="relative z-10 w-full max-w-[95rem] h-[90vh] md:h-[85vh] flex flex-col gap-4 md:gap-6 px-4 pb-6 md:p-0">
          {/* Mobile Tab Switcher */}
          <div
            className={`md:hidden shrink-0 flex w-full p-1 rounded-2xl border ${borderColor} ${theme === "dark" ? "bg-slate-900" : "bg-slate-100"}`}
          >
            <button
              onClick={() => setMobileTab("info")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all
                ${mobileTab === "info" ? `${bgColor} ${styles.primary} shadow-sm` : "text-slate-500"}`}
            >
              <Info size={16} /> ข้อมูล
            </button>
            <button
              onClick={() => setMobileTab("personnel")}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all
                ${mobileTab === "personnel" ? `${bgColor} ${styles.primary} shadow-sm` : "text-slate-500"}`}
            >
              <Users size={16} /> บุคลากร ({filteredTeachers.length})
            </button>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
            {/* CARD 1: INFO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                flex-1 ${bgColor} rounded-[20px] shadow-2xl overflow-hidden flex-col relative md:flex order-2 md:order-1
                ${mobileTab === "info" ? "flex" : "hidden"}
              `}
            >
               {/* ... (ส่วนแสดงรูปภาพและข้อมูลสถานที่คงเดิม ไม่ต้องแก้) ... */}
               <div className={`relative h-[40%] shrink-0 group ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                {images.length > 0 ? (
                  <div ref={scrollRef} className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth">
                    {images.map((img, index) => (
                      <div key={index} className="w-full h-full flex-shrink-0 snap-center relative cursor-zoom-in" onClick={() => setLightboxIndex(index)}>
                        <img src={img} alt={`img-${index}`} className="w-full h-full object-cover opacity-90" loading="lazy" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
                          <ImageIcon size={12} /> <span>{index + 1}/{images.length}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${theme === "dark" ? "text-slate-600" : "text-slate-400"}`}>
                    <Building2 size={64} strokeWidth={1} />
                    <span className="text-sm mt-2 font-medium">ไม่มีรูปภาพ</span>
                  </div>
                )}
                 {/* ... (Controls) ... */}
                 {images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); scroll("left"); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hidden md:block"><ChevronLeft size={24} /></button>
                    <button onClick={(e) => { e.stopPropagation(); scroll("right"); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hidden md:block"><ChevronRight size={24} /></button>
                  </>
                )}
                <div className="absolute inset-x-0 bottom-0 pt-16 pb-6 px-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                  <span className={`inline-block px-2 py-0.5 rounded ${styles.primaryBg} text-white text-[10px] font-bold uppercase mb-2 shadow-sm`}>{location.category}</span>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{location.title}</h2>
                </div>
              </div>

              <div className={`flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar ${bgColor}`}>
                <div className="space-y-6 max-w-3xl mx-auto">
                  <section>
                    <h3 className={`text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${styles.primary}`}><MapPin size={16} /> ข้อมูลสถานที่</h3>

                  </section>
                  {location.detail && (
                    <section className={`p-4 border rounded-xl ${subBgColor} ${borderColor}`}>
                      <h4 className={`text-sm font-bold mb-1 ${headingColor}`}>รายละเอียดเพิ่มเติม</h4>
                      <p className={`text-sm leading-relaxed ${textColor}`}>{location.detail}</p>
                    </section>
                  )}
                  {location.facilities && location.facilities.length > 0 && (
                    <section>
                      <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 ${styles.primary}`}>สิ่งอำนวยความสะดวก</h3>
                      <div className="flex flex-wrap gap-2">
                        {location.facilities.map((f, i) => (
                          <div key={i} className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg ${bgColor} ${borderColor}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${styles.primaryBg}`} />
                            <span className={`text-xs md:text-sm font-medium ${textColor}`}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </motion.div>

            {/* CARD 2: PERSONNEL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className={`
                w-full md:w-[28rem] lg:w-[32rem] ${subBgColor} rounded-[20px] shadow-2xl overflow-hidden flex-col border md:flex order-1 md:order-2 ${borderColor}
                ${mobileTab === "personnel" ? "flex" : "hidden"}
              `}
            >
              {/* Header */}
              <div className={`${bgColor} border-b ${borderColor} z-30 sticky top-0`}>
                <div className="p-4 md:p-6 pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 ${styles.primaryBg} text-white rounded-lg shadow-sm`}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-extrabold ${headingColor}`}>บุคลากร</h3>
                      <p className="text-xs text-slate-500">ประจำอาคารนี้</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme === "dark" ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}>
                    {filteredTeachers.length} ท่าน
                  </span>
                </div>

                <div className="px-4 md:px-6 pb-4 relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-xl transition-colors text-left ${bgColor} ${borderColor} hover:${subBgColor}`}>
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Filter size={14} className="text-slate-400" />
                      <span className={`text-sm font-bold truncate ${styles.textHeading}`}>{selectedDept === "ทั้งหมด" ? "แสดงทุกแผนก" : selectedDept}</span>
                    </div>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                      <div className={`absolute left-6 right-6 top-[calc(100%-5px)] mt-2 rounded-xl shadow-xl border overflow-hidden z-20 max-h-52 overflow-y-auto custom-scrollbar ${bgColor} ${borderColor}`}>
                        {departments.map((dept, index) => {
                          const count = dept === "ทั้งหมด" ? allTeachers.length : allTeachers.filter((t) => t.department === dept).length;
                          const isSelected = selectedDept === dept;
                          return (
                            <button key={index} onClick={() => { setSelectedDept(dept); setIsDropdownOpen(false); }}
                              className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between border-b last:border-0 ${borderColor} ${isSelected ? `${theme === "dark" ? "bg-slate-800" : "bg-slate-50"} ${styles.primary}` : `${textColor} hover:${subBgColor}`}`}>
                              <span>{dept === "ทั้งหมด" ? "แสดงทั้งหมด" : dept}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? `${styles.primaryBg} text-white` : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* List */}
              <div className={`flex-1 overflow-y-auto p-4 custom-scrollbar ${subBgColor}`}>
                {filteredTeachers.length > 0 ? (
                  <div className="space-y-3">
                    {filteredTeachers.map((t) => (
                      // ✅ 3. เปลี่ยนจาก Link เป็น div ที่มี onClick
                      <div
                        key={t.id}
                        onClick={() => setSelectedTeacherId(t.id)}
                        className={`block group cursor-pointer`}
                      >
                        <div className={`${bgColor} p-3 rounded-xl border ${borderColor} shadow-sm active:scale-[0.98] transition-transform flex items-center gap-4 hover:shadow-md`}>
                          <div className="relative shrink-0">
                            <img src={`https://teacher.pbntc.site/${t.id}.jpg`} alt={t.name} className={`w-12 h-12 rounded-full object-cover ${borderColor} border`} loading="lazy"
                              onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=User"; }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className={`font-bold text-sm truncate ${headingColor} group-hover:${styles.primary} transition-colors`}>{t.name}</h4>
                            <p className="text-xs text-slate-500 font-medium truncate">{t.department}</p>
                            <p className={`text-[10px] ${styles.primary} font-bold truncate mt-0.5`}>{t.position}</p>
                          </div>
                          <ChevronRight size={16} className="text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 py-10 opacity-60">
                    <Filter size={24} className="mb-2" />
                    <p className="text-sm font-medium">ไม่พบข้อมูล</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ✅ 4. แสดง Overlay หากมี teacherId ถูกเลือก */}
      <AnimatePresence>
        {selectedTeacherId && (
          <TeacherDetailOverlay 
            teacherId={selectedTeacherId} 
            onClose={() => setSelectedTeacherId(null)} 
          />
        )}
      </AnimatePresence>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300 animate-in fade-in" onClick={closeLightbox}>
           <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full z-50"><X size={24} /></button>
           <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={images[lightboxIndex]} alt="Fullscreen" className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg select-none" />
            {images.length > 1 && (
              <>
                <button onClick={showPrevImage} className="absolute left-2 p-3 bg-white/10 text-white rounded-full"><ChevronLeft size={24} /></button>
                <button onClick={showNextImage} className="absolute right-2 p-3 bg-white/10 text-white rounded-full"><ChevronRight size={24} /></button>
              </>
            )}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm font-bold rounded-full">{lightboxIndex + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </>
  );
});

export default LocationDetailCard;