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
  Hammer, // 👈 เพิ่ม icon สำหรับ Practice
  Library, // 👈 อย่าลืม import icon Library มาด้วยนะครับ
} from "lucide-react";
import type { CategoryType, CategoryStyle } from "../types";

// 1. กำหนดสี Hex Code สำหรับ Pin โดยเฉพาะ (Source of Truth)
export const CATEGORY_PIN_COLORS: Record<CategoryType, string> = {
  academic: "#9333ea", // Purple-600
  admin:    "#e11d48", // Rose-600
  dorm:     "#3b82f6", // Blue-500
  sport:    "#ca8a04", // Yellow-600
  landmark: "#10b981", // Emerald-500
  facility: "#4b5563", // Gray-600
  food:     "#f97316", // Orange-500
  parking:  "#475569", // Slate-600
  health:   "#dc2626", // Red-600
  entrance: "#18181b", // Zinc-900
  practice: "#d97706", // Amber-600 (สีส้มเข้ม สำหรับโรงฝึกงาน)
  library:  "#0891b2",
};

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
  // เพิ่มหมวด Practice ให้ครบ
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
};