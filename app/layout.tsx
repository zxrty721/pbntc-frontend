import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
// ❌ ลบอันเดิมออก
// import Footer from "./components/layout/Footer"; 
// ✅ 1. เพิ่ม import อันใหม่เข้ามา
import ConditionalFooter from "./components/layout/ConditionalFooter";

import { Providers } from "./providers";
import { UIProvider } from "./contexts/UIContext";

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
          <UIProvider>
            <Header />

            <div className="flex flex-col min-h-screen pt-24 md:pt-28">
              <main className="w-full">
                {children}
              </main>

              {/* ✅ 2. เปลี่ยนมาใช้ ConditionalFooter แทน */}
              <ConditionalFooter />
            </div>

          </UIProvider>
        </Providers>
      </body>
    </html>
  );
}