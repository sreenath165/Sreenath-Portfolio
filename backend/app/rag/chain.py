"""
RAG Chain - Orchestrates the retrieval and generation pipeline.
Stateless: each request is independent, no cross-user contamination.
"""

from typing import Dict, List, Optional
from langchain_core.documents import Document
import logging

from app.rag.retriever import get_retriever
from app.rag.prompt import SYSTEM_PROMPT, REFUSAL_MESSAGE
from app.services.groq_service import check_relevance, generate_response

logger = logging.getLogger(__name__)


class RAGChain:
    """
    Stateless RAG Chain for the Portfolio AI Assistant.
    Each invoke() is independent - no conversation history stored server-side.
    Session isolation is handled by the frontend (each browser has its own state).
    """

    def __init__(self):
        self.retriever = get_retriever()

    def _format_context(self, documents: List[Document]) -> str:
        """Format retrieved documents into context string."""
        if not documents:
            return ""

        context_parts = []
        for i, doc in enumerate(documents, 1):
            source = doc.metadata.get("source", "Portfolio")
            section = doc.metadata.get("section", "")
            header = f"[{source}"
            if section:
                header += f" - {section}"
            header += "]"
            context_parts.append(f"{header}\n{doc.page_content}")

        return "\n\n---\n\n".join(context_parts)

    def _extract_sources(self, documents: List[Document]) -> List[Dict]:
        sources = []
        seen = set()
        for doc in documents:
            source = doc.metadata.get("source", "Portfolio")
            section = doc.metadata.get("section", "")
            key = f"{source}:{section}"
            if key not in seen:
                seen.add(key)
                sources.append({
                    "source": source,
                    "section": section,
                    "type": doc.metadata.get("type", "text")
                })
        return sources

    async def invoke(self, question: str) -> Dict:
        logger.info(f"Processing: {question[:80]}...")

        # Step 1: Check relevance
        is_relevant = await check_relevance(question)
        if not is_relevant:
            return {"answer": REFUSAL_MESSAGE, "sources": [], "relevant": False}

        # Step 2: Retrieve documents
        documents = self.retriever.retrieve(question)
        logger.info(f"Retrieved {len(documents)} documents")

        # Step 3: Format context
        context = self._format_context(documents)

        # Step 4: Generate response
        try:
            answer = await generate_response(
                question=question,
                context=context,
                system_prompt=SYSTEM_PROMPT
            )
        except Exception as e:
            logger.error(f"Generation failed: {e}")
            answer = "I apologize, but I'm having trouble right now. Please try again."

        sources = self._extract_sources(documents)
        return {"answer": answer, "sources": sources, "relevant": True}


_chain_instance: Optional[RAGChain] = None


def get_rag_chain() -> RAGChain:
    global _chain_instance
    if _chain_instance is None:
        _chain_instance = RAGChain()
    return _chain_instance


def reset_chain() -> None:
    global _chain_instance
    _chain_instance = None
    logger.info("RAG chain reset")
