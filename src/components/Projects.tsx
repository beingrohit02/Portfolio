import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { ProjectOrbitCarousel } from './ui/ProjectOrbitCarousel';
import { PROJECT_ORBIT_SLIDES } from '../data/projectOrbitSlides';

export function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="shell-container">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow="02 / Selected work"
            title="One system, many moving parts."
            description="Scroll through the CityPulse modules: the command center, computer vision, and retrieval-augmented emergency guidance."
          />
        </Reveal>
      </div>
      <ProjectOrbitCarousel slides={PROJECT_ORBIT_SLIDES} />
      <p className="projects-footnote shell-container">
        Three connected views of one featured project · CityPulse
      </p>
    </section>
  );
}
