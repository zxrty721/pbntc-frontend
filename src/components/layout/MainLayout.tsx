import React, { type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-600 font-sans selection:bg-indigo-500/30">
      {/* 1. ส่วนหัว */}
      <Header />

      {/* 2. ส่วนเนื้อหา (เจาะรูตรงนี้) */}
      <main className="grow flex flex-col items-center justify-center p-4 md:p-8 w-full relative">
        {children}
      </main>

      {/* 3. ส่วนท้าย */}
      <Footer />
    </div>
  );
};

export default MainLayout;