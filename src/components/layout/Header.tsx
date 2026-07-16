import { Phone, Mail, Search, X, List, MapPin, MapPinOff, ChevronLeft, User } from "lucide-react";

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (t: string) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (o: boolean) => void;
    showPins: boolean;
    setShowPins: (o: boolean) => void;
}

export default function Header({ searchTerm, setSearchTerm, isSidebarOpen, setSidebarOpen, showPins, setShowPins }: HeaderProps) {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-md">
            {/* TOP BAR: แถบข้อมูลติดต่อ และ โซเชียล (คืนค่า py-2 แบบเดิมเป๊ะ) */}
            <div className="w-full bg-primary-dark text-white text-[11px] md:text-xs py-2 px-3 md:px-6 flex justify-between items-center border-b border-primary/40">
                {/* 🟢 ฝั่งซ้าย: ข้อมูลติดต่อ (ในคอมโชว์ครบ 2 เมล / ในมือถือโชว์ไอคอนซองจดหมาย 2 อันให้กดแยกได้ ไม่ล้นจอ) */}
                <div className="flex items-center gap-2.5 md:gap-5 shrink-0">
                    {/* เบอร์โทรศัพท์ */}
                    <a href="tel:056711455" className="flex items-center gap-1 hover:text-secondary transition-colors font-medium" title="โทรออกวิทยาลัยเทคนิคเพชรบูรณ์">
                        <Phone size={12} className="text-secondary shrink-0" />
                        <span>
                            <span className="hidden sm:inline">โทร: </span>056-711455
                        </span>
                    </a>

                    {/* อีเมลที่ 1 (ในมือถือจะโชว์แค่ไอคอนซองจดหมายอันที่ 1 กดส่งเมลได้ทันที) */}
                    <a href="mailto:pbntc212@pbntc.ac.th" className="flex items-center gap-1 hover:text-secondary transition-colors" title="ส่งอีเมลหา pbntc212@pbntc.ac.th">
                        <Mail size={12} className="text-secondary shrink-0" />
                        <span className="hidden md:inline">pbntc212@pbntc.ac.th</span>
                    </a>

                    {/* อีเมลที่ 2 (ในคอมขึ้นคู่กัน / ในมือถือจะโชว์แค่ไอคอนซองจดหมายอันที่ 2 วางคู่กันฝั่งซ้าย กดส่งเมลได้ทันที) */}
                    <div className="flex items-center gap-1">
                        <span className="hidden md:inline text-white/20 mr-1">|</span>
                        <a href="mailto:Phettech212@hotmail.com" className="flex items-center gap-1 hover:text-secondary transition-colors" title="ส่งอีเมลหา Phettech212@hotmail.com">
                            <span className="hidden md:inline">Phettech212@hotmail.com</span>
                        </a>
                    </div>
                </div>

                {/* ฝั่งขวา: โซเชียล (IG กลับมาแล้ว และแก้บั๊ก SVG ครบ) และ ปุ่มผู้จัดทำ */}
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <span className="hidden xl:inline text-[10px] uppercase font-bold tracking-widest text-white/60 mr-1">ติดตามเรา:</span>

                    {/* โซเชียลหลักวิทยาลัย (ใช้ Self-closing tag /> ทั้งหมด ไม่ Error แน่นอน) */}
                    <div className="flex items-center gap-2 md:gap-3 border-r border-white/20 pr-2 md:pr-3">
                        {/* Facebook */}
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/pbntc212/" className="hover:text-blue-400 transition-colors p-0.5" title="Facebook วิทยาลัย">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/phetchabuntechnicalcollege/" className="hover:text-pink-400 transition-colors p-0.5" title="Instagram วิทยาลัย">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        {/* YouTube */}
                        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@TECHNICA_STORY" className="hover:text-red-400 transition-colors p-0.5" title="YouTube">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                        {/* TikTok */}
                        <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@technical.story" className="hover:text-slate-300 transition-colors p-0.5" title="TikTok">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                        </a>
                    </div>

                    {/* ปุ่มลิงก์ Facebook ของคุณ (ผู้จัดทำระบบ) */}
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/she.riff.770099/" className="flex items-center gap-1 bg-white/10 hover:bg-secondary hover:text-primary-dark px-2 py-0.5 rounded text-[10px] md:text-xs font-semibold transition-all" title="ติดต่อผู้จัดทำระบบ">
                        <User size={11} className="text-secondary group-hover:text-primary-dark shrink-0" />
                        <span>ผู้จัดทำ</span>
                    </a>
                </div>
            </div>

            {/* 🔴 MAIN NAVBAR: คืนค่าความสูงกลับเป็น py-3 md:py-0 md:h-20 ตามออริจินัลเป๊ะ ไม่เหลือช่องว่างแน่นอน! */}
            <div className="w-full bg-white border-b border-slate-200 py-3 md:py-0 md:h-20 px-3 md:px-6 flex items-center">
                <div className="flex items-center justify-between gap-2 md:gap-4 w-full">
                    {/* ส่วนชื่อวิทยาลัยและแผนที่ */}
                    <a href="https://pbntc.ac.th/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-3 shrink-0 group min-w-0">
                        <img src="https://img.pbntc.site/og-pbntc.svg" alt="PBNTC Logo" className="h-8 md:h-11 w-auto transition-transform group-hover:scale-105 shrink-0" />
                        <div className="flex flex-col min-w-0">
                            <h1 className="font-bold text-xs sm:text-base md:text-xl text-slate-900 leading-tight truncate group-hover:text-primary transition-colors">วิทยาลัยเทคนิคเพชรบูรณ์</h1>
                            <span className="text-[9px] sm:text-[11px] md:text-xs font-bold text-primary tracking-wider uppercase mt-0 md:mt-0.5 leading-none">
                                PBNTC <span className="text-secondary-dark font-extrabold">MAP</span>
                            </span>
                        </div>
                    </a>

                    {/* ส่วนของแผงควบคุมและแถบค้นหา */}
                    <div className="flex items-center gap-1 md:gap-2 bg-primary p-1 md:p-1.5 rounded-full border border-primary-dark shrink-0">
                        {/* ช่องค้นหา */}
                        <div className="relative w-24 sm:w-40 md:w-64 lg:w-80 focus-within:w-40 sm:focus-within:w-56 md:focus-within:w-72 h-8 md:h-9 rounded-full bg-white flex items-center px-2.5 md:px-3 border border-slate-200 focus-within:border-secondary transition-all duration-300">
                            <Search size={14} className="text-slate-400 shrink-0 mr-1 md:mr-1.5" />
                            <input type="text" placeholder="ค้นหาอาคาร..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setSidebarOpen(true)} className="w-full h-full bg-transparent border-none outline-none pr-5 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 truncate" />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="absolute right-2 p-0.5 text-slate-400 hover:text-primary transition-colors">
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        {/* ปุ่มเปิด/ปิด รายชื่ออาคาร */}
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className={`h-8 w-8 md:h-9 md:w-9 shrink-0 flex items-center justify-center rounded-full transition-colors
                                ${isSidebarOpen ? "bg-secondary text-primary font-bold" : "bg-white/15 text-white hover:bg-white/25 border border-white/20"}
                            `}
                            title="เปิด/ปิด รายชื่ออาคาร"
                        >
                            {isSidebarOpen ? <ChevronLeft size={18} strokeWidth={2.5} /> : <List size={16} />}
                        </button>

                        {/* ปุ่มแสดง/ซ่อนหมุด */}
                        <button
                            onClick={() => setShowPins(!showPins)}
                            className={`h-8 w-8 md:h-9 md:w-9 shrink-0 flex items-center justify-center rounded-full transition-colors
                                ${showPins ? "bg-secondary text-primary font-bold" : "bg-white/15 text-white hover:bg-white/25 border border-white/20"}
                            `}
                            title={showPins ? "ซ่อนหมุดทั้งหมด" : "แสดงหมุดทั้งหมด"}
                        >
                            {showPins ? <MapPin size={16} strokeWidth={2.5} /> : <MapPinOff size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
