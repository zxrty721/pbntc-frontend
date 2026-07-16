import { Building2, Search, X } from "lucide-react";
import type { MapLocation } from "../../assets/types";

interface MapSidebarProps {
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    filteredLocations: MapLocation[];
    selectedLocation: MapLocation | null;
    onSelectLocation: (loc: MapLocation) => void;
}

export default function MapSidebar({ isSidebarOpen, setSidebarOpen, filteredLocations, selectedLocation, onSelectLocation }: MapSidebarProps) {
    return (
        <div className={`absolute z-20 flex flex-col bg-surface border-r border-slate-300 transition-all duration-300 bottom-0 left-0 right-0 rounded-t-3xl max-h-[60vh] md:top-28.5 md:bottom-0 md:left-0 md:w-80 md:rounded-none md:max-h-none md:pt-0 ${isSidebarOpen ? "translate-y-0 md:translate-x-0 opacity-100" : "translate-y-full md:translate-y-0 md:-translate-x-full opacity-0 pointer-events-none"}`}>
            <div className="flex items-center justify-between p-5 border-b border-slate-200 shrink-0 bg-surface">
                <div className="flex items-center gap-3 text-slate-800 font-bold">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Building2 className="text-primary" size={20} />
                    </div>
                    <span className="text-base">อาคารเรียน ({filteredLocations.length})</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-primary">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5 min-h-0 bg-surface">
                {filteredLocations.length > 0 ? (
                    [...filteredLocations]
                        .sort((a, b) => a.code.localeCompare(b.code))
                        .map((loc) => {
                            const isActive = selectedLocation?.id === loc.id;
                            return (
                                <button key={loc.id} onClick={() => onSelectLocation(loc)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 border-2 ${isActive ? "bg-primary text-white border-primary-dark translate-x-1" : "bg-transparent border-transparent hover:bg-slate-50 text-slate-700 hover:border-slate-200"}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs transition-colors border ${isActive ? "bg-secondary text-primary border-secondary" : "bg-slate-100 text-slate-500 border-slate-200"}`}>{loc.code}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-bold text-sm truncate">{loc.name}</div>
                                    </div>
                                </button>
                            );
                        })
                ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-slate-400 space-y-3 opacity-70">
                        <Search size={36} className="stroke-1" />
                        <span className="text-sm font-medium">ไม่พบอาคารที่ค้นหา</span>
                    </div>
                )}
            </div>
        </div>
    );
}
