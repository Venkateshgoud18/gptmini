import OpenAI from 'openai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/chat', async (req, res) => { 
  const options={
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: "Hello, how are you?"
      }]
    })
  }
  try{
    const response=await fetch('https://api.openai.com/v1/chat/completions',options);
    const data=await response.json();
    res.json(data);
    console.log(data);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


