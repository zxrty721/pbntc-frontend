
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Building2, Briefcase, UserCircle2 } from "lucide-react";
import { teachersData } from "../data/teachers";

const TeacherDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const teacher = id ? teachersData[Number(id)] : null;

  if (!teacher) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-slate-400">ไม่พบข้อมูลครู</div>;
  }

  // URL รูปภาพตาม ID
  const dynamicImageUrl = `https://teacher.pbntc.site/${teacher.id}.jpg`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* --- HEADER NAVIGATION --- */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-blue-50"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-lg">ย้อนกลับ</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* --- MAIN CARD --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col mt-10 min-h-[80vh]">
          
          {/* Cover Background */}
          <div className="h-64 md:h-80 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>

          <div className="px-6 md:px-16 pb-16 flex-1">
            <div className="flex flex-col md:flex-row gap-12 items-start h-full">
              
              {/* --- LEFT: BIG PROFILE IMAGE --- */}
              <div className="shrink-0 relative -mt-32 mx-auto md:mx-0">
                <div className="p-3 bg-white rounded-[2rem] shadow-2xl inline-block rotate-0 hover:rotate-1 transition-transform duration-300">
                  <img
                    src={dynamicImageUrl}
                    alt={teacher.name}
                    className="w-72 h-96 md:w-80 md:h-[30rem] object-cover rounded-[1.5rem] bg-slate-200 shadow-inner"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x400?text=No+Image";
                    }}
                  />
                </div>
              </div>

              {/* --- RIGHT: INFO --- */}
              <div className="flex-1 pt-8 md:pt-12 w-full flex flex-col justify-center">
                
                {/* Name & Badges */}
                <div className="mb-10 text-center md:text-left space-y-4">
                  <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                    {teacher.name}
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white text-lg font-bold shadow-lg shadow-blue-200">
                      <Briefcase size={20} />
                      {teacher.position}
                    </span>
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 text-lg font-bold border border-slate-200">
                      <Building2 size={20} />
                      แผนก{teacher.department}
                    </span>
                  </div>
                </div>

                <hr className="border-slate-100 mb-10" />

                {/* Contact Box (เหลือแค่เบอร์โทร เด่นๆ) */}
                <div className="grid grid-cols-1 gap-6">
                  {teacher.phone ? (
                    <div className="p-10 rounded-[2rem] bg-green-50 border-2 border-green-100 hover:border-green-300 transition-all group cursor-pointer shadow-sm hover:shadow-md">
                      <a href={`tel:${teacher.phone}`} className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl bg-green-500 group-hover:scale-110 transition-transform">
                          <Phone size={40} />
                        </div>
                        <div>
                          <p className="text-base font-bold uppercase tracking-wider text-green-700 opacity-70 mb-1">เบอร์โทรศัพท์</p>
                          <p className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                            {teacher.phone}
                          </p>
                        </div>
                      </a>
                    </div>
                  ) : (
                     <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 flex items-center gap-6 opacity-60">
                        <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400">
                            <Phone size={32} />
                        </div>
                        <span className="text-xl font-bold text-slate-400">ไม่มีเบอร์โทรศัพท์ติดต่อ</span>
                     </div>
                  )}
                </div>

                {/* Status Section (แบบเรียบง่าย ไม่มี ID) */}
                <div className="mt-10 flex items-center gap-4 text-slate-400 justify-center md:justify-start">
                   <UserCircle2 size={24} />
                   <span className="text-lg font-medium">บุคลากรประจำการ วิทยาลัยเทคนิคเพชรบูรณ์</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailPage;