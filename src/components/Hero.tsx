import { PORTFOLIO_DATA } from '../data/portfolioData';
import { PROJECT_ORBIT_SLIDES } from '../data/projectOrbitSlides';
import { PerspectiveTunnelHero } from './ui/PerspectiveTunnelHero';

export function Hero() {
  const profile = PORTFOLIO_DATA.profile;
  const images = [
    {
      src: profile.avatarImage,
      title: 'Rohit · AI developer',
      alt: 'Portrait of Rohit',
    },
    ...PROJECT_ORBIT_SLIDES.map((slide) => ({
      src: slide.image,
      title: slide.shortLabel,
      alt: slide.alt,
    })),
  ];

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <PerspectiveTunnelHero
        name={profile.name}
        institution="B.Tech CSE · AI & Data Science · NIAT × NIU"
        email={profile.email}
        github={profile.github}
        images={images}
      />
    </section>
  );
}
