import React from 'react';

import './Dashboard.css';

import { Navbar } from './Navbar';
import { Landing } from './Landing';
import { ShowChannels } from './ShowChannels';
import { Channel } from './Channel';

export const Dashboard = ({getChannels}) => {
    return (
        <div className='dashboard'>
            <Navbar/>
            <Landing/>
            <ShowChannels channels={getChannels}/>
            {/* <Route path="/channelTest" element={<Channel name={"test"}/>} /> */}
        </div>
    );
}