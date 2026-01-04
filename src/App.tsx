import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import TeacherDetailPage from "./pages/TeacherDetailPage"; // 1. Import หน้าใหม่เข้ามา

// Import Context
import { ThemeProvider } from "./context/ThemeContext";

function App() {
    return (
        <ThemeProvider>
                {/* ห่อ MainLayout ด้วย h-screen เพื่อบังคับความสูงเต็ม viewport */}
                <div className="h-screen">
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/map" element={<MapPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<Contact />} />
                            
                            {/* 2. เพิ่ม Route สำหรับหน้ารายละเอียดครู (รับ parameter id) */}
                            <Route path="/teachers/:id" element={<TeacherDetailPage />} />

                            {/* ถ้าใส่ URL มั่วๆ ให้เด้งกลับหน้าแรก */}
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </MainLayout>
                </div>
            </ThemeProvider>
    );
}

export default App;