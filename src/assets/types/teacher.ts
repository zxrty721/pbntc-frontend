export interface Teacher {
    id: string;          // รหัสประจำตัวครู (Unique ID)
    name: string;        // ชื่อ-นามสกุล

    departmentId: string; // รหัสแผนก (เชื่อมกับ departments.ts)

    position: string;    // ตำแหน่ง เช่น "หัวหน้าแผนก", "ครูชำนาญการ"

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