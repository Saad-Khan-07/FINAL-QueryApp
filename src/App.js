import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import QueryCards from './components/QueryCards';
import Footer from './components/Footer';
import Complain from './components/Complain';
import ComplaintTracker from './components/ComplaintTracker';
import Login from './components/Login';
import PastQueries from './components/PastQueries'
import Chatbot from './components/ChatBot';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {

  const [isAuthenticated, setAuthenticated]= useState(false);

  const AllowDashboard= ()=>{
    setAuthenticated(true);
  }

  return (
    <Router>
    <div className="App">
      <Navbar/>
      {isAuthenticated && <Chatbot />}
      <Routes>
        <Route path="/" element= {isAuthenticated?<QueryCards/>:<Login allowDashboard={AllowDashboard}/>} />
        <Route path="/complaints" element= {isAuthenticated?<Complain/>:<Login allowDashboard={AllowDashboard}/>} />
        <Route path="/complainttracker" element= {isAuthenticated?<ComplaintTracker/>:<Login allowDashboard={AllowDashboard}/>} />
        <Route path="/PastQueries" element= {isAuthenticated?<PastQueries/>:<Login allowDashboard={AllowDashboard}/>} />
      </Routes>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;