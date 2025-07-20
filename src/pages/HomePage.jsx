import Container from '../components/Container';
import { useTranslation } from 'react-i18next'; // 1. Import

function HomePage() {
  const { t } = useTranslation(); // 2. เรียกใช้

  return (
    <Container>
      {/* 3. เปลี่ยนข้อความ */}
      <h1>{t('Welcome to My Clinic')}</h1>
      <p>{t('This is the main page of our application.')}</p>
    </Container>
  );
}

export default HomePage;