import type { Project } from './portfolioData';
import { PORTFOLIO_DATA } from './portfolioData';
import visionImage from '../assets/images/vision_incident_demo_1793996746762.jpg';
import ragImage from '../assets/images/rag_knowledge_graph_1793996745929.jpg';

export interface ProjectOrbitSlide {
  id: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  visualLabel: string;
  metricValue: string;
  metricLabel: string;
  features: string[];
  tags: string[];
  href: string;
}

const featuredProject: Project = PORTFOLIO_DATA.featuredProject;

export const PROJECT_ORBIT_SLIDES: ProjectOrbitSlide[] = [
  {
    id: 'citypulse',
    shortLabel: 'Command center',
    eyebrow: 'Featured project · CityPulse',
    title: 'City',
    subtitle: 'Pulse',
    description: 'The command center puts reported incidents on a city map and ranks them by priority, so a dispatcher can see where to send help first.',
    image: featuredProject.image,
    alt: 'CityPulse urban operations control room and live city map',
    visualLabel: 'Urban operations view',
    metricValue: featuredProject.metrics?.[0]?.value ?? 'CityPulse',
    metricLabel: featuredProject.metrics?.[0]?.label ?? 'Featured project',
    features: featuredProject.keyFeatures.slice(0, 3),
    tags: ['React', 'FastAPI', 'YOLOv8', 'GIS'],
    href: featuredProject.githubUrl,
  },
  {
    id: 'vision',
    shortLabel: 'Computer vision',
    eyebrow: 'Computer vision · CityPulse',
    title: 'See',
    subtitle: 'the signal',
    description: 'The vision module uses YOLOv8 to detect incidents in city video feeds and sends those detections to the command center.',
    image: visionImage,
    alt: 'Computer vision dashboard showing vehicle detections and incident telemetry',
    visualLabel: 'Incident detection view',
    metricValue: PORTFOLIO_DATA.stats[2]?.value ?? '30+ FPS',
    metricLabel: 'Real-time edge inference',
    features: [
      'YOLOv8 incident detection',
      'Live video feed analysis',
      'Spatial telemetry for responders',
    ],
    tags: ['YOLOv8', 'OpenCV', 'PyTorch', 'Edge AI'],
    href: featuredProject.githubUrl,
  },
  {
    id: 'rag',
    shortLabel: 'RAG protocols',
    eyebrow: 'Retrieval-augmented generation · CityPulse',
    title: 'Find',
    subtitle: 'the response',
    description: 'When a team needs guidance, the retrieval module finds relevant emergency protocols and uses them to generate a response for the incident.',
    image: ragImage,
    alt: 'Knowledge graph visualization representing retrieval-augmented generation',
    visualLabel: 'Protocol retrieval view',
    metricValue: featuredProject.metrics?.[2]?.value ?? 'RAG',
    metricLabel: 'Emergency protocol retrieval',
    features: [
      'Emergency protocol synthesis',
      'Context-aware retrieval',
      'Operational guidance in one workflow',
    ],
    tags: ['RAG', 'Embeddings', 'Ollama', 'LLMs'],
    href: featuredProject.githubUrl,
  },
];
