export type CategoryType =
  | "academic"  // อาคารเรียน
  | "admin"     // ธุรการ
  | "dorm"      // หอพัก
  | "sport"     // กีฬา
  | "landmark"  // จุดสังเกต
  | "facility"  // สิ่งอำนวยความสะดวก
  | "food"      // โรงอาหาร
  | "parking"   // จอดรถ
  | "health"    // พยาบาล
  | "entrance"  // ทางเข้า
  | "practice"  // ปฏิบัติการ
  | "library";  // 👈 เพิ่มอันนี้ (ห้องสมุด/ศูนย์วิทยบริการ)

export interface CategoryStyle {
  bg: string;
  text: string;
  pinColor: string;
  icon: any;
}

export interface Teacher {
  id: number;
  name: string;
  department: string;
  position: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
}

export interface MapLocation {
  id: number;
  title: string;
  label: string;
  x: number;
  y: number;
  category: CategoryType;
  description: string;
  detail?: string;
  facilities?: string[];
  images?: string[];
  teacherIds?: number[];
}

export interface IcogramItem {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  src?: string;
  type?: string;
  content?: IcogramItem[];
  flip?: number;
  scale?: number;
}

export interface MapData {
  width: number;
  height: number;
  icogramContent: IcogramItem[];
}
