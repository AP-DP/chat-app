import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getDB, getChannels } from './services/DataService';
import { verifyUser, addUser } from './services/UserService';

import { Dashboard } from './Dashboard';

// Icons
import {library} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object.keys(Icons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((icon) => Icons[icon]);

library.add(...iconList);

function App() {

  // getDB();

  // Check for logged in user
  const [getUser, setUser] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("channelChatUser");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  // Gather channels for display
  const [getChannels, setChannels] = useState([{name: "Test 1", link: "/"}, {name: "Test 2", link: "/"}]);

  // if (!getUser) {
  //   return <Login verifyUser={verifyUser} createUser={addUser} setUser={setUser}/>
  // }

  return (
    <div className="App">
      <header className="App-header">
        <div className='primary-container'>
          <Router>
            <Routes>
              <Route exact path='/' element={<Dashboard getChannels={getChannels}/>} />
            </Routes>
          </Router>
        </div>
      
      </header>
    </div>
  );
}

export default App;
