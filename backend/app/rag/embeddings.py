"""
Embedding model initialization and management.
Uses BAAI/bge-small-en-v1.5 for efficient, high-quality embeddings.
"""

from sentence_transformers import SentenceTransformer
from langchain_core.embeddings import Embeddings
from typing import List
from functools import lru_cache
import logging

from app.config import get_settings

logger = logging.getLogger(__name__)


class BGEEmbeddings(Embeddings):
    """
    Custom LangChain-compatible embeddings wrapper for BGE model.
    Provides efficient embedding generation with caching.
    """
    
    def __init__(self, model_name: str = None):
        """Initialize the BGE embedding model."""
        settings = get_settings()
        self.model_name = model_name or settings.embedding_model
        self._model = None
    
    @property
    def model(self) -> SentenceTransformer:
        """Lazy load the model to avoid loading on import."""
        if self._model is None:
            logger.info(f"Loading embedding model: {self.model_name}")
            self._model = SentenceTransformer(self.model_name)
            logger.info("Embedding model loaded successfully")
        return self._model
    
    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """Embed a list of documents."""
        embeddings = self.model.encode(texts, normalize_embeddings=True)
        return embeddings.tolist()
    
    def embed_query(self, text: str) -> List[float]:
        """Embed a single query."""
        embedding = self.model.encode(text, normalize_embeddings=True)
        return embedding.tolist()


@lru_cache()
def get_embeddings() -> BGEEmbeddings:
    """Get cached embeddings instance."""
    return BGEEmbeddings()
