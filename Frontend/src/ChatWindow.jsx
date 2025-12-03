import React from 'react';
import './ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply,currThreadId,setCurrThreadId } = React.useContext(MyContext);


  const getReply = async() => {
    const options={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        message: prompt,
        threadId:currThreadId
      } )
    };
    try {
      const response = await fetch('http://localhost:8080/api/chat',options);
      const data = await response.json();
      setReply(data.reply);
      setPrompt("");
      console.log("Reply received:", data.reply);
    }
    catch(err){
      console.error("Error fetching reply:", err);
    }
    
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>SigmaGpt <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv"><i className="fa-solid fa-user"></i></div>
      </div>

      <div className="chat">
        <Chat />
      </div>

      <div className="chatInput">
        <div className="inputRow">
          <input 
            type="text" 
            placeholder="Ask Anything.." 
            value={prompt} 
            onChange={(e)=>setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getReply();
              }
            }}
          />

          <button id="sendButton" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>

        <p className="info">SigmaGpt can make mistakes</p>
      </div>

    </div>
  );
}

export default ChatWindow;
