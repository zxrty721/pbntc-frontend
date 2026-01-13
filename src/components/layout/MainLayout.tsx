import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../../context/ThemeContext";
import BackgroundParticles from "../ui/BackgroundParticles";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { styles } = useTheme();

  return (
    // ลบ styles.bgBody ออกจาก Container หลัก เพื่อป้องกันการทับ Particles
    <div
      className={`relative flex flex-col min-h-screen font-sans transition-colors duration-300 ${styles.textBody} overflow-x-hidden`}
    >
      {/* --- Layer 1 (ล่างสุด): สีพื้นหลัง --- */}
      {/* ใช้ fixed เพื่อให้สีปูเต็มจอเสมอ และใช้ z-index ต่ำสุด */}
      <div
        className={`fixed inset-0 -z-50 transition-colors duration-300 ${styles.bgBody}`}
      />

      {/* --- Layer 2 (กลาง): Animation Particles --- */}
      {/* BackgroundParticles จะลอยอยู่เหนือสีพื้นหลัง แต่อยู่ใต้เนื้อหา */}
      <BackgroundParticles />

      {/* --- Layer 3 (บนสุด): เนื้อหาเว็บไซต์ --- */}
      <div className="flex flex-col min-h-screen z-10 relative">
        <Header />

        {/* Content Area */}
        <main className="grow w-full pt-20 md:pt-24 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
