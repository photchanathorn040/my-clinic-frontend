import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from '../components/Container'; // 1. Import Container
import styles from '../styles/Card.module.css'; // 2. Import Card styles
import { useTranslation } from 'react-i18next';

function ProfilePage() {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setError('Please log in.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('${import.meta.env.VITE_API_URL}/api/profile', {
          headers: { 'x-access-token': token },
        });
        const data = await response.json();
        if (response.ok) {
          setUserData(data.user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch profile.');
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <Container>
      <h1>{t('My Profile')}</h1>
      <div className={styles.card}>
        {userData ? (
          <div>
            <h3>{t('User Information')}</h3>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>{t('Email')}:</strong> {userData.email}</p>
          </div>
        ) : (
          <p>{error ? t(error) : t('Loading profile...')}</p>
        )}
      </div>
    </Container>
  );
}
export default ProfilePage;