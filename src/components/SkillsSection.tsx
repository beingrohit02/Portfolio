import { PORTFOLIO_DATA } from '../data/portfolioData';
import './SkillsSection.css';

const shortNames: Record<string, string> = {
  'JavaScript / TypeScript': 'JS / TS',
  'LLMs & Prompt Engineering': 'LLMs',
  'Retrieval-Augmented Generation (RAG)': 'RAG',
};

export function SkillsSection() {
  return (
    <section className="stack-directory" id="skills" aria-labelledby="skills-title">
      <div className="shell-container stack-directory-layout">
        <header className="stack-directory-intro">
          <p className="stack-directory-label">Technical skills</p>
          <h2 id="skills-title">A toolkit for the <em>whole stack.</em></h2>
          <p className="stack-directory-note">
            I work mostly in Python, from training vision models to building the APIs that put them to use.
          </p>
        </header>

        <div className="stack-directory-list">
          {PORTFOLIO_DATA.skillsMatrix.map((category) => (
            <details className="stack-directory-group" key={category.title}>
              <summary>
                <span className="stack-directory-category">
                  <span className="stack-directory-name">{category.title}</span>
                  <span className="stack-directory-preview">
                    {category.items.map(({ name }) => shortNames[name] ?? name).join(' · ')}
                  </span>
                </span>
                <span className="stack-directory-toggle" aria-hidden="true" />
              </summary>
              <dl className="stack-directory-tools">
                {category.items.map((item) => (
                  <div key={item.name}>
                    <dt>{item.name}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
