import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getDB } from './services/DataService';
import { verifyUser, addUser } from './services/UserService';

import { Login } from './Login';
import { Landing } from './Landing';
import { Channel } from './Channel';
import { ChannelPreview } from './ChannelPreview';

// Icons
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Router>
            <Link to="/channelTest">  <button onClick={() => console.log("Channel Test")}> Show Channel X </button> </Link>
            <Routes>
              {/* <Route exact path='/' element={<Landing/>} /> */}
              <Route exact path='/' element={<ChannelPreview channelName={"A"} channelLink={"/"}/>} />
              <Route path="/channelTest" element={<Channel name={"test"}/>} />
            </Routes>
          </Router>
        </div>
      
      </header>
    </div>
  );
}

export default App;
