import React from 'react';
import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Message.css';
import './MessageInput'
import { MessageInput } from './MessageInput';

export const Message = ({channel, id, root, parent, author, message, timestamp, addMessage}) => {

    const [isReplying, setReplying] = useState(false);

    // Handle clicks
    const handleReply = () => {
        setReplying(!isReplying);
    };

    return (
        <div className='message-container'>
            <h1>{author}</h1>
            <p>{message}</p>
            <p>{timestamp}</p>
            <button className='message-button reply-button' onClick={handleReply}><FontAwesomeIcon className='message-icon' icon="fa-reply" /></button>
            { isReplying && <MessageInput addMessage={addMessage} source={id} channel={channel}/> }
        </div>
    );
}
