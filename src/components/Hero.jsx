import { useRef, useState, useEffect } from 'react';
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
  const [parallaxStyle, setParallaxStyle] = useState({});

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      const t = Math.min(progress / 0.8, 1);
      setParallaxStyle({
        transform: `translateY(${t * -12}%)`,
        opacity: 1 - t,
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [roleIndex, setRoleIndex] = useState(0);
  const [fillPct, setFillPct] = useState(0);
  const isDraggingRef = useRef(false);
  const nameRowRef = useRef(null);

  const handleDragStart = (e) => {
    isDraggingRef.current = true;
    if (nameRowRef.current) {
      const rect = nameRowRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setFillPct(Math.min(100, Math.max(0, pct)));
    }
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current || !nameRowRef.current) return;
    const rect = nameRowRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setFillPct(Math.min(100, Math.max(0, pct)));
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nameWords = personal.name.split(' ');

  return (
    <section id="hero" ref={sectionRef} className="hero-section" aria-label="Hero">
      <CanvasBg theme="system" />
      <MagneticField containerRef={sectionRef} />

      <div className="hero-inner" style={parallaxStyle}>
        <div className="hero-top">
          <span className="hero-availability">
            <span className="hero-dot" />
            Open for collaborations
          </span>
          <span className="hero-location">🌍 {personal.location}</span>
        </div>

        <div ref={textRef} className="hero-text">
          <div
            className="hero-name-row"
            ref={nameRowRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div className="hero-name-outline" aria-hidden="true">
              {nameWords.map((word, i) => (
                <div key={i} className="reveal-text">
                  <span
                    className="reveal-text-inner hero-name-word"
                    style={{ animationDelay: `${0.28 + i * 0.08}s` }}
                  >
                    {word}
                  </span>
                </div>
              ))}
            </div>
            <div className="hero-name-fill-wrap" style={{ width: `${fillPct}%` }}>
              <div className="hero-name-fill-inner">
                {nameWords.map((word, i) => (
                  <span key={i} className="hero-name-word hero-name-word-fill">{word}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="hero-role-row">
            <div className="reveal-text">
              <span
                className="reveal-text-inner hero-role-text"
                style={{ animationDelay: `${0.28 + nameWords.length * 0.08}s` }}
              >
                {roles[roleIndex]}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span className="hero-scroll">Scroll to explore</span>
          <span className="hero-num">— 01</span>
        </div>
      </div>

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

        .hero-availability { display: flex; align-items: center; gap: 8px; }
        .hero-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .hero-text { position: relative; cursor: default; }
        .hero-name-row {
          display: flex;
          flex-wrap: nowrap;
          gap: 0;
          position: relative;
          cursor: ew-resize;
          user-select: none;
          -webkit-user-select: none;
        }
        .hero-name-outline { display: flex; flex-wrap: nowrap; }
        .hero-name-fill-wrap {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
          z-index: 2;
        }
        .hero-name-fill-inner { display: flex; flex-wrap: nowrap; }

        .hero-name-word {
          font-family: var(--font-heading);
          font-size: clamp(52px, 7vw, 110px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -3px;
          color: transparent;
          -webkit-text-stroke: 2px #000000;
          text-stroke: 2px #000000;
          paint-order: stroke fill;
          margin-right: 0.15em;
          white-space: nowrap;
        }

        .hero-name-word-fill {
          color: #000000;
          -webkit-text-stroke: 0;
          text-stroke: 0;
          paint-order: stroke fill;
        }

        .hero-role-row { margin-top: 16px; }
        .hero-role-text {
          font-family: var(--font-sans);
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 500;
          color: #666666;
          letter-spacing: -0.2px;
        }

        @media (max-width: 1024px) {
          .hero-section { padding: 0 32px; }
        }

        @media (max-width: 768px) {
          .hero-section { padding: 0 24px; }
          .hero-name-word { letter-spacing: -2px; font-size: clamp(34px, 7vw, 64px); }
          .hero-role-text { font-size: clamp(14px, 3vw, 18px); }
          .magnetic-field { display: none; }
          .hero-top { font-size: 10px; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 0 16px; min-height: 85vh; }
          .hero-name-word { letter-spacing: -1px; font-size: clamp(26px, 6vw, 36px); }
          .hero-role-row { margin-top: 4px; }
          .hero-role-text { font-size: clamp(13px, 3vw, 16px); }
          .hero-inner { gap: 16px; padding-top: 80px; padding-bottom: 40px; justify-content: center; }
          .hero-bottom { font-size: 10px; flex-direction: column; gap: 4px; align-items: flex-start; }
          .hero-top { font-size: 9px; }
        }
      `}</style>
    </section>
  );
}
