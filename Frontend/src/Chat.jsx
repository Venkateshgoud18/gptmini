import React, { useState, useEffect } from "react";
import "./Chat.css";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats } = React.useContext(MyContext);
  const [latestReply, setLatestReply] = useState("");

  useEffect(() => {
    if (!prevChats || prevChats.length === 0) return;

    const last = prevChats[prevChats.length - 1];

    // Run typing animation ONLY for GPT messages
    if (last.role !== "gpt") return;

    const words = last.content.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, idx + 1).join(" "));
      idx++;
      if (idx >= words.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [prevChats]);

  return (
    <>
      {newChat && <h1>Start a New chat</h1>}

      <div className="chats">
        {/* Render all messages except last */}
        {prevChats?.slice(0, -1).map((chat, idx) => (
          <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
          <div className={chat.role === "user" ? "userMessage" : "gptMessage"}>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {chat.content}
            </ReactMarkdown>
          </div>
        </div>
        
        ))}

        {/* Animated GPT message */}
        {prevChats && prevChats.length > 0 && (
          <div className="gptDiv">
          <div className="gptMessage">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {latestReply}
            </ReactMarkdown>
          </div>
        </div>
        
        )}
      </div>
    </>
  );
}

export default Chat;
