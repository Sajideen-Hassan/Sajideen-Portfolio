import { useRef, useState, useEffect } from 'react';
import { m, useInView, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/portfolio';
import { WaveText } from './TextAnimations';
import CanvasBg from './CanvasBg';

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const driftOffset = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const listRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setImagePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const unsubscribe = driftOffset.on('change', (v) => {
      const rows = list.querySelectorAll('.project-row');
      rows.forEach((row, i) => {
        const offset = v * (1 - i * 0.15);
        row.style.setProperty('--drift-x', `${offset}px`);
      });
    });
    return () => unsubscribe();
  }, [driftOffset]);

  return (
    <section id="projects" ref={ref} className="projects-section snap-section" aria-label="Projects">
      <CanvasBg theme="spotlight" focusX={isHovering ? imagePos.x : undefined} focusY={isHovering ? imagePos.y : undefined} />
      <div className="container">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Selected Work</span>
        </m.div>

        <m.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Projects.
        </m.h2>

        <div
          ref={listRef}
          className="projects-list"
          onMouseMove={handleMouseMove}
        >
          {projects.map((project, idx) => (
            <m.div
              key={project.id}
              className="project-row"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * idx + 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => { setHoveredProject(project); setIsHovering(true); }}
              onMouseLeave={() => { setHoveredProject(null); setIsHovering(false); }}
              data-cursor
            >
              <span className="project-index">0{idx + 1}</span>
              <h3 className="project-name">
                <WaveText text={project.title} inView={inView} baseDelay={0.2 + idx * 0.08} />
              </h3>
              <span className="project-arrow">→</span>
            </m.div>
          ))}
        </div>
      </div>

      <m.div
        className={`project-floating-image ${isHovering ? 'is-visible' : ''}`}
        style={{ left: imagePos.x + 30, top: imagePos.y - 120 }}
      >
        {hoveredProject && (
          <img src={hoveredProject.coverImage} alt={hoveredProject.title} />
        )}
      </m.div>

      <style>{`
        .projects-section {
          padding-top: var(--section-gap);
          padding-bottom: var(--section-gap);
        }

        .projects-list {
          margin-top: 48px;
          border-top: 1px solid var(--border);
        }

        .project-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
          position: relative;
          transform: translateX(var(--drift-x, 0px));
          transition: opacity 0.3s ease, transform 0.15s linear;
        }

        .project-row:hover { opacity: 0.6; }

        .project-index {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--muted);
          min-width: 40px;
        }

        .project-name {
          font-family: var(--font-heading);
          font-size: clamp(24px, 4vw, 48px);
          font-weight: 700;
          letter-spacing: -1px;
          color: var(--primary);
          flex: 1;
          line-height: 1.1;
        }

        .project-arrow {
          font-size: 20px;
          color: var(--muted);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .project-row:hover .project-arrow {
          transform: translateX(8px);
          color: var(--primary);
        }

        .project-floating-image {
          position: fixed;
          width: 340px;
          height: 260px;
          z-index: 100;
          pointer-events: none;
          opacity: 0;
          transform: scale(0.9) translateY(10px);
          transition: opacity 0.4s cubic-bezier(0.16,1,0.3,1),
                      transform 0.4s cubic-bezier(0.16,1,0.3,1);
          will-change: transform, opacity;
        }

        .project-floating-image.is-visible {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .project-floating-image img {
          width: 100%; height: 100%;
          object-fit: contain;
          border-radius: 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .project-floating-image { display: none; }
          .project-row { padding: 24px 0; }
          .project-name { font-size: clamp(20px, 6vw, 32px); }
        }
      `}</style>
    </section>
  );
}
