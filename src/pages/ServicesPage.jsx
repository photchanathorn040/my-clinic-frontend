import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from '../components/Container';
import styles from '../styles/Card.module.css';
import { useTranslation } from 'react-i18next';
import BookingForm from '../components/BookingForm'; // 1. Import BookingForm

function ServicesPage() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  // 2. สร้าง state ใหม่เพื่อเก็บว่ากำลังจะจอง service ไหน
  const [bookingService, setBookingService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <Container><div>Loading services...</div></Container>;
  }

  return (
    <Container>
      <h1>{t('Our Services')}</h1>
      {!token && <p style={{ color: 'red' }}>{t('You must be logged in to book.')}</p>}

      {services.map(service => (
        <div key={service.id} className={styles.card}>
          <h3>{service.name[i18n.language] || service.name.en}</h3>
          <p>{service.description[i18n.language] || service.description.en}</p>
          <p><strong>{t('Price')}:</strong> {service.price} {t('THB')}</p>

          {/* 3. เมื่อกดปุ่ม ให้ set service ที่จะจอง */}
          <button onClick={() => token ? setBookingService(service) : alert(t('You must be logged in to book.'))}>
            {t('Book Now')}
          </button>

          {/* 4. ถ้า bookingService คืออันนี้ ให้แสดงฟอร์ม */}
          {bookingService?.id === service.id && (
            <BookingForm 
              service={bookingService} 
              onBookingSuccess={() => {
                alert('Booking successful!');
                setBookingService(null); // ซ่อนฟอร์มเมื่อจองสำเร็จ
              }} 
            />
          )}
        </div>
      ))}
    </Container>
  );
}

export default ServicesPage;