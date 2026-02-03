import { CategoryType } from "./common";

export interface MapLocation {
    id: string | number; // รองรับทั้งเลขและตัวหนังสือ (แนะนำ String เพื่อความยืดหยุ่น เช่น "BLDG-1")
    code: string;        // รหัสที่แสดงบนแผนที่ เช่น "1", "1E", "อาคาร 4"
    name: string;        // ชื่อสถานที่ เช่น "อาคารอำนวยการ"
    description?: string; // รายละเอียดสังเขป

    category: CategoryType; // ประเภทสถานที่

    // พิกัดบนแผนที่ (0-100%)
    coordinates: {
        x: number;
        y: number;
    };

    facilities?: string[]; // สิ่งอำนวยความสะดวกในตึก
    images?: string[];     // รายชื่อไฟล์รูปภาพ
}