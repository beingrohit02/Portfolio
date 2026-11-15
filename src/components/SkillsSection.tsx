import { BrainCircuit, Braces, Globe2, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

const categoryIcons = [Braces, BrainCircuit, Globe2, Wrench];

export function SkillsSection() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="shell-container">
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow="03 / Tools I reach for"
            title="A toolkit for the whole stack."
            description="From model experimentation to the product surface, I enjoy understanding how the pieces fit together."
          />
        </Reveal>

        <div className="skills-grid">
          {PORTFOLIO_DATA.skillsMatrix.map((category, index) => {
            const Icon = categoryIcons[index] ?? Braces;

            return (
              <Reveal className="skill-card" delay={index * 0.06} key={category.title}>
                <div className="skill-card-top">
                  <span className="skill-icon"><Icon size={20} aria-hidden="true" /></span>
                  <span className="skill-index">0{index + 1}</span>
                </div>
                <h3>{category.title}</h3>
                <p className="skill-card-subtitle">{category.subtitle}</p>

                <ul className="skill-list">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <div className="skill-item-heading">
                        <strong>{item.name}</strong>
                        <span>{item.level}</span>
                      </div>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
