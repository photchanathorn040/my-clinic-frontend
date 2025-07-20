import { useState } from 'react';
import styles from '../styles/Form.module.css'; // 1. Import สไตล์ฟอร์มเข้ามา
import { useTranslation } from 'react-i18next';

function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Submitting...');

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`Success: ${data.message}`);
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>{t('Register')}</h2>
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
        <button type="submit" className={styles.formButton}>{t('Register')}</button>
      </form>
      {message && <p className={styles.message}>{t(message)}</p>}
    </div>
  );
}
export default Register;