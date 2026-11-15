import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PROJECT_ORBIT_SLIDES } from '../data/projectOrbitSlides';
import type { ConveyorProject, ProjectTier } from './ui/SushiConveyorMenu';
import { ProjectConveyor } from './ui/SushiConveyorMenu';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

const PROJECT_MODULES: ConveyorProject[] = PROJECT_ORBIT_SLIDES.map((slide, index) => ({
  id: slide.id,
  name: slide.shortLabel,
  description: slide.description,
  price: slide.metricValue,
  tier: (index + 1) as ProjectTier,
  image: slide.image,
  details: slide.tags,
}));

export function Projects() {
  const projectUrl = PORTFOLIO_DATA.featuredProject.githubUrl;

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="shell-container">
        <Reveal direction="left">
          <SectionHeading
            id="projects-title"
            eyebrow="02 / Selected work"
            title="One system, many moving parts."
            description="Scroll down or up to move through the CityPulse command center, computer vision, and emergency guidance modules."
          />
        </Reveal>
      </div>

      <Reveal direction="left" delay={0.08}>
        <ProjectConveyor
          id="citypulse-modules"
          className="projects-conveyor"
          items={PROJECT_MODULES}
          eyebrow="CityPulse / System modules"
          heading="A toolkit for the whole city."
          caption="An AI-powered command center for urban incidents and emergency response."
          speed={20}
          autoplay
          interval={4300}
          legend={{ 1: 'Command', 2: 'Vision', 3: 'RAG' }}
          labels={{
            add: 'View on GitHub',
            close: 'Close',
            previous: 'Previous module',
            next: 'Next module',
            pause: 'Pause project motion',
          }}
          onAdd={() => window.open(projectUrl, '_blank', 'noopener,noreferrer')}
          action={(
            <a className="project-conveyor-link" href={projectUrl} target="_blank" rel="noreferrer">
              Explore CityPulse <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        />
      </Reveal>

      <p className="projects-footnote shell-container">
        Three connected views of one featured project · CityPulse
      </p>
    </section>
  );
}
