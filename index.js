import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Agent, tool, run, webSearchTool, handoff } from "@openai/agents";
import path from "path";
import { fileURLToPath } from "url";
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
const app = express();

let messages = []

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'))


const personalAssistant = new Agent({
    name: 'Personal Assistant',
    instructions: 'You are a personal assistant that can help with tasks related to the user.',
    model: 'gpt-4o-mini',
    tools: [webSearchTool()],
    outputType:z.object({
        message:z.string(),
        followUpQuestions:z.array(z.string().describe('Follow up questions what user can ask next')),
    })
})

const paymentAgent = new Agent({
    name: 'Payment Agent',
    instructions: 'You are a payment agent that can help with tasks related to the user.',
    model: 'gpt-4o-mini',
    outputType:z.object({
        amount:z.number(),
        currency:z.string()
    })
})

app.post('/api/ask', async (req, res) => {
    try {
        const { message } = req.body;
        if(message.trim().toLowerCase() === 'reset'){
            messages = []
            return res.json({type:'reset', message: 'Messages reset successfully' }, { status: 200 })
        }
        const result = await run(personalAssistant, messages.concat({ role: 'user', content: message }))
        messages = result.history
        return res.json( {type:'response',data:messages[messages.length - 1]} , { status: 200 })
    } catch (error) {
        console.log(error)
        return res.json({ error: error.message }, { status: 500 })
    }


})
app.get('/api/messages', async (req, res) => {
    try {
        return res.json({ data: messages }, { status: 200 })
    } catch (error) {
        return res.json({ error: error.message }, { status: 500 })
    }


})
app.use('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000')
})