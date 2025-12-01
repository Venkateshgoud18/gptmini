import express from 'express';
const router = express.Router();
import Thread from '../models/Thread.js';

router.post("/chat",async(req,res)=>{
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
export default router;