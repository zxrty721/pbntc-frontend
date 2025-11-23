export type CategoryType = 'academic' | 'facility' | 'dorm' | 'admin' | 'landmark';

export interface MapLocation {
  id: number;
  label: string;
  category: CategoryType;
  title: string;
  subtitle?: string;
  description: string;
  detail?: string;
  imageUrl?: string;
  facilities?: string[];
  operatingTime?: string;
  x: number;
  y: number;
}

export interface CategoryStyle {
  bg: string;       // สีพื้นหลัง (สำหรับ Badge)
  text: string;     // สีตัวอักษร
  pinColor: string; // สีของหมุด SVG
}