import React, { useEffect, useState } from "react"
import { deleteUserById, getBookingsByUserId, getUserProfile } from "../utils/ApiFunctions"
import { useNavigate } from "react-router-dom"
import moment from "moment"

const Profile = () => {

    const [user, setUser] = useState({
		id: "",
		email: "",
		firstName: "",
		lastName: "",
		roles: [{ id: "", name: "" }]
	})

	const [bookings, setBookings] = useState([
		{
			id: "",
			room: { id: "", roomType: "" },
			checkInDate: "",
			checkOutDate: "",
			bookingConfirmationCode: ""
		}
	])

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const navigate = useNavigate()

	const userId = localStorage.getItem("userId")
	const token = localStorage.getItem("token")

	useEffect(() => {
		getUserProfile(userId, token)
			.then((data) => {
				setUser(data);
			})
			.catch((error) => {
				console.log(error);
			})
	}, [userId])

	useEffect(() => {
		getBookingsByUserId(userId, token)
			.then((data) => {
				setBookings(data);
			})
			.catch((error) => {
				console.log(error.message);
			})
	})



    return (
        <div>Profile</div>
    )
}

export default Profile