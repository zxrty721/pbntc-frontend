import React, { useRef, useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Users,
  Building2,
  ChevronRight,
  ChevronLeft,
  Info,
  Image as ImageIcon,
} from "lucide-react";
import type { MapLocation } from "../../types";
import { teachersData } from "../../data/teachers";
import { useTheme } from "../../context/ThemeContext";

import TeacherDetailOverlay from "./TeacherDetailPage";
import TeacherList from "./TeacherList";

interface Props {
  location: MapLocation;
  onClose: () => void;
}

const LocationDetailCard: React.FC<Props> = memo(({ location, onClose }) => {
  const { styles, theme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<"info" | "personnel">("info");
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(
    null,
  );

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

  // Gallery Handlers
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
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

  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-slate-900" : "bg-white";
  const borderCol = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop (Solid Black, No Blur) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80"
          onClick={onClose}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 md:top-6 md:right-6 z-[250] p-3 rounded-full text-white shadow-xl hover:scale-105 active:scale-95 transition-all ${styles.primaryBg}`}
        >
          <X size={20} />
        </button>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-6xl h-[85vh] flex flex-col gap-4 pointer-events-none">
          {/* Mobile Tab (Visible only on Mobile) */}
          <div className="md:hidden pointer-events-auto flex gap-2 px-1">
            <button
              onClick={() => setMobileTab("info")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                mobileTab === "info"
                  ? `${styles.primaryBg} text-white`
                  : `${isDark ? "bg-slate-800 text-slate-400" : "bg-white text-slate-600"}`
              }`}
            >
              <Info size={18} /> ข้อมูล
            </button>
            <button
              onClick={() => setMobileTab("personnel")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                mobileTab === "personnel"
                  ? `${styles.primaryBg} text-white`
                  : `${isDark ? "bg-slate-800 text-slate-400" : "bg-white text-slate-600"}`
              }`}
            >
              <Users size={18} /> บุคลากร ({allTeachers.length})
            </button>
          </div>

          {/* Grid Layout */}
          <div className="flex-1 flex gap-6 min-h-0 pointer-events-auto">
            {/* Left Column: Info & Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                flex-1 flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${borderCol} ${bgMain}
                ${mobileTab === "info" ? "flex" : "hidden md:flex"}
              `}
            >
              {/* Image Slider */}
              <div className="relative h-[40%] md:h-[50%] bg-black shrink-0 group">
                {images.length > 0 ? (
                  <div
                    ref={scrollRef}
                    className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                  >
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="w-full h-full shrink-0 snap-center relative cursor-zoom-in"
                        onClick={() => openLightbox(index)}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full text-white text-[10px] font-bold border border-white/20 flex items-center gap-1">
                          <ImageIcon size={12} /> {index + 1}/{images.length}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 flex-col gap-2">
                    <Building2 size={48} />
                    <span className="text-xs">ไม่มีรูปภาพ</span>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => scroll("left")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={() => scroll("right")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                  <span
                    className={`px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase mb-1.5 inline-block ${styles.primaryBg}`}
                  >
                    {location.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                    {location.title}
                  </h2>
                </div>
              </div>

              {/* Detail Text */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                <div className="space-y-8">
                  <div>
                    <h3
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 ${styles.primary}`}
                    >
                      <MapPin size={18} /> ข้อมูลสถานที่
                    </h3>
                    {location.detail ? (
                      <p
                        className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}
                      >
                        {location.detail}
                      </p>
                    ) : (
                      <p className="text-sm opacity-50 italic">
                        ไม่มีรายละเอียดเพิ่มเติม
                      </p>
                    )}
                  </div>

                  {location.facilities && location.facilities.length > 0 && (
                    <div>
                      <h4 className="font-bold mb-3 text-xs opacity-60 uppercase tracking-wider">
                        สิ่งอำนวยความสะดวก
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {location.facilities.map((f, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${borderCol} ${isDark ? "bg-slate-800" : "bg-slate-50"}`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Teacher List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                w-full md:w-[380px] lg:w-[420px] flex-col rounded-3xl overflow-hidden shadow-2xl
                ${mobileTab === "personnel" ? "flex" : "hidden md:flex"}
              `}
            >
              <TeacherList
                teachers={allTeachers}
                onSelectTeacher={setSelectedTeacherId}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- Detail Popup --- */}
      <AnimatePresence>
        {selectedTeacherId && (
          <TeacherDetailOverlay
            teacherId={selectedTeacherId}
            onClose={() => setSelectedTeacherId(null)}
          />
        )}
      </AnimatePresence>

      {/* --- Lightbox --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full z-[1000] hover:bg-white/20"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              <img
                src={images[lightboxIndex]}
                alt="Fullscreen"
                className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg select-none pointer-events-auto"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={showPrevImage}
                    className="absolute left-2 md:left-8 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 pointer-events-auto"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={showNextImage}
                    className="absolute right-2 md:right-8 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 pointer-events-auto"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm font-bold rounded-full border border-white/10">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default LocationDetailCard;
