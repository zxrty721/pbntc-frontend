import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';

// Import Context
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          {/* ถ้าใส่ URL มั่วๆ ให้เด้งกลับหน้าแรก */}
          <Route path="*" element={<Home />} />
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;