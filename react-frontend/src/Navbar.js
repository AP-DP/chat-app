import React from 'react';
import { Link } from "react-router-dom";

import './Navbar.css';

export const Navbar = ({setUser, setChannelSelection}) => {
    // Return to landing page
    const changeChannelSelection = () => {
        setChannelSelection("");
    }
    // Logout user
    const handleLogout = () => {
        setUser(false);
        localStorage.clear();
        sessionStorage.clear();
    };
    return (
        <div className='topnav'>
            {/* <Link to="/"> */}
                <button className='navbar-button' onClick={changeChannelSelection}>Landing</button>
            {/* </Link>
            <Link to="/"> */}
                <button className='navbar-button' onClick={handleLogout}>Logout</button>
            {/* </Link> */}
        </div>
    );
}