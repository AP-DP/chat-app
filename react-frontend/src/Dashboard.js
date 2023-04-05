import React from 'react';

import './Dashboard.css';

import { Navbar } from './Navbar';
import { Landing } from './Landing';
import { ShowChannels } from './ShowChannels';
import { Channel } from './Channel';

export const Dashboard = ({setUser, getChannels, getChannelSelection, setChannelSelection}) => {
    return (
        <div className='dashboard'>
            <Navbar setUser={setUser} setChannelSelection={setChannelSelection}/>
            {getChannelSelection === "" 
            ? 
            <>
            <Landing/>
            <ShowChannels channels={getChannels} setChannelSelection={setChannelSelection}/>
            </>
            :
            <Channel name={getChannelSelection}/>
            }
        </div>
    );
}