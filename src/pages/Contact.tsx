import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const WORKER_URL = "https://contact.pbntc.site";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { styles, theme } = useTheme();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: `[หัวข้อ: ${formData.subject}]\n\n${formData.message}`,
      };
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "เกิดข้อผิดพลาด");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);

      // ✅ แก้ไขตรงนี้: เปลี่ยน any เป็น unknown และเช็ค type
    } catch (error: unknown) {
      setStatus("error");
      let msg = "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้";
      if (error instanceof Error) {
        msg = error.message;
      }
      setErrorMessage(msg);
    }
  };

  // Helper Colors
  const inputBg =
    theme === "dark"
      ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400";
  const labelColor = theme === "dark" ? "text-slate-300" : "text-slate-700";

  return (
    <div
      // ✅ แก้ไข: ลบ ${styles.bgBody} ออกเพื่อให้พื้นหลังโปร่งใส
      className="w-full min-h-screen pb-16 md:pb-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border ${theme === "dark" ? "border-slate-700 bg-slate-800 text-slate-300" : "border-slate-200 bg-white text-slate-600"}`}
          >
            Contact Us
          </span>
          <h2
            className={`text-3xl md:text-5xl font-extrabold mb-6 ${styles.textHeading}`}
          >
            ติดต่อสอบถาม
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${styles.textBody}`}
          >
            มีข้อสงสัยเกี่ยวกับเส้นทาง อาคารเรียน หรือข้อมูลอื่นๆ
            ติดต่อเราได้หลากหลายช่องทาง
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* --- Left: Info & Map --- */}
          <div className="space-y-8">
            <div className={`p-8 rounded-3xl ${styles.card}`}>
              <h3
                className={`text-xl font-bold mb-6 flex items-center gap-3 ${styles.primary}`}
              >
                <FaMapMarkerAlt /> ข้อมูลการติดต่อ
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "ที่อยู่",
                    desc: "222 หมู่ 9 ต.ในเมือง อ.เมือง จ.เพชรบูรณ์ 67000",
                  },
                  {
                    icon: <FaPhoneAlt />,
                    title: "เบอร์โทรศัพท์",
                    desc: "056-711455",
                  },
                  {
                    icon: <FaEnvelope />,
                    title: "อีเมล",
                    desc: "pbntc212@pbntc.ac.th",
                  },
                  {
                    icon: <FaClock />,
                    title: "เวลาทำการ",
                    desc: "จันทร์ - ศุกร์: 08:30 - 16:30 น.",
                  },
                ].map((info, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div
                      className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center ${theme === "dark" ? "bg-slate-800" : "bg-slate-50"} ${styles.primary} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <h4 className={`font-bold ${styles.textHeading}`}>
                        {info.title}
                      </h4>
                      <p
                        className={`text-sm mt-1 leading-relaxed ${styles.textBody}`}
                      >
                        {info.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Maps */}
            <div className="w-full h-80 bg-slate-200 rounded-3xl overflow-hidden shadow-lg border border-white/10 relative group">
              <iframe
                title="Phetchabun Technical College Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.733297551574!2d101.11996231486877!3d16.42398098866532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3121d70e70000001%3A0x7d67063000000001!2sPhetchabun%20Technical%20College!5e0!3m2!1sen!2sth!4v1620000000000!5m2!1sen!2sth"
                className="absolute inset-0 w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* --- Right: Contact Form --- */}
          <div
            className={`p-8 md:p-10 rounded-3xl h-full flex flex-col relative overflow-hidden ${styles.card}`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${styles.bgGradient}`}
            ></div>

            <div className="mb-8">
              <h3 className={`text-2xl font-bold ${styles.textHeading}`}>
                ส่งข้อความถึงเรา
              </h3>
              <p className={`text-sm mt-2 ${styles.textBody}`}>
                กรอกข้อมูลด้านล่างเพื่อติดต่อเจ้าหน้าที่
                (ระบบจะส่งอีเมลแจ้งเตือนทันที)
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 grow flex flex-col justify-center"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={`text-sm font-bold ml-1 ${labelColor}`}>
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60 ${inputBg}`}
                    placeholder="ระบุชื่อของคุณ"
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-bold ml-1 ${labelColor}`}>
                    อีเมลติดต่อกลับ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60 ${inputBg}`}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className={`text-sm font-bold ml-1 ${labelColor}`}>
                  หัวข้อเรื่อง <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60 ${inputBg}`}
                  placeholder="เช่น สอบถามเรื่องการรับสมัคร"
                />
              </div>

              <div className="space-y-2 grow">
                <label className={`text-sm font-bold ml-1 ${labelColor}`}>
                  ข้อความ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className={`w-full px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none disabled:opacity-60 ${inputBg}`}
                  placeholder="รายละเอียดที่ต้องการสอบถาม..."
                ></textarea>
              </div>

              {status === "error" && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2 animate-pulse">
                  <FaExclamationCircle /> {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 mt-4 transition-all duration-300
                  ${
                    status === "success"
                      ? "bg-green-500 text-white cursor-default"
                      : status === "loading"
                        ? "bg-slate-400 text-white cursor-wait"
                        : `text-white hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] ${styles.primaryBg}`
                  }`}
              >
                {status === "loading" ? (
                  <>
                    <FaSpinner className="animate-spin" /> กำลังส่งข้อมูล...
                  </>
                ) : status === "success" ? (
                  <>
                    <FaCheckCircle /> ส่งเรียบร้อยแล้ว!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" /> ส่งข้อความ
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div
          className={`py-8 text-center border-t w-full ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
          >
            <FaGraduationCap className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">
              Phetchabun Technical College • วิทยาลัยเทคนิคเพชรบูรณ์
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
