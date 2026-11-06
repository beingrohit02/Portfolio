import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  accentColor: 'yellow' | 'cyan';
}

export function Footer({ accentColor }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';

  return (
    <footer className="border-t border-neutral-900 bg-black py-12 text-xs font-mono text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center font-bold text-black text-xs ${
                accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400'
              }`}
            >
              R
            </div>
            <span className="text-white font-bold tracking-tight">
              Rohit <span className={accentText}>// AI Systems Engineer</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            aria-label="Scroll to top of the page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>
            © {new Date().getFullYear()} Rohit. 1st-Year B.Tech CSE (AI & DS) @ NIAT x Noida International University.
          </p>
          <p>
            Neo-Brutalist & Cyber-Minimalist Aesthetic · Black, White & Cyber Yellow
          </p>
        </div>

      </div>
    </footer>
  );
}
