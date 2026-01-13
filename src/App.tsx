import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";

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
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </MainLayout>
                </div>
            </ThemeProvider>
    );
}

export default App;