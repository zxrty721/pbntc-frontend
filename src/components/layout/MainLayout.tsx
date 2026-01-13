import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../../context/ThemeContext";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { styles } = useTheme();

  return (
    // ใช้ styles.bgBody เพื่อเปลี่ยนสีพื้นหลัง (ขาว <-> ดำ)
    <div className={`flex min-h-screen flex-col font-sans transition-colors duration-300 ${styles.bgBody} ${styles.textBody}`}>
      <Header />
      <main className="grow flex flex-col w-full relative overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}