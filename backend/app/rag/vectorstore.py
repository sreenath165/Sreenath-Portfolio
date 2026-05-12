"""
Vector store management using ChromaDB.
Handles document storage, retrieval, and persistence.
"""

import chromadb
from chromadb.config import Settings as ChromaSettings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from typing import List, Optional
from functools import lru_cache
import logging
import os

from app.config import get_settings
from app.rag.embeddings import get_embeddings

logger = logging.getLogger(__name__)


def get_chroma_client() -> chromadb.PersistentClient:
    """Get ChromaDB persistent client."""
    settings = get_settings()
    persist_dir = settings.chroma_persist_dir
    
    # Ensure directory exists
    os.makedirs(persist_dir, exist_ok=True)
    
    client = chromadb.PersistentClient(
        path=persist_dir,
        settings=ChromaSettings(
            anonymized_telemetry=False,
            allow_reset=True
        )
    )
    return client


def get_vectorstore() -> Chroma:
    """
    Get or create the ChromaDB vector store.
    Uses persistent storage for production use.
    """
    settings = get_settings()
    embeddings = get_embeddings()
    
    try:
        vectorstore = Chroma(
            collection_name=settings.collection_name,
            embedding_function=embeddings,
            persist_directory=settings.chroma_persist_dir
        )
        logger.info(f"Vector store ready: collection='{settings.collection_name}'")
        return vectorstore
    except Exception as e:
        logger.error(f"Failed to initialize vector store: {e}")
        raise


def add_documents_to_vectorstore(documents: List[Document]) -> None:
    """
    Add documents to the vector store.
    Handles batching for large document sets.
    """
    if not documents:
        logger.warning("No documents to add to vector store")
        return
    
    vectorstore = get_vectorstore()
    
    # Add documents in batches to avoid memory issues
    batch_size = 100
    for i in range(0, len(documents), batch_size):
        batch = documents[i:i + batch_size]
        vectorstore.add_documents(batch)
        logger.info(f"Added batch {i//batch_size + 1}: {len(batch)} documents")
    
    logger.info(f"Total {len(documents)} documents added to vector store")


def clear_vectorstore() -> None:
    """Clear all documents from the vector store."""
    settings = get_settings()
    client = get_chroma_client()
    
    try:
        client.delete_collection(settings.collection_name)
        logger.info(f"Cleared collection: {settings.collection_name}")
    except Exception as e:
        logger.warning(f"Collection may not exist: {e}")


def get_document_count() -> int:
    """Get the number of documents in the vector store using public API."""
    try:
        settings = get_settings()
        client = get_chroma_client()
        collection = client.get_collection(settings.collection_name)
        return collection.count()
    except Exception as e:
        logger.warning(f"Could not get document count (collection may be empty): {e}")
        return 0
