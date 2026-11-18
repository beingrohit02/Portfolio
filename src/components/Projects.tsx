import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PROJECT_ORBIT_SLIDES as systemViews } from '../data/projectOrbitSlides';
import './Projects.css';

export function Projects() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigateViews(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = systemViews.length - 1;
    let next: number;
    switch (event.key) {
      case 'ArrowDown': next = index === last ? 0 : index + 1; break;
      case 'ArrowUp': next = index === 0 ? last : index - 1; break;
      case 'Home': next = 0; break;
      case 'End': next = last; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="case-study" id="projects" aria-labelledby="projects-title">
      <div className="shell-container">
        <header className="case-heading">
          <div>
            <p className="case-kicker">Selected work</p>
            <h2 id="projects-title">City<em>Pulse</em></h2>
          </div>
          <div className="case-summary">
            <p>A city incident dashboard that brings video detection, emergency protocols, and dispatch into one place.</p>
            <a className="case-source" href={PORTFOLIO_DATA.featuredProject.githubUrl} target="_blank" rel="noreferrer">
              View source on GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="case-inside">
          <div className="case-index">
            <h3 id="citypulse-views-title">Inside the system</h3>
            <div role="tablist" aria-labelledby="citypulse-views-title" aria-orientation="vertical">
              {systemViews.map((view, index) => (
                <button
                  key={view.id}
                  type="button"
                  role="tab"
                  id={`citypulse-tab-${view.id}`}
                  aria-selected={selected === index}
                  aria-controls={`citypulse-panel-${view.id}`}
                  tabIndex={selected === index ? 0 : -1}
                  className="case-tab"
                  ref={(node) => { tabRefs.current[index] = node; }}
                  onClick={() => setSelected(index)}
                  onKeyDown={(event) => navigateViews(event, index)}
                >
                  {view.shortLabel}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {systemViews.map((view, index) => (
            <div
              key={view.id}
              role="tabpanel"
              id={`citypulse-panel-${view.id}`}
              aria-labelledby={`citypulse-tab-${view.id}`}
              className="case-panel"
              hidden={selected !== index}
              tabIndex={0}
            >
              <figure>
                <div className="case-image">
                  <img src={view.image} alt={view.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                  <p>{view.description}</p>
                  <ul aria-label="Technologies used">
                    {view.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
