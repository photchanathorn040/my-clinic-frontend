import { useState, useEffect } from 'react';

function Profile({ token }) {
  // สร้าง state เพื่อเก็บข้อมูล user และข้อความ error
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // useEffect จะทำงานหนึ่งครั้งหลังจาก component แสดงผล
  useEffect(() => {
    const fetchProfile = async () => {
      // 2. ไม่ต้องดึง token จาก localStorage แล้ว เพราะได้รับมาโดยตรง
      if (!token) {
        // ...
        return;
      }

      // 3. ยิง API request ไปยัง /profile endpoint
      const response = await fetch('${'https://photchanathornp.pythonanywhere.com'}/profile', {
        method: 'GET',
        headers: {
          // (สำคัญ) ส่ง token ไปใน header ที่ชื่อ 'x-access-token'
          'x-access-token': token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // 4. ถ้าสำเร็จ, เก็บข้อมูล user ไว้ใน state
        setUserData(data.user);
      } else {
        // 5. ถ้าไม่สำเร็จ (เช่น token หมดอายุ), แสดงข้อความ error
        setError(data.message);
        // อาจจะต้องลบ token ที่ใช้ไม่ได้แล้วออกจาก Local Storage
        localStorage.removeItem('token');
      }
    };

    fetchProfile(); // เรียกใช้ฟังก์ชัน
  }, []); // [] หมายถึงให้ทำงานแค่ครั้งเดียว

  // ส่วนของการแสดงผล
  return (
    <div style={{ border: '1px solid green', padding: '20px', margin: '20px' }}>
      <h2>My Profile</h2>
      {userData ? (
        // ถ้ามีข้อมูล user, ให้แสดงข้อมูล
        <div>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        // ถ้าไม่มี, ให้แสดงข้อความ error หรือ loading
        <p>{error || 'Loading profile...'}</p>
      )}
    </div>
  );
}

export default Profile;