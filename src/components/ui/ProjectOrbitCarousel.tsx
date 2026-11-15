import { useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, WheelEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectOrbitSlide } from '../../data/projectOrbitSlides';
import './ProjectOrbitCarousel.css';

gsap.registerPlugin(ScrollTrigger);

interface ProjectOrbitCarouselProps {
  slides: ProjectOrbitSlide[];
}

export function ProjectOrbitCarousel({ slides }: ProjectOrbitCarouselProps) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const indexRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const lastMobileWheelStep = useRef(0);

  const activeSlide = slides[index];

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || slides.length < 2) return;

    const media = gsap.matchMedia();
    media.add('(min-width: 761px)', () => {
      const steps = slides.length - 1;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const trigger = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        snap: reduceMotion ? false : {
          snapTo: 1 / steps,
          duration: { min: 0.25, max: 0.6 },
          delay: 0.06,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const next = Math.max(0, Math.min(steps, Math.round(self.progress * steps)));
          if (next === indexRef.current) return;
          directionRef.current = next > indexRef.current ? 1 : -1;
          indexRef.current = next;
          setIndex(next);
        },
      });

      triggerRef.current = trigger;
      return () => {
        trigger.kill();
        triggerRef.current = null;
      };
    });

    return () => media.revert();
  }, [slides.length]);

  useLayoutEffect(() => {
    const visual = visualRef.current;
    const copy = copyRef.current;
    const ring = ringRef.current;
    if (!visual || !copy || !ring) return;

    gsap.killTweensOf([visual, copy, ring]);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([visual, copy], { clearProps: 'all', autoAlpha: 1 });
      gsap.set(ring, { rotation: 0 });
      return;
    }

    const direction = directionRef.current;
    gsap.fromTo(
      visual,
      { autoAlpha: 0, x: direction * -84, y: 0, scale: 0.97, rotation: direction * -1.4 },
      { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.62, ease: 'power3.out' },
    );
    gsap.fromTo(
      copy,
      { autoAlpha: 0, x: direction * -54, y: 0 },
      { autoAlpha: 1, x: 0, y: 0, duration: 0.5, delay: 0.06, ease: 'power3.out' },
    );
    gsap.to(ring, {
      rotation: index * 118,
      duration: 0.82,
      ease: 'power3.inOut',
    });

    return () => {
      gsap.killTweensOf([visual, copy, ring]);
    };
  }, [index]);

  const goTo = (target: number) => {
    const count = slides.length;
    if (count < 2) return;
    const next = ((target % count) + count) % count;
    if (next === indexRef.current) return;

    directionRef.current = next > indexRef.current ? 1 : -1;
    indexRef.current = next;
    setIndex(next);

    const trigger = triggerRef.current;
    if (!trigger) return;
    const currentScroll = trigger.scroll();
    if (currentScroll < trigger.start - 1 || currentScroll > trigger.end + 1) return;
    const progress = next / (count - 1);
    trigger.scroll(trigger.start + (trigger.end - trigger.start) * progress);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      goTo(index + (dx < 0 ? 1 : -1));
    } else if (
      window.matchMedia('(max-width: 760px)').matches &&
      Math.abs(dy) > 42 &&
      Math.abs(dy) > Math.abs(dx) * 1.4
    ) {
      moveFromMobileScroll(dy < 0 ? 1 : -1);
    }
  };

  const moveFromMobileScroll = (step: 1 | -1) => {
    const current = indexRef.current;
    const next = Math.max(0, Math.min(slides.length - 1, current + step));
    if (next === current) return;

    directionRef.current = next > current ? 1 : -1;
    indexRef.current = next;
    setIndex(next);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (window.matchMedia('(min-width: 761px)').matches || Math.abs(event.deltaY) < 14) return;

    const now = performance.now();
    if (now - lastMobileWheelStep.current < 640) return;
    lastMobileWheelStep.current = now;
    moveFromMobileScroll(event.deltaY > 0 ? 1 : -1);
  };

  if (!activeSlide) return null;

  return (
    <div
      ref={trackRef}
      className="project-orbit-track"
      style={{ height: 'calc(100svh * ' + (1 + (slides.length - 1) * 0.64) + ')' }}
    >
      <div
        className="project-orbit-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label="CityPulse project modules"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
      >
        <div className="orbit-stage-heading">
          <span>CityPulse / System modules</span>
          <span>{String(index + 1).padStart(2, '0')} <i aria-hidden="true">/</i> {String(slides.length).padStart(2, '0')}</span>
        </div>

        <div className="orbit-stage-content">
          <div
            className="orbit-visual"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; }}
          >
            <div ref={ringRef} className="orbit-ring" aria-hidden="true">
              <span className="orbit-ring-node orbit-ring-node-one" />
              <span className="orbit-ring-node orbit-ring-node-two" />
              <span className="orbit-ring-node orbit-ring-node-three" />
            </div>

            <div className="orbit-visual-tag">
              <span className="orbit-tag-dot" aria-hidden="true" />
              {activeSlide.eyebrow}
            </div>

            <div className="orbit-image-card" ref={visualRef}>
              <img src={activeSlide.image} alt={activeSlide.alt} draggable={false} />
              <div className="orbit-image-caption">
                <span>{activeSlide.visualLabel}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="orbit-metric">
              <strong>{activeSlide.metricValue}</strong>
              <span>{activeSlide.metricLabel}</span>
            </div>
          </div>

          <div className="orbit-copy" ref={copyRef} key={activeSlide.id}>
            <p className="orbit-copy-kicker">{activeSlide.eyebrow}</p>
            <h3>
              <span>{activeSlide.title}</span>
              <em>{activeSlide.subtitle}</em>
            </h3>
            <p className="orbit-description">{activeSlide.description}</p>

            <ul className="orbit-feature-list">
              {activeSlide.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>

            <div className="orbit-tags" aria-label="Technologies">
              {activeSlide.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>

            <a className="orbit-project-link" href={activeSlide.href} target="_blank" rel="noreferrer">
              View CityPulse on GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="orbit-controls">
          <button className="orbit-arrow" type="button" onClick={() => goTo(index - 1)} aria-label="Previous project module">
            <ArrowLeft size={18} aria-hidden="true" />
          </button>

          <div className="orbit-thumbnails" role="group" aria-label="Choose a project module">
            {slides.map((slide, itemIndex) => (
              <motion.button
                className="orbit-thumbnail"
                type="button"
                key={slide.id}
                aria-pressed={itemIndex === index}
                aria-label={'Show ' + slide.title + ' ' + slide.subtitle}
                onClick={() => goTo(itemIndex)}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.46, delay: itemIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={slide.image} alt="" loading="lazy" />
                <span className="orbit-thumbnail-copy">
                  <small>{String(itemIndex + 1).padStart(2, '0')}</small>
                  <strong>{slide.shortLabel}</strong>
                </span>
              </motion.button>
            ))}
          </div>

          <button className="orbit-arrow" type="button" onClick={() => goTo(index + 1)} aria-label="Next project module">
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          Module {index + 1} of {slides.length}: {activeSlide.title} {activeSlide.subtitle}
        </p>
      </div>
    </div>
  );
}
