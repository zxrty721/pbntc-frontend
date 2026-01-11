import {
  BookOpen,
  Building2,
  Home,
  ShieldCheck,
  MapPin,
  Trophy,
  Utensils,
  Car,
  HeartPulse,
  LogIn,
  Hammer,
  Library,
  Mic2, // 👈 Import Icon ใหม่สำหรับหอประชุม
} from "lucide-react";
import type { CategoryType, CategoryStyle } from "../types";

// 1. กำหนดสี Hex Code
export const CATEGORY_PIN_COLORS: Record<CategoryType, string> = {
  academic: "#9333ea", 
  admin:    "#e11d48", 
  dorm:     "#3b82f6", 
  sport:    "#ca8a04", 
  landmark: "#10b981", 
  facility: "#4b5563", 
  food:     "#f97316", 
  parking:  "#475569", 
  health:   "#dc2626", 
  entrance: "#18181b", 
  practice: "#d97706",
  library:  "#0891b2",
  auditorium: "#4f46e5", // 👈 เพิ่มสี Indigo-600 สำหรับหอประชุม
};

// 2. กำหนด Style
export const CATEGORY_STYLES: Record<CategoryType, CategoryStyle> = {
  academic: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    pinColor: "text-purple-600",
    icon: BookOpen,
  },
  admin: {
    bg: "bg-rose-100",
    text: "text-rose-800",
    pinColor: "text-rose-600",
    icon: ShieldCheck,
  },
  dorm: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    pinColor: "text-blue-500",
    icon: Home,
  },
  sport: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    pinColor: "text-yellow-600",
    icon: Trophy,
  },
  landmark: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    pinColor: "text-emerald-500",
    icon: MapPin,
  },
  facility: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    pinColor: "text-gray-600",
    icon: Building2,
  },
  food: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    pinColor: "text-orange-500",
    icon: Utensils,
  },
  parking: {
    bg: "bg-slate-200",
    text: "text-slate-800",
    pinColor: "text-slate-600",
    icon: Car,
  },
  health: {
    bg: "bg-red-100",
    text: "text-red-800",
    pinColor: "text-red-600",
    icon: HeartPulse,
  },
  entrance: {
    bg: "bg-zinc-800",
    text: "text-zinc-100",
    pinColor: "text-zinc-800",
    icon: LogIn,
  },
  practice: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    pinColor: "text-amber-600",
    icon: Hammer,
  },
  library: {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    pinColor: "text-cyan-600",
    icon: Library,
  },
  // 👈 เพิ่มส่วนนี้ให้ครบ
  auditorium: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    pinColor: "text-indigo-600",
    icon: Mic2, 
  },
};