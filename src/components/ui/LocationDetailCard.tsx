import React, { useRef, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  X, MapPin, Users, Building2, ChevronRight, ChevronLeft, 
  Image as ImageIcon, Filter, ChevronDown, Info 
} from "lucide-react";
import type { MapLocation } from "../../types";
import { teachersData } from "../../data/teachers";

interface Props {
  location: MapLocation;
  onClose: () => void;
}

// ใช้ memo เพื่อลดการ render ซ้ำซ้อน
const LocationDetailCard: React.FC<Props> = memo(({ location, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // --- Data Logic ---
  const allTeachers = useMemo(() => {
    return location.teacherIds?.map((id) => teachersData[id]).filter(Boolean) || [];
  }, [location.teacherIds]);

  const images = location.images && location.images.length > 0 ? location.images : [];

  const departments = useMemo(() => {
    const deps = new Set(allTeachers.map(t => t.department).filter(Boolean));
    return ["ทั้งหมด", ...Array.from(deps)];
  }, [allTeachers]);

  // --- States ---
  const [selectedDept, setSelectedDept] = useState("ทั้งหมด");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<'info' | 'personnel'>('info');

  // --- Filter Logic ---
  const filteredTeachers = useMemo(() => {
    if (selectedDept === "ทั้งหมด") return allTeachers;
    return allTeachers.filter(t => t.department === selectedDept);
  }, [allTeachers, selectedDept]);

  // --- Handlers ---
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const closeLightbox = () => setLightboxIndex(null);
  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
  };
  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6 overflow-hidden">
      
      {/* Overlay: ใช้ opacity ธรรมดา ไม่ใช้ blur เพื่อความลื่น */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Floating Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[250] p-2.5 rounded-full bg-white/20 text-white hover:bg-red-600 transition-colors border border-white/20 shadow-lg"
      >
        <X size={24} />
      </button>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-[95rem] h-[90vh] md:h-[85vh] flex flex-col gap-4 md:gap-6 px-4 pb-6 md:p-0">
        
        {/* Mobile Tab Switcher */}
        <div className="md:hidden shrink-0 flex w-full bg-slate-800 p-1 rounded-2xl border border-white/10">
           <button 
             onClick={() => setMobileTab('info')}
             className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mobileTab === 'info' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
           >
             <Info size={16} /> ข้อมูล
           </button>
           <button 
             onClick={() => setMobileTab('personnel')}
             className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mobileTab === 'personnel' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
           >
             <Users size={16} /> บุคลากร ({filteredTeachers.length})
           </button>
        </div>

        {/* Layout Container */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">

            {/* CARD 1: INFO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // ใช้ easeOut แทน spring เพื่อลดภาระเครื่อง
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`
                flex-1 bg-white rounded-[20px] shadow-2xl overflow-hidden flex-col relative md:flex order-2 md:order-1
                ${mobileTab === 'info' ? 'flex' : 'hidden'} 
              `}
            >
              {/* Image Carousel - ลบ backdrop-blur และ effect หนักๆ */}
              <div className="relative h-[40%] bg-slate-900 shrink-0 group">
                {images.length > 0 ? (
                    <div
                      ref={scrollRef}
                      className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                    >
                      {images.map((img, index) => (
                        <div 
                            key={index} 
                            className="w-full h-full flex-shrink-0 snap-center relative cursor-zoom-in"
                            onClick={() => setLightboxIndex(index)}
                        >
                          <img 
                            src={img} 
                            alt={`img-${index}`} 
                            className="w-full h-full object-cover opacity-90" 
                            loading="lazy" // ช่วยโหลดรูปเร็วขึ้น
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded-full text-white text-xs font-bold border border-white/10 flex items-center gap-2">
                            <ImageIcon size={12} /> <span>{index + 1}/{images.length}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                      <Building2 size={64} strokeWidth={1} />
                      <span className="text-sm mt-2 font-medium">ไม่มีรูปภาพ</span>
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button onClick={(e) => {e.stopPropagation(); scroll('left')}} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hidden md:block"><ChevronLeft size={24} /></button>
                      <button onClick={(e) => {e.stopPropagation(); scroll('right')}} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hidden md:block"><ChevronRight size={24} /></button>
                    </>
                  )}

                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-6 px-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase mb-2">
                      {location.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">{location.title}</h2>
                  </div>
              </div>

              {/* Description */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white">
                <div className="space-y-6 max-w-3xl mx-auto">
                  <section>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><MapPin size={16} /> ข้อมูลสถานที่</h3>
                    <p className="text-base text-slate-700 leading-relaxed font-medium">{location.description}</p>
                  </section>
                  {location.detail && (
                    <section className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                      <h4 className="text-sm font-bold text-slate-800 mb-1">รายละเอียดเพิ่มเติม</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{location.detail}</p>
                    </section>
                  )}
                  {location.facilities && location.facilities.length > 0 && (
                    <section>
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">สิ่งอำนวยความสะดวก</h3>
                      <div className="flex flex-wrap gap-2">
                        {location.facilities.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-xs md:text-sm font-medium text-slate-700">{f}</span>
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
                w-full md:w-[28rem] lg:w-[32rem] bg-slate-50 rounded-[20px] shadow-2xl overflow-hidden flex-col border border-slate-200 md:flex order-1 md:order-2
                ${mobileTab === 'personnel' ? 'flex' : 'hidden'}
              `}
            >
                {/* Header */}
                <div className="bg-white border-b border-slate-200 z-30 sticky top-0">
                  <div className="p-4 md:p-6 pb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-600 text-white rounded-lg shadow-sm"><Users size={20} /></div>
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-800">บุคลากร</h3>
                          <p className="text-xs text-slate-500">ประจำอาคารนี้</p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">{filteredTeachers.length} ท่าน</span>
                  </div>

                  <div className="px-4 md:px-6 pb-4 relative">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl active:bg-slate-100 transition-colors text-left"
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Filter size={14} className="text-slate-400" />
                          <span className="text-sm font-bold text-slate-700 truncate">{selectedDept === "ทั้งหมด" ? "แสดงทุกแผนก" : selectedDept}</span>
                        </div>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                            <div className="absolute left-6 right-6 top-[calc(100%-5px)] mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 max-h-52 overflow-y-auto custom-scrollbar">
                              {departments.map((dept, index) => {
                                const count = dept === "ทั้งหมด" ? allTeachers.length : allTeachers.filter(t => t.department === dept).length;
                                const isSelected = selectedDept === dept;
                                return (
                                  <button
                                    key={index}
                                    onClick={() => { setSelectedDept(dept); setIsDropdownOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm font-bold flex items-center justify-between border-b border-slate-50 last:border-0 ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-slate-600 active:bg-slate-50'}`}
                                  >
                                    <span>{dept === "ทั้งหมด" ? "แสดงทั้งหมด" : dept}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white text-blue-600' : 'bg-slate-100 text-slate-400'}`}>{count}</span>
                                  </button>
                                );
                              })}
                            </div>
                        </>
                    )}
                  </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-50/50">
                  {filteredTeachers.length > 0 ? (
                    <div className="space-y-3">
                      {filteredTeachers.map((t) => (
                        <Link to={`/teachers/${t.id}`} key={t.id} className="block group">
                          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm active:scale-[0.98] transition-transform flex items-center gap-4">
                              <div className="relative shrink-0">
                                <img
                                  src={`https://teacher.pbntc.site/${t.id}.jpg`}
                                  alt={t.name}
                                  className="w-12 h-12 rounded-full object-cover bg-slate-200"
                                  loading="lazy"
                                  onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=User"; }}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-slate-800 text-sm truncate">{t.name}</h4>
                                <p className="text-xs text-slate-500 font-medium truncate">{t.department}</p>
                                <p className="text-[10px] text-blue-600 font-bold truncate mt-0.5">{t.position}</p>
                              </div>
                              <ChevronRight size={16} className="text-slate-300" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-10 opacity-60">
                      <Filter size={24} className="mb-2"/>
                      <p className="text-sm font-medium">ไม่พบข้อมูล</p>
                    </div>
                  )}
                </div>
            </motion.div>
        </div>
      </div>
    </div>

    {/* Lightbox - ตัด AnimatePresence ออก ใช้ CSS transition ธรรมดา */}
    {lightboxIndex !== null && (
        <div 
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300 animate-in fade-in"
            onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 bg-white/10 text-white rounded-full z-50"><X size={24} /></button>
          
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
             <img
               src={images[lightboxIndex]}
               alt="Fullscreen"
               className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg select-none"
             />
             
             {images.length > 1 && (
               <>
                 <button onClick={showPrevImage} className="absolute left-2 p-3 bg-white/10 text-white rounded-full"><ChevronLeft size={24} /></button>
                 <button onClick={showNextImage} className="absolute right-2 p-3 bg-white/10 text-white rounded-full"><ChevronRight size={24} /></button>
               </>
             )}
             
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm font-bold rounded-full">
               {lightboxIndex + 1} / {images.length}
             </div>
          </div>
        </div>
    )}
    </>
  );
});

export default LocationDetailCard;