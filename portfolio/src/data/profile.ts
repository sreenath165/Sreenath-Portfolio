export const profile = {
  name: "Sai Sreenath Reddy Yarradoddi",
  shortName: "Sai Sreenath",
  role: "Software Engineer - Python | AI/ML | Agentic AI | AWS | React",
  email: "saisreenathreddyy@gmail.com",
  phone: "+91 8688718090",
  location: "Hyderabad, India",
  profileImage: "/images/profile.png",
  linkedin: "https://in.linkedin.com/in/sreenathreddy165",
  github: "https://github.com/sreenath165",
  youtube: "https://www.youtube.com/@thescramblershooter",
  instagram: "https://www.instagram.com/sai._.sreenathh/",
  
  summary: `A software engineer specializing in Agentic AI, LLM-powered applications, and RAG pipelines. AWS & Azure certified with expertise in Python backend development and cloud-native deployments.`,

  about: {
    introduction: `I am a passionate Software Engineer specializing in Artificial Intelligence and Machine Learning, with a focus on building production-ready Agentic AI systems. My expertise lies in developing LLM-powered applications that solve real-world business problems. With hands-on experience across the full AI development lifecycle, I bring ideas from concept to deployment, ensuring scalability and reliability at every step.`,
    
    careerObjective: `To leverage my expertise in AI/ML and cloud technologies to build innovative solutions that drive business transformation. I aim to work on challenging projects that push the boundaries of what's possible with artificial intelligence while delivering measurable impact. My goal is to be at the forefront of AI innovation, creating intelligent systems that make a real difference in how businesses operate and people interact with technology.`,
    
    strengths: [
      "Building production-ready Agentic AI systems",
      "Designing scalable RAG pipelines and multi-agent architectures",
      "Python-based backend development",
      "Cloud-native deployments on AWS and Azure",
      "Translating complex AI concepts into practical solutions",
      "Strong communication and team collaboration",
      "Problem-solving and analytical thinking",
      "End-to-end solution delivery"
    ],
    
    personalIntro: `Beyond coding, I'm a content creator running a YouTube channel where I share my motovlogging adventures. When I'm not behind a screen, you'll find me on the open road — motorcycling is my way of unwinding and exploring new places. I believe in living life with the same passion I bring to my work: curious, adventurous, and always ready for the next challenge.`
  }
};

export const skills = {
  programming: {
    title: "Programming & Software Engineering",
    items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "HTML/CSS", "Backend API Development", "Object-Oriented Programming", "Data Structures & Algorithms"]
  },
  ai: {
    title: "Artificial Intelligence",
    items: [
      "LLMs", "RAG", "Agentic AI Systems", "Multi-Agent Architectures",
      "LangChain", "LangGraph", "n8n", "Flowise", "Prompt Engineering"
    ]
  },
  backend: {
    title: "Backend & Frontend Development",
    items: ["Flask", "FastAPI", "REST APIs", "React", "TypeScript", "Android Studio", "Figma"]
  },
  frameworks: {
    title: "Frameworks & Libraries",
    items: ["TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "OpenPyXL"]
  },
  devops: {
    title: "DevOps & Cloud",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "Git", "CI/CD Pipelines"]
  },
  databases: {
    title: "Databases",
    items: ["MongoDB", "SQL", "VectorDB", "Cassandra"]
  }
};

export const experience = [
  {
    id: 1,
    title: "Senior Associate - DES - App Dev",
    company: "Sutherland Global Services Pvt. Ltd.",
    location: "Hyderabad, Telangana, India",
    period: "Nov 2025 - Present",
    type: "Full-time",
    description: [
      "Worked in the development of an Agentic AI-powered proposal platform for IT service teams named Propello, reducing proposal creation time by ~60%.",
      "Built and integrated an end-to-end RAG-based Q&A AI Agent and led backend/API integrations across the platform."
    ],
    technologies: ["Python", "FastAPI", "React", "TypeScript", "AWS Bedrock", "MongoDB"],
    projects: [
      {
        name: "Propello - AI Proposal Builder",
        description: "Developed an Agentic AI-powered proposal platform for IT service teams that automates the entire proposal creation workflow. The system uses RAG pipelines and LLM orchestration to generate high-quality proposals from templates and historical data.",
        tools: ["Python", "FastAPI", "React", "TypeScript", "AWS Bedrock", "MongoDB", "LangChain"],
        keyAchievement: "Reduced proposal creation time by approximately 60%",
        client: "Internal Product Development"
      },
      {
        name: "RAG-based Q&A Agent",
        description: "Built an end-to-end RAG-based Q&A AI Agent with context-aware responses for the Propello platform. The agent retrieves relevant information from document stores and generates accurate answers using LLM.",
        tools: ["Python", "LangChain", "AWS Bedrock", "Vector Database", "FastAPI"],
        keyAchievement: "Enabled instant, accurate responses to complex proposal-related queries",
        client: "Internal Product Development"
      }
    ]
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    company: "Versalence Infocomm Pvt. Ltd.",
    location: "Bengaluru, Karnataka, India",
    period: "Apr 2025 - Oct 2025",
    type: "Full-time",
    description: [
      "Built an industry-first Agentic AI system using custom RAG + LLM orchestration to automate QRF-to-BOQ generation, reducing manual effort by ~70%.",
      "Delivered an AI-powered Android & iOS application with a native-language voice assistant for the Telangana Government."
    ],
    technologies: ["Python", "Gemini LLM", "Pandas", "OpenPyXL", "RAG", "Android"],
    projects: [
      {
        name: "QRF-to-BOQ Automation System",
        description: "Built an industry-first Agentic AI system using custom RAG + LLM orchestration to automate the conversion of Quotation Request Forms (QRF) to Bill of Quantities (BOQ). The system intelligently processes documents and generates accurate BOQ outputs.",
        tools: ["Python", "Gemini LLM", "Pandas", "OpenPyXL", "RAG", "Custom LLM Orchestration"],
        keyAchievement: "Reduced manual effort by approximately 70%",
        client: "Enterprise Clients"
      },
      {
        name: "Telangana Government Voice Assistant App",
        description: "Delivered an AI-powered Android & iOS application with a native-language voice assistant for the Telangana Government. The app enables citizens to interact with government services using voice commands in Telugu and other regional languages.",
        tools: ["Android Studio", "Firebase", "Gemini LLM", "Speech-to-Text", "Text-to-Speech"],
        keyAchievement: "Enabled multilingual voice-based access to government services",
        client: "Telangana State Government"
      }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Propello - AI Proposal Builder",
    description: "Scalable backend integrations using Python, Agentic AI, RAG, FastAPI, React, and MongoDB for end-to-end AI-driven proposal workflows.",
    technologies: ["Python", "FastAPI", "React", "MongoDB", "Agentic AI", "RAG"],
    features: ["End-to-end workflow automation", "LLM-based AI logic", "Intelligent agent orchestration"],
    image: "/images/projects/propello.jpg",
    github: "[ADD GITHUB LINK]",
    demo: "[ADD PROJECT DEMO]",
    featured: true,
    viewDetails: true
  },
  {
    id: 2,
    title: "ProdSync - Deployment Orchestration",
    description: "Automated deployment orchestration platform with AI-driven intelligence, natural language processing, and DevOps integration.",
    technologies: ["Python", "FastAPI", "React", "TypeScript", "AWS Bedrock", "Tailwind CSS"],
    features: ["Natural language deployment", "JIRA integration", "Real-time monitoring", "Intelligent rollback"],
    image: "/images/projects/prodsync.jpg",
    github: "[ADD GITHUB LINK]",
    demo: "[ADD PROJECT DEMO]",
    featured: true,
    viewDetails: true
  },
  {
    id: 3,
    title: "Smart Weed Detection Robot",
    description: "Mobile-controlled robot using YOLOv5 and CNN for weed detection and targeted herbicide spraying with Android app integration.",
    technologies: ["Python", "YOLOv5", "CNN", "Android", "Bluetooth", "TensorFlow"],
    features: ["Real-time weed detection", "Soil moisture analysis", "Live video streaming", "Mobile control"],
    image: "/images/projects/weed-detection.jpg",
    github: "https://drive.google.com/drive/folders/18CA4d2ccdWUVpMyi3jLP3SNLs3y4n3Il?usp=sharing",
    featured: true,
    viewDetails: true,
    mediaType: "link",
    mediaUrl: "https://drive.google.com/drive/folders/18CA4d2ccdWUVpMyi3jLP3SNLs3y4n3Il?usp=sharing"
  },
  {
    id: 4,
    title: "AI-Powered FAQ Assistant",
    description: "GPT-3.5-based assistant with LangChain and FAISS for context-aware FAQ responses through a Streamlit interface.",
    technologies: ["Python", "GPT-3.5", "LangChain", "FAISS", "Streamlit"],
    features: ["Context-aware responses", "RAG implementation", "FAISS vector search"],
    image: "/images/projects/faq-assistant.jpg", // [ADD PROJECT IMAGE]
    github: "https://github.com/sreenath165/AI-Powered-FAQ-Assistant-with-Context-Aware-Memory",
    featured: false
  },
  {
    id: 5,
    title: "Customer Support Ticket Analyzer",
    description: "Agentic AI system for intelligent classification and routing of customer support tickets using multi-agent architecture.",
    technologies: ["Python", "Agentic AI", "Multi-Agent Architecture", "NLP"],
    features: ["Intelligent classification", "Severity-based routing", "Priority assessment"],
    image: "/images/projects/ticket-analyzer.jpg", // [ADD PROJECT IMAGE]
    github: "https://github.com/sreenath165/Customer-Support-Ticket-Analyzer-And-Router",
    featured: false
  },
  {
    id: 6,
    title: "E-Commerce Sales & Inventory Management",
    description: "Full-stack e-commerce platform with sales tracking, inventory management, and analytics dashboard.",
    technologies: ["Python", "Database", "Analytics", "Web Development"],
    features: ["Sales tracking", "Inventory management", "Analytics dashboard"],
    image: "/images/projects/ecommerce.jpg",
    github: "https://github.com/sreenath165/E-Commerce-Sales-and-Inventory-Management",
    featured: false
  },
  {
    id: 7,
    title: "Blockchain Hospital Record Management",
    description: "Secure hospital record management system using blockchain technology for tamper-proof medical data storage.",
    technologies: ["Blockchain", "Python", "Cryptography", "Healthcare"],
    features: ["Tamper-proof records", "Secure data storage", "Decentralized system"],
    image: "/images/projects/blockchain-hospital.jpg",
    github: "https://github.com/sreenath165/Blockchain-based-Hospital-Record-management",
    featured: false,
    viewDetails: true
  },
  {
    id: 8,
    title: "Post-Quantum Lattice-Based RSA",
    description: "Lightweight post-quantum cryptographic implementation using lattice-based RSA for secure communications resistant to quantum attacks.",
    technologies: ["Python", "Cryptography", "Lattice-Based", "Security"],
    features: ["Quantum-resistant encryption", "Lightweight implementation", "Secure communications"],
    image: "/images/projects/quantum-rsa.jpg",
    github: "https://github.com/sreenath165/A-Lightweight-Post-Quantum-Lattice-Based-RSA-for-Secure-Communications",
    featured: false,
    viewDetails: true,
    mediaType: "pdf",
    mediaUrl: "/videos/projects/quantum-rsa.pdf"
  },
  {
    id: 9,
    title: "Fertilizer Prediction using ML",
    description: "Machine learning model to predict optimal fertilizer recommendations based on soil and crop data for precision agriculture.",
    technologies: ["Python", "Machine Learning", "Scikit-Learn", "Agriculture"],
    features: ["Soil analysis", "Crop-based recommendations", "ML predictions"],
    image: "/images/projects/fertilizer-ml.jpg",
    github: "https://github.com/sreenath165/Fertilizer-Prediction-using-ML",
    featured: false
  },
  {
    id: 10,
    title: "Freelance Platform",
    description: "Web-based freelance marketplace connecting clients with freelancers for project-based work.",
    technologies: ["Web Development", "Database", "Full-Stack"],
    features: ["User profiles", "Project listings", "Client-freelancer matching"],
    image: "/images/projects/freelance.jpg",
    github: "https://github.com/sreenath165/Freelance-Platform",
    featured: false
  },
  {
    id: 11,
    title: "2D Bee Run Game",
    description: "Fun 2D endless runner game built with Unity featuring a bee character navigating through obstacles.",
    technologies: ["Unity", "C#", "Game Development", "2D Graphics"],
    features: ["Endless runner gameplay", "Obstacle avoidance", "Score tracking"],
    image: "/images/projects/bee-run.jpg",
    github: "https://github.com/sreenath165/2D-Bee-run-game-using-Unity",
    featured: false,
    viewDetails: true,
    mediaType: "video",
    mediaUrl: "/videos/projects/bee-run-demo.mp4"
  },
  {
    id: 12,
    title: "3D Ball Game",
    description: "Interactive 3D ball rolling game built with Unity featuring physics-based gameplay and challenging levels.",
    technologies: ["Unity", "C#", "Game Development", "3D Physics"],
    features: ["Physics-based gameplay", "Level progression", "3D environment"],
    image: "/images/projects/ball-game.jpg",
    github: "https://github.com/sreenath165/3D-Ball-game-using-Unity",
    featured: false,
    viewDetails: true,
    mediaType: "video",
    mediaUrl: "/videos/projects/ball-game-demo.mp4"
  },
  {
    id: 13,
    title: "Immersive 3D Environment",
    description: "Realistic 3D environment created with Unity showcasing immersive landscapes and detailed scenery.",
    technologies: ["Unity", "C#", "3D Modeling", "Environment Design"],
    features: ["Realistic landscapes", "Immersive experience", "Detailed scenery"],
    image: "/images/projects/3d-environment.jpg",
    github: "https://github.com/sreenath165/Immersive-Realistic-3D-Environment-using-Unity",
    featured: false,
    viewDetails: true,
    mediaType: "video",
    mediaUrl: "/videos/projects/3d-environment-demo.mp4"
  },
  {
    id: 14,
    title: "Weed Detection & Plucking Robot (Hybrid CNN)",
    description: "Autonomous robot using Hybrid CNN architecture for accurate weed detection and automated plucking in agricultural fields.",
    technologies: ["Python", "CNN", "Deep Learning", "Robotics", "Computer Vision"],
    features: ["Hybrid CNN model", "Automated weed plucking", "Real-time detection"],
    image: "/images/projects/weed-hybrid-cnn.jpg",
    github: "https://github.com/sreenath165/Weed-Detection-And-Plucking-Robot-Using-Hybrid-CNN",
    featured: false
  }
];

export const certifications = [
  {
    id: 1,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Dec 2024",
    description: "Foundation in cloud architecture, scalable infrastructure, security, and cost-optimized deployment strategies.",
    image: "/images/certifications/AWS CP Certificate.png",
    verifyLink: "https://cp.certmetrics.com/amazon/en/public/verify/credential/PEYGKJGDS14Q1L3T"
  },
  {
    id: 2,
    title: "AWS Generative AI and AI Agents with Amazon Bedrock",
    issuer: "Coursera",
    date: "2024",
    description: "Building generative AI applications and AI agents using Amazon Bedrock AgentCore and foundation models.",
    image: "/images/certifications/aws-bedrock.jpg", // [ADD CERTIFICATE IMAGE]
    verifyLink: "[ADD VERIFY LINK]"
  },
  {
    id: 3,
    title: "AI Agents and Agentic AI with Python",
    issuer: "Coursera",
    date: "2024",
    description: "Developing autonomous, goal-driven AI agents using LLMs, tools, memory, and multi-step reasoning.",
    image: "/images/certifications/agentic-ai.jpg", // [ADD CERTIFICATE IMAGE]
    verifyLink: "[ADD VERIFY LINK]"
  },
  {
    id: 4,
    title: "RAG by Deep Learning.AI",
    issuer: "Coursera",
    date: "2024",
    description: "Designing RAG pipelines using embeddings, vector databases, and LLMs for context-aware responses.",
    image: "/images/certifications/rag.jpg", // [ADD CERTIFICATE IMAGE]
    verifyLink: "[ADD VERIFY LINK]"
  },
  {
    id: 5,
    title: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    date: "Oct 2024",
    description: "Managing Azure infrastructure including compute, networking, storage, identity, and monitoring.",
    image: "/images/certifications/Azure Administrator AZ-104 Certificate.png",
    verifyLink: "https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/572c716e8633f085"
  },
  {
    id: 6,
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "Sep 2024",
    description: "AI and machine learning concepts including NLP, computer vision, and responsible AI using Azure.",
    image: "/images/certifications/Azure AI-900 Certificate.png",
    verifyLink: "https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/94e29beb87903a3f"
  }
];

export const education = [
  {
    id: 1,
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Vellore Institute of Technology (VIT)",
    location: "Chennai",
    period: "Sep 2021 - Apr 2025",
    score: "7.56/10",
    description: "Focused on software engineering, AI/ML, and cloud computing technologies."
  },
  {
    id: 2,
    degree: "Intermediate",
    institution: "FIITJEE Junior College",
    location: "Vijayawada",
    period: "Jun 2019 - Jul 2021",
    score: "965/1000",
    description: "Completed higher secondary education with focus on Mathematics, Physics, and Chemistry."
  },
  {
    id: 3,
    degree: "SSC",
    institution: "Government High School",
    location: "Piler",
    period: "Jun 2018 - May 2019",
    score: "10/10",
    description: "Completed secondary education with distinction."
  }
];
