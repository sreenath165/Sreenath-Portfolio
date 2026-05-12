"""
Chat API routes for the Portfolio AI Assistant.
Handles chat requests and streaming responses.
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import List, AsyncGenerator
import logging
import json
import asyncio

from app.rag.chain import get_rag_chain

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str = Field(..., min_length=1, max_length=1000, description="User's message")
    stream: bool = Field(default=True, description="Enable streaming response")


class SourceInfo(BaseModel):
    """Source information for citations."""
    source: str
    section: str
    type: str


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    answer: str
    sources: List[SourceInfo]
    relevant: bool = True


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    message: str


def clean_response_text(text: str) -> str:
    """Clean response text to remove markdown artifacts and weird symbols."""
    # Remove excessive asterisks used for bold/italic
    text = text.replace("**", "").replace("__", "")
    # Keep single asterisks for bullet points but clean up others
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        # Clean up bullet points
        if line.strip().startswith('* '):
            line = line.replace('* ', '• ', 1)
        elif line.strip().startswith('- '):
            line = line.replace('- ', '• ', 1)
        cleaned_lines.append(line)
    text = '\n'.join(cleaned_lines)
    # Remove code block markers
    text = text.replace("```", "")
    # Clean up excessive whitespace
    while "  " in text:
        text = text.replace("  ", " ")
    return text.strip()


async def stream_response(message: str) -> AsyncGenerator[str, None]:
    """Generate streaming response chunks."""
    try:
        chain = get_rag_chain()
        result = await chain.invoke(message)
        
        answer = clean_response_text(result["answer"])
        sources = result.get("sources", [])
        
        # Stream the answer character by character with small delays
        # Group into words for more natural streaming
        words = answer.split(' ')
        for i, word in enumerate(words):
            chunk = word + (' ' if i < len(words) - 1 else '')
            yield f"data: {json.dumps({'type': 'content', 'content': chunk})}\n\n"
            await asyncio.sleep(0.03)  # 30ms delay between words
        
        # Send sources at the end
        yield f"data: {json.dumps({'type': 'sources', 'sources': sources})}\n\n"
        yield f"data: {json.dumps({'type': 'done'})}\n\n"
        
    except Exception as e:
        logger.error(f"Streaming error: {e}")
        yield f"data: {json.dumps({'type': 'error', 'content': 'An error occurred. Please try again.'})}\n\n"


@router.post("/")
async def chat(request: ChatRequest):
    """
    Process a chat message and return AI response.
    Supports both streaming and non-streaming modes.
    """
    try:
        logger.info(f"Received chat request: {request.message[:50]}...")
        
        if request.stream:
            return StreamingResponse(
                stream_response(request.message),
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no"
                }
            )
        
        # Non-streaming response
        chain = get_rag_chain()
        result = await chain.invoke(request.message)
        
        answer = clean_response_text(result["answer"])
        
        sources = [
            SourceInfo(
                source=s.get("source", "Portfolio"),
                section=s.get("section", ""),
                type=s.get("type", "text")
            )
            for s in result.get("sources", [])
        ]
        
        return ChatResponse(
            answer=answer,
            sources=sources,
            relevant=result.get("relevant", True)
        )
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request. Please try again."
        )


@router.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    """Health check endpoint for the chat service."""
    return HealthResponse(
        status="healthy",
        message="Portfolio AI Assistant is running"
    )
