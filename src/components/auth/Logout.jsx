import React from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

const Logout = () => {

    const auth = useAuth();

    const navigate = useNavigate();

    function handleLogout() {
        auth.handleLogout();
        navigate("/", { state: { message: "You have been logged out" } });
    }

    const userId = localStorage.getItem("userId");

    return (
        <>
            <li>
                <Link className="dropdown-item" to={`/profile/${userId}`}>
                    Profile
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <button className="dropdown-item" onClick={() => handleLogout()}>
                Logout
            </button>
        </>
    )
}

export default Logout