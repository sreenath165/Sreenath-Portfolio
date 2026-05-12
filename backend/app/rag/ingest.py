"""
Document ingestion pipeline for the Portfolio AI Assistant.
Processes various document types and stores them in the vector database.
"""

from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    WebBaseLoader
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from typing import List, Dict, Any
import logging
import os
import json

from app.config import get_settings
from app.rag.vectorstore import add_documents_to_vectorstore, clear_vectorstore
from app.rag.retriever import reset_retriever
from app.rag.chain import reset_chain

logger = logging.getLogger(__name__)


def get_text_splitter() -> RecursiveCharacterTextSplitter:
    """Get configured text splitter."""
    settings = get_settings()
    return RecursiveCharacterTextSplitter(
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
        length_function=len,
        separators=["\n\n", "\n", ". ", " ", ""]
    )


def load_pdf(file_path: str, metadata: Dict = None) -> List[Document]:
    """Load and process a PDF file."""
    if not os.path.exists(file_path):
        logger.warning(f"PDF file not found: {file_path}")
        return []
    
    try:
        loader = PyPDFLoader(file_path)
        documents = loader.load()
        
        # Add metadata
        for doc in documents:
            doc.metadata.update(metadata or {})
            doc.metadata["type"] = "pdf"
        
        logger.info(f"Loaded PDF: {file_path} ({len(documents)} pages)")
        return documents
    except Exception as e:
        logger.error(f"Failed to load PDF {file_path}: {e}")
        return []


def load_text(file_path: str, metadata: Dict = None) -> List[Document]:
    """Load and process a text file."""
    if not os.path.exists(file_path):
        logger.warning(f"Text file not found: {file_path}")
        return []
    
    try:
        loader = TextLoader(file_path, encoding="utf-8")
        documents = loader.load()
        
        for doc in documents:
            doc.metadata.update(metadata or {})
            doc.metadata["type"] = "text"
        
        logger.info(f"Loaded text file: {file_path}")
        return documents
    except Exception as e:
        logger.error(f"Failed to load text {file_path}: {e}")
        return []


def load_url(url: str, metadata: Dict = None) -> List[Document]:
    """Load content from a URL."""
    try:
        loader = WebBaseLoader(url)
        documents = loader.load()
        
        for doc in documents:
            doc.metadata.update(metadata or {})
            doc.metadata["type"] = "web"
            doc.metadata["url"] = url
        
        logger.info(f"Loaded URL: {url}")
        return documents
    except Exception as e:
        logger.error(f"Failed to load URL {url}: {e}")
        return []


def create_portfolio_documents() -> List[Document]:
    """
    Create documents from the portfolio data.
    This is the main source of information for the chatbot.
    """
    documents = []
    
    # Profile information
    profile_content = """
# Sai Sreenath Reddy Yarradoddi - Profile

**Name:** Sai Sreenath Reddy Yarradoddi
**Short Name:** Sai Sreenath
**Role:** Software Engineer - Python | AI/ML | Agentic AI | AWS | React
**Email:** saisreenathreddyy@gmail.com
**Phone:** +91 8688718090
**Location:** Hyderabad, India

**LinkedIn:** https://in.linkedin.com/in/sreenathreddy165
**GitHub:** https://github.com/sreenath165
**YouTube:** https://www.youtube.com/@thescramblershooter
**Instagram:** https://www.instagram.com/sai._.sreenathh/

## Summary
A software engineer specializing in Agentic AI, LLM-powered applications, and RAG pipelines. AWS & Azure certified with expertise in Python backend development and cloud-native deployments.

## About
I am a passionate Software Engineer specializing in Artificial Intelligence and Machine Learning, with a focus on building production-ready Agentic AI systems. My expertise lies in developing LLM-powered applications that solve real-world business problems. With hands-on experience across the full AI development lifecycle, I bring ideas from concept to deployment, ensuring scalability and reliability at every step.

## Career Objective
To leverage my expertise in AI/ML and cloud technologies to build innovative solutions that drive business transformation. I aim to work on challenging projects that push the boundaries of what's possible with artificial intelligence while delivering measurable impact. My goal is to be at the forefront of AI innovation, creating intelligent systems that make a real difference in how businesses operate and people interact with technology.

## Strengths
- Building production-ready Agentic AI systems
- Designing scalable RAG pipelines and multi-agent architectures
- Python-based backend development
- Cloud-native deployments on AWS and Azure
- Translating complex AI concepts into practical solutions
- Strong communication and team collaboration
- Problem-solving and analytical thinking
- End-to-end solution delivery

## Personal
Beyond coding, I'm a content creator running a YouTube channel where I share my motovlogging adventures. When I'm not behind a screen, you'll find me on the open road — motorcycling is my way of unwinding and exploring new places. I believe in living life with the same passion I bring to my work: curious, adventurous, and always ready for the next challenge.
"""
    documents.append(Document(
        page_content=profile_content,
        metadata={"source": "Portfolio", "section": "Profile", "type": "profile"}
    ))
    
    # Skills
    skills_content = """
# Sai Sreenath's Technical Skills

## Programming & Software Engineering
Python, JavaScript, TypeScript, Java, C++, SQL, HTML/CSS, Backend API Development, Object-Oriented Programming, Data Structures & Algorithms

## Artificial Intelligence
LLMs (Large Language Models), RAG (Retrieval Augmented Generation), Agentic AI Systems, Multi-Agent Architectures, LangChain, LangGraph, n8n, Flowise, Prompt Engineering

## Backend & Frontend Development
Flask, FastAPI, REST APIs, React, TypeScript, Android Studio, Figma

## Frameworks & Libraries
TensorFlow, Scikit-Learn, NumPy, Pandas, OpenPyXL

## DevOps & Cloud
AWS (Amazon Web Services), Azure, Docker, Kubernetes, Git, CI/CD Pipelines

## Databases
MongoDB, SQL, VectorDB, Cassandra

Sai Sreenath is proficient in building end-to-end AI applications using Python, with expertise in RAG pipelines, LangChain, and cloud deployments on AWS and Azure.
"""
    documents.append(Document(
        page_content=skills_content,
        metadata={"source": "Portfolio", "section": "Skills", "type": "skills"}
    ))
    
    # Experience - Sutherland
    exp1_content = """
# Work Experience - Sutherland Global Services

**Position:** Senior Associate - DES - App Dev
**Company:** Sutherland Global Services Pvt. Ltd.
**Location:** Hyderabad, Telangana, India
**Period:** November 2025 - Present
**Type:** Full-time

## Responsibilities
- Worked in the development of an Agentic AI-powered proposal platform for IT service teams named Propello, reducing proposal creation time by ~60%.
- Built and integrated an end-to-end RAG-based Q&A AI Agent and led backend/API integrations across the platform.

## Technologies Used
Python, FastAPI, React, TypeScript, AWS Bedrock, MongoDB

## Project 1: Propello - AI Proposal Builder
Developed an Agentic AI-powered proposal platform for IT service teams that automates the entire proposal creation workflow. The system uses RAG pipelines and LLM orchestration to generate high-quality proposals from templates and historical data.

**Tools:** Python, FastAPI, React, TypeScript, AWS Bedrock, MongoDB, LangChain
**Key Achievement:** Reduced proposal creation time by approximately 60%
**Client:** Internal Product Development

## Project 2: RAG-based Q&A Agent
Built an end-to-end RAG-based Q&A AI Agent with context-aware responses for the Propello platform. The agent retrieves relevant information from document stores and generates accurate answers using LLM.

**Tools:** Python, LangChain, AWS Bedrock, Vector Database, FastAPI
**Key Achievement:** Enabled instant, accurate responses to complex proposal-related queries
**Client:** Internal Product Development
"""
    documents.append(Document(
        page_content=exp1_content,
        metadata={"source": "Portfolio", "section": "Experience - Sutherland", "type": "experience"}
    ))
    
    # Experience - Versalence
    exp2_content = """
# Work Experience - Versalence Infocomm

**Position:** AI/ML Engineer
**Company:** Versalence Infocomm Pvt. Ltd.
**Location:** Bengaluru, Karnataka, India
**Period:** April 2025 - October 2025
**Type:** Full-time

## Responsibilities
- Built an industry-first Agentic AI system using custom RAG + LLM orchestration to automate QRF-to-BOQ generation, reducing manual effort by ~70%.
- Delivered an AI-powered Android & iOS application with a native-language voice assistant for the Telangana Government.

## Technologies Used
Python, Gemini LLM, Pandas, OpenPyXL, RAG, Android

## Project 1: QRF-to-BOQ Automation System
Built an industry-first Agentic AI system using custom RAG + LLM orchestration to automate the conversion of Quotation Request Forms (QRF) to Bill of Quantities (BOQ). The system intelligently processes documents and generates accurate BOQ outputs.

**Tools:** Python, Gemini LLM, Pandas, OpenPyXL, RAG, Custom LLM Orchestration
**Key Achievement:** Reduced manual effort by approximately 70%
**Client:** Enterprise Clients

## Project 2: Telangana Government Voice Assistant App
Delivered an AI-powered Android & iOS application with a native-language voice assistant for the Telangana Government. The app enables citizens to interact with government services using voice commands in Telugu and other regional languages.

**Tools:** Android Studio, Firebase, Gemini LLM, Speech-to-Text, Text-to-Speech
**Key Achievement:** Enabled multilingual voice-based access to government services
**Client:** Telangana State Government
"""
    documents.append(Document(
        page_content=exp2_content,
        metadata={"source": "Portfolio", "section": "Experience - Versalence", "type": "experience"}
    ))
    
    # Projects
    projects_content = """
# Sai Sreenath's Projects

## 1. Propello - AI Proposal Builder (Featured)
Scalable backend integrations using Python, Agentic AI, RAG, FastAPI, React, and MongoDB for end-to-end AI-driven proposal workflows.
**Technologies:** Python, FastAPI, React, MongoDB, Agentic AI, RAG
**Features:** End-to-end workflow automation, LLM-based AI logic, Intelligent agent orchestration

## 2. ProdSync - Deployment Orchestration (Featured)
Automated deployment orchestration platform with AI-driven intelligence, natural language processing, and DevOps integration.
**Technologies:** Python, FastAPI, React, TypeScript, AWS Bedrock, Tailwind CSS
**Features:** Natural language deployment, JIRA integration, Real-time monitoring, Intelligent rollback

## 3. Smart Weed Detection Robot (Featured)
Mobile-controlled robot using YOLOv5 and CNN for weed detection and targeted herbicide spraying with Android app integration.
**Technologies:** Python, YOLOv5, CNN, Android, Bluetooth, TensorFlow
**Features:** Real-time weed detection, Soil moisture analysis, Live video streaming, Mobile control
**GitHub:** https://drive.google.com/drive/folders/18CA4d2ccdWUVpMyi3jLP3SNLs3y4n3Il

## 4. AI-Powered FAQ Assistant
GPT-3.5-based assistant with LangChain and FAISS for context-aware FAQ responses through a Streamlit interface.
**Technologies:** Python, GPT-3.5, LangChain, FAISS, Streamlit
**Features:** Context-aware responses, RAG implementation, FAISS vector search
**GitHub:** https://github.com/sreenath165/AI-Powered-FAQ-Assistant-with-Context-Aware-Memory

## 5. Customer Support Ticket Analyzer
Agentic AI system for intelligent classification and routing of customer support tickets using multi-agent architecture.
**Technologies:** Python, Agentic AI, Multi-Agent Architecture, NLP
**Features:** Intelligent classification, Severity-based routing, Priority assessment
**GitHub:** https://github.com/sreenath165/Customer-Support-Ticket-Analyzer-And-Router

## 6. E-Commerce Sales & Inventory Management
Full-stack e-commerce platform with sales tracking, inventory management, and analytics dashboard.
**Technologies:** Python, Database, Analytics, Web Development
**GitHub:** https://github.com/sreenath165/E-Commerce-Sales-and-Inventory-Management

## 7. Blockchain Hospital Record Management
Secure hospital record management system using blockchain technology for tamper-proof medical data storage.
**Technologies:** Blockchain, Python, Cryptography, Healthcare
**GitHub:** https://github.com/sreenath165/Blockchain-based-Hospital-Record-management

## 8. Post-Quantum Lattice-Based RSA
Lightweight post-quantum cryptographic implementation using lattice-based RSA for secure communications resistant to quantum attacks.
**Technologies:** Python, Cryptography, Lattice-Based, Security
**GitHub:** https://github.com/sreenath165/A-Lightweight-Post-Quantum-Lattice-Based-RSA-for-Secure-Communications

## 9. Fertilizer Prediction using ML
Machine learning model to predict optimal fertilizer recommendations based on soil and crop data for precision agriculture.
**Technologies:** Python, Machine Learning, Scikit-Learn, Agriculture
**GitHub:** https://github.com/sreenath165/Fertilizer-Prediction-using-ML

## 10. Freelance Platform
Web-based freelance marketplace connecting clients with freelancers for project-based work.
**Technologies:** Web Development, Database, Full-Stack
**GitHub:** https://github.com/sreenath165/Freelance-Platform

## 11. 2D Bee Run Game
Fun 2D endless runner game built with Unity featuring a bee character navigating through obstacles.
**Technologies:** Unity, C#, Game Development, 2D Graphics
**GitHub:** https://github.com/sreenath165/2D-Bee-run-game-using-Unity

## 12. 3D Ball Game
Interactive 3D ball rolling game built with Unity featuring physics-based gameplay and challenging levels.
**Technologies:** Unity, C#, Game Development, 3D Physics
**GitHub:** https://github.com/sreenath165/3D-Ball-game-using-Unity

## 13. Immersive 3D Environment
Realistic 3D environment created with Unity showcasing immersive landscapes and detailed scenery.
**Technologies:** Unity, C#, 3D Modeling, Environment Design
**GitHub:** https://github.com/sreenath165/Immersive-Realistic-3D-Environment-using-Unity

## 14. Weed Detection & Plucking Robot (Hybrid CNN)
Autonomous robot using Hybrid CNN architecture for accurate weed detection and automated plucking in agricultural fields.
**Technologies:** Python, CNN, Deep Learning, Robotics, Computer Vision
**GitHub:** https://github.com/sreenath165/Weed-Detection-And-Plucking-Robot-Using-Hybrid-CNN
"""
    documents.append(Document(
        page_content=projects_content,
        metadata={"source": "Portfolio", "section": "Projects", "type": "projects"}
    ))
    
    # Certifications
    certs_content = """
# Sai Sreenath's Certifications

## 1. AWS Certified Cloud Practitioner
**Issuer:** Amazon Web Services
**Date:** December 2024
**Description:** Foundation in cloud architecture, scalable infrastructure, security, and cost-optimized deployment strategies.
**Verification:** https://cp.certmetrics.com/amazon/en/public/verify/credential/PEYGKJGDS14Q1L3T

## 2. AWS Generative AI and AI Agents with Amazon Bedrock
**Issuer:** Coursera
**Date:** 2024
**Description:** Building generative AI applications and AI agents using Amazon Bedrock AgentCore and foundation models.

## 3. AI Agents and Agentic AI with Python
**Issuer:** Coursera
**Date:** 2024
**Description:** Developing autonomous, goal-driven AI agents using LLMs, tools, memory, and multi-step reasoning.

## 4. RAG by Deep Learning.AI
**Issuer:** Coursera
**Date:** 2024
**Description:** Designing RAG pipelines using embeddings, vector databases, and LLMs for context-aware responses.

## 5. Microsoft Certified: Azure Administrator Associate (AZ-104)
**Issuer:** Microsoft
**Date:** October 2024
**Description:** Managing Azure infrastructure including compute, networking, storage, identity, and monitoring.
**Verification:** https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/572c716e8633f085

## 6. Microsoft Certified: Azure AI Fundamentals (AI-900)
**Issuer:** Microsoft
**Date:** September 2024
**Description:** AI and machine learning concepts including NLP, computer vision, and responsible AI using Azure.
**Verification:** https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/94e29beb87903a3f

Sai Sreenath holds certifications from AWS, Microsoft Azure, and Coursera, demonstrating expertise in cloud computing, AI/ML, and Agentic AI systems.
"""
    documents.append(Document(
        page_content=certs_content,
        metadata={"source": "Portfolio", "section": "Certifications", "type": "certifications"}
    ))
    
    # Education
    edu_content = """
# Sai Sreenath's Education

## 1. B.Tech in Computer Science and Engineering
**Institution:** Vellore Institute of Technology (VIT)
**Location:** Chennai
**Period:** September 2021 - April 2025
**Score:** 7.56/10 CGPA
**Description:** Focused on software engineering, AI/ML, and cloud computing technologies.

## 2. Intermediate (Higher Secondary)
**Institution:** FIITJEE Junior College
**Location:** Vijayawada
**Period:** June 2019 - July 2021
**Score:** 965/1000
**Description:** Completed higher secondary education with focus on Mathematics, Physics, and Chemistry.

## 3. SSC (Secondary School Certificate)
**Institution:** Government High School
**Location:** Piler
**Period:** June 2018 - May 2019
**Score:** 10/10 GPA
**Description:** Completed secondary education with distinction.

Sai Sreenath graduated from VIT Chennai with a B.Tech in Computer Science, specializing in AI/ML and cloud technologies.
"""
    documents.append(Document(
        page_content=edu_content,
        metadata={"source": "Portfolio", "section": "Education", "type": "education"}
    ))
    
    # AI/ML Expertise
    aiml_content = """
# Sai Sreenath's AI/ML Expertise

## Agentic AI Systems
Sai Sreenath specializes in building production-ready Agentic AI systems. He has developed:
- Propello: An Agentic AI-powered proposal platform that reduced proposal creation time by 60%
- QRF-to-BOQ Automation: Industry-first system reducing manual effort by 70%
- Customer Support Ticket Analyzer: Multi-agent system for intelligent ticket routing

## RAG (Retrieval Augmented Generation)
Expert in designing and implementing RAG pipelines:
- Built RAG-based Q&A agents for enterprise applications
- Experience with vector databases (ChromaDB, FAISS)
- LangChain and LangGraph for orchestration
- Embedding models and semantic search

## Large Language Models (LLMs)
- AWS Bedrock integration
- Gemini LLM applications
- GPT-3.5/4 implementations
- Prompt engineering and optimization
- LLM orchestration and chaining

## Multi-Agent Architectures
- Designed multi-agent systems for complex workflows
- Agent coordination and communication
- Tool integration and function calling
- Memory and context management

## Machine Learning
- Computer Vision: YOLOv5, CNN, Hybrid CNN models
- Deep Learning: TensorFlow, neural networks
- Traditional ML: Scikit-Learn, classification, prediction
- Agriculture AI: Weed detection, fertilizer prediction

## Natural Language Processing
- Text classification and analysis
- Voice assistants with Speech-to-Text/Text-to-Speech
- Multilingual support (Telugu, regional languages)
- Sentiment analysis and entity extraction

Sai Sreenath combines theoretical knowledge with practical implementation experience, having delivered AI solutions for enterprise clients and government projects.
"""
    documents.append(Document(
        page_content=aiml_content,
        metadata={"source": "Portfolio", "section": "AI/ML Expertise", "type": "expertise"}
    ))
    
    return documents


def ingest_documents(
    pdf_paths: List[str] = None,
    text_paths: List[str] = None,
    urls: List[str] = None,
    clear_existing: bool = True
) -> int:
    """
    Main ingestion function that processes all document sources.
    
    Args:
        pdf_paths: List of PDF file paths
        text_paths: List of text file paths
        urls: List of URLs to scrape
        clear_existing: Whether to clear existing documents
        
    Returns:
        Number of document chunks ingested
    """
    if clear_existing:
        logger.info("Clearing existing vector store...")
        clear_vectorstore()
    
    all_documents = []
    
    # Load portfolio documents (main source)
    logger.info("Creating portfolio documents...")
    portfolio_docs = create_portfolio_documents()
    all_documents.extend(portfolio_docs)
    
    # Load PDFs
    if pdf_paths:
        for path in pdf_paths:
            docs = load_pdf(path, {"source": os.path.basename(path)})
            all_documents.extend(docs)
    
    # Load text files
    if text_paths:
        for path in text_paths:
            docs = load_text(path, {"source": os.path.basename(path)})
            all_documents.extend(docs)
    
    # Load URLs
    if urls:
        for url in urls:
            docs = load_url(url, {"source": url})
            all_documents.extend(docs)
    
    # Split documents into chunks
    logger.info(f"Splitting {len(all_documents)} documents into chunks...")
    text_splitter = get_text_splitter()
    chunks = text_splitter.split_documents(all_documents)
    logger.info(f"Created {len(chunks)} chunks")
    
    # Add to vector store
    logger.info("Adding chunks to vector store...")
    add_documents_to_vectorstore(chunks)
    
    # Reset retriever and chain to use new documents
    reset_retriever()
    reset_chain()
    
    logger.info(f"Ingestion complete: {len(chunks)} chunks indexed")
    return len(chunks)


def ingest_resume(resume_path: str) -> int:
    """
    Ingest resume PDF specifically.
    
    Args:
        resume_path: Path to resume PDF
        
    Returns:
        Number of chunks added
    """
    docs = load_pdf(resume_path, {
        "source": "Resume",
        "section": "Resume",
        "type": "resume"
    })
    
    if not docs:
        return 0
    
    text_splitter = get_text_splitter()
    chunks = text_splitter.split_documents(docs)
    
    add_documents_to_vectorstore(chunks)
    reset_retriever()
    reset_chain()
    
    logger.info(f"Resume ingested: {len(chunks)} chunks")
    return len(chunks)
