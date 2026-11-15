"use client";

import { useId, useMemo } from 'react';
import { motion } from 'motion/react';
import Particles, { ParticlesProvider, useParticlesProvider } from '@tsparticles/react';
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

const initializeParticles = async (engine: import('@tsparticles/engine').Engine) => {
  await loadSlim(engine);
};

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

function SparklesCanvas({
  id,
  className = '',
  background,
  minSize = 0.7,
  maxSize = 1.8,
  speed = 0.22,
  particleColor = '#d4ef84',
  particleDensity = 42,
}: SparklesCoreProps) {
  const { loaded } = useParticlesProvider();
  const generatedId = useId();

  const options = useMemo<RecursivePartial<IOptions>>(() => ({
    ...(background ? { background: { color: { value: background } } } : {}),
    fullScreen: { enable: false },
    fpsLimit: 45,
    detectRetina: true,
    interactivity: {
      events: { onHover: { enable: false }, onClick: { enable: false } },
    },
    particles: {
      color: { value: particleColor },
      number: {
        value: particleDensity,
        density: { enable: true, width: 1200, height: 800 },
      },
      opacity: { value: { min: 0.12, max: 0.48 } },
      size: { value: { min: minSize, max: maxSize } },
      move: { enable: true, speed, direction: 'none', outModes: { default: 'out' } },
      shape: { type: 'circle' },
    },
  }), [background, maxSize, minSize, particleColor, particleDensity, speed]);

  return (
    <motion.div
      aria-hidden="true"
      className={`sparkle-field ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {loaded && (
        <Particles
          id={id || generatedId}
          className="sparkle-canvas"
          options={options}
        />
      )}
    </motion.div>
  );
}

export function SparklesCore(props: SparklesCoreProps) {
  return (
    <ParticlesProvider init={initializeParticles}>
      <SparklesCanvas {...props} />
    </ParticlesProvider>
  );
}
