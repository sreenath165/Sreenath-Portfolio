"""
FastAPI main application for the Portfolio AI Assistant.
Production-ready backend with RAG-based chat functionality.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os

from app.config import get_settings
from app.routes.chat import router as chat_router
from app.rag.ingest import ingest_documents
from app.rag.vectorstore import get_document_count

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    Ensures vector store is populated on startup.
    """
    logger.info("=== Starting Portfolio AI Assistant ===")

    # Ensure documents are ingested
    try:
        doc_count = get_document_count()
        logger.info(f"Existing documents in vector store: {doc_count}")

        if doc_count == 0:
            logger.info("Vector store empty - running initial ingestion...")
            chunks = ingest_documents(clear_existing=False)
            logger.info(f"Ingestion complete: {chunks} chunks indexed")
        else:
            logger.info(f"Vector store already populated with {doc_count} documents")
    except Exception as e:
        logger.error(f"Startup ingestion check failed: {e}, forcing ingestion...")
        try:
            chunks = ingest_documents(clear_existing=True)
            logger.info(f"Forced ingestion complete: {chunks} chunks")
        except Exception as e2:
            logger.critical(f"CRITICAL: Ingestion completely failed: {e2}")

    logger.info("=== Portfolio AI Assistant Ready ===")

    yield

    logger.info("Shutting down...")


# Create FastAPI app
app = FastAPI(
    title="Portfolio AI Assistant",
    description="RAG-based AI assistant for Sai Sreenath Reddy Y's portfolio",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.frontend_urls + ["*"],  # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/api")


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Portfolio AI Assistant",
        "version": "1.0.0",
        "description": "RAG-based AI assistant for Sai Sreenath Reddy Y's portfolio",
        "endpoints": {
            "chat": "/api/chat/",
            "health": "/api/chat/health",
            "docs": "/docs"
        }
    }


@app.get("/health")
async def health():
    """Global health check endpoint."""
    doc_count = 0
    try:
        doc_count = get_document_count()
    except:
        pass
    
    return {
        "status": "healthy",
        "documents_indexed": doc_count
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=True
    )
