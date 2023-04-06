import React from 'react';

import './Channel.css';
import './MessageInput'

import { Message } from "./Message";
import { MessageInput } from './MessageInput';

export const Channel = ({name, posts, addMessage}) => {

    let messages = [
        {
            author: "Test1 Author", 
            message: "Test1 Message", 
            timestamp: "Test1 Timestamp"
        },
        {
            author: "Test2 Author", 
            message: "Test2 Message", 
            timestamp: "Test2 Timestamp"
        }
    ];

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
                <MessageInput addMessage={addMessage}/>
            </div>
            {messages.map(messageData=> (
                React.createElement(Message, {
                    author: messageData.author, 
                    message: messageData.content, 
                    timestamp: messageData.timestamp
                })
            ))}
        </>
    );
}
