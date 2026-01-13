// src/components/ui/BackgroundParticles.tsx
import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import { useTheme } from "../../context/ThemeContext";

const BackgroundParticles = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const options: ISourceOptions = useMemo(() => {
    // ชุดสี (Palette) ที่สดใสและเข้ากับ Theme
    const colors = isDark
      ? ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"] // Dark: ฟ้า, ม่วง, ชมพู, เขียว, เหลือง
      : ["#60a5fa", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"]; // Light: พาสเทล

    return {
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      particles: {
        // 1. สี: หลากหลายสี
        color: {
          value: colors,
        },
        move: {
          direction: "bottom", // ตกลงมา
          enable: true,
          outModes: { default: "out" },
          random: true, // ส่ายไปมาเล็กน้อย
          speed: { min: 1, max: 3 }, // ความเร็วแตกต่างกัน
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 20, // ✅ ปรับลดจำนวนลงเหลือ 20 (เพื่อให้พอดี ไม่รกตา เพราะขนาดมันใหญ่)
        },
        opacity: {
          value: { min: 0.1, max: isDark ? 0.3 : 0.5 }, // โปร่งแสงจางๆ ไม่กวนสายตา
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "edge", // ✅ กลับมาใช้ "สี่เหลี่ยม" (Square)
        },
        // 2. ขนาด: เล็กสุด 10px ไปจนถึงใหญ่มาก 50px
        size: {
          value: { min: 10, max: 50 },
          animation: {
            enable: true, // มีการย่อขยาย
            speed: 2,
            minimumValue: 5,
            sync: false,
            startValue: "random",
            destroy: "none",
          },
        },
        rotate: {
          value: { min: 0, max: 360 }, // หมุนรอบทิศ
          random: true,
          direction: "random", // หมุนซ้ายบ้างขวาบ้าง
          animation: {
            enable: true,
            speed: 1.5, // หมุนช้าๆ ให้ดูลอยๆ
            sync: false,
          },
        },
      },
      detectRetina: true,
    };
  }, [isDark]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="absolute inset-0 -z-10 pointer-events-none"
    />
  );
};

export default BackgroundParticles;
