import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import LocationDetailPage from "./app/location/LocationDetailPage.tsx"; // 🟢 แก้ไข path ตรงนี้ให้ตรงกับไฟล์ของคุณ
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter basename="/pbntc69/map/dist">
            <Routes>
                {/* หน้าหลักแสดงแผนที่ */}
                <Route path="/" element={<App />} />
                {/* หน้าแสดงรายละเอียดอาคาร */}
                <Route path="/app/location/:id" element={<LocationDetailPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
