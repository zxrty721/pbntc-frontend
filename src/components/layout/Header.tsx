import { Phone, Mail, Search, X, List, MapPin, MapPinOff, ChevronLeft, User, Mic, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (t: string) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (o: boolean) => void;
    showPins: boolean;
    setShowPins: (o: boolean) => void;
}

const SOCIAL_LINKS = [
    {
        id: "facebook",
        url: "https://www.facebook.com/pbntc212/",
        title: "Facebook",
        desktopColor: "hover:text-blue-400",
        mobileColor: "text-blue-600 bg-blue-50 hover:bg-blue-100",
        icon: (size: number) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        id: "instagram",
        url: "https://www.instagram.com/phetchabuntechnicalcollege/",
        title: "Instagram",
        desktopColor: "hover:text-pink-400",
        mobileColor: "text-pink-600 bg-pink-50 hover:bg-pink-100",
        icon: (size: number) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        id: "youtube",
        url: "https://www.youtube.com/@TECHNICA_STORY",
        title: "YouTube",
        desktopColor: "hover:text-red-400",
        mobileColor: "text-red-600 bg-red-50 hover:bg-red-100",
        icon: (size: number) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        ),
    },
    {
        id: "tiktok",
        url: "https://www.tiktok.com/@technical.story",
        title: "TikTok",
        desktopColor: "hover:text-slate-300",
        mobileColor: "text-slate-800 bg-slate-100 hover:bg-slate-200",
        icon: (size: number) => (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
        ),
    },
];

export default function Header({ searchTerm, setSearchTerm, isSidebarOpen, setSidebarOpen, showPins, setShowPins }: HeaderProps) {
    const [isListening, setIsListening] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [isSocialDropdownOpen, setIsSocialDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsSocialDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClearSearch = () => {
        setSearchTerm("");
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleVoiceSearch = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("เบราว์เซอร์ของคุณไม่รองรับการค้นหาด้วยเสียง");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "th-TH";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchTerm(transcript);
        };

        recognition.start();
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-surface shadow-md">
            {/* 🔴 TOP BAR (จอคอม) */}
            <div className="hidden md:flex h-8 w-full bg-primary-dark text-white text-xs px-6 justify-between items-center border-b border-primary/40">
                <div className="flex items-center gap-5 shrink min-w-0">
                    <a href="tel:056711455" className="flex items-center gap-1.5 hover:text-secondary transition-colors font-medium shrink-0">
                        <Phone size={13} className="text-secondary" />
                        <span>056-711455</span>
                    </a>
                    <a href="https://pbntc.ac.th/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-secondary transition-colors font-medium shrink-0">
                        <Globe size={13} className="text-secondary" />
                        <span>pbntc.ac.th</span>
                    </a>
                    <a href="mailto:pbntc212@pbntc.ac.th" className="flex items-center gap-1.5 hover:text-secondary transition-colors shrink-0">
                        <Mail size={13} className="text-secondary" />
                        <span>pbntc212@pbntc.ac.th</span>
                    </a>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs uppercase font-bold text-white/60">ติดตามเรา:</span>
                    <div className="flex items-center gap-3 border-r border-white/20 pr-3">
                        {SOCIAL_LINKS.map((social) => (
                            <a key={`desktop-${social.id}`} target="_blank" rel="noopener noreferrer" href={social.url} className={`transition-colors p-0.5 ${social.desktopColor}`} title={social.title}>
                                {social.icon(13)}
                            </a>
                        ))}
                    </div>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/she.riff.770099/" className="flex items-center gap-1 bg-white/10 hover:bg-secondary hover:text-primary-dark px-2 py-0.5 rounded text-xs font-bold transition-all">
                        <User size={11} className="text-secondary group-hover:text-primary-dark" />
                        <span>ผู้จัดทำ</span>
                    </a>
                </div>
            </div>

            {/* 🔴 MAIN NAVBAR */}
            <div className="w-full bg-white border-b border-slate-200 h-14 md:h-20 px-2 sm:px-4 md:px-6 flex items-center relative">
                <div className="flex items-center justify-between gap-2 w-full min-w-0">
                    {/* ฝั่งซ้าย: โลโก้วิทยาลัย */}
                    <div className="flex items-center shrink-0" ref={dropdownRef}>
                        {/* เดสก์ท็อป: แสดงโลโก้ + ชื่อวิทยาลัยเต็ม */}
                        <a href="https://pbntc.ac.th/" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-3 group">
                            <img src="/logo192.png" alt="PBNTC Logo" className="h-11 w-auto transition-transform group-hover:scale-105 shrink-0" />
                            <div className="flex flex-col min-w-0">
                                <h1 className="font-bold text-xl text-slate-900 leading-tight truncate group-hover:text-primary transition-colors">วิทยาลัยเทคนิคเพชรบูรณ์</h1>
                                <span className="text-xs font-bold text-primary tracking-wider uppercase leading-none truncate">Phetchabun Technical College</span>
                            </div>
                        </a>

                        {/* มือถือ: เหลือแค่ปุ่มโลโก้กับพื้นหลัง (ไม่มีคำว่า PBNTC เพื่อให้ช่องค้นหายาวที่สุด) */}
                        <div className="md:hidden">
                            <button onClick={() => setIsSocialDropdownOpen(!isSocialDropdownOpen)} aria-label="เปิดเมนูข้อมูลวิทยาลัย" className={`p-1.5 rounded-xl border transition-all shadow-sm active:scale-95 flex items-center justify-center ${isSocialDropdownOpen ? "bg-primary-dark border-primary-dark" : "bg-primary border-primary hover:bg-primary-dark"}`}>
                                <img src="/logo192.png" alt="Logo" className="h-6 w-6 shrink-0 drop-shadow-sm" />
                            </button>
                        </div>
                    </div>

                    {/* ฝั่งขวา: แผงควบคุมและค้นหา (กินพื้นที่เต็มที่เหลือด้วย flex-1) */}
                    <div className="flex items-center gap-1 md:gap-2 bg-primary p-1 md:p-1.5 rounded-full border border-primary-dark shrink-0 flex-1 justify-end max-w-sm">
                        <div className="relative flex-1 min-w-0 h-8 md:h-9 rounded-full bg-white flex items-center px-2 md:px-3 border border-slate-200 focus-within:border-secondary transition-all shadow-inner group">
                            <Search size={14} className="text-slate-400 shrink-0 mr-1.5 group-focus-within:text-primary" />
                            <input ref={searchInputRef} type="text" placeholder="ค้นหาอาคาร..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setSidebarOpen(true)} className="w-full h-full bg-transparent border-none outline-none pr-6 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 truncate focus:ring-0" />

                            {searchTerm ? (
                                <button onClick={handleClearSearch} className="absolute right-1.5 p-1 text-slate-400 hover:text-primary bg-white rounded-full">
                                    <X size={14} strokeWidth={2.5} />
                                </button>
                            ) : (
                                <button onClick={handleVoiceSearch} className={`absolute right-1.5 p-1 bg-white rounded-full ${isListening ? "text-secondary animate-pulse" : "text-slate-400 hover:text-primary"}`}>
                                    <Mic size={14} strokeWidth={2.5} />
                                </button>
                            )}
                        </div>

                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className={`h-8 w-8 md:h-9 md:w-9 shrink-0 flex items-center justify-center rounded-full transition-colors ${isSidebarOpen ? "bg-secondary text-primary-dark font-black shadow-sm" : "bg-white/20 text-white hover:bg-white/30"}`}>
                            {isSidebarOpen ? <ChevronLeft size={18} strokeWidth={3} /> : <List size={16} strokeWidth={2.5} />}
                        </button>

                        <button onClick={() => setShowPins(!showPins)} className={`h-8 w-8 md:h-9 md:w-9 shrink-0 flex items-center justify-center rounded-full transition-colors ${showPins ? "bg-secondary text-primary-dark font-black shadow-sm" : "bg-white/20 text-white hover:bg-white/30"}`}>
                            {showPins ? <MapPin size={16} strokeWidth={2.5} /> : <MapPinOff size={16} strokeWidth={2.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🚀 SMART APP CARD (กินพื้นที่ทับ Header ตั้งแต่บนสุด top-2 เพื่อให้มีพื้นที่อ่านเยอะที่สุด) */}
            {isSocialDropdownOpen && (
                <>
                    {/* พื้นหลังสีมืดธรรมดา (ไม่มี blur) */}
                    <div className="fixed inset-0 bg-slate-900/40 z-50 md:hidden animate-in fade-in duration-150" onClick={() => setIsSocialDropdownOpen(false)} />

                    {/* กล่องเมนู: ลอยทับ Header ตั้งแต่บนสุด (top-2) จำกัดความสูงไม่ให้ล้น iframe (max-h-[calc(100vh-1rem)]) */}
                    <div className="fixed top-2 left-2 right-2 max-w-xs mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden md:hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[calc(100vh-1rem)]">
                        {/* ส่วนหัวแอป: ชื่อวิทยาลัยแสดงครบ ไม่ตกหล่น */}
                        <div className="bg-linear-to-r from-primary-dark to-primary p-3 text-white relative shrink-0">
                            <button onClick={() => setIsSocialDropdownOpen(false)} className="absolute top-2.5 right-2.5 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                                <X size={14} />
                            </button>
                            <div className="flex items-center gap-2.5 pr-6">
                                <img src="/logo192.png" alt="Logo" className="w-9 h-9 shrink-0 drop-shadow" />
                                <div className="min-w-0 flex-1">
                                    <h2 className="font-bold text-xs leading-tight text-white">วิทยาลัยเทคนิคเพชรบูรณ์</h2>
                                    <p className="text-[9px] text-secondary font-bold tracking-tight uppercase leading-tight mt-0.5 whitespace-normal">Phetchabun Technical College</p>
                                </div>
                            </div>
                        </div>

                        {/* พื้นที่เนื้อหา เลื่อนดูได้ไม่ล้นจอ */}
                        <div className="p-3 space-y-3 overflow-y-auto custom-scrollbar flex-1">
                            {/* ช่องทางการติดต่อ */}
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">ช่องทางการติดต่อ</p>
                                <div className="space-y-1.5">
                                    <a href="tel:056711455" className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-primary/5 border border-slate-100 rounded-xl transition-all active:scale-[0.98] group">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                            <Phone size={14} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[9px] text-slate-400 font-bold leading-none mb-0.5">เบอร์โทรศัพท์</div>
                                            <div className="text-xs font-bold text-slate-700 group-hover:text-primary truncate">056-711455</div>
                                        </div>
                                    </a>

                                    <a href="https://pbntc.ac.th/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-primary/5 border border-slate-100 rounded-xl transition-all active:scale-[0.98] group">
                                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <Globe size={14} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[9px] text-slate-400 font-bold leading-none mb-0.5">เว็บไซต์หลัก</div>
                                            <div className="text-xs font-bold text-slate-700 group-hover:text-primary truncate">pbntc.ac.th</div>
                                        </div>
                                    </a>

                                    <a href="mailto:pbntc212@pbntc.ac.th" className="flex items-center gap-2.5 p-2 bg-slate-50 hover:bg-primary/5 border border-slate-100 rounded-xl transition-all active:scale-[0.98] group">
                                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                            <Mail size={14} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[9px] text-slate-400 font-bold leading-none mb-0.5">อีเมลวิทยาลัย</div>
                                            <div className="text-xs font-bold text-slate-700 group-hover:text-primary truncate">pbntc212@pbntc.ac.th</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* โซเชียลมีเดีย */}
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">ติดตามเราทางโซเชียล</p>
                                <div className="grid grid-cols-4 gap-1.5">
                                    {SOCIAL_LINKS.map((social) => (
                                        <a key={`mobile-app-${social.id}`} target="_blank" rel="noopener noreferrer" href={social.url} className={`flex flex-col items-center justify-center py-2 rounded-xl transition-transform active:scale-95 shadow-xs border border-slate-100 ${social.mobileColor}`} title={social.title}>
                                            {social.icon(16)}
                                            <span className="text-[9px] font-bold mt-1 opacity-80">{social.title}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer ผู้จัดทำ (ยึดติดล่างเสมอ) */}
                        <div className="p-2 bg-slate-50 border-t border-slate-100 shrink-0">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/she.riff.770099/" className="flex items-center justify-center gap-1.5 w-full py-2 bg-white hover:bg-primary text-slate-700 hover:text-white border border-slate-200/80 rounded-lg text-[11px] font-bold transition-all shadow-xs active:scale-[0.98]">
                                <User size={13} className="text-primary group-hover:text-white" /> ติดต่อผู้จัดทำระบบ
                            </a>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
