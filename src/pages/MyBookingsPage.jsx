import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from '../components/Container';
import styles from '../styles/Card.module.css';
import { useTranslation } from 'react-i18next';

function MyBookingsPage() {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-bookings`, {
          headers: { 'x-access-token': token },
        });
        const data = await response.json();
        if (response.ok) {
          setBookings(data.bookings);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  if (loading) {
    return <Container><div>{t('Loading your bookings...')}</div></Container>;
  }

  return (
    <Container>
      <h1>{t('My Bookings')}</h1>
      {bookings.length === 0 ? (
        <p>{t('You have no bookings yet.')}</p>
      ) : (
        <div>
          {bookings.map(booking => {
            const localAppointmentTime = new Date(booking.appointment_time).toLocaleString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
            return (
              <div key={booking.id} className={styles.card}>
                <h3>{t('Booking ID')}: {booking.id}</h3>
                <p><strong>{t('Service')}:</strong> {booking.service_name}</p>
                <p><strong>{t('Date')}:</strong> {localAppointmentTime}</p>
              </div>
            )
          })}
        </div>
      )}
    </Container>
  );
}

export default MyBookingsPage;