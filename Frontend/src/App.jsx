import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './Sidebar.jsx'
import ChatWindow from './ChatWindow.jsx'
import UpgradePage from './upgrade.jsx';
import Login from './login.jsx';   // ← DIRECT LOGIN PAGE
import Signup from './signup.jsx';
import UserProfile from './profile.jsx';

import './App.css'
import { MyContext } from './MyContext.jsx';
import { v1 as uuidv1 } from 'uuid';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, setAllThreads
  };

  return (
    <Router>
      <MyContext.Provider value={providerValues}>

        <Routes>

          {/* main app */}
          <Route path="/" element={
            <div className="app">
              <Sidebar />
              <ChatWindow />
            </div>
          } />

          <Route path="/upgrade" element={<UpgradePage />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/profile" element={<UserProfile />} />




          

        </Routes>

      </MyContext.Provider>
    </Router>
  );
}

export default App;
