import React from 'react';
import { Link } from "react-router-dom";

import './Navbar.css';

export const Navbar = () => {
    return (
        <div className='topnav'>
            <Link className='navbar-button' to="/">Landing</Link>
            <Link className='navbar-button' to="/">Logout</Link>
        </div>
    );
}