import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns';
import DateSlider from '../common/DateSlider'

const BookingsTable = ({ bookingsInfo, handleBookingCancellation }) => {

    const [filteredBookings, setFilteredBookings] = useState(bookingsInfo);

    function filterBookings(startDate, endDate) {
        let filtered = bookingsInfo
		if (startDate && endDate) {
			filtered = bookingsInfo.filter((booking) => {
				const bookingStartDate = parseISO(booking.checkInDate)
				const bookingEndDate = parseISO(booking.checkOutDate)
				return (
					bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
				)
			})
		}
		setFilteredBookings(filtered)
    }

    useEffect(() => {
        setFilteredBookings(bookingsInfo);
    }, [bookingsInfo]);


    return (
        <section className='p-4 text-start'>
            <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
            <table className='table table-bordered table-hover shadow'>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Booking ID</th>
                        <th>Room ID</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Guest Name</th>
                        <th>Guest Email</th>
                        <th>Number of Adults</th>
                        <th>Number of Children</th>
                        <th>Total Guests</th>
                        <th>Confirmation Code</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {filteredBookings.map((booking, index) => (
                        <tr key={booking.bookingId}>
                            <td>{index + 1}</td>
                            <td>{booking.bookingId}</td>
                            <td>{booking.room.id}</td>
                            <td>{booking.checkInDate}</td>
                            <td>{booking.checkOutDate}</td>
                            <td>{booking.guestFullName}</td>
                            <td>{booking.guestEmail}</td>
                            <td>{booking.numOfAdults}</td>
                            <td>{booking.numOfChildren}</td>
                            <td>{booking.totalGuests}</td>
                            <td>{booking.confirmationCode}</td>
                            <button className='btn btn-danger btn-sm' onClick={() => handleBookingCancellation(booking.bookingId)}>
                                Cancel
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredBookings.length <= 0 && <h5>No bookings found</h5>}
        </section>
    )
}

export default BookingsTable