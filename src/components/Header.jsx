import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import briaLogo from '../assets/bria-logo.png';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next'; // 1. Import hook สำหรับแปลภาษา

function Header() {
  const { token, logout } = useAuth();
  const { t, i18n } = useTranslation(); // 2. เรียกใช้ hook

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={briaLogo} alt="BRIA Lab Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <ul>
          {/* 3. เปลี่ยนข้อความทั้งหมดให้ใช้ฟังก์ชัน t() */}
          <li><Link to="/">{t('Home')}</Link></li>
          <li><Link to="/services">{t('Services')}</Link></li>
          {token ? (
            <>
              <li><Link to="/my-bookings">{t('My Bookings')}</Link></li>
              <li><Link to="/profile">{t('Profile')}</Link></li>
              <li>
                <button onClick={logout} className={styles.logoutButton}>
                  {t('Logout')}
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">{t('Login')}</Link></li>
              <li><Link to="/register">{t('Register')}</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* 4. เพิ่มปุ่มสำหรับเปลี่ยนภาษา */}
      <div>
        <button onClick={() => changeLanguage('th')} style={{ marginRight: '5px' }}>TH</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
      </div>
    </header>
  );
}

export default Header;