import React from 'react';
import './Chat.css';
import { MyContext } from './MyContext.jsx';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

//react-markdown
//rehype-highlight
function Chat() {
  const { newChat, prevChats } = React.useContext(MyContext);

  return (
    <>
      {newChat && <h1>Start a New chat</h1>}

      <div className="chats">
        {prevChats?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]} className="gptMessage">
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Chat;
