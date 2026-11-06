import { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  accentColor: 'yellow' | 'cyan';
  onToggleAccent: () => void;
}

export function Navbar({ accentColor, onToggleAccent }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-neutral-800/80 shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-neutral-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          aria-label="Rohit Portfolio Homepage"
        >
          <div
            className={`w-8 h-8 rounded-md flex items-center justify-center font-mono font-bold text-black transition-colors ${
              accentColor === 'yellow' ? 'bg-yellow-400 group-hover:bg-yellow-300' : 'bg-cyan-400 group-hover:bg-cyan-300'
            }`}
          >
            R
          </div>
          <span className="font-display font-bold text-xl">
            ROHIT<span className={accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400'}>.AI</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`hover:text-white transition-colors py-1 relative whitespace-nowrap shrink-0 group`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                  accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Accent Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleAccent}
            aria-label={`Switch accent color (Current: ${accentColor})`}
            title={`Toggle Theme Accent (${accentColor === 'yellow' ? 'Cyber Yellow' : 'Electric Cyan'})`}
            className="hidden sm:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400'
              }`}
            />
            <span className="font-mono uppercase">{accentColor}</span>
          </button>

          <a
            href="#contact"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-mono tracking-wider uppercase rounded-md transition-all shadow-sm ${
              accentColor === 'yellow'
                ? 'bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                : 'bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]'
            }`}
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-lg border-b border-neutral-800 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-200 hover:text-yellow-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
              <span className="text-xs text-neutral-400 font-mono">Accent Style:</span>
              <button
                onClick={onToggleAccent}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-white font-mono uppercase"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400'
                  }`}
                />
                {accentColor}
              </button>
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider rounded font-mono"
            >
              Connect with Rohit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
