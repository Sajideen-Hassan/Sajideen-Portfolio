import { useRef, useState, useEffect } from 'react';
import { m, useInView, useScroll, useTransform } from 'framer-motion';
import { personal, roles } from '../data/portfolio';
import CanvasBg from './CanvasBg';

function MagneticField({ containerRef }) {
  const shapesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const targetsRef = useRef([]);

  const intensities = [0.03, 0.05, 0.02, 0.06, 0.04, 0.035, 0.045, 0.025];

  useEffect(() => {
    const shapes = shapesRef.current;
    if (!shapes.length) return;

    targetsRef.current = shapes.map(() => ({ x: 0, y: 0 }));
    const current = shapes.map(() => ({ x: 0, y: 0 }));

    const onMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      targetsRef.current.forEach((t, i) => {
        t.x = dx * 60 * intensities[i];
        t.y = dy * 60 * intensities[i];
      });
    };

    const animate = () => {
      shapes.forEach((el, i) => {
        if (!el) return;
        current[i].x += (targetsRef.current[i].x - current[i].x) * 0.08;
        current[i].y += (targetsRef.current[i].y - current[i].y) * 0.08;
        el.style.transform = `translate(${current[i].x}px, ${current[i].y}px)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="magnetic-field" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="magnetic-svg">
        <circle
          ref={(el) => (shapesRef.current[0] = el)}
          cx="300" cy="300" r="280"
          fill="none" stroke="var(--border-light)" strokeWidth="0.4"
        />
        <circle
          ref={(el) => (shapesRef.current[1] = el)}
          cx="300" cy="300" r="220"
          fill="none" stroke="var(--border-light)" strokeWidth="0.3"
        />
        <circle
          ref={(el) => (shapesRef.current[2] = el)}
          cx="300" cy="300" r="160"
          fill="none" stroke="var(--border-light)" strokeWidth="0.3"
        />
        <line
          ref={(el) => (shapesRef.current[3] = el)}
          x1="40" y1="300" x2="560" y2="300"
          stroke="var(--border-light)" strokeWidth="0.3"
        />
        <line
          ref={(el) => (shapesRef.current[4] = el)}
          x1="300" y1="40" x2="300" y2="560"
          stroke="var(--border-light)" strokeWidth="0.3"
        />
        <circle
          ref={(el) => (shapesRef.current[5] = el)}
          cx="300" cy="300" r="100"
          fill="none" stroke="var(--border-light)" strokeWidth="0.2"
        />
        <line
          ref={(el) => (shapesRef.current[6] = el)}
          x1="140" y1="140" x2="460" y2="460"
          stroke="var(--border-light)" strokeWidth="0.2"
        />
        <line
          ref={(el) => (shapesRef.current[7] = el)}
          x1="460" y1="140" x2="140" y2="460"
          stroke="var(--border-light)" strokeWidth="0.2"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 0.8], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const wordVariants = {
    hidden: { y: 120, rotate: 3 },
    visible: {
      y: 0, rotate: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" ref={sectionRef} className="hero-section" aria-label="Hero">
      <CanvasBg theme="system" />
      <MagneticField containerRef={sectionRef} />

      <m.div className="hero-inner" style={{ y: contentY, opacity: contentOpacity }}>
        <m.div
          className="hero-top"
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="hero-availability">
            <span className="hero-dot" />
            Available
          </span>
          <span className="hero-location">{personal.location}</span>
        </m.div>

        <m.div
          ref={textRef}
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="hero-name-row">
            {personal.name.split(' ').map((word, i) => (
              <div key={i} className="reveal-text">
                <m.span className="reveal-text-inner hero-name-word" variants={wordVariants}>
                  {word}
                </m.span>
              </div>
            ))}
          </div>
          <div className="hero-role-row">
            <div className="reveal-text">
              <m.span className="reveal-text-inner hero-role-text" variants={wordVariants}>
                {roles[roleIndex]}
              </m.span>
            </div>
          </div>
        </m.div>

        <m.div
          className="hero-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <span className="hero-scroll">Scroll to explore</span>
          <span className="hero-num">— 01</span>
        </m.div>
      </m.div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 40px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .magnetic-field {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }

        .magnetic-svg {
          width: min(500px, 70vw);
          height: min(500px, 70vw);
          opacity: 0.5;
        }

        .magnetic-svg circle,
        .magnetic-svg line {
          will-change: transform;
        }

        .hero-inner {
          width: 100%;
          max-width: var(--max-w);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding-top: 80px;
          padding-bottom: 80px;
          position: relative;
          z-index: 1;
          will-change: transform;
        }

        .hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--secondary);
        }

        .hero-availability { display: flex; align-items: center; gap: 8px; }
        .hero-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .hero-text { position: relative; cursor: default; }
        .hero-name-row { display: flex; flex-wrap: wrap; gap: 0; }

        .hero-name-word {
          font-family: var(--font-heading);
          font-size: clamp(60px, 12vw, 160px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -4px;
          color: var(--primary-bold);
          margin-right: 0.15em;
        }

        .hero-role-row { margin-top: 16px; }
        .hero-role-text {
          font-family: var(--font-sans);
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 400;
          color: var(--secondary-light);
          letter-spacing: -0.2px;
        }

        .hero-bottom {
          display: flex; align-items: center; justify-content: space-between;
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 1px;
          text-transform: uppercase; color: var(--muted);
        }

        @media (max-width: 768px) {
          .hero-section { padding: 0 24px; }
          .hero-name-word { letter-spacing: -2px; }
          .magnetic-field { display: none; }
        }
      `}</style>
    </section>
  );
}
