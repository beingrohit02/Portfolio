"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SparklesCore } from './SparklesCore';

export interface PerspectiveTunnelImage {
  src: string;
  title: string;
  alt: string;
}

interface PerspectiveTunnelHeroProps {
  name: string;
  institution: string;
  email: string;
  github: string;
  images: PerspectiveTunnelImage[];
}

interface TunnelCardData {
  item: PerspectiveTunnelImage;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

function createTunnelCards(images: PerspectiveTunnelImage[]): TunnelCardData[] {
  return images.map((item, index) => {
    const angle = index * 137.5 * (Math.PI / 180);
    return {
      item,
      angleCos: Math.cos(angle),
      angleSin: Math.sin(angle),
      radiusFactorX: 0.28 + (index % 3) * 0.08,
      radiusFactorY: 0.26 + (index % 2) * 0.09,
      rotationZ: (index % 2 === 0 ? 1 : -1) * (3 + (index % 5) * 2),
      index,
    };
  });
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

function TunnelCard({
  card,
  progress,
  pointer,
  total,
  stage,
}: {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}) {
  const staggerSpan = 0.62;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;
  const localProgress = useTransform(progress, [start, end], [0, 1]);
  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
  const width = stage.isMobile
    ? Math.max(132, Math.min(188, stage.width * 0.39))
    : Math.max(185, Math.min(286, stage.width * 0.19));
  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 16 : 34;
  const transform = useTransform(
    [z, pointer.x, pointer.y],
    ([currentZ, pointerX, pointerY]: number[]) => {
      const offsetX = baseX - pointerX * panStrength;
      const offsetY = baseY - pointerY * panStrength;
      return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currentZ}px) rotateZ(${card.rotationZ}deg)`;
    },
  );

  return (
    <motion.div
      aria-hidden="true"
      className="tunnel-card"
      style={{ width, transform, opacity, zIndex: card.index + 1 }}
    >
      <div className="tunnel-card-frame">
        <img src={card.item.src} alt="" draggable={false} />
        <div className="tunnel-card-caption">{card.item.title}</div>
      </div>
    </motion.div>
  );
}

export function PerspectiveTunnelHero({
  name,
  institution,
  email,
  github,
  images,
}: PerspectiveTunnelHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<StageDimensions>({
    width: 1440,
    height: 900,
    isMobile: false,
  });
  const cards = useMemo(() => createTunnelCards(images), [images]);
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.0001,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setStage({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const handleWheel = (event: WheelEvent) => {
      const current = rawProgress.get();
      const next = Math.max(0, Math.min(1, current + event.deltaY * 0.0008));
      if (next === current) return;
      event.preventDefault();
      rawProgress.set(next);
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [rawProgress]);

  const moveByTouch = (deltaY: number) => {
    const current = rawProgress.get();
    rawProgress.set(Math.max(0, Math.min(1, current + deltaY * 0.0018)));
  };
  const pointer = useCameraParallax(!reduceMotion);
  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1, 1.16]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.86, 1], [1, 1, 1, 0]);
  const promptOpacity = useTransform(smoothProgress, [0, 0.1], [0.9, 0]);

  return (
    <div
      ref={containerRef}
      className="perspective-hero"
      style={{
        perspective: stage.isMobile ? '900px' : '1200px',
      }}
      onTouchStart={(event) => {
        touchStartY.current = event.touches[0]?.clientY ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartY.current;
        const end = event.changedTouches[0]?.clientY;
        touchStartY.current = null;
        if (start !== null && end !== undefined && Math.abs(start - end) > 24) {
          moveByTouch(start - end);
        }
      }}
    >
      <div className="hero-tunnel-grid" aria-hidden="true" />
      <div className="hero-tunnel-glow" aria-hidden="true" />
      <div className="hero-tunnel-ring hero-tunnel-ring-inner" aria-hidden="true" />
      <div className="hero-tunnel-ring hero-tunnel-ring-outer" aria-hidden="true" />
      <SparklesCore className="hero-sparkles" particleDensity={34} speed={0.18} />

      {images[0] && (
        <figure className="hero-profile-photo">
          <img src={images[0].src} alt={images[0].alt} fetchPriority="high" />
          <figcaption>PROFILE / 01</figcaption>
        </figure>
      )}

      <motion.div
        className="hero-tunnel-copy"
        style={{ scale: titleScale, opacity: titleOpacity }}
      >
        <p className="hero-tunnel-eyebrow">{name} <span>·</span> AI &amp; software</p>
        <h1 id="hero-title" className="hero-tunnel-title">
          AI THAT WORKS
          <span>in the real world.</span>
        </h1>
        <p className="hero-tunnel-intro">
          I build useful systems across computer vision, language models, and full-stack engineering.
        </p>
        <div className="hero-tunnel-actions">
          <a className="hero-tunnel-primary" href="#projects">
            Explore my work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="hero-tunnel-secondary" href={`mailto:${email}`}>
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a className="hero-tunnel-github" href={github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <p className="hero-tunnel-institution">{institution}</p>
      </motion.div>

      <motion.div className="hero-scroll-prompt" style={{ opacity: promptOpacity }} aria-hidden="true">
        <span>Scroll to move through my work</span>
        <ArrowDown size={15} />
      </motion.div>

      <div className="hero-tunnel-cards" aria-hidden="true" style={{ transformStyle: 'preserve-3d' }}>
        {cards.map((card) => (
          <TunnelCard
            key={`${card.item.title}-${card.index}`}
            card={card}
            progress={smoothProgress}
            pointer={pointer}
            total={cards.length}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
}
