import React from 'react';

import './Dashboard.css';

import { Navbar } from './Navbar';
import { Landing } from './Landing';
import { ShowChannels } from './ShowChannels';
import { Channel } from './Channel';

export const Dashboard = ({getChannels, getChannelSelection, setChannelSelection}) => {
    return (
        <div className='dashboard'>
            <Navbar/>
            {getChannelSelection === "" 
            ? 
            <>
            <Landing/>
            <ShowChannels channels={getChannels} setChannelSelection={setChannelSelection}/>
            </>
            :
            <Channel name={getChannelSelection}/>
            }
            
            {/* <Route path="/channelTest" element={<Channel name={"test"}/>} /> */}
        </div>
    );
}