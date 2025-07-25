import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import styles from './BookingForm.module.css';

function BookingForm({ service, onBookingSuccess }) {
  const { t, i18n } = useTranslation();
  const { token } = useAuth();

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  };

  const [selectedDate, setSelectedDate] = useState(getTomorrow());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;
      const dateString = selectedDate.toISOString().split('T')[0];
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/available-slots?date=${dateString}`);
        const data = await response.json();
        setAvailableSlots(data);
        setSelectedSlot(null);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (!selectedSlot) return alert('Please select a time slot.');

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token },
            body: JSON.stringify({
                service_id: service.id,
                service_name: service.name[i18n.language] || service.name.en,
                slot_id: selectedSlot.id,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            setMessage(t('Booking created successfully!'));
            onBookingSuccess();
        } else {
            setMessage(data.message);
        }
    } catch (error) {
        setMessage("Booking failed. Please try again.");
    }
  };

  return (
    <div className={styles.bookingContainer}>
      <h4>{t('Book')} "{service.name[i18n.language] || service.name.en}"</h4>
      <div className={styles.datePickerGroup}>
        <strong>{t('Select Date')}:</strong>
        <DatePicker 
            selected={selectedDate} 
            onChange={(date) => setSelectedDate(date)} 
            minDate={getTomorrow()} 
            dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className={styles.slotGroup}>
        <strong>{t('Select Time')}:</strong>
        <div className={styles.slotButtons}>
            {availableSlots.length > 0 ? availableSlots.map(slot => {
              const localTime = new Date(slot.time).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false });
              return (
                <button 
                    key={slot.id} 
                    onClick={() => setSelectedSlot(slot)} 
                    className={selectedSlot?.id === slot.id ? styles.selected : ''}
                >
                    {localTime}
                </button>
              )
            }) : <p>{t('No available slots for this date.')}</p>}
        </div>
      </div>
      <button onClick={handleBooking} disabled={!selectedSlot} className={styles.confirmButton}>
        {t('Confirm Booking')}
      </button>
      {message && <p>{t(message)}</p>}
    </div>
  );
}
export default BookingForm;