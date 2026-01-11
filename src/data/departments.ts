export const DEPARTMENTS = {
  // สาขาวิชาบริหารธุรกิจ
  DIGITAL: "แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล",
  ACCOUNTING: "แผนกวิชาการบัญชี",
  SECRETARY: "แผนกวิชาการเลขานุการและการจัดการสำนักงาน",
  MARKETING: "แผนกวิชาการตลาด",
  
  // สาขาวิชาช่างอุตสาหกรรม
  ELEC_POWER: "แผนกวิชาช่างไฟฟ้ากำลัง",
  ELECTRONIC: "แผนกวิชาช่างอิเล็กทรอนิกส์",
  MECHANIC: "แผนกวิชาช่างยนต์",
} as const;

// Helper type เพื่อดึง Value มาใช้
export type DepartmentName = typeof DEPARTMENTS[keyof typeof DEPARTMENTS];