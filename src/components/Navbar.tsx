import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="shell-container nav-inner">
        <a className="brand" href="#top" aria-label="Rohit — home">
          <span className="brand-mark" aria-hidden="true">R</span>
          <span className="brand-copy">
            <strong>Rohit</strong>
            <small>AI developer</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a className="nav-link" href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          <span>Let’s talk</span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>
            ))}
            <a href="#contact" className="mobile-nav-cta" onClick={closeMenu}>
              Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
