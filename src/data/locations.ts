import { type MapLocation } from '../types';

export const locations: MapLocation[] = [
  // --- 1. โซนบริหาร/เรียน (1-9) ---
  { id: 1, label: "1", category: "admin", title: "อาคารอำนวยการ", description: "สำนักงานอธิการบดี", x: 60, y: 45, 
    detail: "ศูนย์กลางบริหารงาน วิทยาลัยเทคนิคเพชรบูรณ์", imageUrl: "", facilities: ["ห้องน้ำ"] },
  { id: 2, label: "2", category: "academic", title: "การตลาด", description: "แผนกวิชาการตลาด", x: 38, y: 28 },
  { id: 3, label: "3", category: "academic", title: "บัญชี 1", description: "แผนกวิชาบัญชี", x: 68, y: 35 },
  { id: 4, label: "4", category: "academic", title: "ไฟฟ้า", description: "ช่างไฟฟ้ากำลัง", x: 65, y: 20 },
  { id: 5, label: "5", category: "academic", title: "การโรงแรม", description: "ศูนย์ฝึกปฏิบัติการ", x: 45, y: 65 },
  { id: 6, label: "6", category: "academic", title: "อิเล็กทรอนิกส์", description: "ช่างอิเล็กทรอนิกส์", x: 58, y: 15 },
  { id: 7, label: "7", category: "academic", title: "คอมพิวเตอร์", description: "คอมพิวเตอร์ธุรกิจ", x: 45, y: 25 },
  { id: 8, label: "8", category: "academic", title: "ช่างยนต์", description: "โรงงานช่างยนต์", x: 52, y: 10 },
  { id: 9, label: "9", category: "academic", title: "เรียนรวม", description: "อาคารเรียนรวมทฤษฎี", x: 75, y: 28 },

  // --- 2. โซนปฏิบัติการ (A-E) ---
  { id: 10, label: "A", category: "facility", title: "ช่างกล", description: "โรงงานช่างกล", x: 25, y: 48 },
  { id: 11, label: "B", category: "academic", title: "อาคาร B", description: "อาคารเรียนชั้นเดียว", x: 30, y: 45 },
  { id: 12, label: "C", category: "facility", title: "ช่างเชื่อม", description: "โรงงานเชื่อม", x: 32, y: 42 },
  { id: 13, label: "D", category: "facility", title: "โรงจอดรถ", description: "ที่จอดรถบุคลากร", x: 28, y: 55 },
  { id: 14, label: "E", category: "facility", title: "ช่างโยธา", description: "แผนกช่างโยธา", x: 40, y: 50 },

  // --- 3. Landmark (W, V, P) ---
  { id: 15, label: "W", category: "landmark", title: "โดมพละ", description: "ลานกิจกรรม", x: 52, y: 38 },
  { id: 16, label: "V", category: "landmark", title: "สนามบอล", description: "สนามฟุตบอลมาตรฐาน", x: 65, y: 42 },
  { id: 22, label: "P1", category: "landmark", title: "ประตู 1", description: "ทางเข้าหลัก", x: 20, y: 55 },
  { id: 23, label: "P2", category: "landmark", title: "ประตู 2", description: "ทางเข้ารอง", x: 28, y: 65 },

  // --- 4. หอพัก/บริการ (1A-1E) ---
  { id: 17, label: "1A", category: "dorm", title: "ห้องน้ำ", description: "จุดบริการสุขา", x: 35, y: 25 },
  { id: 18, label: "1B", category: "dorm", title: "บ้านพักครู", description: "โซนที่พัก", x: 80, y: 30 },
  { id: 19, label: "1C", category: "dorm", title: "ร้านค้า", description: "สวัสดิการร้านค้า", x: 82, y: 35 },
  { id: 20, label: "1D", category: "dorm", title: "หอพักชาย", description: "หอพักนักศึกษา", x: 85, y: 40 },
  { id: 21, label: "1E", category: "dorm", title: "วิทยบริการ", description: "ห้องสมุด", x: 55, y: 18 },
];