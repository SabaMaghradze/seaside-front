import React, { useEffect, useState } from 'react'
import { deleteBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions';
import moment from 'moment';

const FindMyBooking = () => {

    const [confirmationCode, setConfirmationCode] = useState("");
    const [error, setError] = useState("");
    const [succMsg, setSuccMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [booking, setBooking] = useState({
        bookingId: "",
        room: {id: ""},
        confirmationCode: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numOfAdults: "",
        numOfChildren: "",
        totalGuests: ""
    });

    function handleInputChange(e) {
        setConfirmationCode(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccMsg("");
        try {
            const data = await getBookingByConfirmationCode(confirmationCode);
            setBooking(data);
        } catch (error) {
            if (error.response && error.response.status == 404) {
                setError(error.response.data.message);
            } else {
                setError(error.response);
            }
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
        setIsLoading(false);
    }

    async function handleBookingCancellation(bookingId) {
        try {
            await deleteBooking(bookingId);
            setConfirmationCode("");
            setError("");
            setSuccMsg("Booking has been cancelled successfully!");
            setBooking({
                bookingId: "",
                room: { id: "" },
                confirmationCode: "",
                checkInDate: "",
                checkOutDate: "",
                guestFullName: "",
                guestEmail: "",
                numOfAdults: "",
                numOfChildren: "",
                totalGuests: ""
            })
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <div className='container mt-5 d-flex flex-column text-start'>
                <h2>Find booking</h2>
                <form onSubmit={handleSubmit} className='col-md-6'>
                    <div className='input-group'>
                        <input type="text" className='form-control' id='confirmationCode' name='confirmationCode' value={confirmationCode} onChange={handleInputChange} placeholder='Enter confirmation code' />
                        <button className='btn btn-hotel input-group-text'>Find Booking</button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <h3 className='text-daner mt-3'>{error}</h3>
                ) : succMsg ? (
                    <h3 className='text-success mt-3'>{succMsg}</h3>
                ) : (
                    <div className='col-md-6 mt-4 mb-5'>
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {booking.confirmationCode}</p>
                        <p>Room Number: {booking.room.id}</p>
                        <p>Room Type: {booking.room.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(booking.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {booking.guestName}</p>
                        <p>Email Address: {booking.guestEmail}</p>
                        <p>Adults: {booking.numOfAdults}</p>
                        <p>Children: {booking.numOfChildren}</p>
                        <p>Total Guest: {booking.totalGuests}</p>
                        <button className='btn btn-danger' onClick={() => handleBookingCancellation(booking.bookingId)}>Cancel</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default FindMyBooking







