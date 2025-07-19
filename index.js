import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Agent, tool, run, webSearchTool, handoff } from "@openai/agents";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const personalAssistant = new Agent({
    name: 'Personal Assistant',
    instructions: 'You are a personal assistant that can help with tasks related to the user.',
    model: 'gpt-4o-mini',
    tools:[webSearchTool()]
})

app.post('/api/ask',async(req,res)=>{
    try {
        const {message} = req.body;
        const result = await run(personalAssistant, message)
        return res.json({response:result.finalOutput}, {status:200})
    } catch (error) {
        return res.json({error:error.message}, {status:500})
    }
   
})  

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})