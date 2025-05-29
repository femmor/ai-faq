# 🧠 AI-Powered FAQ Chatbot

A full-stack AI assistant that answers user questions using your preloaded FAQ knowledge base. Built with **React**, **TypeScript**, **Node.js**, **MongoDB**, and **OpenAI embeddings**. Users can interact with a friendly chat interface powered by semantic search + GPT responses.

---

## 🚀 Features

- 💬 Chat interface for FAQ Q&A
- 🧠 Semantic search using OpenAI embeddings (`text-embedding-ada-002`)
- 🤖 GPT-based dynamic answers (uses context from top-matching FAQs)
- 📦 MongoDB storage for FAQ entries with embeddings
- ⚡ Fully functional backend API using Node.js + Express
- 🎯 Frontend powered by React, TypeScript, and TanStack Query
- 🎨 Tailwind styled UI components
- 📚 Suggested question prompts for first-time users

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React, TypeScript, Sass, Vite  |
| Backend    | Node.js, Express, TypeScript   |
| AI         | OpenAI API (Embeddings + Chat) |
| Database   | MongoDB (Atlas)                |
| Data Fetch | TanStack Query (React Query)   |

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/femmor/ai-faq.git
cd ai-faq
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Add your Mongo URI and OpenAI key to `.env`
npm run seed         # Seed the DB with FAQs and generate embeddings
npm run dev          # Start the backend server (localhost:5000)
```

### 3. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:5000/api
npm run dev          # Start frontend (localhost:5173)
```

---

## 📡 API

**POST** `/api/faq/search`

```json
Request:
{
  "question": "How can I track my order?"
}

Response:
{
  "answer": "You can track your order by logging into your account...",
  "sources": [
    {
      "question": "How can I track my order?",
      "answer": "..."
    },
    ...
  ]
}
```

## 🧪 Example Questions

Try asking:

- “What are your business hours?”
- “Do you offer refunds?”
- “How can I reset my password?”

## 🧑‍💻 Author

Built by [Emmanuel Egomson](https://github.com/femmor) — open to contributions, improvements, and suggestions!

---

## 📄 License

MIT License. Free to use, modify, and share.
