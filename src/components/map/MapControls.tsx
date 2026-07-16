import { Search, X, List, ChevronLeft, MapPin, MapPinOff } from "lucide-react";

interface MapControlsProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    showPins: boolean;
    setShowPins: (show: boolean) => void;
}

export default function MapControls({ searchTerm, setSearchTerm, isSidebarOpen, setSidebarOpen, showPins, setShowPins }: MapControlsProps) {
    return (
        <>
            {/* 🔍 SEARCH BAR (ตรงกลาง) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[60%] md:w-100 z-20 transition-all duration-300">
                {/* ลบเงา shadow-lg ออก */}
                <div className="relative rounded-full group h-12">
                    {/* ลบความโปร่งแสง bg-surface/95 เปลี่ยนเป็น bg-surface ทึบแสง */}
                    <div className="absolute inset-0 bg-surface rounded-full border border-slate-300"></div>
                    <div className="relative flex items-center h-full px-4">
                        <Search size={18} className="text-slate-400 shrink-0 group-focus-within:text-primary transition-colors" />
                        <input type="text" placeholder="ค้นหาอาคาร..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setSidebarOpen(true)} className="w-full h-full bg-transparent text-slate-800 border-none focus:ring-0 focus:outline-none pl-3 pr-8 text-sm font-medium placeholder:text-slate-400" />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")} className="absolute right-3 p-1.5 bg-slate-100 rounded-full text-slate-500 hover:text-primary transition-colors">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 🎛️ SIDEBAR TOGGLE BUTTON (ซ้ายบน) */}
            <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className={`absolute top-4 left-4 z-30 h-12 w-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 active:scale-95
                    ${isSidebarOpen ? "bg-primary text-white border-primary-dark" : "bg-surface text-slate-700 border-slate-300 hover:bg-slate-50"}
                `}
            >
                {isSidebarOpen ? <ChevronLeft size={24} /> : <List size={22} />}
            </button>

            {/* 📍 PIN TOGGLE BUTTON (ขวาบน) */}
            <button
                onClick={() => setShowPins(!showPins)}
                className={`absolute top-4 right-4 z-30 h-12 w-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 active:scale-95
                    ${showPins ? "bg-surface text-primary border-slate-300 hover:bg-slate-50" : "bg-slate-700 text-white border-slate-900"}
                `}
                title={showPins ? "ซ่อนหมุดทั้งหมด" : "แสดงหมุดทั้งหมด"}
            >
                {showPins ? <MapPin size={22} /> : <MapPinOff size={22} />}
            </button>
        </>
    );
}
