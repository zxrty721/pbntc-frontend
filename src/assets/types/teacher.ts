export interface Teacher {
    id: string; // รหัสประจำตัวครู (Unique ID)
    name: string; // ชื่อ-นามสกุล (เต็ม รวมคำนำหน้า)

    title: string; // คำนำหน้าชื่อ ตัวเต็ม เช่น "นาย", "นาง", "นางสาว", "ว่าที่ร้อยตรี" (ว่าง "" ถ้าไม่มี)
    firstName: string; // ชื่อ (ไม่รวมคำนำหน้า)
    lastName: string; // นามสกุล

    departmentId: string; // รหัสแผนก (เชื่อมกับ departments.ts)

    position: string; // ตำแหน่ง เช่น "หัวหน้าแผนก", "ครูชำนาญการ"

    // เก็บเป็น Array เพื่อรองรับกรณีครูดูแลหลายตึก หรือย้ายตึก
    locationIds: (string | number)[];

    // ข้อมูลการติดต่อ (ถ้ามี)
    contact?: {
        phone?: string;
        email?: string;
        facebook?: string;
        line?: string;
    };
}
