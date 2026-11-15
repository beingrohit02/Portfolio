import { ArrowUpRight, Braces, ScanLine, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

const focusItems = [
  { icon: ScanLine, title: 'Computer vision', detail: 'Perception systems built with OpenCV and YOLO.' },
  { icon: Sparkles, title: 'Language models', detail: 'RAG workflows that connect models to useful context.' },
  { icon: Braces, title: 'Product engineering', detail: 'Interfaces and APIs that make AI easier to use.' },
];

export function About() {
  const { profile, stats } = PORTFOLIO_DATA;

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="shell-container">
        <Reveal>
          <SectionHeading
            id="about-title"
            eyebrow="01 / A little about me"
            title="Curiosity, then code."
            description="I’m interested in what happens after a model works in a notebook."
          />
        </Reveal>

        <div className="about-layout">
          <Reveal className="about-statement">
            <p className="about-lead">
              I’m a B.Tech CSE student specializing in AI &amp; Data Science at
              <strong> NIAT × Noida International University.</strong>
            </p>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              More about my journey <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal className="about-copy" delay={0.08}>
            <p>
              I like building complete systems: the model, the data flow, the backend,
              and the interface people use to make sense of it. Python is my main
              language, with PyTorch, OpenCV, and FastAPI in my toolkit.
            </p>
            <p>
              My current focus is on AI that can respond to real situations, from
              detecting incidents in a video feed to helping people find the right
              information quickly.
            </p>
            <div className="about-focus-list">
              {focusItems.map(({ icon: Icon, title, detail }) => (
                <div className="about-focus-item" key={title}>
                  <span className="about-focus-icon"><Icon size={17} aria-hidden="true" /></span>
                  <span><strong>{title}</strong><small>{detail}</small></span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="about-stats" aria-label="Portfolio highlights">
          {stats.slice(1, 4).map((stat, index) => (
            <Reveal className="stat-card" delay={index * 0.06} key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
