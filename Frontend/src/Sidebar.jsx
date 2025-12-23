import React, { useEffect } from "react";
import "./Sidebar.css";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads, setAllThreads,
    prevChats, setPrevChats,
    setNewChat,
    setPrompt,
    setReply,
    currThreadId,
    setCurrThreadId
  } = React.useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/threads");
      const data = await response.json();

      const filteredData = data.map(thread => ({
        threadId: thread.threadId,
        title: thread.title,   // ✅ FIXED
        lastMessage: thread.messages?.length
          ? thread.messages[thread.messages.length - 1]
          : null
      }));

      setAllThreads(filteredData);
    } catch (err) {
      console.error("Error fetching threads:", err);
    }
  };

  // Fetch on load
  useEffect(() => {
    getAllThreads();
  }, []);

  // Refresh when chats change
  useEffect(() => {
    getAllThreads();
  }, [prevChats]);

  // NEW CHAT handler
  const startNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setPrevChats([]);              // CLEAR SCREEN
    setCurrThreadId(uuidv1());     // ✔ CREATE NEW THREAD ID
  };
  // CHANGE THREAD handler
  const changeThread=async (newThreadId)=>{
    setCurrThreadId(newThreadId);

    try{
      const response = await fetch(`http://localhost:8080/api/threads/${newThreadId}`);
      const data = await response.json();

      setPrevChats(data.messages || []);  // LOAD MESSAGES OF SELECTED THREAD
      setNewChat(false);
      setPrompt("");
      setReply(null);
    }
    catch(err){
      console.error("Error changing thread:", err);
    }

  }

  // DELETE THREAD handler
  const deleteThread=async(threadId)=>{
    try{
      const response=await fetch(`http://localhost:8080/api/threads/${threadId}`,{
        method:'DELETE'
      });
      const data=await response.json();
      console.log(data.message);
      // REFRESH THREADS
      getAllThreads();
      if(threadId===setCurrThreadId){
        // CLEARS CHAT IF DELETED THREAD IS CURRENT
        setPrevChats([]);
        setNewChat(true);
        setPrompt("");
        setReply(null);
      }
    }
    catch(err){
      console.error("Error deleting thread:",err);
    }
  }

  return (
    <section className="sidebar">
      <button onClick={startNewChat} className="new-chat-btn">
        <h2>Sidebar</h2>
        <img src="/src/assets/image.png" alt="gpt logo" />
        <i className="fa-regular fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {allThreads.map(thread => (
          <li key={thread.threadId}>
            <div className="thread-info">
            <p
  onClick={() => changeThread(thread.threadId)}
  className={`thread-title ${thread.threadId === currThreadId ? "highlighted" : ""}`}
>


                {thread.title || "New Chat"}<i class="fa-solid fa-trash delete-icon" onClick={(e)=>{
                  e.stopPropagation()
                  // DELETE THREAD
                  deleteThread(thread.threadId);
                }
                  }></i>
              </p>

              
            </div>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Venkatesh </p>
      </div>
    </section>
  );
}

export default Sidebar;
