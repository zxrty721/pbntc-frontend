import type { Teacher } from "../types";
import { DEPARTMENTS } from "./departments";

export const teachersData: Record<number, Teacher> = {
  // --- แผนกวิชาช่างไฟฟ้ากำลัง ---
  "0": {
    id: 0,
    name: "นายทองจันทร์ ประทุมโฉม",
    department: DEPARTMENTS.DIRECTOR,
    position: "ผู้อำนวยการ ผู้อำนวยการสถานศึกษา",
    phone: "ผู้บริหาร ชำนาญการพิเศษ",
    locationId: 28
  },
  // --- คณะผู้บริหาร (รองผู้อำนวยการ) ---
  "100": {
    id: 100,
    name: "นางจินตนา อุททัง",
    department: DEPARTMENTS.RESOURCE_ADMIN, // ฝ่ายบริหารทรัพยากร
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "", 
    locationId: 1 // (สมมติ) หากมีข้อมูลตึกประจำตำแหน่ง สามารถใส่เพิ่มได้ครับ
  },
  "101": {
    id: 101,
    name: "นายธีรวัช ใจห้าว",
    department: DEPARTMENTS.ACADEMIC_AFFAIR, // ฝ่ายวิชาการ
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "",
    locationId: 1
  },
  "102": {
    id: 102,
    name: "นายประเวส สีทำมา",
    department: DEPARTMENTS.PLANNING_COOP, // ฝ่ายแผนงานและความร่วมมือ
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "",
    locationId: 1
  },
  "103": {
    id: 103,
    name: "นายวชิโนรมณ์ พรอินทร์",
    department: DEPARTMENTS.STUDENT_AFFAIR, // ฝ่ายพัฒนากิจการนักเรียนนักศึกษา
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "0892793541",
    locationId: 1
  },
  // --- หัวหน้างาน (เริ่ม ID 104) ---
  "104": {
    id: 104,
    name: "นางเยาวนาถ ปลื้มบุญ",
    department: DEPARTMENTS.GENERAL, // ครูประจำ แผนกวิชาสามัญสัมพันธ์
    position: "หัวหน้างานพัฒนาหลักสูตรฯ / ครูชำนาญการพิเศษ",
    phone: "0879437768",
    locationId: 0 // 👈 ระบุเลขตึก
  },
  "105": {
    id: 105,
    name: "นายบัญชา ถาแยง",
    department: DEPARTMENTS.ELECTRONIC, // ครูประจำ แผนกวิชาช่างอิเล็กทรอนิกส์
    position: "หัวหน้างานครูที่ปรึกษา / ครูชำนาญการพิเศษ",
    phone: "0813662865",
    locationId: 0 // 👈 ระบุเลขตึก
  },
  "106": {
    id: 106,
    name: "นางสุธาสินี ถาแยง",
    department: DEPARTMENTS.GENERAL, // ครูประจำ แผนกวิชาสามัญสัมพันธ์
    position: "หัวหน้างานบริหารงานทั่วไป / ครูชำนาญการพิเศษ",
    phone: "0819623147",
    locationId: 0 // 👈 ระบุเลขตึก
  },

  "600": {
    id: 600,
    name: "นายมานพ ศรีนาราง",
    department: DEPARTMENTS.ELEC_POWER,
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0896409815",
    locationId: 6 // 👈 ตรวจสอบเลขตึกอีกครั้ง
  },
  "601": {
    id: 601,
    name: "นายประยูร ข่าทิพย์พาที",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 6
  },
  "602": {
    id: 602,
    name: "นายสิทธิชัย จันทพิมพะ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "0847111585",
    locationId: 6
  },
  "603": {
    id: 603,
    name: "ว่าที่ร้อยตรี เผด็จ ปัญญาศุภโชติ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการพิเศษ",
    phone: "0979206409",
    locationId: 6
  },
  "604": {
    id: 604,
    name: "นายประยง น้อยหน่า",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "0995561572",
    locationId: 6
  },
  "605": {
    id: 605,
    name: "นายประทีป ราชบุรี",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "0614124067",
    locationId: 6
  },
  "606": {
    id: 606,
    name: "นางสาวทัดทรวง พรหมบุญ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการ",
    phone: "0839963989",
    locationId: 6
  },
  "607": {
    id: 607,
    name: "นายนรา เหนือคูเมือง",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครู",
    phone: "0873135844",
    locationId: 6
  },
  "608": {
    id: 608,
    name: "นายวีรชน เหล่าลาภะ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูผู้ช่วย",
    phone: "0981237638",
    locationId: 6
  },
  "609": {
    id: 609,
    name: "นายเสกสิทธิ์ แพชัยภูมิ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูผู้ช่วย",
    phone: "0821448050",
    locationId: 6
  },
  "610": {
    id: 610,
    name: "นายมานิต ก๋าแก้ว",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูผู้ช่วย",
    phone: "0637649252",
    locationId: 6
  },
  "611": {
    id: 611,
    name: "นายลิขิต เสยกระโทก",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครู",
    phone: "0935248328",
    locationId: 6
  },
  "612": {
    id: 612,
    name: "นายสุเทพ สินปาน",
    department: DEPARTMENTS.ELEC_POWER,
    position: "พนักงานราชการ (สอน)",
    phone: "0972548457",
    locationId: 6
  },
  "613": {
    id: 613,
    name: "นางสาวสุกัญญา จันศรี",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "0834857742",
    locationId: 6
  },
  "614": {
    id: 614,
    name: "นายจิรายุ น่วมเจริญ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "0657028190",
    locationId: 6
  },
  "615": {
    id: 615,
    name: "นายวรภัทร บุญสวน",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 6
  },
  "616": {
    id: 616,
    name: "นายธนสิษฎ์ ต่างงาม",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 6
  },
  "617": {
    id: 617,
    name: "นายเกษมศักดิ์ เรืองฤทธิ์",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 6
  },
  "618": {
    id: 618,
    name: "นายสุรพันธ์ สอนผุย",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "0828772684",
    locationId: 6
  },
  "619": {
    id: 619,
    name: "นายอภิชาติ เขียวดี",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 6
  },

  // --- แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล (ประจำตึก 7) ---
  "700": {
    id: 700,
    name: "นางมาลี แผงดี",
    department: DEPARTMENTS.DIGITAL,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0897449666",
    locationId: 5 // 👈 ระบุว่าอยู่ตึก 7
  },
  "701": {
    id: 701,
    name: "นายนพดล มาจาก",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0866245105",
    locationId: 5
  },
  "702": {
    id: 702,
    name: "นายจงจัด ดวงจันทร์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการ",
    phone: "0995690108",
    locationId: 5
  },
  "703": {
    id: 703,
    name: "นางปาลิดา แก้วสุริวงษ์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการ",
    phone: "0849904628",
    locationId: 5
  },
  "704": {
    id: 704,
    name: "นางคัมภูวิกา ชมเชย",
    department: DEPARTMENTS.DIGITAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครู",
    phone: "0917594136",
    locationId: 5
  },
  "705": {
    id: 705,
    name: "นางสาววิจิตรา ผาผึ้ง",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูผู้ช่วย",
    phone: "0905863445",
    locationId: 5
  },
  "706": {
    id: 706,
    name: "นายขวัญชัย จันทร์ฤทธิ์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูอัตราจ้าง",
    phone: "0612303043",
    locationId: 5
  },
  "707": {
    id: 707,
    name: "นายสุทธินันท์ ดีวัน",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูอัตราจ้าง",
    phone: "0910244240",
    locationId: 5
  },
  
  // --- แผนกวิชาการเลขานุการฯ (ประจำตึก 7) ---
  "708": {
    id: 708,
    name: "นางประวีน เพชรป้อ",
    department: DEPARTMENTS.SECRETARY,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0812817089",
    locationId: 5
  },
  "709": {
    id: 709,
    name: "นางวรัญญา บุญคุ้ม",
    department: DEPARTMENTS.SECRETARY,
    position: "ครูอัตราจ้าง",
    phone: "0611645954",
    locationId: 5
  },
  "710": {
    id: 710,
    name: "นางสาวอรญา โฉมอุดม",
    department: DEPARTMENTS.SECRETARY,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 5
  },

  // --- แผนกวิชาการบัญชี (ประจำตึก 7) ---
  "711": {
    id: 711,
    name: "นางสาววราภรณ์ วงบุตดี",
    department: DEPARTMENTS.ACCOUNTING,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0918436332",
    locationId: 5
  },
  "712": {
    id: 712,
    name: "นายธนารัตน์ หงษ์เม่น",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูชำนาญการ",
    phone: "0895667000",
    locationId: 5
  },
  "713": {
    id: 713,
    name: "นายชัย พลคำ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครู",
    phone: "0956013253",
    locationId: 5
  },
  "714": {
    id: 714,
    name: "นางสาวพัชราภรณ์ รักรู้กิจ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูชำนาญการ",
    phone: "0961646453",
    locationId: 5
  },
  "715": {
    id: 715,
    name: "นางสาววารุณี ศรีสุภักดิ์",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูผู้ช่วย",
    phone: "0621291662",
    locationId: 5
  },
  "716": {
    id: 716,
    name: "นางสาวปุณยนุช สมพัตร์",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูผู้ช่วย",
    phone: "0894298893",
    locationId: 5
  },
  "717": {
    id: 717,
    name: "นางมยุรา ปานนิล",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0932801166",
    locationId: 5
  },
  "718": {
    id: 718,
    name: "นางสาวศิริวรรณ จันทร์แก้ว",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0979942719",
    locationId: 5
  },
  "719": {
    id: 719,
    name: "นางสาวกานต์พิชชา สาเสียง",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0640979007",
    locationId: 5
  },
  "720": {
    id: 720,
    name: "นางสาวพัชรดา ธนาคุณ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 5
  }






};