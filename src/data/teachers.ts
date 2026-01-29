import type { Teacher } from "../types";
import { DEPARTMENTS } from "./departments";

export const teachersData: Record<string, Teacher> = {
  // --- แผนกวิชาช่างไฟฟ้ากำลัง ---
  "U": {
    name: "นายทองจันทร์ ประทุมโฉม",
    department: DEPARTMENTS.DIRECTOR,
    position: "ผู้อำนวยการ ผู้อำนวยการสถานศึกษา",
    phone: "ผู้บริหาร ชำนาญการพิเศษ",
    locationId: 28
  },
  // --- คณะผู้บริหาร (รองผู้อำนวยการ) ---
  "100": {
    name: "นางจินตนา อุททัง",
    department: DEPARTMENTS.RESOURCE_ADMIN, // ฝ่ายบริหารทรัพยากร
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "", 
    locationId: 1 // (สมมติ) หากมีข้อมูลตึกประจำตำแหน่ง สามารถใส่เพิ่มได้ครับ
  },
  "101": {
    name: "นางธีรวัช ใจห้าว",
    department: DEPARTMENTS.ACADEMIC_AFFAIR, // ฝ่ายวิชาการ
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "",
    locationId: 1
  },
  "102": {
    name: "นายประเวส สีทำมา",
    department: DEPARTMENTS.PLANNING_COOP, // ฝ่ายแผนงานและความร่วมมือ
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "",
    locationId: 1
  },
  "103": {
    name: "นายวชิโนรมณ์ พรอินทร์",
    department: DEPARTMENTS.STUDENT_AFFAIR, // ฝ่ายพัฒนากิจการนักเรียนนักศึกษา
    position: "รองผู้อำนวยการ / ผู้บริหาร ชำนาญการพิเศษ",
    phone: "0892793541",
    locationId: 1
  },
  // --- หัวหน้างาน (เริ่ม ID 104) ---

 
  "105": {
    name: "นางสาวกานต์นภา แสงเทพ",
    department: DEPARTMENTS.GENERAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0929845359",
    locationId: 1
  },
  "108": {
    name: "นางสาวขวัญชนก ชมกลาง",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "0943915144",
    locationId: 1
  },
 

  "109": {
    name: "นายชัชชาย พาอ้อ",
    department: DEPARTMENTS.GENERAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการ",
    phone: "0994044041",
    locationId: 1
  },
  "110": {
    name: "นางสาวปอรยา สุวรรณสิทธิ์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 1
  },
  "111": {
    name: "นางสาวอรทัย พินิจมนตรี",
    department: DEPARTMENTS.GENERAL,
    position: "ครู",
    phone: "0877367780",
    locationId: 1
  },
  "112": {
    name: "นางสาวปราณีรัตน์ บุญปัญญา",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0886399466",
    locationId: 1
  },
  "113": {
    name: "นางสาวมินตรา สังข์สุด",
    department: DEPARTMENTS.GENERAL,
    position: "ครูผู้ช่วย",
    phone: "",
    locationId: 1
  },
  "114": {
    name: "นางสาวภัสราพร บางศรี",
    department: DEPARTMENTS.GENERAL,
    position: "ครู",
    phone: "0814755987",
    locationId: 1
  },
  "116": {
    name: "นางสาวธิราพร จู๊ดทรัพย์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูอัตราจ้าง",
    phone: "0943371888",
    locationId: 1
  },
  "117": {
    name: "นางสาวบุญธิชา ราชพรมมา",
    department: DEPARTMENTS.GENERAL,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 1
  },
  "118": {
    name: "พรณพัฒน์ แพงสาย",
    department: DEPARTMENTS.GENERAL,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 1
  },
    // --- แผนกวิชาสามัญสัมพันธ์ (เริ่ม ID 101) --

  "119": {
    name: "นางกรัณย์พิมพ์ วังคีรี",
    department: DEPARTMENTS.FINANCE,
    position: "ข้าราชการพลเรือน",
    phone: "",
    locationId: 1
  },
  "120": {
    name: "นางสาวนภสรา นาคทอง",
    department: DEPARTMENTS.FINANCE,
    position: "เจ้าหน้าที่ธุรการงาน",
    phone: "0636250314",
    locationId: 1
  },
  "121": {
    name: "นางสาววันทนา ธารคุณธรรม",
    department: DEPARTMENTS.FINANCE,
    position: "เจ้าหน้าที่ธุรการงาน",
    phone: "",
    locationId: 1
  },
   "122": {
    name: "นายนรา เหนือคูเมือง",
    department: DEPARTMENTS.ELEC_TECH, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าภาควิชา / ครู",
    phone: "0873135844",
    locationId: 9
  },
  "123": {
    name: "นายสิทธิชัย จันทพิมพะ",
    department: DEPARTMENTS.ELEC_TECH,
    position: "ครูชำนาญการ",
    phone: "0847111585",
    locationId: 9
  },
  "124": {
    name: "ว่าที่ร้อยตรี เผด็จ ปัญญาศุภโชติ",
    department: DEPARTMENTS.ELEC_TECH,
    position: "ครูชำนาญการพิเศษ",
    phone: "0979206409",
    locationId: 9
  },
  "125": {
    name: "นายมาโนชย์ พวงคำ",
    department: DEPARTMENTS.ELEC_TECH,
    position: "ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 9
  },
  "126": {
    name: "นายสมพงษ์ แคสา",
    department: DEPARTMENTS.ELEC_TECH,
    position: "ครู",
    phone: "",
    locationId: 9
  },
  "127": {
    name: "นางสาวพัฒน์นรี ก้อนเพชร",
    department: DEPARTMENTS.FINANCE_ACCOUNT,
    position: "เจ้าหน้าที่ธุรการงาน / เจ้าหน้าที่ธุรการฝ่าย",
    phone: "0966746174",
    locationId: 1
  },
  // --- แผนกวิชาการตลาด (เริ่ม ID 201) ---
  "201": {
    name: "นายวิสุทธิ์ รินคำ",
    department: DEPARTMENTS.MARKETING, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครู",
    phone: "0818304173",
    locationId: 2
  },
  "202": {
    name: "นางสาววริษฐา ศุกระรัศมี",
    department: DEPARTMENTS.MARKETING,
    position: "ครูชำนาญการ",
    phone: "0847442699",
    locationId: 2
  },
  "203": {
    name: "นางสาวพิมพ์ชนก ภูมิภูถาวร",
    department: DEPARTMENTS.MARKETING,
    position: "ครู",
    phone: "0805195077",
    locationId: 2
  },
  "204": {
    name: "นางอรวรรณ พวงดอกไม้",
    department: DEPARTMENTS.MARKETING,
    position: "ครูผู้ช่วย",
    phone: "0968935453",
    locationId: 2
  },
  "205": {
    name: "นางสาวชญานิศ คำโสม",
    department: DEPARTMENTS.MARKETING,
    position: "ครูอัตราจ้าง",
    phone: "0800793807",
    locationId: 2
  },
  "206": {
    name: "นางสาวนิภาพร ปันศรี",
    department: DEPARTMENTS.MARKETING,
    position: "ครูอัตราจ้าง",
    phone: "0640166384",
    locationId: 2
  },

  // --- แผนกวิชาสามัญสัมพันธ์ (เริ่ม ID 300) ---
  // *แก้ไขรหัสใหม่เพื่อไม่ให้ซ้ำกับผู้บริหาร และอัปเดต Location เป็น 11
  "300": {
    name: "นางนิรมล เสือเขียว",
    department: DEPARTMENTS.GENERAL,
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0857355381",
    locationId: 11
  },
  "301": {
    name: "นายพิษณุ ผิวทอง",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "0872031431",
    locationId: 11
  },
  "302": {
    name: "นางศตพร กางถิ่น",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0875729192",
    locationId: 11
  },
  "303": {
    name: "นางพรพิมล วรรณะ",
    department: DEPARTMENTS.GENERAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0882811167",
    locationId: 11
  },
  "304": {
    name: "นางเยาวนาถ ปลื้มบุญ",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0879437768",
    locationId: 11
  },

  "313": {
    name: "นางนนพร โกศินานนท์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "0896244962",
    locationId: 11
  },
  "314": {
    name: "นางสาวพิมรดา จันทานวน",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "0857254957",
    locationId: 11
  },
  "315": {
    name: "นางสาวสาธินี ต่ออาวุธ",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "0800597529",
    locationId: 11
  },

  "317": {
    name: "นางเมชุดา เมฆขุนทด",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "0804968151",
    locationId: 11
  },

  "320": {
    name: "นางบังอร ดาสนม",
    department: DEPARTMENTS.GENERAL,
    position: "ครู",
    phone: "0894826659",
    locationId: 11
  },

 
  "327": {
    name: "นายทินกร เข็มอินทร์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูอัตราจ้าง",
    phone: "0969681561",
    locationId: 11
  },
   "929": {
    name: "นายยศบดินทร์ ศรีสุรีย์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูอัตราจ้าง",
    phone: "0993756153",
    locationId: 11
  },

"328": {
    name: "นายปิติพงค์ แหวนนิล",
    department: DEPARTMENTS.GENERAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการ",
    phone: "0949566945",
    locationId: 11
  },

  "400": {
    name: "นายมานพ ศรีนาราง",
    department: DEPARTMENTS.ELEC_POWER,
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0896409815",
    locationId: 3 // 👈 ตรวจสอบเลขตึกอีกครั้ง
  },
  "401": {
    name: "นายประยูร ข่าทิพย์พาที",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 3
  },
  "402": {
    name: "นายสิทธิชัย จันทพิมพะ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "0847111585",
    locationId: 3
  },
  "403": {
    name: "ว่าที่ร้อยตรี เผด็จ ปัญญาศุภโชติ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการพิเศษ",
    phone: "0979206409",
    locationId: 3
  },
  "404": {
    name: "นายประยง น้อยหน่า",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "0995561572",
    locationId: 3
  },
  "405": {
    name: "นายประทีป ราชบุรี",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูชำนาญการ",
    phone: "0614124067",
    locationId: 3
  },
  "406": {
    name: "นางสาวทัดทรวง พรหมบุญ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการ",
    phone: "0839963989",
    locationId: 3
  },
  "408": {
    name: "นายวีรชน เหล่าลาภะ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูผู้ช่วย",
    phone: "0981237638",
    locationId: 3
  },
  "409": {
    name: "นายเสกสิทธิ์ แพชัยภูมิ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูผู้ช่วย",
    phone: "0821448050",
    locationId: 3
  },
  "410": {
    name: "นายมานิต ก๋าแก้ว",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูผู้ช่วย",
    phone: "0637649252",
    locationId: 3 
  },
  "411": {
    name: "นายลิขิต เสยกระโทก",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครู",
    phone: "0935248328",
    locationId: 3
  },
  "412": {
    name: "นายสุเทพ สินปาน",
    department: DEPARTMENTS.ELEC_POWER,
    position: "พนักงานราชการ (สอน)",
    phone: "0972548457",
    locationId: 3
  },
  "413": {
    name: "นางสาวสุกัญญา จันศรี",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "0834857742",
    locationId: 3
  },
  "414": {
    name: "นายจิรายุ น่วมเจริญ",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "0657028190",
    locationId: 3
  },
  "415": {
    name: "นายวรภัทร บุญสวน",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 3
  },
  "416": {
    name: "นายธนสิษฎ์ ต่างงาม",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 3
  },
  "417": {
    name: "นายเกษมศักดิ์ เรืองฤทธิ์",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 3
  },
  "418": {
    name: "นายสุรพันธ์ สอนผุย",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "0828772684",
    locationId: 3
  },
  "419": {
    name: "นายอภิชาติ เขียวดี",
    department: DEPARTMENTS.ELEC_POWER,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 3
  },
 // --- แผนกวิชาการท่องเที่ยว (เริ่ม ID 501) ---
 "501": {
    name: "นางพรพิรุณ สุวรรณคีรี",
    department: DEPARTMENTS.TOURISM, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "",
    locationId: 12
  },
  "502": {
    name: "นางสาวสาริศา พบพรจริน",
    department: DEPARTMENTS.TOURISM,
    position: "ผู้ช่วยหัวหน้าแผนก / ครู",
    phone: "0845969246",
    locationId: 12
  },
  "503": {
    name: "นางสาวพลอยมณี วันเสี่ยม",
    department: DEPARTMENTS.TOURISM,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 12
  },

  // --- แผนกวิชาการโรงแรม (ต่อเนื่อง ID 504) ---
  "504": {
    name: "นางอุ่นจิต ศรีนาราง",
    department: DEPARTMENTS.HOTEL, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0897075110",
    locationId: 12
  },
  "505": {
    name: "นายชุติเดช จันทจรสกุล",
    department: DEPARTMENTS.HOTEL,
    position: "ครูผู้ช่วย",
    phone: "0629625595",
    locationId: 12
  },
  "506": {
    name: "นายสิทธิพงษ์ ชัยงาม",
    department: DEPARTMENTS.HOTEL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูอัตราจ้าง",
    phone: "0968439120",
    locationId: 12
  },
   // --- แผนกวิชาช่างอิเล็กทรอนิกส์ (เริ่ม ID 601) ---
  "601": {
    name: "นายเชาวลิตตพล ขารอยู่",
    department: DEPARTMENTS.ELECTRONIC, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 4
  },
  "602": {
    name: "นายบัญชา ถาแยง",
    department: DEPARTMENTS.ELECTRONIC,
    position: "ครูชำนาญการพิเศษ",
    phone: "0813662865",
    locationId: 4
  },
  "603": {
    name: "นายนฤตย์ กั้วสิทธิ์",
    department: DEPARTMENTS.ELECTRONIC,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการ",
    phone: "",
    locationId: 4
  },
  "604": {
    name: "นายจิรศักดิ์ สมสา",
    department: DEPARTMENTS.ELECTRONIC,
    position: "พนักงานราชการ (สอน)",
    phone: "0636649914",
    locationId: 4
  },
  "605": {
    name: "นายอธิป อรรคเศรษฐัง", // ผมเติมคำนำหน้า "นาย" ให้เพื่อความสุภาพและเป็นทางการครับ (หากไม่ถูกต้องสามารถลบออกได้)
    department: DEPARTMENTS.ELECTRONIC,
    position: "ครูอัตราจ้าง",
    phone: "0829041321",
    locationId: 4
  },
  "606": {
    name: "นายอนิเลก สมศิริ",
    department: DEPARTMENTS.ELECTRONIC,
    position: "ครูอัตราจ้าง",
    phone: "0815331267",
    locationId: 4
  },
  "607": {
    name: "นายสัมพันธ์ หารัญดา",
    department: DEPARTMENTS.ELECTRONIC,
    position: "ครูอัตราจ้าง",
    phone: "0869308807",
    locationId: 4
  },

  "700": {
    name: "นางมาลี แผงดี",
    department: DEPARTMENTS.DIGITAL,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0897449666",
    locationId: 5 // 👈 ระบุว่าอยู่ตึก 7
  },
  "701": {
    name: "นายนพดล มาจาก",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0866245105",
    locationId: 5
  },
  "702": {
    name: "นายจงจัด ดวงจันทร์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการ",
    phone: "0995690108",
    locationId: 5
  },
  "703": {
    name: "นางปาลิดา แก้วสุริวงษ์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูชำนาญการ",
    phone: "0849904628",
    locationId: 5
  },
  "704": {
    name: "นางคัมภูวิกา ชมเชย",
    department: DEPARTMENTS.DIGITAL,
    position: "ผู้ช่วยหัวหน้าแผนก / ครู",
    phone: "0917594136",
    locationId: 5
  },
  "705": {
    name: "นางสาววิจิตรา ผาผึ้ง",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูผู้ช่วย",
    phone: "0905863445",
    locationId: 5
  },
  "706": {
    name: "นายขวัญชัย จันทร์ฤทธิ์",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูอัตราจ้าง",
    phone: "0612303043",
    locationId: 5
  },
  "707": {
    name: "นายสุทธินันท์ ดีวัน",
    department: DEPARTMENTS.DIGITAL,
    position: "ครูอัตราจ้าง",
    phone: "0910244240",
    locationId: 5
  },
  
  // --- แผนกวิชาการเลขานุการฯ (ประจำตึก 7) ---
  "708": {
    name: "นางประวีน เพชรป้อ",
    department: DEPARTMENTS.SECRETARY,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0812817089",
    locationId: 5
  },
  "709": {
    name: "นางวรัญญา บุญคุ้ม",
    department: DEPARTMENTS.SECRETARY,
    position: "ครูอัตราจ้าง",
    phone: "0611645954",
    locationId: 5
  },
  "710": {
    name: "นางสาวอรญา โฉมอุดม",
    department: DEPARTMENTS.SECRETARY,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 5
  },

  // --- แผนกวิชาการบัญชี (ประจำตึก 7) ---
  "711": {
    name: "นางสาววราภรณ์ วงบุตดี",
    department: DEPARTMENTS.ACCOUNTING,
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "0918436332",
    locationId: 5
  },
  "712": {
    name: "นายธนารัตน์ หงษ์เม่น",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูชำนาญการ",
    phone: "0895667000",
    locationId: 5
  },
  "713": {
    name: "นายชัย พลคำ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครู",
    phone: "0956013253",
    locationId: 5
  },
  "714": {
    name: "นางสาวพัชราภรณ์ รักรู้กิจ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูชำนาญการ",
    phone: "0961646453",
    locationId: 5
  },
  "715": {
    name: "นางสาววารุณี ศรีสุภักดิ์",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูผู้ช่วย",
    phone: "0621291662",
    locationId: 5
  },
  "716": {
    name: "นางสาวปุณยนุช สมพัตร์",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูผู้ช่วย",
    phone: "0894298893",
    locationId: 5
  },
  "717": {
    name: "นางมยุรา ปานนิล",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0932801166",
    locationId: 5
  },
  "718": {
    name: "นางสาวศิริวรรณ จันทร์แก้ว",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0979942719",
    locationId: 5
  },
  "719": {
    name: "นางสาวกานต์พิชชา สาเสียง",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "0640979007",
    locationId: 5
  },
  "720": {
    name: "นางสาวพัชรดา ธนาคุณ",
    department: DEPARTMENTS.ACCOUNTING,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 5
  },
// --- แผนกวิชาช่างยนต์ (เริ่ม ID 801) ---
  "801": {
    name: "นายสงกรานต์ ณ วิเชียร",
    department: DEPARTMENTS.MECHANIC,
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0815712671",
    locationId: 6 // 👈 แก้ไขเป็นตึก 6
  },
  "802": {
    name: "นายอุดมศักดิ์ พยัคฆเดช",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการ",
    phone: "0957351345",
    locationId: 6
  },
  "803": {
    name: "นายจรินทร์ เจนจิตต์",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการพิเศษ",
    phone: "0878785429",
    locationId: 6
  },
  "804": {
    name: "นายธัชชัย อมรปิติโชติ",
    department: DEPARTMENTS.MECHANIC,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูเชี่ยวชาญ",
    phone: "0659622547",
    locationId: 6
  },
  "805": {
    name: "นายเจริญ ทองหาญ",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการพิเศษ",
    phone: "0817862092",
    locationId: 6
  },
  "806": {
    name: "นายเศกศักดิ์ แก้วเพียร",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการ",
    phone: "0803915998",
    locationId: 6
  },
  "807": {
    name: "นายกิตติชัย นุ่นโต",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการ",
    phone: "0861623764",
    locationId: 6
  },
  "808": {
    name: "นายธรรมนูญ ขำจิตต์",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการ",
    phone: "0910251032",
    locationId: 6
  },
  "809": {
    name: "นายศิวดล เชิมชัยภูมิ",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูชำนาญการ",
    phone: "0636494166",
    locationId: 6
  },
  "810": {
    name: "นายสัมฤทธิ์ การเลิศ",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูผู้ช่วย",
    phone: "",
    locationId: 6
  },
  "811": {
    name: "ว่าที่ร้อยตรี ชิงชัย มารักษา",
    department: DEPARTMENTS.MECHANIC,
    position: "ครู",
    phone: "",
    locationId: 6
  },
  "812": {
    name: "นายปรีชา สร้อยสาย",
    department: DEPARTMENTS.MECHANIC,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 6
  },
  "813": {
    name: "นายทศพล โทนมี",
    department: DEPARTMENTS.MECHANIC,
    position: "พนักงานราชการ (สอน)",
    phone: "0869308477",
    locationId: 6
  },
  "814": {
    name: "นายคมสัน ช้างอินทร์",
    department: DEPARTMENTS.MECHANIC,
    position: "พนักงานราชการ (สอน)",
    phone: "0925945514",
    locationId: 6
  },
  "815": {
    name: "ว่าที่ร.ต.อภินันต์ อินทะชิต",
    department: DEPARTMENTS.MECHANIC,
    position: "พนักงานราชการ (สอน) / ครู",
    phone: "0967050058",
    locationId: 6
  },
  "816": {
    name: "นายวิชัย งามสุพรม",
    department: DEPARTMENTS.MECHANIC,
    position: "พนักงานราชการ (สอน)",
    phone: "0800268335",
    locationId: 6
  },
  "817": {
    name: "นายชิตพงษ์ รัตนบรรเจิดกุล",
    department: DEPARTMENTS.MECHANIC,
    position: "พนักงานราชการ (สอน)",
    phone: "0882729596",
    locationId: 6
  },
  "818": {
    name: "นายจิรพงษ์ สมสาย",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูอัตราจ้าง",
    phone: "0862047674",
    locationId: 6
  },
  "819": {
    name: "นายสิทธิชัย หิริพงษ์",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูอัตราจ้าง",
    phone: "0858786921",
    locationId: 6
  },
  "820": {
    name: "นายอาทิตย์ การกิ่งไพร",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูอัตราจ้าง",
    phone: "0956340014",
    locationId: 6
  },
  "821": {
    name: "นายศรราม ศิริวัฒน์",
    department: DEPARTMENTS.MECHANIC,
    position: "ครูอัตราจ้าง",
    phone: "0958735634",
    locationId: 6
  },
  "822": {
    name: "นายเจริญ ทองหาญ",
    department: DEPARTMENTS.AUTO_TECH, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าภาควิชา / ครูชำนาญการพิเศษ",
    phone: "0817862092",
    locationId: 6
  },
  "823": {
    name: "นายอุดมศักดิ์ พยัคฆเดช",
    department: DEPARTMENTS.AUTO_TECH,
    position: "หัวหน้างานพัฒนาหลักสูตรฯ / ครูชำนาญการ",
    phone: "0957351345",
    locationId: 6
  },
  "824": {
    name: "นายธัชชัย อมรปิติโชติ",
    department: DEPARTMENTS.AUTO_TECH,
    position: "ครูเชี่ยวชาญ",
    phone: "0659622547",
    locationId: 6
  },
  "825": {
    name: "นายสงกรานต์ ณ วิเชียร",
    department: DEPARTMENTS.AUTO_TECH,
    position: "ครูชำนาญการพิเศษ",
    phone: "0815712671",
    locationId: 6
  },
  "826": {
    name: "นายปรีชา สร้อยสาย",
    department: DEPARTMENTS.AUTO_TECH,
    position: "ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 6
  },
  // --- แผนกวิชาเมคคาทรอนิกส์ (เริ่ม ID 8A06) ---
  "827": {
    name: "นายสิทธิพงษ์ นามโคตร",
    department: DEPARTMENTS.MECHATRONICS, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูผู้ช่วย",
    phone: "0925646866",
    locationId: 6
  },
  "828": {
    name: "นายบุญลอ ประสารศรี",
    department: DEPARTMENTS.MECHATRONICS,
    position: "ครูเชี่ยวชาญ",
    phone: "0890196622",
    locationId: 6
  },
  // --- แผนกวิชาช่างกลโรงงาน (เริ่ม ID C01) ---
  "C01": {
    name: "นายบุญธนาดล ศรีเบญญภากูล",
    department: DEPARTMENTS.MACHINING, // ⚠️ ตรวจสอบว่ามี MACHANING หรือ MACHINING ใน departments.ts (ในไฟล์ของคุณใช้ MACHINING)
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "",
    locationId: 18
  },
  "C02": {
    name: "นายสุทรรศ เพชรป้อ",
    department: DEPARTMENTS.MACHINING,
    position: "ครูชำนาญการ",
    phone: "0848113411",
    locationId: 18
  },
  "C03": {
    name: "นายสุพจน์ ปิ่นพฤฒิกุล",
    department: DEPARTMENTS.MACHINING,
    position: "ครูชำนาญการพิเศษ",
    phone: "0828773225",
    locationId: 18
  },
  "C04": {
    name: "นางสาวเบญจวรรณ บุญจันทร์",
    department: DEPARTMENTS.MACHINING,
    position: "ครู",
    phone: "0971830324",
    locationId: 18
  },
  "C05": {
    name: "นายปรเมษฐ์ แถมจรัส",
    department: DEPARTMENTS.MACHINING,
    position: "ครู",
    phone: "",
    locationId: 18
  },
  "C06": {
    name: "นายเศรษฐา เอื้อศิริรัตนไพสาล",
    department: DEPARTMENTS.MACHINING,
    position: "ครู",
    phone: "0623261463",
    locationId: 18
  },
  "C07": {
    name: "นายมาลัย ทองประดิษฐ",
    department: DEPARTMENTS.MACHINING,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 18
  },
  "C08": {
    name: "นายอธิชา ทรงสวัสดิ์วงศ์",
    department: DEPARTMENTS.MACHINING,
    position: "ครูอัตราจ้าง",
    phone: "0622748231",
    locationId: 18
  },
  "C09": {
    name: "นางสาววราภรณ์ สังฆะรัตน์",
    department: DEPARTMENTS.MACHINING,
    position: "ครูอัตราจ้าง",
    phone: "0807601963",
    locationId: 18
  },
  "C10": {
    name: "นายเอกพันธ์ ดิษฐสุนทร",
    department: DEPARTMENTS.MACHINING,
    position: "ครูอัตราจ้าง",
    phone: "0838869631",
    locationId: 18
  },
  "C11": {
    name: "นายชัยพิชิต ตาระพัน",
    department: DEPARTMENTS.MACHINING,
    position: "ครูอัตราจ้าง",
    phone: "0855449189",
    locationId: 18
  },
  "C12": {
    name: "นางสาวพศิกา หิรัญชาติ",
    department: DEPARTMENTS.MACHINING,
    position: "ครูอัตราจ้าง",
    phone: "0966623119",
    locationId: 18
  },
  "C13": {
    name: "นางสาวจีราพร พันผง",
    department: DEPARTMENTS.MACHINING,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 18
  },
  // --- แผนกวิชาช่างเชื่อมโลหะ (เริ่ม ID H01) ---
  "H01": {
    name: "นายพงศกร เมฆขุนทด",
    department: DEPARTMENTS.WELDING, // ⚠️ ตรวจสอบ department ใน departments.ts (น่าจะเป็น WELDING)
    position: "หัวหน้าแผนก / ครูชำนาญการ",
    phone: "",
    locationId: 26
  },
  "H02": {
    name: "นายพุฒิชัย มุ่งวิชา",
    department: DEPARTMENTS.WELDING,
    position: "ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 26
  },
  "H03": {
    name: "นายสมภพ ดีปัญญา",
    department: DEPARTMENTS.WELDING,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 26
  },
  "H04": {
    name: "ว่าที่ร้อยตรีฐาปนพงศ์ เจนจิตต์",
    department: DEPARTMENTS.WELDING,
    position: "ครูอัตราจ้าง",
    phone: "0841125593",
    locationId: 26
  },
  "H05": {
    name: "นายดิษฐวัฒน์ พงษ์รักษ์",
    department: DEPARTMENTS.WELDING,
    position: "ครูอัตราจ้าง",
    phone: "0629546655",
    locationId: 26
  },
  "H06": {
    name: "นายปิยะพงษ์ เวียงสีทอง",
    department: DEPARTMENTS.WELDING,
    position: "ครูอัตราจ้าง",
    phone: "0945658904",
    locationId: 26
  },
 
  // --- แผนกวิชาช่างก่อสร้าง (เริ่ม ID K01) ---
  "K01": {
    name: "นายทนงศักดิ์ มูลสาร",
    department: DEPARTMENTS.CONSTRUCTION, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 19
  },
  "K02": {
    name: "นายจำเนียร คำพา",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครู",
    phone: "",
    locationId: 19
  },
  "K03": {
    name: "นายอนันต์ สาเสียง",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครูชำนาญการพิเศษ",
    phone: "0638049969",
    locationId: 19
  },
  "K04": {
    name: "นายจักรกฤษณ์ เสเปี้ย",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครู",
    phone: "0918397937",
    locationId: 19
  },
  "K05": {
    name: "นางสาวพรพิมล พลนิกร",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครูผู้ช่วย",
    phone: "0882244191",
    locationId: 19
  },
  "K06": {
    name: "นางสาวเยาว์วภา มันตะวัตร",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครู",
    phone: "0819654787",
    locationId: 19
  },
  "K07": {
    name: "นายคนองเดช ประกอบสมบัติ",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการ",
    phone: "",
    locationId: 19
  },
  "K08": {
    name: "นายเสกสรรค์ มงคลกาล",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 19
  },
  "K09": {
    name: "นางสาวจารุวรรณ แพงละ",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "พนักงานราชการ (สอน)",
    phone: "0836195325",
    locationId: 19
  },
  "K10": {
    name: "นายพากร สง่างาม",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "พนักงานราชการ (สอน)",
    phone: "",
    locationId: 19
  },
  "K11": {
    name: "นางสาวชมพูนุท ประกอบเพ็ชร",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครูอัตราจ้าง",
    phone: "0882931887",
    locationId: 19
  },
  "K12": {
    name: "นางสาวปาริฉัตร ชาวม่วงชวัญ",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครูอัตราจ้าง",
    phone: "0645064576",
    locationId: 19
  },
  "K13": {
    name: "นายสหกฤต บุญรินทร์",
    department: DEPARTMENTS.CONSTRUCTION,
    position: "ครูอัตราจ้าง",
    phone: "0631792360",
    locationId: 19
  },
  // --- แผนกวิชาช่างสถาปัตยกรรม (เริ่ม ID W01) ---
  "W01": {
    name: "นายกัลล์วิศว์ ทิณรัตน์",
    department: DEPARTMENTS.ARCHITECTURE, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0942925642",
    locationId: 22
  },
  "W02": {
    name: "นายวิโรจน์ ทองจันทร์",
    department: DEPARTMENTS.ARCHITECTURE,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 22
  },
  "W03": {
    name: "นายชวลิต วงศ์ทองเหลือ",
    department: DEPARTMENTS.ARCHITECTURE,
    position: "ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 22
  },
  "W04": {
    name: "นางสาวชฎาภรณ์ ศรีแก้ว",
    department: DEPARTMENTS.ARCHITECTURE,
    position: "ครูอัตราจ้าง",
    phone: "0939914876",
    locationId: 22
  },
  // --- แผนกวิชาอาหารและโภชนาการ (เริ่ม ID R01) ---
  "R01": {
    name: "นางปทุมทิพย์ สิงห์ทอง",
    department: DEPARTMENTS.FOOD_NUTRITION, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 14
  },
  "R02": {
    name: "นายวุฒิพงษ์ วงษา",
    department: DEPARTMENTS.FOOD_NUTRITION,
    position: "ครูผู้ช่วย",
    phone: "0951388722",
    locationId: 14
  },
  "R03": {
    name: "นางสาวศิราพร เลิศสิทธิไชย",
    department: DEPARTMENTS.FOOD_NUTRITION,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูอัตราจ้าง",
    phone: "0904611682",
    locationId: 14
  },
  "R04": {
    name: "นางสาวพัชรี เฉยแฉล้ม",
    department: DEPARTMENTS.FOOD_NUTRITION,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 14
  },
  "R05": {
    name: "นายสิทธิกร บุดดา",
    department: DEPARTMENTS.FOOD_NUTRITION,
    position: "ครูอัตราจ้าง",
    phone: "0894369464",
    locationId: 14
  },
   "R06": {
    name: "นางวราภรณ์ ประทุมโฉม",
    department: DEPARTMENTS.FASHION, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0842007974",
    locationId: 14
  },
  "R07": {
    name: "นางธนพร แหวนนิล",
    department: DEPARTMENTS.FASHION,
    position: "ครูชำนาญการพิเศษ",
    phone: "0805850603",
    locationId: 14
  },
  "R08": {
    name: "นางสาวมนต์นิพา ไฉนงุ้น",
    department: DEPARTMENTS.FASHION,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูอัตราจ้าง",
    phone: "0833550445",
    locationId: 14
  },
  // --- แผนกวิชาเทคนิคพื้นฐาน (เริ่ม ID J01) ---
  "J01": {
    name: "นายชูชาติ อุททัง",
    department: DEPARTMENTS.BASIC_TECH, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "",
    locationId: 16
  },
  "J02": {
    name: "นายนิธิพงษ์ ยอดพันคำ",
    department: DEPARTMENTS.BASIC_TECH,
    position: "ครูชำนาญการพิเศษ",
    phone: "0850545585",
    locationId: 16
  },
  "J03": {
    name: "นายปฐวี แก้วไว",
    department: DEPARTMENTS.BASIC_TECH,
    position: "พนักงานราชการ (สอน)",
    phone: "0982353559",
    locationId: 16
  },
  "J04": {
    name: "นายอนุพงศ์ ไทยช้อย",
    department: DEPARTMENTS.BASIC_TECH,
    position: "พนักงานราชการ (สอน)",
    phone: "0956379879",
    locationId: 16
  },
  "J05": {
    name: "นายอภิสิทธิ์ บัวสิงห์โต",
    department: DEPARTMENTS.BASIC_TECH,
    position: "ครูอัตราจ้าง",
    phone: "0881527805",
    locationId: 16
  },
  "J06": {
    name: "นายทรงยศ ยงท้วม",
    department: DEPARTMENTS.BASIC_TECH,
    position: "ครูอัตราจ้าง",
    phone: "0823930764",
    locationId: 16
  },

  "E02": {
    name: "นางสาวกุลธิดา น้อยมาลัย",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "ข้าราชการพลเรือน",
    phone: "",
    locationId: 23
  },


  "E05": {
    name: "นายอนุรักษ์ มารอด",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "",
    locationId: 23
  },
  "E06": {
    name: "นางสาวกัญญารัตน์ งามศิริ",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน / เจ้าหน้าที่ธุรการ",
    phone: "0806833350",
    locationId: 23
  },
  "E07": {
    name: "นางสาววิไลรัตน์ ทับแย้ม",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "0966652917",
    locationId: 23
  },
  "E08": {
    name: "นางสาวปาณิสรา นุใหม่",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "0955917872",
    locationId: 23
  },
  "E09": {
    name: "นางสาวพลอยไพลิน นิลรัตน์",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "0925828326",
    locationId: 23
  },
  "E10": {
    name: "นายพีรพล นมัสสิลา",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "0613073881",
    locationId: 23
  },
  "E11": {
    name: "นายวทัญญู ทองบัว",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "",
    locationId: 23
  },
  "E12": {
    name: "นางกันหา จันทพิมพะ",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "0812845402",
    locationId: 23
  },
  "E13": {
    name: "นางสาวสายสมร บุญเปลี่ยน",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "เจ้าหน้าที่งาน",
    phone: "0930413566",
    locationId: 23
  },
  "E14": {
    name: "นางสาวณัฐธิดา กัลยาประสิทธิ์",
    department: DEPARTMENTS.GENERAL_ADMIN,
    position: "พนักงานราชการ (บริหารทั่วไป)",
    phone: "",
    locationId: 23
  },

  "E15": {
    name: "นางสุภัสสรา ทองหาญ",
    department: DEPARTMENTS.PROCUREMENT,
    position: "ข้าราชการพลเรือน",
    phone: "",
    locationId: 23
  },
  "E16": {
    name: "นางดวงเดือน คำโสม",
    department: DEPARTMENTS.PROCUREMENT,
    position: "ผู้ช่วยหัวหน้างาน / ลูกจ้างประจำ",
    phone: "",
    locationId: 23
  },

 
  "E17": {
    name: "นางสาวศิริวัลย์ วันเนา",
    department: DEPARTMENTS.PROCUREMENT,
    position: "เจ้าหน้าที่ธุรการงาน",
    phone: "0923538882",
    locationId: 23
  },
  "E18": {
    name: "นางสาวกนกพร ประสงค์",
    department: DEPARTMENTS.PROCUREMENT,
    position: "เจ้าหน้าที่ธุรการงาน / เจ้าหน้าที่ธุรการฝ่าย",
    phone: "0821395099",
    locationId: 23
  },
 
  "E19": {
    name: "นายทศพล โทนมี",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "0869308477",
    locationId: 23
  },
  "E20": {
    name: "นางสาวจารุวรรณ แพงละ",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "0836195325",
    locationId: 23
  },
  "E21": {
    name: "นายพากร สง่างาม",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "",
    locationId: 23
  },
  "E22": {
    name: "นายจิรพงษ์ สมสาย",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "0862047674",
    locationId: 23
  },


  "E23": {
    name: "นายดิษฐวัฒน์ พงษ์รักษ์",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "0629546655",
    locationId: 23
  },
  "E24": {
    name: "นายปิยะพงษ์ เวียงสีทอง",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "0945658904",
    locationId: 23
  },
  "E25": {
    name: "นายสหกฤต บุญรินทร์",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่งาน",
    phone: "0631792360",
    locationId: 23
  },
  "E26": {
    name: "นางสาวจามิกร คำลือ",
    department: DEPARTMENTS.BUILDING,
    position: "เจ้าหน้าที่ธุรการงาน",
    phone: "0819539805",
    locationId: 23
  },
  
  "1Q01": {
    name: "นายชิตพงษ์ รัตนบรรเจิดกุล",
    department: DEPARTMENTS.QA,
    position: "เจ้าหน้าที่งาน",
    phone: "0882729596",
    locationId: 8
  },


  "E28": {
    name: "นายทรงยศ บุญนารักษ์",
    department: DEPARTMENTS.PROCUREMENT,
    position: "ลูกจ้างอัตราจ้าง (พนักงานขับรถยนต์)",
    phone: "",
    locationId: 23
  },
  "E29": {
    name: "นายทวี กินยืน",
    department: DEPARTMENTS.PROCUREMENT,
    position: "ลูกจ้างอัตราจ้าง (พนักงานขับรถยนต์)",
    phone: "",
    locationId: 23
  }, 
  // --- แผนกวิชาช่างเทคนิคคอมพิวเตอร์ (เริ่ม ID 6A01) ---
  "O01": {
    name: "นายชัยพร วงษ์ตั้งมั่น",
    department: DEPARTMENTS.COMPUTER_TECH, // ✅ ตรงกับ key ใน departments.ts
    position: "หัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0865534496",
    locationId: 29
  },
  "O02": {
    name: "นายคมสัน ถมคำ",
    department: DEPARTMENTS.COMPUTER_TECH,
    position: "ผู้ช่วยหัวหน้าแผนก / ครูชำนาญการพิเศษ",
    phone: "0819712723",
    locationId: 29
  },
  "O03": {
    name: "นายพงษ์พันธ์ ผ่านวงษ์",
    department: DEPARTMENTS.COMPUTER_TECH,
    position: "ครูผู้ช่วย",
    phone: "0618924624",
    locationId: 29
  },
  "O04": {
    name: "นายปรัชญา หมายด่านกลาง",
    department: DEPARTMENTS.COMPUTER_TECH,
    position: "ครูผู้ช่วย",
    phone: "0805250581",
    locationId: 29
  },
  "O05": {
    name: "นางสาวสุปวีณ์ ปราบนอก",
    department: DEPARTMENTS.COMPUTER_TECH,
    position: "ครูอัตราจ้าง",
    phone: "0972563243",
    locationId: 29
  },
  "O06": {
    name: "นายธิติ อันทปัญญา",
    department: DEPARTMENTS.COMPUTER_TECH,
    position: "นักศึกษาฝึกสอน",
    phone: "0936521514",
    locationId: 29
    },
    

  "1E01": {
   name: "นางนนทพร โกศินานนท์", 
   department: DEPARTMENTS.LIBRARY, 
   position: "หัวหน้างาน / ครูชำนาญการ",
   phone: "0896244962",
  locationId: 7 // (ประจำแผนกสามัญสัมพันธ์)
  },
  "1E02": {
    name: "นางสาวศรัณย์รัชต์ นามกุล",
    department: DEPARTMENTS.LIBRARY,
    position: "เจ้าหน้าที่งาน",
    phone: "",
    locationId: 7
  },
  "901": {
    name: "นางสาวณัฎฐนิช ชลานันต์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 27
  },
 "902": {
    name: "ขวัญจิรา ฝ่ายอากาศ",
    department: DEPARTMENTS.GENERAL,
    position: "ครูอัตราจ้าง",
    phone: "",
    locationId: 27
   },

  "903": {
    name: "นางอมรรัตน์ ตรีเศียร",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0641599496",
    locationId: 27
  },
  "904": {
    name: "นางสุธาสินี ถาแยง",
    department: DEPARTMENTS.GENERAL, 
    position: "หัวหน้างานบริหารงานทั่วไป / ครูชำนาญการพิเศษ",
    phone: "0819623147",
    locationId: 27 
  },
 "905": {
    name: "นางธราภรณ์ ปิ่นพฤฒิกุล",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0894388104",
    locationId: 27
  },
"906": {
    name: "นางกีระติกาญน์ มาอยู่วัง",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการพิเศษ",
    phone: "0826941486",
    locationId: 27
  },
"907": {
    name: "นางสาวชนาภัต ช้างอินทร์",
    department: DEPARTMENTS.GENERAL,
    position: "ครูชำนาญการ",
    phone: "",
    locationId: 27
  },



};