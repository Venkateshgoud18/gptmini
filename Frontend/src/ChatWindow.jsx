import React, { useState, useContext } from 'react';
import './ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import ScaleLoader from "react-spinners/ScaleLoader";
import { Navigate, useNavigate } from "react-router-dom";


function ChatWindow() {
  const {
    prompt, setPrompt,
    currThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
  } = useContext(MyContext);

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;
  
    // show user message instantly
    setPrevChats(prev => [
      ...prev,
      { role: "user", content: prompt }
    ]);
  
    setNewChat(false);
    const userPrompt = prompt;
    setPrompt("");
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userPrompt,
          threadId: currThreadId
        })
      });
  
      const data = await response.json();
  
      if (data.error) {
        setPrevChats(prev => [
          ...prev,
          { role: "gpt", content: "⚠️ " + data.error.message }
        ]);
      } else {
        setPrevChats(prev => [
          ...prev,
          { role: "gpt", content: data.reply }
        ]);
      }
    } catch (err) {
      setPrevChats(prev => [
        ...prev,
        { role: "gpt", content: "⚠️ Backend error" }
      ]);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>SigmaGpt <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv"
           onClick={() => setIsOpen(prev => !prev)}>
  <i className="fa-solid fa-user"></i>
</div>

        {
          isOpen && (
            <div className="dropdownMenu">
              <p onClick={()=>navigate("/profile")}>User Profile <i class="fa-solid fa-user"></i></p>
              <p onClick={()=>navigate("/settings")}>Settings <i class="fa-solid fa-gear"></i></p>
              <p onClick={() => window.location.href = "/upgrade"}>Upgrade plan <i class="fa-solid fa-arrow-up-from-bracket"></i></p>
              <p onClick={() => navigate("/signup")} className="login-btn">
  Signup <i className="fa-solid fa-right-from-bracket"></i></p>
            </div>
          )
        }
      </div>

      <div className="chat">
        <Chat />
        <ScaleLoader color="#36d7b7" loading={loading} className="loader" />
      </div>

      <div className="chatInput">
        <div className="inputRow">
          <input
            type="text"
            placeholder="Ask Anything.."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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
