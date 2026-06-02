import { useRef, useState, useEffect } from 'react';
import useInView from '../hooks/useInView';
import { projects } from '../data/portfolio';
import { WaveText } from './TextAnimations';
import CanvasBg from './CanvasBg';

export default function Projects() {
  const [ref, inView] = useInView({ once: true, rootMargin: '-80px' });
  const listRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [imagePos, setImagePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleMouseMove = (e) => {
    setImagePos({ x: e.clientX, y: e.clientY });
  };

  const handleProjectClick = (project) => {
    if (window.innerWidth <= 768) {
      setSelectedProject(selectedProject?.id === project.id ? null : project);
    }
  };

  useEffect(() => {
    const section = ref.current;
    const list = listRef.current;
    if (!section || !list) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const wh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
      const v = 60 - 120 * progress;
      const rows = list.querySelectorAll('.project-row');
      rows.forEach((row, i) => {
        const offset = v * (1 - i * 0.15);
        row.style.setProperty('--drift-x', `${offset}px`);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="projects" ref={ref} className="projects-section snap-section" aria-label="Projects">
      <CanvasBg theme="spotlight" focusX={isHovering ? imagePos.x : undefined} focusY={isHovering ? imagePos.y : undefined} />
      <div className="container">
        <div className={`section-label-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <span className="section-label">Selected Work</span>
        </div>

        <h2
          className={`section-title title-fade ${inView ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.2s' }}
        >
          <span className="section-title-outline">Proj</span>
          <span className="section-title-fill">ects.</span>
        </h2>

        <div
          ref={listRef}
          className="projects-list"
          onMouseMove={handleMouseMove}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`project-row row-fade ${selectedProject?.id === project.id ? 'is-tapped' : ''} ${inView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.2 + 0.1 * idx}s` }}
              onMouseEnter={() => { setHoveredProject(project); setIsHovering(true); }}
              onMouseLeave={() => { setHoveredProject(null); setIsHovering(false); }}
              onClick={() => handleProjectClick(project)}
              data-cursor
            >
              <span className="project-index">0{idx + 1}</span>
              <h3 className="project-name">
                <WaveText text={project.title} inView={inView} baseDelay={0.2 + idx * 0.08} />
              </h3>
              <span className="project-arrow">→</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`project-floating-image ${isHovering ? 'is-visible' : ''}`}
        style={{ left: imagePos.x + 30, top: imagePos.y - 120 }}
      >
        {hoveredProject && (
          <img src={hoveredProject.coverImage} alt={hoveredProject.title} loading="lazy" width="340" height="260" />
        )}
      </div>

      {selectedProject && (
        <div className="project-mobile-preview" onClick={() => setSelectedProject(null)}>
          <img src={selectedProject.coverImage} alt={selectedProject.title} loading="lazy" width="340" height="260" />
        </div>
      )}

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
          max-width: 340px;
          max-height: 260px;
          width: auto;
          height: auto;
          border-radius: 0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }

        @media (max-width: 1024px) {
          .project-row { gap: 16px; }
          .project-index { min-width: 32px; font-size: 11px; }
        }

        .project-mobile-preview {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(0,0,0,0.7);
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .project-mobile-preview img {
          max-width: 90%;
          max-height: 70%;
          width: auto;
          height: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
          .project-floating-image { display: none; }
          .project-row { padding: 20px 0; gap: 12px; }
          .project-name { font-size: clamp(18px, 5vw, 28px); }
          .project-index { min-width: 28px; font-size: 10px; }
          .project-mobile-preview { display: flex; }
        }

        @media (max-width: 480px) {
          .projects-section { padding-top: 60px; padding-bottom: 60px; }
          .project-row { padding: 16px 0; flex-wrap: wrap; gap: 8px; }
          .project-name { font-size: clamp(16px, 5vw, 22px); letter-spacing: -0.5px; }
          .project-index { min-width: 24px; font-size: 9px; }
          .project-arrow { font-size: 16px; }
        }

        @media (max-width: 360px) {
          .project-row { padding: 12px 0; gap: 6px; }
          .project-name { font-size: clamp(14px, 4vw, 16px); }
          .project-index { min-width: 20px; font-size: 8px; }
          .project-arrow { font-size: 14px; }
        }
      `}</style>
    </section>
  );
}
