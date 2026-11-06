export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: 'computer_vision' | 'llm_rag' | 'fullstack_ai';
  categoryLabel: string;
  featured?: boolean;
  tags: string[];
  keyFeatures: string[];
  githubUrl: string;
  liveDemoAvailable?: boolean;
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  items: {
    name: string;
    level: string; // e.g. "Core / Advanced", "Intermediate", etc.
    description: string;
  }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Rohit',
    tagline: 'B.Tech CSE (AI & Data Science) Student & AI Developer',
    institution: 'NIAT x Noida International University (NIU) — 1st Year',
    location: 'Greater Noida, Delhi NCR, India',
    coreFocus: 'Artificial Intelligence, Machine Learning, Computer Vision, and Full-Stack AI Applications',
    primarySkill: 'Python (PyTorch, OpenCV, FastAPI)',
    email: 'rk83af@gmail.com',
    github: 'https://github.com/beingrohit02',
    linkedin: 'https://linkedin.com/in/beingrohit',
    bioParagraphs: [
      "I am a 1st-year B.Tech Computer Science and Engineering student specializing in Artificial Intelligence & Data Science at NIAT x Noida International University. From the very beginning of my engineering journey, my goal has been to move beyond theoretical models and engineer real-world intelligent systems that solve complex physical and digital problems.",
      "My primary development language is Python, which I use across deep learning frameworks like PyTorch and OpenCV, as well as production-ready backend architectures with FastAPI. Whether it is building real-time object detection pipelines with YOLO, creating context-aware RAG pipelines using local LLMs, or deploying responsive frontends, I focus on building reliable, high-performance software."
    ],
    avatarImage: '',
  },
  highlights: [
    {
      label: 'Degree & Program',
      value: 'B.Tech CSE — AI & DS',
      detail: '1st Year Undergraduate at NIAT x NIU',
    },
    {
      label: 'Core Focus',
      value: 'AI & Computer Vision',
      detail: 'Object Detection, YOLO, RAG & Edge AI',
    },
    {
      label: 'Primary Stack',
      value: 'Python & PyTorch',
      detail: 'FastAPI, OpenCV, React, PostgreSQL',
    },
    {
      label: 'Base Location',
      value: 'Noida, India',
      detail: 'Delhi NCR Tech & Innovation Hub',
    },
  ],
  stats: [
    { value: '1st Year', label: 'Academic Standing' },
    { value: '4+', label: 'AI Projects Engineered' },
    { value: '30+ FPS', label: 'Real-Time Edge Inference' },
    { value: '100%', label: 'Open Source Codebase' },
  ],
  featuredProject: {
    id: 'citypulse',
    title: 'CityPulse — AI-Powered Smart City Control & Command Center',
    subtitle: 'Unified Urban Incident Management & Emergency Dispatch Platform',
    description:
      'A unified urban management platform integrating Large Language Models (RAG), computer vision incident detection, and rule-based priority scoring to assist city authorities in real-time monitoring and emergency response.',
    image: '',
    category: 'computer_vision',
    categoryLabel: 'Urban AI & Computer Vision',
    featured: true,
    keyFeatures: [
      'LLM (RAG) Emergency Protocol Synthesis',
      'YOLOv8 Computer Vision Incident Detection',
      'Deterministic Priority Scoring Engine',
      'Interactive GIS Spatial Telemetry & Mapping',
    ],
    tags: [
      'React.js',
      'Tailwind CSS',
      'Python (FastAPI)',
      'PostgreSQL',
      'YOLOv8',
      'Leaflet / GIS',
      'Ollama / LLM APIs',
    ],
    githubUrl: 'https://github.com/beingrohit02/CityPulse',
    liveDemoAvailable: true,
    metrics: [
      { label: 'Inference Latency', value: '28ms / frame' },
      { label: 'Priority Triage Accuracy', value: '96.4%' },
      { label: 'Protocol Retrieval', value: 'Instant RAG' },
    ],
  } as Project,
  secondaryProjects: [] as Project[],
  skillsMatrix: [
    {
      title: 'Languages',
      subtitle: 'Core programming foundations',
      items: [
        {
          name: 'Python',
          level: 'Primary Focus',
          description: 'PyTorch, OpenCV, NumPy, Pandas, FastAPI, async programming',
        },
        {
          name: 'C++',
          level: 'Academic Core',
          description: 'Data structures, algorithms, pointers, memory model',
        },
        {
          name: 'JavaScript / TypeScript',
          level: 'Proficient',
          description: 'React components, state architecture, async fetch, types',
        },
        {
          name: 'SQL',
          level: 'Proficient',
          description: 'PostgreSQL, schema indexing, relational modeling',
        },
      ],
    },
    {
      title: 'AI & Data Science',
      subtitle: 'Machine learning & perception',
      items: [
        {
          name: 'PyTorch',
          level: 'Core Framework',
          description: 'Custom neural architectures, CNNs, tensors, training loops',
        },
        {
          name: 'OpenCV & YOLO',
          level: 'Computer Vision',
          description: 'YOLOv8 object detection, contour analysis, video processing',
        },
        {
          name: 'LLMs & Prompt Engineering',
          level: 'Advanced',
          description: 'Context design, system prompting, structured JSON output',
        },
        {
          name: 'Retrieval-Augmented Generation (RAG)',
          level: 'Hands-on',
          description: 'Vector embeddings, chunking strategies, semantic search',
        },
      ],
    },
    {
      title: 'Web & Databases',
      subtitle: 'Building production interfaces',
      items: [
        {
          name: 'FastAPI',
          level: 'Backend Standard',
          description: 'High-performance async Python APIs, Pydantic validation',
        },
        {
          name: 'React.js',
          level: 'Frontend Standard',
          description: 'Component lifecycles, hooks, responsive state handling',
        },
        {
          name: 'Tailwind CSS',
          level: 'Styling',
          description: 'Modern neo-brutalist & cyber aesthetic layouts, dark mode',
        },
        {
          name: 'PostgreSQL & Supabase',
          level: 'Database',
          description: 'Relational data persistence, foreign keys, row queries',
        },
      ],
    },
    {
      title: 'Tools & Environments',
      subtitle: 'Engineering workflow & deployment',
      items: [
        {
          name: 'Git & GitHub',
          level: 'Version Control',
          description: 'Branch workflows, pull requests, semantic commit logs',
        },
        {
          name: 'Ollama & Gemma',
          level: 'Local AI Runtimes',
          description: 'Self-hosted open weights model serving and testing',
        },
        {
          name: 'VS Code & Linux',
          level: 'Dev Environment',
          description: 'Bash scripting, CLI toolchains, virtual environments',
        },
        {
          name: 'Docker & Postman',
          level: 'Tooling',
          description: 'API endpoint testing, containerized application environments',
        },
      ],
    },
  ] as SkillCategory[],
};
