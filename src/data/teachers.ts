import type { Teacher } from "../types";
import { DEPARTMENTS } from "./departments";

export const teachersData: Record<number, Teacher> = {
  // --- แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล (ประจำตึก 7) ---
  "700": {
    id: 700,
    name: "นางมาลี แผงดี",
    department: DEPARTMENTS.DIGITAL,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0897449666",
    locationId: 7 // 👈 ระบุว่าอยู่ตึก 7
  },
  "701": {
    id: 701,
    name: "นายนพดล มาจาก",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0866245105",
    locationId: 7
  },
  "702": {
    id: 702,
    name: "นายจงจัด ดวงจันทร์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการ",
    phone: "0995690108",
    locationId: 7
  },
  "703": {
    id: 703,
    name: "นางปาลิดา แก้วสุริวงษ์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการ",
    phone: "0849904628",
    locationId: 7
  },
  "704": {
    id: 704,
    name: "นางคัมภูวิกา ชมเชย",
    department: DEPARTMENTS.DIGITAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครู",
    phone: "0917594136",
    locationId: 7
  },
  "705": {
    id: 705,
    name: "นางสาววิจิตรา ผาผึ้ง",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูผู้ช่วย",
    phone: "0905863445",
    locationId: 7
  },
  "706": {
    id: 706,
    name: "นายขวัญชัย จันทร์ฤทธิ์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูอัตราจ้าง",
    phone: "0612303043",
    locationId: 7
  },
  "707": {
    id: 707,
    name: "นายสุทธินันท์ ดีวัน",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูอัตราจ้าง",
    phone: "0910244240",
    locationId: 7
  },
  
  // --- แผนกวิชาการเลขานุการฯ (ประจำตึก 7) ---
  "708": {
    id: 708,
    name: "นางประวีน เพชรป้อ",
    department: DEPARTMENTS.SECRETARY,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0812817089",
    locationId: 7
  },
  "709": {
    id: 709,
    name: "นางวรัญญา บุญคุ้ม",
    department: DEPARTMENTS.SECRETARY,
    position: "ครูอัตราจ้าง",
    phone: "0611645954",
    locationId: 7
  },
  "710": {
    id: 710,
    name: "นางสาวอรญา โฉมอุดม",
    department: DEPARTMENTS.SECRETARY,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 7
  },

  // --- แผนกวิชาการบัญชี (ประจำตึก 7) ---
  "711": {
    id: 711,
    name: "นางสาววราภรณ์ วงบุตดี",
    department: DEPARTMENTS.ACCOUNTING,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0918436332",
    locationId: 7
  },
  "712": {
    id: 712,
    name: "นายธนารัตน์ หงษ์เม่น",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูชำนาญการ",
    phone: "0895667000",
    locationId: 7
  },
  "713": {
    id: 713,
    name: "นายชัย พลคำ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครู",
    phone: "0956013253",
    locationId: 7
  },
  "714": {
    id: 714,
    name: "นางสาวพัชราภรณ์ รักรู้กิจ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูชำนาญการ",
    phone: "0961646453",
    locationId: 7
  },
  "715": {
    id: 715,
    name: "นางสาววารุณี ศรีสุภักดิ์",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูผู้ช่วย",
    phone: "0621291662",
    locationId: 7
  },
  "716": {
    id: 716,
    name: "นางสาวปุณยนุช สมพัตร์",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูผู้ช่วย",
    phone: "0894298893",
    locationId: 7
  },
  "717": {
    id: 717,
    name: "นางมยุรา ปานนิล",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0932801166",
    locationId: 7
  },
  "718": {
    id: 718,
    name: "นางสาวศิริวรรณ จันทร์แก้ว",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0979942719",
    locationId: 7
  },
  "719": {
    id: 719,
    name: "นางสาวกานต์พิชชา สาเสียง",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0640979007",
    locationId: 7
  },
  "720": {
    id: 720,
    name: "นางสาวพัชรดา ธนาคุณ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 7
  }
};