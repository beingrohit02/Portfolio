import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell-container footer-inner">
        <a className="footer-brand" href="#top">Rohit<span>.</span></a>
        <p>Made with curiosity in Greater Noida, India.</p>
        <a className="footer-top" href="#top">
          Back to top <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <span className="footer-copyright">
          © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}
        </span>
      </div>
    </footer>
  );
}
