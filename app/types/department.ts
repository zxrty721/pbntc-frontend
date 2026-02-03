export interface Department {
    id: string;    // รหัสแผนก เช่น "IT", "MECH", "ACC"
    name: string;  // ชื่อเต็มภาษาไทย เช่น "แผนกวิชาเทคโนโลยีสารสนเทศ"
    group?: string; // (Optional) กลุ่มงาน เช่น "วิชาการ", "บริหาร"
}

// ใช้สำหรับ Mapping ข้อมูลแบบ O(1) เพื่อความเร็วสูงสุด
export type DepartmentMap = Record<string, string>;
// หรือถ้าอนาคตมีข้อมูลแผนกเยอะกว่าแค่ชื่อ ก็ใช้ Record<string, Department>