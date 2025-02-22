import React, { useEffect, useState } from 'react'
import { deleteBooking, getAllBookings } from '../utils/ApiFunctions'
import Header from '../common/Header'
import BookingsTable from './BookingsTable'

const Bookings = () => {

  const [bookingsInfo, setBookingsInfo] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      getAllBookings()
        .then((data) => {
          setBookingsInfo(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(`error occurred while fetching bookings: ${error.message}`)
          setIsLoading(false);
        })
    }, 2000)
  }, []);

  async function handleBookingCancellation(bookingId) {
    try {
      await deleteBooking(bookingId);
      const renewedData = await getAllBookings();
      setBookingsInfo(renewedData);
    } catch (error) {
      setError(`error occurred while cancelling the booking: ${error.message}`)
    }
  }

  return (
    <section style={{ backgroundColor: "whitesmoke" }}>
      <Header title={"Existing Bookings"} />
      {error && <div className='text-danger'>{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable bookingsInfo={bookingsInfo} handleBookingCancellation={handleBookingCancellation} />
      )}
    </section>
  )
}

export default Bookings