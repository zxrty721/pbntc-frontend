// src/config/theme.ts

export type ThemeType = 'light' | 'dark';

export const THEMES = {
  light: {
    name: 'Modern Light',
    isDark: false,
    // พื้นหลัง
    bgBody: 'bg-slate-50', 
    bgHeader: 'bg-white/80',
    // สี Text
    textHeading: 'text-slate-900',
    textBody: 'text-slate-600',
    // สีหลัก (Gradient ม่วง)
    bgGradient: 'from-violet-600 to-purple-600',
    primary: 'text-violet-600',
    primaryBg: 'bg-violet-600',
    // Card (ขาว มีเงา)
    card: 'bg-white shadow-xl shadow-purple-900/5 border border-slate-100',
    // Icon
    iconBtn: 'text-slate-600 hover:bg-slate-100',
  },
  dark: {
    name: 'Midnight Black',
    isDark: true,
    // พื้นหลัง (ดำสนิท)
    bgBody: 'bg-slate-950',
    bgHeader: 'bg-slate-900/80',
    // สี Text (ขาว)
    textHeading: 'text-white',
    textBody: 'text-slate-400',
    // สีหลัก (Gradient ฟ้า-น้ำเงิน ให้ดู Neon ในที่มืด)
    bgGradient: 'from-blue-500 to-indigo-500',
    primary: 'text-blue-400',
    primaryBg: 'bg-blue-600',
    // Card (ดำเทา มีขอบ)
    card: 'bg-slate-900 shadow-xl shadow-black/50 border border-slate-800',
    // Icon
    iconBtn: 'text-slate-300 hover:bg-slate-800',
  }
};