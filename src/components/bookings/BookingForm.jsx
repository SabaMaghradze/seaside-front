import React, { useEffect, useState } from 'react'
import { getRoomById, saveBooking } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {

    const [isValidated, setIsValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [roomPrice, setRoomPrice] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfChildren: 0,
        numOfAdults: 0,
    })

    const {roomId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRoomById(roomId)
            .then((data) => {
                setRoomPrice(data.roomPrice);
            }).catch((error) => {
                console.log(error);
            })
    }, [roomId]);

    useEffect(() => {
        calculatePayment()
            .then((data) => {
                setTotalPayment(data);
            }).catch((error) => {
                console.log(error);
            })
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setBooking((prev) => ({ ...prev, [name]: value }));
        setErrorMessage("");
    }

    async function calculatePayment() {
        const checkInDate = moment(booking.checkInDate)
		const checkOutDate = moment(booking.checkOutDate)
		const diffInDays = checkOutDate.diff(checkInDate, "days")
		const paymentPerDay = roomPrice ? roomPrice : 0
		const totalPayment = diffInDays * paymentPerDay
        return totalPayment;
    }

    function isGuestValid() {
        const adultCount = parseInt(booking.numOfAdults);
        const childCount = parseInt(booking.numOfChildren);
        const total = adultCount + childCount;
        return total > 0 && adultCount > 0
    }

    function isCheckoutDateValid() {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must come after check-in date");
            return false;
        }
        setErrorMessage("");
        return true;
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestValid() || !isCheckoutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await saveBooking(roomId, booking);
            setIsSubmitted(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            const errorMessage = error.message.replace(/^Error:\s*/, ''); // removes "Error:" prefix from the message;
            navigate("/booking-success", { state: { errorMsg: errorMessage } })
        }
    }

    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h4 className='card-title text-start'>Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>

                                <Form.Group className='text-start'>
                                    <Form.Label htmlFor='guestName' className='hotel-color mt-2'>Full Name: </Form.Label>
                                    <FormControl
                                        required
                                        type='text'
                                        name='guestFullName'
                                        id='guestFullName'
                                        value={booking.guestFullName}
                                        placeholder='Enter your full name'
                                        onChange={handleInputChange} />
                                    <FormControl.Feedback type='invalid'>
                                        Please enter your full name
                                    </FormControl.Feedback>
                                </Form.Group>

                                <Form.Group className='text-start'>
                                    <Form.Label htmlFor='guestEmail' className='hotel-color mt-3'>Email: </Form.Label>
                                    <FormControl
                                        required
                                        type='email'
                                        name='guestEmail'
                                        id='guestEmail'
                                        value={booking.guestEmail}
                                        placeholder='Enter your email'
                                        onChange={handleInputChange} />
                                    <FormControl.Feedback type='invalid'>
                                        Please enter your email
                                    </FormControl.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px", marginTop: "20px" }}>
                                    <legend>Lodging Period</legend>
                                    <div className='row'>

                                        <div className='col-6 text-start'>
                                            <Form.Label htmlFor='checkInDate' className='hotel-color'>Check-in Date: </Form.Label>
                                            <FormControl
                                                required
                                                type='date'
                                                name='checkInDate'
                                                id='checkInDate'
                                                value={booking.checkInDate}
                                                placeholder='Enter check-in date'
                                                onChange={handleInputChange} />
                                            <FormControl.Feedback type='invalid'>
                                                Please enter the check-in date
                                            </FormControl.Feedback>
                                        </div>

                                        <div className='col-6 text-start'>
                                            <Form.Label htmlFor='checkOutDate' className='hotel-color'>Check-out Date: </Form.Label>
                                            <FormControl
                                                required
                                                type='date'
                                                name='checkOutDate'
                                                id='checkOutDate'
                                                value={booking.checkOutDate}
                                                placeholder='Enter check-out date'
                                                onChange={handleInputChange} />
                                            <FormControl.Feedback type='invalid'>
                                                Please enter the check-out date
                                            </FormControl.Feedback>
                                        </div>

                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}

                                    </div>
                                </fieldset>

                                <fieldset style={{ border: "2px", marginTop: "20px" }}>
                                    <legend>Number of guests</legend>

                                    <div className='row'>

                                        <div className='col-6 text-start'>
                                            <Form.Label htmlFor='numOfAdults' className='hotel-color'>Number of adults: </Form.Label>
                                            <FormControl
                                                required
                                                type='number'
                                                name='numOfAdults'
                                                id='numOfAdults'
                                                value={booking.numOfAdults}
                                                min={1}
                                                aria-placeholder='0'
                                                placeholder='Enter the number of adults'
                                                onChange={handleInputChange} />
                                            <FormControl.Feedback type='invalid'>
                                                Please select at least one adult.
                                            </FormControl.Feedback>
                                        </div>

                                        <div className='col-6 text-start'>
                                            <Form.Label htmlFor='numOfChildren' className='hotel-color'>Number of children: </Form.Label>
                                            <FormControl
                                                required
                                                type='number'
                                                name='numOfChildren'
                                                id='numOfChildren'
                                                value={booking.numOfChildren}
                                                placeholder='Enter the number of children'
                                                onChange={handleInputChange} />
                                            <FormControl.Feedback type='invalid'>
                                                Select 0 if no children are present.
                                            </FormControl.Feedback>
                                        </div>

                                    </div>

                                </fieldset>

                                <div className='form-group mt-2 mb-2'>
                                    <button type='submit' className='btn btn-hotel'>Continue</button>
                                </div>

                            </Form>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={totalPayment}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default BookingForm








