// src/config/theme.ts

export type ThemeType = 'purple' | 'red';

export const THEMES = {
  purple: {
    name: 'Cyber Purple',
    primary: 'text-indigo-400',
    bgGradient: 'from-indigo-600 to-purple-600',
    button: 'bg-indigo-600 hover:bg-indigo-500',
    border: 'border-indigo-500/30',
    icon: 'text-purple-400',
    badge: 'bg-indigo-500/10 text-indigo-300'
  },
  red: {
    name: 'Crimson Red',
    primary: 'text-yellow-400',
    bgGradient: 'from-yellow-600 to-yellow-600',
    button: 'bg-yellow-600 hover:bg-yellow-500',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-400',
    badge: 'bg-yellow-500/10 text-yellow-300'
  }
};