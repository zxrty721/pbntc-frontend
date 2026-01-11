export type CategoryType =
  | "academic"   // อาคารเรียน / วิชาการ
  | "admin"      // อาคารอำนวยการ / สำนักงานบริหาร
  | "dorm"       // หอพักนักเรียน/นักศึกษา
  | "sport"      // สนามกีฬา / โรงยิม
  | "landmark"   // จุดสังเกต / สถานที่สำคัญ
  | "facility"   // สิ่งอำนวยความสะดวก
  | "food"       // โรงอาหาร / ร้านค้า
  | "parking"    // ลานจอดรถ
  | "health"     // ห้องพยาบาล
  | "entrance"   // ทางเข้า / ป้อมยาม
  | "practice"   // โรงฝึกงาน / ห้องปฏิบัติการ
  | "library"    // ห้องสมุด / ศูนย์วิทยบริการ
  | "auditorium" // หอประชุม
  ;
  
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
