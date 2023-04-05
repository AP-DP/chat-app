import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ChannelPreview.css';

export const ChannelPreview = ({channelName, channelLink, selectChannel}) => {
    // Adjust content
    let icon;
    if (channelName === "") {
        icon = "fa-solid fa-plus"
    }
    else {
        icon = `fa-solid fa-${channelName[0].toLowerCase()}`
    }
    return (
        <div className='preview-container'>
            <div>
                <button className='channel-button' onClick={() => selectChannel(channelName)}><FontAwesomeIcon className='channel-icon' icon={icon} /></button>
            </div>
            <div>
                <label className='channel-label'>{channelName}</label>
            </div>
        </div>
    );
}