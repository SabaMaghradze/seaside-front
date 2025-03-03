import React, { useState } from 'react'
import { register } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const Registration = () => {

    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleInputChange(e) {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            const result = await register(registration);
            setSuccessMessage("Registration successful!");
            setError("");
            setRegistration({ firstName: "", lastName: "", email: "", password: "" });
        } catch (error) {
            setSuccessMessage("");
            setError(error.message);
        };

        setTimeout(() => {
            setError("");
            setSuccessMessage("");
        }, 3000);
        
    }

    return (
		<section className="container col-6 mt-5 mb-5">
            
			{error && <p className="alert alert-danger">{error}</p>}
			{successMessage && <p className="alert alert-success">{successMessage}</p>}

			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3 row">
					<label htmlFor="firstName" className="col-sm-2 col-form-label">
						first Name
					</label>
					<div className="col-sm-10">
						<input
							id="firstName"
							name="firstName"
							type="text"
							className="form-control"
							value={registration.firstName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="lastName" className="col-sm-2 col-form-label">
						Last Name
					</label>
					<div className="col-sm-10">
						<input
							id="lastName"
							name="lastName"
							type="text"
							className="form-control"
							value={registration.lastName}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div className="mb-3">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Register
					</button>
					<span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/login"}>Login</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Registration