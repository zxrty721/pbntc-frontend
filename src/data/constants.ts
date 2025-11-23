import type { CategoryType, CategoryStyle } from '../types';

export const CATEGORY_STYLES: Record<CategoryType, CategoryStyle> = {
  academic: { bg: 'bg-purple-100', text: 'text-purple-800', pinColor: 'text-purple-600' },
  facility: { bg: 'bg-orange-100', text: 'text-orange-800', pinColor: 'text-orange-500' },
  dorm:     { bg: 'bg-blue-100',   text: 'text-blue-800',   pinColor: 'text-blue-500' },
  admin:    { bg: 'bg-rose-100',   text: 'text-rose-800',   pinColor: 'text-rose-600' },
  landmark: { bg: 'bg-emerald-100', text: 'text-emerald-800', pinColor: 'text-emerald-500' },
};