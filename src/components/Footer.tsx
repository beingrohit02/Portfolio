import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import './Closing.css';

export function Footer() {
  const { profile } = PORTFOLIO_DATA;

  return (
    <footer className="colophon">
      <div className="shell-container colophon-inner">
        <small>© {new Date().getFullYear()} {profile.name}</small>
        <nav aria-label="Social profiles">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} aria-hidden="true" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
        <a className="colophon-top" href="#top">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
