import React from 'react';
import {useState} from 'react';

import './Channel.css';

import { Message } from "./Message";

export const Channel = ({name, posts}) => {

    const [getMessage, setMessage] = useState('');

    let messages = [];

    for (let i=0; i< posts.length; i++) {
        let messageData = posts[i];
        let message = React.createElement(Message, {
            author: messageData.author, 
            message: messageData.content, 
            timestamp: messageData.timestamp
        });
        messages.push(message);
    }

    return (
        <>
            <h3 className='channel'> {name}: </h3>
            <div>

            </div>
            <div>
                <input type="text" maxLength="80" placeholder="Message" value={getMessage} 
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
                    setMessage(message)
                    // Reset input fields
                    setMessage("")
                }
            }}> Submit</button>
        </>
    );
}
