import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import './Closing.css';

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="correspondence" aria-labelledby="contact-title">
      <div className="shell-container correspondence-inner">
        <div className="correspondence-copy">
          <p className="correspondence-label">Contact</p>
          <h2 id="contact-title">Drop me <em>a line.</em></h2>
          <p className="correspondence-note">
            I’d love to hear what you’re building. For project ideas, research, or a question about CityPulse, my inbox is open.
          </p>
          <a className="correspondence-address" href={`mailto:${profile.email}`}>
            {profile.email}
            <span aria-hidden="true"><ArrowUpRight /></span>
          </a>
        </div>
        <figure className="correspondence-origin">
          <div className="postage" aria-hidden="true">
            <span className="postage-portrait">
              <img src={profile.avatarImage} loading="lazy" alt="" width="140" height="174" />
            </span>
            <span className="postage-signature">{profile.name}</span>
          </div>
          <figcaption>Greater Noida, India</figcaption>
        </figure>
      </div>
    </section>
  );
}
