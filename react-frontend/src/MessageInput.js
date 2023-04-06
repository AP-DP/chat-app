import React from 'react';
import {useState} from 'react';

import './Message.css';

export const MessageInput = ({channel, source, addMessage}) => {

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
                    let isRoot = 0;
                    if (source === 0) {
                        // Messages generated here will be root messages
                        isRoot = 1;
                    }
                    let userName = "TestUser"
                    // Get date and time
                    let timestamp = new Date();
                    let reformattedDate = timestamp.toISOString();
                    let shortenedDate = reformattedDate.slice(0, 10)+ " " + reformattedDate.slice(11, 16)
                    addMessage(channel, isRoot, source, userName, message, shortenedDate)
                    // Reset input fields
                    setMessage("")
                }
            }}> Submit</button>
        </>
    );
}