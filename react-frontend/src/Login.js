import React from 'react';
import {useState} from 'react';

export const Login = ({verifyUser}) => {

    const [getEmail, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    
    return (
        <>
            <h3> Log In </h3>
            <div>
                <input type="text" maxLength="254" placeholder="Email:" value={getEmail} 
                onChange={e => setEmail(e.target.value)} /><br/>
                <input type="text" maxLength="64" placeholder="Password:" value={getPassword} 
                onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="checkbox" id="persistantLogin" name="persistantLogin" value="persistant" checked={isChecked} />I would like to stay signed in.
            <button onClick={(e) => {
                let email = getEmail;
                let pwd = getPassword; 
                if (email.length === 0 || pwd.length === 0) {
                    alert("Please ensure both email and password fields have been filled in.")
                }
                else {
                    // Send data to be checked by db
                    verifyUser(email, pwd)
                    // TODO: get result and handle
                    // TODO: Use local storage or local session to store credentials
                }
            }}> Submit</button>
        </>
    );
}