import React from 'react';
import {useState} from 'react';

import './Login.css';

export const Login = ({verifyUser, createUser, setUser}) => {

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const processUser = (firstTimeUser) => {
        let email = getEmail;
        let pwd = getPassword; 
        if (email.length === 0 || pwd.length === 0) {
            alert("Please ensure both email and password fields have been filled in.")
        }
        else {
            // Send data to be checked by db
            verifyUser(email, pwd).then((validUser) => {
                let proceed = false;
                if (firstTimeUser) {
                    if (validUser) {
                        // Not actually a first time user
                        alert("This account already exists, please log in instead.");
                    }
                    else {
                        createUser(email, pwd);
                        proceed = true;
                    }
                }
                // Logging in
                else {
                    if (validUser) {
                        proceed = true;
                    }
                    else {
                        alert("Please try again: login credentials not recognized.");
                    }
                }
                if (proceed) {
                    // Use local storage or local session to store credentials
                    if (isChecked) {
                        // Keep user logged in
                        localStorage.setItem('channelChatUser', true)
                    }
                    else {
                        // Only keep logged in for session
                        sessionStorage.setItem('channelChatUser', true);
                    }
                    setUser(true);
                }
            });
        }
    }
    
    return (
        <div className='login-container'>
            <h3 className='login-title'> Log In </h3>
            <form>
                <div className='login-inputs'>
                    <label htmlFor="getEmail">Email: </label>
                    <input type="text" maxLength="254" placeholder="email@gmail.com" value={getEmail} 
                    onChange={e => setEmail(e.target.value)} /><br/>
                    <label htmlFor="getPassword">Password: </label>
                    <input type="text" maxLength="64" placeholder="*******" value={getPassword} 
                    onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='login-inputs' >
                    <input type="checkbox" id="persistantLogin" name="persistantLogin" value="persistant" checked={isChecked} onChange={handleCheckboxChange} />I would like to stay signed in.
                </div>
                <div className='login-buttons'>
                    <button onClick={(e) => {
                        processUser(false);
                    }}> Log In</button>
                    <button onClick={(e) => {
                        processUser(true);
                    }}> Sign Up</button>
                </div>
            </form>
        </div>
    );
}