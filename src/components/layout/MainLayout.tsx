import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-600 font-sans selection:bg-indigo-500/30">
      <Header />
      {/* main มี grow flex-col เต็มพื้นที่ */}
      <main className="grow flex flex-col w-full relative overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
