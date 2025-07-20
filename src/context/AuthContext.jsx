import React, { createContext, useState, useContext } from 'react';

// 1. สร้าง Context object ขึ้นมา
const AuthContext = createContext(null);

// 2. สร้าง Provider Component (ตัว "เราเตอร์ Wi-Fi" ของเรา)
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // 'value' คือข้อมูลที่จะถูกกระจายสัญญาณไปให้ทุก component
  const value = { token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. สร้าง custom hook เพื่อให้เรียกใช้ context ได้ง่ายๆ
export function useAuth() {
  return useContext(AuthContext);
}