import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './ui/Reveal';

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="shell-container">
        <Reveal className="contact-panel">
          <div className="contact-copy">
            <p className="contact-eyebrow"><span aria-hidden="true" /> 04 / Get in touch</p>
            <h2 id="contact-title">Have an idea?<br /><em>Let’s build it.</em></h2>
            <p>
              I’m always happy to talk about AI, useful software, research, and
              collaboration. Send me a note and tell me what you’re working on.
            </p>
          </div>

          <div className="contact-actions">
            <a className="contact-email" href={'mailto:' + profile.email}>
              <span><Mail size={17} aria-hidden="true" /> {profile.email}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <div className="contact-socials">
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={16} aria-hidden="true" /> GitHub
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
