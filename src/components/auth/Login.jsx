import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Form, FormControl } from 'react-bootstrap';
import { loginUser } from '../utils/ApiFunctions';

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
	const auth = useAuth();
	const location = useLocation();
	const redirectUrl = location.state?.path || "/";
    
    function handleInputChange(e) {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {

		e.preventDefault();

		try {
			const data = await loginUser(login);

			if (data) {
				const token = data.token;
				auth.handleLogin(token);
				navigate(redirectUrl, { replace: true });
				// window.location.reload();
			} 
			
		} catch (error) {
			setErrorMessage("Invalid username or password, please try again.");
		}

        setTimeout(() => {
            setErrorMessage("")
        }, 4000);
    }

    return (
        <section className="container col-6 mt-5 mb-5">

            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			<h2>Login</h2>

            <Form onSubmit={handleSubmit}>
				<Form.Group className="row mb-3">
					<Form.Label htmlFor="email" className="col-form-label text-start">
						Email
					</Form.Label>
					<div>
						<FormControl
							required
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
							onChange={handleInputChange}
						/>
					</div>
				</Form.Group>

				<Form.Group className="row mb-3">
					<Form.Label htmlFor="password" className="text-start">
						Password
					</Form.Label>
					<div>
						<FormControl
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
						/>
					</div>
				</Form.Group>

				<div className="mb-3 text-start">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Login
					</button>
					<span style={{ marginLeft: "10px" }}>
						Don't have an account yet?<Link to={"/register"}> Register</Link>
					</span>
				</div>
			</Form>

        </section>
    )
}

export default Login