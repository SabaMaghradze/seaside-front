import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/Logout';
import { AuthContext } from '../auth/AuthProvider';

const Navbar = () => {

    const [showAccount, setShowAccount] = useState(false);

    const handleShowAcc = () => {
        setShowAccount(!showAccount);
    }

    const { user } = useContext(AuthContext);
    const isLoggedIn = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>

            <div className='container-fluid'>
                <Link to={"/"} className='navbar-brand'>
                    <span className='hotel-color'>Seaside Hotel</span>
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarScroll'
                    aria-controls='navbarScroll'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarScroll'>

                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <Link className='nav-link' aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </Link>
                        </li>
                        {isLoggedIn && userRole == "ROLE_ADMIN" && (
                            <li className='nav-item'>
                                <NavLink className='nav-link' aria-current="page" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <Link className='nav-link' to={"/find-booking"}>
                                Find my booking
                            </Link>
                        </li>
                        <li className='nav-item dropdown'>
                            <a className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href='#'
                                role='button'
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleShowAcc}>
                                {" "}
                                Account
                            </a>
                            <ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
                                aria-labelledby='navbarDropdown'>
                                {isLoggedIn ? (
                                    <li>
                                        <Logout />
                                    </li>
                                ) : (
                                    <li>
                                        <Link to={"/login"} className='dropdown-item'>
                                            Login
                                        </Link>
                                    </li>
                                )}                
                            </ul>
                        </li>
                    </ul>

                </div>

            </div>

        </nav>
    )
}

export default Navbar