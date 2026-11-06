/**
 * Rohit — Modern Developer Portfolio
 * 1st-Year B.Tech CSE (AI & DS) Student @ NIAT x Noida International University
 * Core Focus: Artificial Intelligence, Computer Vision, LLMs & Full-Stack AI
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [accentColor, setAccentColor] = useState<'yellow' | 'cyan'>('yellow');

  const handleToggleAccent = () => {
    setAccentColor((prev) => (prev === 'yellow' ? 'cyan' : 'yellow'));
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        accentColor={accentColor}
        onToggleAccent={handleToggleAccent}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section with Asymmetric Split Grid & Cyber Terminal */}
        <Hero accentColor={accentColor} />

        {/* 01. About Me & Student Profile */}
        <About accentColor={accentColor} />

        {/* 02. Projects Showcase: CityPulse */}
        <Projects accentColor={accentColor} />

        {/* 03. Skills & Capabilities Matrix */}
        <SkillsSection accentColor={accentColor} />

        {/* 04. Contact & Collaboration */}
        <ContactSection accentColor={accentColor} />
      </main>

      {/* Footer */}
      <Footer accentColor={accentColor} />
    </div>
  );
}
