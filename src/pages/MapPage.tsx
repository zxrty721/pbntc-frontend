import React from 'react';
import CampusMap from '../components/features/CampusMap';
import { FaGraduationCap } from 'react-icons/fa';

const MapPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">แผนที่ภายในวิทยาลัย</h2>
        <p className="text-slate-400 mt-2">คลิกที่จุดต่างๆ เพื่อดูรายละเอียด</p>
      </div>
      
      {/* CampusMap ตัวนี้ควรจะวางบนพื้นหลังมืดได้เลย */}
      <CampusMap />

        {/* Footer Note */}
        <div className="py-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800">
              <FaGraduationCap className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-500 font-medium">Educational Project • จัดทำเพื่อการศึกษา</span>
          </div>
        </div>
    </div>
  );
};

export default MapPage;