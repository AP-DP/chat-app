import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ChannelPreview.css';

export const ChannelPreview = ({channelName, channelLink, selectChannel}) => {
    let createNewChannel = channelName === "";
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
                <label className='channel-label'>{createNewChannel ? "New Channel" : channelName}</label>
            </div>
        </div>
    );
}