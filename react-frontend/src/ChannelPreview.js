import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './ChannelPreview.css';

export const ChannelPreview = ({channelName, channelLink}) => {
    // Adjust content
    let icon;
    if (channelName === "") {
        icon = "fa-solid fa-plus"
    }
    else {
        icon = `fa-solid fa-${channelName[0].toLowerCase()}`
    }
    return (
        <button className="channel-button"><FontAwesomeIcon icon={icon} /></button>
    );
}