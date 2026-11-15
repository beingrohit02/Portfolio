import { ArrowDown, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './ui/Reveal';

export function Hero() {
  const profile = PORTFOLIO_DATA.profile;

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell-container hero-grid">
        <Reveal className="hero-copy">
          <div className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            <span>Building at the intersection of AI &amp; software</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            I build AI that
            <span>works in the real world.</span>
          </h1>

          <p className="hero-intro">
            I’m {profile.name}, a computer science student turning ideas in computer vision,
            language models, and full-stack engineering into useful tools.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a className="button button-quiet" href={'mailto:' + profile.email}>
              Get in touch <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-details">
            <span><MapPin size={15} aria-hidden="true" /> {profile.location}</span>
            <span className="hero-details-divider" aria-hidden="true" />
            <span>B.Tech CSE · AI &amp; Data Science</span>
          </div>

          <div className="hero-focus" aria-label="Areas of focus">
            <span>Computer vision</span>
            <span>LLM systems</span>
            <span>Full-stack AI</span>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.12}>
          <motion.div
            className="portrait-card"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          >
            <div className="portrait-photo">
              <img
                src={profile.avatarImage}
                alt="Portrait of Rohit"
                fetchPriority="high"
              />
            </div>
            <div className="portrait-index" aria-hidden="true">
              <span>PROFILE / 01</span>
              <span>AI &amp; Data Science</span>
            </div>
            <div className="portrait-caption">
              <div>
                <strong>{profile.name}</strong>
                <span>Student · Builder · Curious mind</span>
              </div>
              <span className="portrait-caption-mark" aria-hidden="true">
                <ArrowDown size={17} />
              </span>
            </div>
            <div className="portrait-accent" aria-hidden="true">R.</div>
          </motion.div>
          <p className="portrait-note">
            <span className="portrait-note-line" aria-hidden="true" />
            {profile.institution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
