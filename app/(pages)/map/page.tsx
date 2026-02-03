"use client";

import dynamic from 'next/dynamic';

// Dynamic Import Map Component
const MapWithNoSSR = dynamic(() => import('../../components/map/Map'), { // เช็ค Path import ให้ตรงกับ folder structure ของคุณ
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center bg-purple-50 text-purple-400 gap-3">
            {/* Loading Spinner */}
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="animate-pulse font-medium text-sm">กำลังโหลดข้อมูลแผนที่...</p>
        </div>
    ),
});

export default function MapPage() {
    return (
        // คำนวณความสูง: จอ - Header (64px)
        <div className="w-full h-[calc(100vh-64px)] relative overflow-hidden bg-slate-200">

            {/* Map เต็มพื้นที่ (ใส่ Animation Scale In) */}
            <div className="absolute inset-0 z-0 anim-scale">
                <MapWithNoSSR />
            </div>

        </div>
    );
}