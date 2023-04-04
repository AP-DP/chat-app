import React from 'react';

import './Channel.css';

export const Channel = ({name}) => {
    return (
        <h2 className='channel'> {name}: </h2>
    );
}