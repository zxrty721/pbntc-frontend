import React from 'react';
import CampusMap from '../components/features/CampusMap';
import { useTheme } from '../context/ThemeContext'; // 👈 Import useTheme

const MapPage: React.FC = () => {
  const { styles } = useTheme();

  return (
    <div className="w-full flex flex-col items-center py-16 px-4">
      
      {/* Header Section for MapPage (Polished) */}
      <div className="text-center mb-12 max-w-3xl">
        
        {/* Badge: แสดงสถานะ Interactive Map */}
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border ${styles.border} ${styles.badge}`}>
          Interactive Map
        </span>

        {/* Headline: ปรับเป็นสีเข้มเพื่อให้เข้ากับพื้นหลังขาว */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
          แผนที่ภายในวิทยาลัย
        </h2>
        <p className="text-slate-500 mt-2 text-lg">
          ค้นหาอาคารเรียน โรงฝึกงาน และสถานที่สำคัญทั้งหมด 23 จุด พร้อมข้อมูลเจาะลึก
        </p>
      </div>
      
      {/* The main map component (CampusMap) is rendered here */}
      <CampusMap />
    </div>
  );
};

export default MapPage;