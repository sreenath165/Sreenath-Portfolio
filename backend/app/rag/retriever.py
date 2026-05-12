"""
Reliable vector retriever using ChromaDB similarity search.
Simple, robust, no private API access.
"""

from langchain_core.documents import Document
from typing import List, Optional
import logging

from app.config import get_settings
from app.rag.vectorstore import get_vectorstore

logger = logging.getLogger(__name__)


class PortfolioRetriever:
    """Simple, reliable retriever using ChromaDB vector similarity search."""

    def __init__(self, k: int = None):
        settings = get_settings()
        self.k = k or settings.retrieval_k

    def retrieve(self, query: str) -> List[Document]:
        """
        Retrieve relevant documents using vector similarity search.
        Always returns results - never fails silently.
        """
        try:
            vectorstore = get_vectorstore()
            retriever = vectorstore.as_retriever(
                search_type="similarity",
                search_kwargs={"k": self.k}
            )
            documents = retriever.invoke(query)

            if documents:
                logger.info(f"Retrieved {len(documents)} docs for: {query[:60]}...")
                return documents
            else:
                logger.warning(f"No docs found for: {query[:60]}...")
                return []

        except Exception as e:
            logger.error(f"Retrieval error: {e}")
            return []


_retriever_instance: Optional[PortfolioRetriever] = None


def get_retriever() -> PortfolioRetriever:
    global _retriever_instance
    if _retriever_instance is None:
        _retriever_instance = PortfolioRetriever()
    return _retriever_instance


def reset_retriever() -> None:
    global _retriever_instance
    _retriever_instance = None
    logger.info("Retriever reset")
