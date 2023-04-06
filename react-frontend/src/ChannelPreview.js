import React from 'react';
import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ChannelPreview.css';

export const ChannelPreview = ({channelName, createChannel, selectChannel}) => {
    let createNewChannel = channelName === "";

    // Track new channel name
    const [getName, setName] = useState('');

    // Adjust content
    let icon;
    if (createNewChannel) {
        icon = "fa-solid fa-plus"
    }
    else {
        icon = `fa-solid fa-${channelName[0].toLowerCase()}`
    }
    // Handle click based on content
    const handleClick = () => {
        if (createNewChannel) {
            console.log("Creating new");
            createChannel(getName);
        }
        else {
            selectChannel(channelName);
        }
    };
    return (
        <div className='preview-container'>
            <div>
                <button className='channel-button' onClick={handleClick}><FontAwesomeIcon className='channel-icon' icon={icon} /></button>
            </div>
            <div>
                {
                    createNewChannel 
                    ? 
                    <input className='channel-label' type="text" maxLength="80" placeholder="New Channel" value={getName} 
                    onChange={e => setName(e.target.value)} />
                    : 
                    <label className='channel-label'>{channelName}</label>
                }
            </div>
        </div>
    );
}