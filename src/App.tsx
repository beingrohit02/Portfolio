import { MotionConfig, motion, useScroll, useSpring } from 'motion/react';
import { About } from './components/About';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { SkillsSection } from './components/SkillsSection';

export default function App() {
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <motion.div
          className="reading-progress"
          style={{ scaleX: pageProgress }}
          aria-hidden="true"
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Projects />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
