// ─────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Pages and sections only render what is defined here.
// ─────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://sreenath-portfolio-ten.vercel.app';

export const RESUME_PATH = '/resume/SaiSreenath_Resume.pdf';
export const RESUME_DOWNLOAD_NAME = 'Sai-Sreenath-Reddy-Yarradoddi-Resume.pdf';

/** True for links that are still placeholders like "[ADD GITHUB LINK]". */
export function isPlaceholderLink(url?: string): boolean {
  return !url || url.trim().startsWith('[');
}

export const profile = {
  name: 'Sai Sreenath Reddy Yarradoddi',
  initials: 'SR',
  role: 'AI Engineer',
  roleLong: 'AI Engineer · Agentic AI, LLM & RAG systems · Python · AWS',
  email: 'saisreenathreddyy@gmail.com',
  phone: '+91 8688718090',
  location: 'Hyderabad, India',
  currentEmployer: 'Sutherland Global Services',
  // Placeholder crops of the current photo — replace with a professional headshot (same file names).
  profileImage: '/images/profile-portrait.webp',
  headshotImage: '/images/profile-headshot.webp',
  linkedin: 'https://in.linkedin.com/in/sreenathreddy165',
  github: 'https://github.com/sreenath165',
  youtube: 'https://www.youtube.com/@thescramblershooter',
  instagram: 'https://www.instagram.com/sai._.sreenathh/',

  hero: {
    subtitle: 'AI Engineer building and deploying production Agentic AI and LLM applications.',
    summary:
      'I build RAG pipelines and multi-agent systems with Python, FastAPI and React, and take them from prototype to deployment with the teams who use them. At Sutherland I helped cut proposal creation time by about 60%. AWS and Azure certified.',
    badge: 'Open to full-time AI Engineer & Forward Deployed Engineer roles',
  },

  // Used in <meta> and the footer
  summary:
    'AI Engineer building production Agentic AI, LLM and RAG applications with Python, FastAPI, React and AWS. AWS and Azure certified.',

  about: {
    summary:
      'I am an AI engineer focused on Agentic AI and LLM-powered applications. I take ideas from prototype to deployment: RAG pipelines, multi-agent workflows, Python backends and cloud-native releases on AWS and Azure. At Sutherland I work on Propello, an AI proposal platform for IT service teams. Earlier, at Versalence, I built an industry-first system that automates QRF-to-BOQ generation and delivered a voice-assistant app for the Telangana Government. I am looking for a full-time AI Engineer or Forward Deployed Engineer role where I can ship AI products that solve real business problems.',
    strengths: [
      { title: 'Production Agentic AI', proof: 'Propello (Sutherland) and the QRF-to-BOQ system (Versalence)' },
      { title: 'RAG pipelines', proof: 'RAG Q&A agent on AWS Bedrock; FAISS-based FAQ assistant' },
      { title: 'Python backends & APIs', proof: 'FastAPI services and backend/API integrations across Propello' },
      { title: 'Delivery with clients', proof: 'Shipped an Android & iOS voice assistant for the Telangana Government' },
    ],
    beyondCode:
      'Outside work I ride motorcycles and run a motovlogging channel on YouTube — it is how I unwind and explore new places.',
  },
};

export const proofStats = [
  { value: '~60%', label: 'faster proposal creation', context: 'Propello · Sutherland' },
  { value: '~70%', label: 'less manual effort', context: 'QRF-to-BOQ · Versalence' },
  { value: '6', label: 'certifications & courses', context: 'AWS · Azure · Coursera' },
];

// ─── Skills ──────────────────────────────────────────────────────────
export const coreSkills = [
  { name: 'Python', proof: 'Propello, QRF-to-BOQ' },
  { name: 'Agentic AI', proof: 'Propello, QRF-to-BOQ' },
  { name: 'RAG', proof: 'Bedrock Q&A agent, FAQ assistant' },
  { name: 'LLMs', proof: 'AWS Bedrock, Gemini, GPT-3.5' },
  { name: 'LangChain', proof: 'Propello, FAQ assistant' },
  { name: 'FastAPI', proof: 'Propello, ProdSync' },
  { name: 'AWS', proof: 'Bedrock · Cloud Practitioner' },
  { name: 'React', proof: 'Propello, ProdSync' },
];

export const skillGroups = [
  {
    title: 'AI & LLM',
    core: ['LLMs', 'RAG', 'Agentic AI systems', 'Multi-agent architectures', 'LangChain', 'Prompt engineering'],
    also: ['LangGraph', 'n8n', 'Flowise', 'TensorFlow', 'Scikit-Learn'],
  },
  {
    title: 'Backend',
    core: ['Python', 'FastAPI', 'REST APIs'],
    also: ['Flask', 'Java', 'C++', 'Object-oriented programming', 'Data structures & algorithms'],
  },
  {
    title: 'Frontend',
    core: ['React', 'TypeScript'],
    also: ['JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Android Studio', 'Figma'],
  },
  {
    title: 'Cloud & DevOps',
    core: ['AWS (incl. Bedrock)', 'Azure'],
    also: ['Docker', 'Kubernetes', 'Git', 'CI/CD pipelines'],
  },
  {
    title: 'Data',
    core: ['SQL', 'MongoDB', 'Vector databases'],
    also: ['Pandas', 'NumPy', 'OpenPyXL', 'Cassandra'],
  },
];

// ─── Experience ──────────────────────────────────────────────────────
export interface ExperienceBullet {
  text: string;
  /** Substring of `text` rendered in bold (the outcome number). */
  highlight?: string;
}

export const experience = [
  {
    id: 1,
    title: 'Senior Associate, Application Development',
    officialTitle: 'Senior Associate - DES - App Dev',
    company: 'Sutherland Global Services Pvt. Ltd.',
    location: 'Hyderabad, India',
    period: 'Nov 2025 – Present',
    type: 'Full-time',
    bullets: [
      {
        text: 'Built Propello, an Agentic AI proposal platform for IT service teams, with Python, FastAPI, React and MongoDB — reducing proposal creation time by ~60%.',
        highlight: '~60%',
      },
      {
        text: 'Developed an end-to-end RAG-based Q&A agent on AWS Bedrock and LangChain that answers complex proposal questions from the document store.',
      },
      {
        text: 'Led backend and API integrations across the platform, connecting the AI services to the product.',
      },
    ] as ExperienceBullet[],
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'AWS Bedrock', 'MongoDB'],
    projects: [
      {
        name: 'Propello — AI Proposal Builder',
        description:
          'Agentic AI-powered proposal platform for IT service teams that automates the proposal creation workflow. Uses RAG pipelines and LLM orchestration to generate proposals from templates and historical data.',
        tools: ['Python', 'FastAPI', 'React', 'TypeScript', 'AWS Bedrock', 'MongoDB', 'LangChain'],
        keyAchievement: 'Reduced proposal creation time by approximately 60%',
        client: 'Internal Product Development',
      },
      {
        name: 'RAG-based Q&A Agent',
        description:
          'End-to-end RAG-based Q&A agent with context-aware responses for Propello. Retrieves relevant information from document stores and generates accurate answers with an LLM.',
        tools: ['Python', 'LangChain', 'AWS Bedrock', 'Vector Database', 'FastAPI'],
        keyAchievement: 'Instant, accurate answers to complex proposal-related queries',
        client: 'Internal Product Development',
      },
    ],
  },
  {
    id: 2,
    title: 'AI/ML Engineer',
    officialTitle: 'AI/ML Engineer',
    company: 'Versalence Infocomm Pvt. Ltd.',
    location: 'Bengaluru, India',
    period: 'Apr 2025 – Oct 2025',
    type: 'Full-time',
    bullets: [
      {
        text: 'Automated QRF-to-BOQ generation with an industry-first Agentic AI system (custom RAG + LLM orchestration with Gemini, Pandas and OpenPyXL), cutting manual effort by ~70% for enterprise clients.',
        highlight: '~70%',
      },
      {
        text: 'Delivered an Android & iOS app with a native-language (Telugu) voice assistant for the Telangana Government, using Gemini, speech-to-text and text-to-speech.',
      },
    ] as ExperienceBullet[],
    technologies: ['Python', 'Gemini LLM', 'RAG', 'Pandas', 'OpenPyXL', 'Android'],
    projects: [
      {
        name: 'QRF-to-BOQ Automation System',
        description:
          'Industry-first Agentic AI system using custom RAG + LLM orchestration to convert Quotation Request Forms (QRF) into Bills of Quantities (BOQ).',
        tools: ['Python', 'Gemini LLM', 'Pandas', 'OpenPyXL', 'RAG', 'Custom LLM Orchestration'],
        keyAchievement: 'Reduced manual effort by approximately 70%',
        client: 'Enterprise Clients',
      },
      {
        name: 'Telangana Government Voice Assistant App',
        description:
          'AI-powered Android & iOS application with a native-language voice assistant that lets citizens use government services by voice in Telugu and other regional languages.',
        tools: ['Android Studio', 'Firebase', 'Gemini LLM', 'Speech-to-Text', 'Text-to-Speech'],
        keyAchievement: 'Multilingual voice-based access to government services',
        client: 'Telangana State Government',
      },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────
export type ProjectCategory = 'AI' | 'Full-Stack' | 'Cloud' | 'ML' | 'Other';
export const projectCategories: ProjectCategory[] = ['AI', 'Full-Stack', 'Cloud', 'ML', 'Other'];

export interface ArchitectureStep {
  label: string;
  detail?: string;
}

export interface CaseStudy {
  summary: string;
  problem: string;
  built: string[];
  architecture: ArchitectureStep[];
  /** Data stores / services the flow reads from, shown under the diagram. */
  stores?: ArchitectureStep[];
  result: string;
  resultMetric?: string;
  context?: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  categories: ProjectCategory[];
  /** featured = case study; main = other professional/AI work; more = games & older college work */
  tier: 'featured' | 'main' | 'more';
  image?: string;
  github?: string;
  demo?: string;
  mediaType?: 'video' | 'pdf' | 'link';
  mediaUrl?: string;
  resultLine?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'propello',
    title: 'Propello — AI Proposal Builder',
    description:
      'Agentic AI proposal platform for IT service teams: RAG over templates and past proposals, LLM orchestration, and a FastAPI + React product around it.',
    technologies: ['Python', 'FastAPI', 'React', 'MongoDB', 'Agentic AI', 'RAG'],
    features: ['End-to-end workflow automation', 'LLM-based AI logic', 'Intelligent agent orchestration'],
    categories: ['AI', 'Full-Stack', 'Cloud'],
    tier: 'featured',
    image: '/images/projects/propello.jpg',
    github: '[ADD GITHUB LINK]',
    demo: '[ADD PROJECT DEMO]',
    resultLine: '~60% faster proposal creation',
    caseStudy: {
      summary: 'An Agentic AI platform that drafts proposals for IT service teams from templates and historical proposals.',
      context: 'Sutherland Global Services · Internal product',
      problem:
        'Writing a proposal meant manually pulling content from templates and past proposals, then tailoring it — slow, repetitive work for IT service teams.',
      built: [
        'Backend and API integrations in Python and FastAPI connecting the AI services to the React product.',
        'An end-to-end RAG-based Q&A agent on AWS Bedrock and LangChain for context-aware answers from the document store.',
        'LLM orchestration and agent workflows that automate the proposal creation flow end to end.',
      ],
      architecture: [
        { label: 'Proposal team', detail: 'React + TypeScript UI' },
        { label: 'API layer', detail: 'Python · FastAPI' },
        { label: 'Agent orchestration', detail: 'LangChain · RAG' },
        { label: 'LLM', detail: 'AWS Bedrock' },
      ],
      stores: [
        { label: 'MongoDB', detail: 'Application data' },
        { label: 'Vector store', detail: 'Templates & past proposals' },
      ],
      resultMetric: '~60%',
      result: 'reduction in proposal creation time.',
    },
  },
  {
    id: 15,
    slug: 'qrf-to-boq',
    title: 'QRF-to-BOQ Automation System',
    description:
      'Industry-first Agentic AI system that converts Quotation Request Forms into Bills of Quantities using custom RAG and LLM orchestration.',
    technologies: ['Python', 'Gemini LLM', 'RAG', 'Pandas', 'OpenPyXL'],
    features: ['Document understanding', 'Custom LLM orchestration', 'Spreadsheet BOQ output'],
    categories: ['AI'],
    tier: 'featured',
    resultLine: '~70% less manual effort',
    caseStudy: {
      summary: 'An Agentic AI system that turns Quotation Request Forms (QRF) into Bills of Quantities (BOQ) for enterprise clients.',
      context: 'Versalence Infocomm · Enterprise clients',
      problem:
        'Converting QRF documents into a BOQ was done by hand, line by line — slow and error-prone for document-heavy enquiries.',
      built: [
        'A custom RAG pipeline that grounds the model in the QRF content and reference data.',
        'LLM orchestration with Gemini that extracts, structures and maps line items to BOQ entries.',
        'Pandas and OpenPyXL processing that produces a ready-to-use BOQ spreadsheet.',
      ],
      architecture: [
        { label: 'QRF documents', detail: 'Client enquiries' },
        { label: 'Ingestion', detail: 'Python · Pandas' },
        { label: 'RAG + orchestration', detail: 'Custom agents' },
        { label: 'LLM', detail: 'Gemini' },
        { label: 'BOQ output', detail: 'OpenPyXL spreadsheet' },
      ],
      resultMetric: '~70%',
      result: 'reduction in manual effort.',
    },
  },
  {
    id: 2,
    slug: 'prodsync',
    title: 'ProdSync — Deployment Orchestration',
    description:
      'Deployment orchestration platform where engineers trigger and track releases in natural language, with JIRA integration, real-time monitoring and intelligent rollback.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'AWS Bedrock', 'Tailwind CSS'],
    features: ['Natural language deployment', 'JIRA integration', 'Real-time monitoring', 'Intelligent rollback'],
    categories: ['AI', 'Full-Stack', 'Cloud'],
    tier: 'featured',
    image: '/images/projects/prodsync.jpg',
    github: '[ADD GITHUB LINK]',
    demo: '[ADD PROJECT DEMO]',
    resultLine: 'Natural-language deployments with rollback',
    caseStudy: {
      summary: 'An AI-assisted platform that turns natural-language requests into orchestrated deployments.',
      problem:
        'Coordinating deployments across tickets, pipelines and monitoring takes many manual steps and context switches for DevOps teams.',
      built: [
        'Natural-language deployment requests interpreted with an LLM on AWS Bedrock.',
        'JIRA integration so deployments stay linked to the work they ship.',
        'Real-time monitoring with intelligent rollback, behind a FastAPI backend and React + Tailwind UI.',
      ],
      architecture: [
        { label: 'Engineer', detail: 'Natural-language request' },
        { label: 'Web app', detail: 'React · TypeScript · Tailwind' },
        { label: 'Orchestrator', detail: 'Python · FastAPI' },
        { label: 'Intent & planning', detail: 'AWS Bedrock' },
        { label: 'Deploy & monitor', detail: 'Pipeline · rollback' },
      ],
      stores: [{ label: 'JIRA', detail: 'Ticket context' }],
      result: 'Natural-language deployments with JIRA traceability, real-time monitoring and intelligent rollback.',
    },
  },
  {
    id: 4,
    slug: 'rag-faq-assistant',
    title: 'AI-Powered FAQ Assistant (RAG)',
    description:
      'GPT-3.5 assistant with LangChain and FAISS that answers FAQs with context-aware memory through a Streamlit interface.',
    technologies: ['Python', 'GPT-3.5', 'LangChain', 'FAISS', 'Streamlit'],
    features: ['Context-aware responses', 'RAG implementation', 'FAISS vector search'],
    categories: ['AI'],
    tier: 'featured',
    image: '/images/projects/faq-assistant.jpg',
    github: 'https://github.com/sreenath165/AI-Powered-FAQ-Assistant-with-Context-Aware-Memory',
    resultLine: 'Grounded answers with conversation memory',
    caseStudy: {
      summary: 'A retrieval-augmented FAQ assistant that answers from a knowledge base and remembers the conversation.',
      problem:
        'Plain chatbots either hallucinate or forget earlier turns, so users repeat themselves and get answers not grounded in the FAQ content.',
      built: [
        'A RAG pipeline that embeds FAQ content and retrieves the closest passages with FAISS.',
        'LangChain conversational memory so follow-up questions keep their context.',
        'A Streamlit interface for asking questions and viewing answers.',
      ],
      architecture: [
        { label: 'User question', detail: 'Streamlit UI' },
        { label: 'Chain + memory', detail: 'LangChain' },
        { label: 'Retrieval', detail: 'FAISS similarity search' },
        { label: 'LLM', detail: 'GPT-3.5' },
      ],
      stores: [{ label: 'FAISS index', detail: 'Embedded FAQ content' }],
      result: 'Context-aware answers grounded in the FAQ knowledge base, with memory across turns.',
    },
  },
  {
    id: 5,
    slug: 'ticket-analyzer',
    title: 'Customer Support Ticket Analyzer',
    description:
      'Multi-agent system that classifies customer support tickets, assesses priority and routes them by severity.',
    technologies: ['Python', 'Agentic AI', 'Multi-Agent Architecture', 'NLP'],
    features: ['Intelligent classification', 'Severity-based routing', 'Priority assessment'],
    categories: ['AI'],
    tier: 'main',
    image: '/images/projects/ticket-analyzer.jpg',
    github: 'https://github.com/sreenath165/Customer-Support-Ticket-Analyzer-And-Router',
  },
  {
    id: 3,
    slug: 'smart-weed-robot',
    title: 'Smart Weed Detection Robot',
    description:
      'Mobile-controlled robot using YOLOv5 and CNN for weed detection and targeted herbicide spraying, with Android app integration.',
    technologies: ['Python', 'YOLOv5', 'CNN', 'Android', 'Bluetooth', 'TensorFlow'],
    features: ['Real-time weed detection', 'Soil moisture analysis', 'Live video streaming', 'Mobile control'],
    categories: ['ML'],
    tier: 'main',
    image: '/images/projects/weed-detection.webp',
    github: 'https://drive.google.com/drive/folders/18CA4d2ccdWUVpMyi3jLP3SNLs3y4n3Il?usp=sharing',
    mediaType: 'link',
    mediaUrl: 'https://drive.google.com/drive/folders/18CA4d2ccdWUVpMyi3jLP3SNLs3y4n3Il?usp=sharing',
  },
  {
    id: 14,
    slug: 'weed-plucking-robot',
    title: 'Weed Detection & Plucking Robot (Hybrid CNN)',
    description:
      'Autonomous robot using a hybrid CNN architecture for accurate weed detection and automated plucking in agricultural fields.',
    technologies: ['Python', 'CNN', 'Deep Learning', 'Robotics', 'Computer Vision'],
    features: ['Hybrid CNN model', 'Automated weed plucking', 'Real-time detection'],
    categories: ['ML'],
    tier: 'main',
    image: '/images/projects/weed-hybrid-cnn.jpg',
    github: 'https://github.com/sreenath165/Weed-Detection-And-Plucking-Robot-Using-Hybrid-CNN',
  },
  {
    id: 9,
    slug: 'fertilizer-prediction',
    title: 'Fertilizer Prediction using ML',
    description:
      'Machine learning model that recommends the optimal fertilizer from soil and crop data for precision agriculture.',
    technologies: ['Python', 'Machine Learning', 'Scikit-Learn', 'Agriculture'],
    features: ['Soil analysis', 'Crop-based recommendations', 'ML predictions'],
    categories: ['ML'],
    tier: 'main',
    image: '/images/projects/fertilizer-ml.jpg',
    github: 'https://github.com/sreenath165/Fertilizer-Prediction-using-ML',
  },
  {
    id: 8,
    slug: 'post-quantum-rsa',
    title: 'Post-Quantum Lattice-Based RSA',
    description:
      'Lightweight post-quantum cryptographic scheme using lattice-based RSA for communications resistant to quantum attacks.',
    technologies: ['Python', 'Cryptography', 'Lattice-Based', 'Security'],
    features: ['Quantum-resistant encryption', 'Lightweight implementation', 'Secure communications'],
    categories: ['Other'],
    tier: 'main',
    image: '/images/projects/quantum-rsa.jpg',
    github: 'https://github.com/sreenath165/A-Lightweight-Post-Quantum-Lattice-Based-RSA-for-Secure-Communications',
    mediaType: 'pdf',
    mediaUrl: '/videos/projects/quantum-rsa.pdf',
  },
  {
    id: 6,
    slug: 'ecommerce-inventory',
    title: 'E-Commerce Sales & Inventory Management',
    description: 'Full-stack e-commerce platform with sales tracking, inventory management and an analytics dashboard.',
    technologies: ['Python', 'Database', 'Analytics', 'Web Development'],
    features: ['Sales tracking', 'Inventory management', 'Analytics dashboard'],
    categories: ['Full-Stack'],
    tier: 'more',
    image: '/images/projects/ecommerce.jpg',
    github: 'https://github.com/sreenath165/E-Commerce-Sales-and-Inventory-Management',
  },
  {
    id: 7,
    slug: 'blockchain-hospital-records',
    title: 'Blockchain Hospital Record Management',
    description: 'Hospital record management on a blockchain for tamper-proof medical data storage.',
    technologies: ['Blockchain', 'Python', 'Cryptography', 'Healthcare'],
    features: ['Tamper-proof records', 'Secure data storage', 'Decentralized system'],
    categories: ['Other'],
    tier: 'more',
    image: '/images/projects/blockchain-hospital.jpg',
    github: 'https://github.com/sreenath165/Blockchain-based-Hospital-Record-management',
  },
  {
    id: 10,
    slug: 'freelance-platform',
    title: 'Freelance Platform',
    description: 'Web-based freelance marketplace connecting clients with freelancers for project-based work.',
    technologies: ['Web Development', 'Database', 'Full-Stack'],
    features: ['User profiles', 'Project listings', 'Client-freelancer matching'],
    categories: ['Full-Stack'],
    tier: 'more',
    image: '/images/projects/freelance.jpg',
    github: 'https://github.com/sreenath165/Freelance-Platform',
  },
  {
    id: 11,
    slug: 'bee-run-game',
    title: '2D Bee Run Game',
    description: '2D endless runner built with Unity featuring a bee navigating through obstacles.',
    technologies: ['Unity', 'C#', 'Game Development', '2D Graphics'],
    features: ['Endless runner gameplay', 'Obstacle avoidance', 'Score tracking'],
    categories: ['Other'],
    tier: 'more',
    image: '/images/projects/bee-run.jpg',
    github: 'https://github.com/sreenath165/2D-Bee-run-game-using-Unity',
    mediaType: 'video',
    mediaUrl: '/videos/projects/bee-run-demo.mp4',
  },
  {
    id: 12,
    slug: 'ball-game-3d',
    title: '3D Ball Game',
    description: 'Physics-based 3D ball rolling game built with Unity, with progressively harder levels.',
    technologies: ['Unity', 'C#', 'Game Development', '3D Physics'],
    features: ['Physics-based gameplay', 'Level progression', '3D environment'],
    categories: ['Other'],
    tier: 'more',
    image: '/images/projects/ball-game.jpg',
    github: 'https://github.com/sreenath165/3D-Ball-game-using-Unity',
    mediaType: 'video',
    mediaUrl: '/videos/projects/ball-game-demo.mp4',
  },
  {
    id: 13,
    slug: 'immersive-3d-environment',
    title: 'Immersive 3D Environment',
    description: 'Realistic 3D environment built with Unity, with immersive landscapes and detailed scenery.',
    technologies: ['Unity', 'C#', '3D Modeling', 'Environment Design'],
    features: ['Realistic landscapes', 'Immersive experience', 'Detailed scenery'],
    categories: ['Other'],
    tier: 'more',
    image: '/images/projects/3d-environment.jpg',
    github: 'https://github.com/sreenath165/Immersive-Realistic-3D-Environment-using-Unity',
    mediaType: 'video',
    mediaUrl: '/videos/projects/3d-environment-demo.mp4',
  },
];

export const featuredProjects = projects.filter(p => p.tier === 'featured');

// ─── Certifications & courses ────────────────────────────────────────
export interface Certification {
  id: number;
  title: string;
  issuer: 'Amazon Web Services' | 'Microsoft' | 'Coursera';
  code?: string;
  date: string;
  description: string;
  image?: string;
  verifyLink: string;
  kind: 'certification' | 'course';
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Dec 2024',
    description: 'Cloud architecture, scalable infrastructure, security and cost-optimized deployment.',
    image: '/images/certifications/aws-cp-certificate.webp',
    verifyLink: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/PEYGKJGDS14Q1L3T',
    kind: 'certification',
  },
  {
    id: 5,
    title: 'Microsoft Certified: Azure Administrator Associate',
    issuer: 'Microsoft',
    code: 'AZ-104',
    date: 'Oct 2024',
    description: 'Managing Azure compute, networking, storage, identity and monitoring.',
    image: '/images/certifications/azure-administrator-az-104-certificate.webp',
    verifyLink: 'https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/572c716e8633f085',
    kind: 'certification',
  },
  {
    id: 6,
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    code: 'AI-900',
    date: 'Sep 2024',
    description: 'AI and ML concepts on Azure, including NLP, computer vision and responsible AI.',
    image: '/images/certifications/azure-ai-900-certificate.webp',
    verifyLink: 'https://learn.microsoft.com/en-us/users/yarradoddisaisreenathreddy-4880/credentials/94e29beb87903a3f',
    kind: 'certification',
  },
  {
    id: 2,
    title: 'AWS Generative AI and AI Agents with Amazon Bedrock',
    issuer: 'Coursera',
    date: '2024',
    description: 'Building generative AI applications and agents with Amazon Bedrock AgentCore and foundation models.',
    image: '/images/certifications/aws-bedrock.jpg',
    verifyLink: '[ADD VERIFY LINK]',
    kind: 'course',
  },
  {
    id: 3,
    title: 'AI Agents and Agentic AI with Python',
    issuer: 'Coursera',
    date: '2024',
    description: 'Autonomous, goal-driven agents using LLMs, tools, memory and multi-step reasoning.',
    image: '/images/certifications/agentic-ai.jpg',
    verifyLink: '[ADD VERIFY LINK]',
    kind: 'course',
  },
  {
    id: 4,
    title: 'Retrieval Augmented Generation (RAG) — DeepLearning.AI',
    issuer: 'Coursera',
    date: '2024',
    description: 'RAG pipelines with embeddings, vector databases and LLMs for context-aware responses.',
    image: '/images/certifications/rag.jpg',
    verifyLink: '[ADD VERIFY LINK]',
    kind: 'course',
  },
];

// ─── Education ───────────────────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'Vellore Institute of Technology (VIT)',
    location: 'Chennai',
    period: 'Sep 2021 – Apr 2025',
    score: 'CGPA 7.56/10',
    description: 'Focused on software engineering, AI/ML and cloud computing.',
    primary: true,
  },
  {
    id: 2,
    degree: 'Intermediate (MPC)',
    institution: 'FIITJEE Junior College',
    location: 'Vijayawada',
    period: '2019 – 2021',
    score: '965/1000',
    description: 'Mathematics, Physics and Chemistry.',
    primary: false,
  },
  {
    id: 3,
    degree: 'SSC',
    institution: 'Government High School',
    location: 'Piler',
    period: '2018 – 2019',
    score: '10/10 GPA',
    description: 'Secondary education with distinction.',
    primary: false,
  },
];
