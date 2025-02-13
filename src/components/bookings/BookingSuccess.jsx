import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"

const BookingSuccess = () => {
	
	const location = useLocation()
	const succMsg = location.state?.message
	const errorMsg = location.state?.errorMsg

	return (
		<div className="container">
			<Header title="Booking Success" />
			<div className="mt-5">
				{succMsg && (
					<div>
						<h3 className="text-success"> Booking Success!</h3>
						<p className="text-success">{succMsg}</p>
					</div>
				)}
				{errorMsg && (
					<div>
						<h3 className="text-danger"> Failed to book the room!</h3>
						<p className="text-danger">{errorMsg}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default BookingSuccess