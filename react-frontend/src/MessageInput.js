import React from 'react';
import {useState} from 'react';

import './Message.css';

export const MessageInput = ({addMessage}) => {

    const [getMessage, setMessage] = useState('');

    return (
        <>
            <div>
                <input type="text" maxLength="4000" placeholder="Message" value={getMessage} 
                onChange={e => setMessage(e.target.value)} /><br/>
            </div>
            <button onClick={(e) => {
                let message = getMessage;
                console.log(message);
                if (message.length === 0) {
                    alert("Please add a message to post.")
                }
                else {
                    // Send data to be added to db
                    addMessage(message)
                    // Reset input fields
                    setMessage("")
                }
            }}> Submit</button>
        </>
    );
}