export type CategoryType =
  | "academic"
  | "admin"
  | "dorm"
  | "sport"
  | "landmark"
  | "facility"
  | "food"
  | "parking"
  | "health"
  | "entrance"
  | "practice"
  | "library"
  | "auditorium";

export interface CategoryStyle {
  bg: string;
  text: string;
  pinColor: string;
  icon: any;
}

export interface Teacher {
  id: number;
  name: string;
  department: string; // หรือจะใช้ DepartmentName ก็ได้
  position: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  locationId?: number; // 👈 พระเอกของเรา: ระบุว่าครูอยู่ตึกไหน
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
  // teacherIds?: number[]; ❌ ลบทิ้งได้เลย ไม่ต้องใช้แล้ว
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
