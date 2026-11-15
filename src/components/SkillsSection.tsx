import { useRef, useState } from 'react';
import type { WheelEvent } from 'react';
import { BrainCircuit, Braces, Globe2, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { WarpCarousel } from './ui/WarpCarousel';
import type { WarpCard } from './ui/WarpCarousel';

const categoryIcons = [Braces, BrainCircuit, Globe2, Wrench];

const toolkitCards: WarpCard[] = [
  {
    title: 'Languages\n& foundations',
    value: '01',
    footer: 'Python · C++ · TypeScript · SQL',
    detail: 'slider',
    labels: ['Logic', 'Syntax'],
    accent: '#d4ef84',
    glow: '#8caf65',
    numeral: ['#d4ef84', '#ffffff'],
    mesh: ['#102822', '#14372f', '#1f4e40', '#36745c', '#8cae67', '#d4ef84'],
  },
  {
    title: 'AI & data\nscience',
    value: '02',
    footer: 'PyTorch · OpenCV · YOLO · RAG',
    detail: 'cross',
    labels: ['Vision', 'Models', 'Context'],
    accent: '#b9e5d2',
    glow: '#6eaa91',
    numeral: ['#b9e5d2', '#ffffff'],
    mesh: ['#102933', '#123b44', '#1e5a60', '#357e76', '#7eb79a', '#cfe9b7'],
  },
  {
    title: 'Web &\ndatabases',
    value: '03',
    footer: 'FastAPI · React · PostgreSQL',
    detail: 'ring',
    labels: ['Interfaces', 'Services'],
    accent: '#efe7b0',
    glow: '#b5b46c',
    numeral: ['#efe7b0', '#ffffff'],
    mesh: ['#222a22', '#343c2c', '#4c5d3c', '#6e8050', '#a5b56a', '#e3dc98'],
  },
  {
    title: 'Tools &\nenvironments',
    value: '04',
    footer: 'Git · Docker · Linux · Ollama',
    detail: 'wave',
    labels: ['Build', 'Ship'],
    accent: '#d4ef84',
    glow: '#91ad62',
    numeral: ['#d4ef84', '#ffffff'],
    mesh: ['#252a22', '#353c2d', '#4d6042', '#668052', '#9db76b', '#d4ef84'],
  },
];

export function SkillsSection() {
  const [toolkitIndex, setToolkitIndex] = useState(0);
  const lastScrollStep = useRef(0);

  const handleToolkitWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (Math.abs(delta) < 14) return;

    const now = performance.now();
    if (now - lastScrollStep.current < 640) return;
    lastScrollStep.current = now;

    // Wheel down turns the ring from left to right; wheel up reverses it.
    const step = delta > 0 ? -1 : 1;
    setToolkitIndex((current) => (current + step + toolkitCards.length) % toolkitCards.length);
  };

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="shell-container">
        <Reveal direction="right">
          <SectionHeading
            id="skills-title"
            eyebrow="03 / Tools I reach for"
            title="A toolkit for the whole stack."
            description="From model experimentation to the product surface, I enjoy understanding how the pieces fit together."
          />
        </Reveal>

        <Reveal className="toolkit-warp-reveal" direction="right" delay={0.08}>
          <div className="toolkit-warp-panel" onWheel={handleToolkitWheel}>
            <div className="toolkit-warp-meta">
              <span>Scroll or drag to explore the stack</span>
              <span>{String(toolkitIndex + 1).padStart(2, '0')} / 04</span>
            </div>
            <div className="toolkit-warp-frame">
              <WarpCarousel
                cards={toolkitCards}
                index={toolkitIndex}
                onIndexChange={setToolkitIndex}
                autoplay={false}
                background="#e9eee2"
                glow="#a6c77b"
                warp={0.82}
                ariaLabel="Technical stack categories"
                style={{ width: '100%', height: '100%', minHeight: 420, aspectRatio: 'auto' }}
              />
            </div>
          </div>
        </Reveal>

        <div className="skills-grid">
          {PORTFOLIO_DATA.skillsMatrix.map((category, index) => {
            const Icon = categoryIcons[index] ?? Braces;

            return (
              <Reveal
                className="skill-card"
                delay={index * 0.1}
                direction="right"
                key={category.title}
              >
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
