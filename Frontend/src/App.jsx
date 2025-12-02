import { useState } from 'react'

import Sidebar from './Sidebar.jsx'
import ChatWindow from './ChatWindow.jsx'
import './App.css'
import { MyContext } from './MyContext.jsx';

function App() {
  const providerValues = {};

  return (
    
    
      <div className="app">
        <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
        </MyContext.Provider>
      </div>
      
    
  )
}

export default App
