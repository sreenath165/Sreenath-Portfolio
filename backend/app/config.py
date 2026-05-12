"""
Configuration settings for the Portfolio AI Assistant.
Loads environment variables and provides centralized config access.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Groq API
    groq_api_key: str
    llm_model: str = "llama-3.3-70b-versatile"
    
    # Embedding Model
    embedding_model: str = "BAAI/bge-small-en-v1.5"
    
    # ChromaDB
    chroma_persist_dir: str = "./chroma_db"
    collection_name: str = "portfolio_docs"
    
    # Retrieval
    retrieval_k: int = 5
    chunk_size: int = 500
    chunk_overlap: int = 100
    
    # Server
    host: str = "0.0.0.0"
    port: int = 10000
    
    # CORS - Frontend URLs
    frontend_urls: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://saisreenath.dev",
        "https://sai-sreenath-reddy-y.netlify.app"
    ]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
