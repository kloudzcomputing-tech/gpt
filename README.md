# SUN AI - Personal Assistant

A highly capable, personable, and context-aware personal assistant built with OpenAI Agents and deployed on Cloudflare Workers.

## Features

- 🤖 AI-powered personal assistant
- 📅 Schedule creation and management
- 🔍 Web search capabilities
- 💬 Conversational interface
- ☁️ Cloudflare Workers deployment
- 💾 Persistent chat history with KV storage

## Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account
- OpenAI API key

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the CLI version locally:
```bash
npm start "your message here"
```

## Cloudflare Deployment

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

### 3. Create KV Namespaces

Create KV namespaces for storing chat data:

```bash
# Create production namespace
wrangler kv:namespace create "CHAT_STORAGE" --preview=false

# Create staging namespace  
wrangler kv:namespace create "CHAT_STORAGE" --preview=true
```

### 4. Update Configuration

Update the `wrangler.toml` file with your KV namespace IDs:

```toml
[[env.production.kv_namespaces]]
binding = "CHAT_STORAGE"
id = "your-production-kv-namespace-id"

[[env.staging.kv_namespaces]]
binding = "CHAT_STORAGE" 
id = "your-staging-kv-namespace-id"
```

### 5. Set Environment Variables

Set your OpenAI API key as a secret:

```bash
# For production
wrangler secret put OPENAI_API_KEY

# For staging
wrangler secret put OPENAI_API_KEY --env staging
```

### 6. Deploy

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy
```

### 7. Development

For local development with Wrangler:

```bash
npm run dev
```

## Usage

### Web Interface

Once deployed, visit your Cloudflare Workers URL to access the web interface. The assistant can help you with:

- Creating schedules and appointments
- Answering questions with web search
- General conversation and assistance
- Note-taking and reminders

### API Endpoints

- `GET /` - Web interface
- `POST /api/chat` - Chat API endpoint

#### Chat API Request

```json
{
  "message": "Create a schedule for tomorrow at 3pm",
  "chatId": "optional_chat_id_for_context"
}
```

#### Chat API Response

```json
{
  "success": true,
  "response": "Your schedule has been created...",
  "chatId": "chat_1234567890"
}
```

## Architecture

- **Frontend**: HTML/CSS/JavaScript with a modern, responsive UI
- **Backend**: Cloudflare Workers with OpenAI Agents
- **Storage**: Cloudflare KV for persistent chat history
- **Tools**: Web search and schedule creation capabilities

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)

## License

ISC 