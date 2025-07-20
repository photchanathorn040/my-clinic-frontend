import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    // ถ้าไม่มี token, ให้ส่งผู้ใช้กลับไปที่หน้า /login
    return <Navigate to="/login" />;
  }

  // ถ้ามี token, ให้แสดงหน้าเพจนั้นๆ (children) ตามปกติ
  return children;
}

export default ProtectedRoute;