"""
Groq LLM service for generating responses.
Uses llama-3.3-70b-versatile model via Groq API.
"""

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from functools import lru_cache
import logging

from app.config import get_settings

logger = logging.getLogger(__name__)


@lru_cache()
def get_llm() -> ChatGroq:
    """
    Get cached Groq LLM instance.
    Uses llama-3.3-70b-versatile for high-quality responses.
    """
    settings = get_settings()
    
    llm = ChatGroq(
        api_key=settings.groq_api_key,
        model_name=settings.llm_model,
        temperature=0.3,  # Lower temperature for more focused responses
        max_tokens=1024,
        timeout=30,
    )
    
    logger.info(f"Initialized Groq LLM: {settings.llm_model}")
    return llm


async def check_relevance(question: str) -> bool:
    """
    Check if a question is relevant to the portfolio.
    Uses a quick LLM call to classify the question.
    """
    llm = get_llm()
    
    check_prompt = f"""Classify if this question is about a software engineer's portfolio, projects, skills, experience, education, or professional background.

Question: "{question}"

Rules:
- Questions about projects, skills, technologies, work experience, education, certifications = RELEVANT
- Greetings, asking about the assistant, contact info = RELEVANT  
- Politics, general knowledge, unrelated coding help, harmful content = IRRELEVANT

Respond with only one word: RELEVANT or IRRELEVANT"""

    try:
        response = await llm.ainvoke([HumanMessage(content=check_prompt)])
        result = response.content.strip().upper()
        is_relevant = "RELEVANT" in result and "IRRELEVANT" not in result
        logger.info(f"Relevance check for '{question[:50]}...': {is_relevant}")
        return is_relevant
    except Exception as e:
        logger.error(f"Relevance check failed: {e}")
        # Default to relevant on error to avoid blocking legitimate questions
        return True


async def generate_response(
    question: str,
    context: str,
    system_prompt: str
) -> str:
    """
    Generate a response using the Groq LLM.
    Handles empty context gracefully.
    """
    llm = get_llm()

    # If context is empty, add a note so the LLM knows to use its knowledge
    if not context or not context.strip():
        context = "No specific documents were retrieved. Use your knowledge about Sai Sreenath Reddy Y's portfolio to answer helpfully."

    formatted_system = system_prompt.format(context=context)

    messages = [
        SystemMessage(content=formatted_system),
        HumanMessage(content=question)
    ]

    try:
        response = await llm.ainvoke(messages)
        return response.content
    except Exception as e:
        logger.error(f"LLM generation failed: {e}")
        raise
