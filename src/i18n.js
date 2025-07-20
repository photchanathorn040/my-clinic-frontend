import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "Home": "Home",
      "Services": "Services",
      "My Bookings": "My Bookings",
      "Profile": "Profile",
      "Login": "Login",
      "Register": "Register",
      "Logout": "Logout",

      // Pages & Titles
      "Welcome to My Clinic": "Welcome to My Clinic",
      "This is the main page of our application.": "This is the main page of our application.",
      "Our Services": "Our Services",
      "My Profile": "My Profile",
      "User Information": "User Information",

      // Forms & Common Text
      "Email": "Email",
      "Password": "Password",
      "Logging in...": "Logging in...",
      "Submitting...": "Submitting...",
      "Login successful!": "Login successful!",
      "User created successfully!": "User created successfully!",
      "This email is already in use.": "This email is already in use.",
      "Invalid credentials": "Invalid credentials",
      "You must be logged in to book.": "You must be logged in to book.",
      "Book Now": "Book Now",

      // My Bookings Page
      "Loading your bookings...": "Loading your bookings...",
      "You have no bookings yet.": "You have no bookings yet.",
      "Booking ID": "Booking ID",
      "Service": "Service",
      "Date": "Date",

      "Price": "Price",
      "THB": "THB",
    }
  },
  th: {
    translation: {
      // Header
      "Home": "หน้าแรก",
      "Services": "บริการ",
      "My Bookings": "ประวัติการจอง",
      "Profile": "โปรไฟล์",
      "Login": "เข้าสู่ระบบ",
      "Register": "สมัครสมาชิก",
      "Logout": "ออกจากระบบ",

      // Pages & Titles
      "Welcome to My Clinic": "ยินดีต้อนรับสู่คลินิกของเรา",
      "This is the main page of our application.": "นี่คือหน้าหลักของแอปพลิเคชัน",
      "Our Services": "บริการของเรา",
      "My Profile": "โปรไฟล์ของฉัน",
      "User Information": "ข้อมูลผู้ใช้",

      // Forms & Common Text
      "Email": "อีเมล",
      "Password": "รหัสผ่าน",
      "Logging in...": "กำลังเข้าสู่ระบบ...",
      "Submitting...": "กำลังส่งข้อมูล...",
      "Login successful!": "เข้าสู่ระบบสำเร็จ!",
      "User created successfully!": "สมัครสมาชิกสำเร็จ!",
      "This email is already in use.": "อีเมลนี้มีผู้ใช้งานแล้ว",
      "Invalid credentials": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      "You must be logged in to book.": "กรุณาเข้าสู่ระบบเพื่อทำการจอง",
      "Book Now": "จองตอนนี้",

      // My Bookings Page
      "Loading your bookings...": "กำลังโหลดประวัติการจอง...",
      "You have no bookings yet.": "คุณยังไม่มีรายการจอง",
      "Booking ID": "รหัสการจอง",
      "Service": "บริการ",
      "Date": "วันที่",

      "Price": "ราคา",
      "THB": "บาท",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "th", // ภาษาเริ่มต้น
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;