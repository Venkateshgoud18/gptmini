import express from 'express';
const router = express.Router();
import Thread from '../models/Thread.js';
import getOpenAIAPIResponce from '../utils/openai.js';

router.post("/test",async(req,res)=>{
    try{
        const thread=new Thread({
            threadId:"test123",
            title:"Test New Thread",
            messages:[{role:"user",content:"Hello, how are you?"}]
        });
        const response=await thread.save();
        res.send(response);
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

//get all threads
router .get("/threads",async(req,res)=>{
    try{
        const threads=await Thread.find({}).sort({updatedAt:-1});
        res.json(threads);
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
})

//get a specific thread by threadId
router.get("/threads/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
        const thread=await Thread.findOne({threadId});
        if(!thread){
            return res.status(404).json({error:'Thread not found'});
        }
        res.json(thread.messages);
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});
//delte a thread by threadId
router.delete("/threads/:threadId",async(req,res)=>{
    const {threadId}=req.params;
    try{
        const result=await Thread.findOneAndDelete({threadId});
        if(result.deletedCount===0){
            return res.status(404).json({error:'Thread not found'});
        }
        res.json({message:'Thread deleted successfully'});
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});
//post a new message to a thread
router.post("/chat", async (req, res) => {
    console.log("🔥 /api/chat HIT!");
  
    const { threadId, message } = req.body;
    console.log("Received body:", req.body);
  
    if (!threadId || !message) {
      return res.status(400).json({ error: "threadId and message are required" });
    }
  
    try {
      let thread = await Thread.findOne({ threadId });
      console.log("Thread found:", !!thread);
  
      if (!thread) {
        console.log("Creating new thread...");
        thread = new Thread({
          threadId,
          title: message,
          messages: []
        });
      }
  
      console.log("Adding USER message:", message);
      thread.messages.push({ role: "user", content: message });
  
      let assistantReply = "";
  
      try {
        console.log("Calling GPT...");
        try {
            const apiResponse = await getOpenAIAPIResponce(message);
          
            // If the API returned an object, convert to string
            assistantReplay = 
              typeof apiResponse === "string"
                ? apiResponse
                : JSON.stringify(apiResponse);
          
          } catch (err) {
            console.log("GPT ERROR:", err.message);
            assistantReplay = "⚠️ GPT unavailable";
          }
          
      } catch (err) {
        console.log("GPT ERROR:", err.message);
        assistantReply = "⚠️ GPT unavailable";
      }
  
      console.log("Adding assistant reply:", assistantReply);
      thread.messages.push({ role: "assistant", content: assistantReply });
  
      console.log("Saving thread to DB...");
      await thread.save();
  
      console.log("Thread saved successfully!");
      res.json({ reply: assistantReply });
  
    } catch (err) {
      console.log("🔥 SERVER ERROR in /api/chat:", err);
      res.status(500).json({ error: err.message || "Server error" });
    }
  });
  
  
export default router;