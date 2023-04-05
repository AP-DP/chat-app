import React from 'react';
import { ChannelPreview } from './ChannelPreview';

import './ShowChannels.css';

export const ShowChannels = ({channels, setChannelSelection}) => {
    let channelList = [];
    for (let i=0; i< channels.length; i++) {
        let channelData = channels[i];
        let channelPreview = React.createElement(ChannelPreview, {
            channelName: channelData.name, 
            channelLink: channelData.link,
            selectChannel: setChannelSelection
        });
        channelList.push(channelPreview);
    }
    return (
        <div className='channels-container'>
            {channelList.map(channelPreview => (
                <div className='channel-box' key={channelPreview.props.channelName}>
                    {channelPreview}
                </div>
            ))}
        </div>
    );
}