"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
    const pathname = usePathname();

    // ✅ ถ้า URL คือ /map หรือขึ้นต้นด้วย /map/ ให้ return null (ไม่แสดง Footer)
    if (pathname === "/map" || pathname?.startsWith("/map/")) {
        return null;
    }

    // ถ้าเป็นหน้าอื่น แสดง Footer ปกติ
    return <Footer />;
}