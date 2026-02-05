import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Providers } from "./providers";
import { UIProvider } from "./contexts/UIContext"; // ✅ 1. อย่าลืม Import นี้

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "College Map Digital",
  description: "ระบบแผนที่และสารสนเทศวิทยาลัย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${kanit.variable} font-sans antialiased text-slate-800 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300`}>
        <Providers>
          {/* ✅ 2. UIProvider ต้องคลุมทั้ง Header, Sidebar และ Content */}
          <UIProvider>

            {/* Header ใช้ useUI เพื่อกดปุ่มเปิด Sidebar จึงต้องอยู่ข้างใน */}
            <Header />

            <div className="flex flex-col min-h-screen pt-24 md:pt-28">

              {/* Main Content */}
              <main className="grow w-full md:pl-24 transition-all duration-300">
                {children}
              </main>

              <Footer />
            </div>

          </UIProvider>
        </Providers>
      </body>
    </html>
  );
}