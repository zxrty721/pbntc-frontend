// Export ทุกอย่างจากไฟล์ย่อย
export * from "./common";
export * from "./department";
export * from "./location";
export * from "./teacher";

// สร้าง Type รวมสำหรับ Data Store (เผื่อใช้ในอนาคต)
import { Teacher } from "./teacher";
import { MapLocation } from "./location";

export interface AppData {
    teachers: Record<string, Teacher>; // เก็บเป็น Map เพื่อค้นหา O(1)
    locations: MapLocation[];          // เก็บเป็น Array เพื่อ Loop Render
    departments: Record<string, string>;
}