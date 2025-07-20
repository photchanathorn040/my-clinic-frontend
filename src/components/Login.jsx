import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Form.module.css'; // << 1. Import สไตล์ฟอร์มเข้ามา
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation();
  // ... Logic (useState, handleSubmit) เหมือนเดิมทุกประการ ...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Logging in...');
    const response = await fetch('${'https://photchanathornp.pythonanywhere.com'}/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
        login(data.token);
        navigate('/'); 
    } else {
        setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{t('Login')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>{t('Email')}:</label>
          {/* โค้ด input ที่หายไป อยู่ตรงนี้ครับ */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label>{t('Password')}:</label>
          {/* โค้ด input ที่หายไป อยู่ตรงนี้ครับ */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        <button type="submit" className={styles.formButton}>{t('Login')}</button>
      </form>
      {/* ถ้ามี message ให้แปลก่อนแสดงผล */}
      {message && <p className={styles.message}>{t(message)}</p>}
    </div>
  );
}

export default Login;