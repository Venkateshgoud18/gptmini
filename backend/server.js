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

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

const response = await client.responses.create({
  model: "gpt-4o",

  instructions: 'You are a coding assistant that talks like a pirate',
  input: 'Joke on computer science',
});

console.log(response.choices[0].message.content);




