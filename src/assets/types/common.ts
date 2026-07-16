export type CategoryType =
    | "academic"   // อาคารเรียน
    | "admin"      // สำนักงาน/อำนวยการ
    | "practice"   // โรงฝึกงาน
    | "dorm"       // หอพัก
    | "sport"      // กีฬา
    | "food"       // โรงอาหาร/ร้านค้า
    | "library"    // ห้องสมุด
    | "auditorium" // หอประชุม
    | "parking"    // ลานจอดรถ
    | "landmark"   // จุดสังเกต
    | "health"     // ห้องพยาบาล
    | "entrance"   // ทางเข้า
    | "other";     // อื่นๆ

export interface CategoryStyle {
    bg: string;       // สีพื้นหลัง Tailwind e.g. "bg-purple-100"
    text: string;     // สีตัวอักษร Tailwind
    pinColor: string; // สีหมุด (Hex หรือ Class)
    icon: any;        // Lucide Icon Component
}