import React, { useState, useContext } from 'react';
import './ChatWindow.css';
import Chat from './Chat.jsx';
import { MyContext } from './MyContext.jsx';
import ScaleLoader from "react-spinners/ScaleLoader";

function ChatWindow() {
  const {
    prompt, setPrompt,
    currThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    // 1️⃣ Add user message instantly
    setPrevChats(prev => [
      ...prev,
      { role: "user", content: prompt }
    ]);

    setNewChat(false);       // hide "Start a new chat"
    const userPrompt = prompt;
    setPrompt("");           // clear input
    setLoading(true);        // show loader

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          threadId: currThreadId,
        })
      });

      const data = await response.json();

      // 2️⃣ Add GPT reply or error message
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
      // 3️⃣ Backend failed
      setPrevChats(prev => [
        ...prev,
        { role: "gpt", content: "⚠️ Backend error: Could not reach server." }
      ]);

    }

    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>SigmaGpt <i className="fa-solid fa-chevron-down"></i></span>
        <div className="userIconDiv"><i className="fa-solid fa-user"></i></div>
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
