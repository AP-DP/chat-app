import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { Landing } from './Landing';
import { Channel } from './Channel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Router>
            <Link to="/channelTest">  <button onClick={() => console.log("Channel Test")}> Show Channel X </button> </Link>
            <Routes>
              <Route exact path='/' element={<Landing/>} />
              <Route path="/channelTest" element={<Channel name = {"test"}/>} />
            </Routes>
          </Router>
        </div>
      
      </header>
    </div>
  );
}

export default App;
