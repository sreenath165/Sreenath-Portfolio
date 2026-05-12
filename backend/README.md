# Portfolio AI Assistant - Backend

A production-ready RAG-based AI assistant backend for Sai Sreenath Reddy Y's portfolio website.

## Features

- **Hybrid RAG Retrieval**: Combines dense vector search (BGE embeddings) with BM25 keyword search
- **Groq LLM Integration**: Uses llama-3.3-70b-versatile for high-quality responses
- **ChromaDB Vector Store**: Persistent local storage for embeddings
- **Strict Guardrails**: Only answers portfolio-related questions
- **FastAPI Backend**: Async, production-ready API

## Tech Stack

- **Framework**: FastAPI
- **LLM**: Groq API (llama-3.3-70b-versatile)
- **Embeddings**: BAAI/bge-small-en-v1.5 (sentence-transformers)
- **Vector DB**: ChromaDB
- **RAG Framework**: LangChain

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── routes/
│   │   └── chat.py          # Chat API endpoints
│   ├── rag/
│   │   ├── ingest.py        # Document ingestion pipeline
│   │   ├── embeddings.py    # BGE embedding model
│   │   ├── vectorstore.py   # ChromaDB operations
│   │   ├── retriever.py     # Hybrid retriever
│   │   ├── prompt.py        # System prompts
│   │   └── chain.py         # RAG chain orchestration
│   └── services/
│       └── groq_service.py  # Groq LLM service
├── chroma_db/               # Vector database storage
├── requirements.txt
├── Dockerfile
├── .env
└── README.md
```

## Local Setup

### Prerequisites

- Python 3.11+
- pip

### Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   The `.env` file is already configured with:
   ```env
   GROQ_API_KEY=your_groq_api_key
   LLM_MODEL=llama-3.3-70b-versatile
   EMBEDDING_MODEL=BAAI/bge-small-en-v1.5
   ```

5. **Run the server**:
   ```bash
   uvicorn app.main:app --reload --port 10000
   ```

6. **Access the API**:
   - API: http://localhost:10000
   - Docs: http://localhost:10000/docs
   - Health: http://localhost:10000/health

## API Endpoints

### POST /api/chat/

Send a chat message and receive AI response.

**Request**:
```json
{
  "message": "Tell me about Sai's AI projects"
}
```

**Response**:
```json
{
  "answer": "Sai Sreenath has worked on several AI projects...",
  "sources": [
    {
      "source": "Portfolio",
      "section": "Projects",
      "type": "projects"
    }
  ],
  "relevant": true
}
```

### GET /api/chat/health

Health check endpoint.

### GET /health

Global health check with document count.

## Deployment to Render

### Steps

1. **Create a Render account** at https://render.com

2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Select the `backend` directory as root
   - Choose Docker as the environment

3. **Configure environment variables** in Render dashboard:
   ```
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Deploy**:
   - Render will automatically build and deploy
   - Your API will be available at `https://your-app.onrender.com`

### Render Configuration

- **Build Command**: (handled by Dockerfile)
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
- **Health Check Path**: `/health`

## Security Features

- **Prompt Injection Protection**: System prompt is protected and cannot be overridden
- **Relevance Checking**: Questions are validated before processing
- **Off-topic Handling**: Politely refuses unrelated questions
- **No Hallucination**: Only answers from provided context

## Allowed Topics

The assistant answers questions about:
- Projects and technical work
- Skills and technologies
- Work experience
- Certifications
- Education
- GitHub repositories
- AI/ML expertise
- Contact information

## Development

### Re-ingest Documents

To update the knowledge base, the documents are automatically ingested on startup if the vector store is empty. To force re-ingestion, delete the `chroma_db` directory and restart.

### Adding New Content

Edit `app/rag/ingest.py` and update the `create_portfolio_documents()` function with new content.

## Troubleshooting

### Common Issues

1. **Embedding model download slow**: First run downloads the BGE model (~130MB). This is cached for subsequent runs.

2. **ChromaDB errors**: Delete the `chroma_db` directory and restart.

3. **Groq API errors**: Verify your API key is correct in `.env`.

## License

MIT License
