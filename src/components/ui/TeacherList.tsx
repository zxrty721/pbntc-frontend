import React, { useState, useMemo } from "react";
import { Users, Filter, ChevronDown, ChevronRight, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import type { Teacher } from "../../types";

// เราสร้าง Interface นี้ขึ้นมาเพื่อให้มั่นใจว่า Object ที่ส่งเข้ามา
// จะต้องมี property "id" ที่เป็น string (เช่น "100", "U") ติดมาด้วย
export interface TeacherWithId extends Teacher {
  id: string;
}

interface TeacherListProps {
  teachers: TeacherWithId[]; // รับ array ที่มี id เป็น string
  onSelectTeacher: (id: string) => void; // ส่ง id เป็น string กลับไปเมื่อคลิก
}

const TeacherList: React.FC<TeacherListProps> = ({
  teachers,
  onSelectTeacher,
}) => {
  const { styles, theme } = useTheme();
  const [selectedDept, setSelectedDept] = useState("ทั้งหมด");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Logic การกรอง
  const departments = useMemo(() => {
    const deps = new Set(teachers.map((t) => t.department).filter(Boolean));
    return ["ทั้งหมด", ...Array.from(deps)];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    if (selectedDept === "ทั้งหมด") return teachers;
    return teachers.filter((t) => t.department === selectedDept);
  }, [teachers, selectedDept]);

  // Styling Helpers
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-slate-900" : "bg-white";
  const bgList = isDark ? "bg-slate-950" : "bg-slate-50";
  const borderCol = isDark ? "border-slate-800" : "border-slate-200";

  return (
    <div
      className={`flex flex-col h-full w-full border ${borderCol} ${bgMain} md:rounded-3xl overflow-hidden`}
    >
      {/* --- Header (Sticky) --- */}
      <div className={`p-5 border-b ${borderCol} z-20 bg-inherit relative`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl text-white shadow-md ${styles.primaryBg}`}
            >
              <Users size={18} />
            </div>
            <div>
              <h3 className={`font-extrabold text-base ${styles.textHeading}`}>
                บุคลากร
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                ประจำอาคารนี้
              </p>
            </div>
          </div>
          <div
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${borderCol} ${
              isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
            }`}
          >
            {filteredTeachers.length}
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${borderCol} ${
              isDark ? "bg-slate-800/50 hover:bg-slate-800" : "bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <span className="flex items-center gap-2 truncate opacity-80">
              <Filter size={14} />
              {selectedDept}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform opacity-50 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div
                className={`absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl border z-30 max-h-56 overflow-y-auto custom-scrollbar ${bgMain} ${borderCol}`}
              >
                {departments.map((dept, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDept(dept);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-xs font-bold border-b last:border-0 hover:opacity-70 transition-opacity ${borderCol} ${
                      selectedDept === dept ? styles.primary : isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- Scrollable List --- */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar ${bgList}`}
      >
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((t) => (
            <div
              key={t.id} // ใช้ string id เป็น key
              onClick={() => onSelectTeacher(t.id)} // ส่ง string id กลับไป
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md group ${borderCol} ${
                isDark ? "bg-slate-900" : "bg-white"
              }`}
            >
              {/* Avatar Small */}
              <div className="relative shrink-0">
                <img
                  src={`https://teacher.pbntc.site/${t.id}.jpg`}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover bg-slate-200 border border-slate-100 dark:border-slate-700"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/100?text=IMG")
                  }
                />
              </div>
              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-bold text-xs truncate ${styles.textHeading} group-hover:${styles.primary} transition-colors`}
                >
                  {t.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5 opacity-80">
                  {t.position}
                </p>
              </div>
              <ChevronRight
                size={14}
                className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
              />
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-40 gap-3 py-10">
            <Search size={32} />
            <span className="text-xs font-medium">ไม่พบข้อมูล</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherList;