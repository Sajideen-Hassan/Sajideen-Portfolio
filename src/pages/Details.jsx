import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { experience, education } from '../data/portfolio';
import { WaveText, KineticText } from '../components/TextAnimations';
import CanvasBg from '../components/CanvasBg';
import GlobalBackground from '../components/GlobalBackground';
import useInView from '../hooks/useInView';

function ExpRow({ item, index }) {
  const [ref, inView] = useInView({ once: true, rootMargin: '-100px' });
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className={`exp-row item-fade ${expanded ? 'is-expanded' : ''} ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onClick={() => setExpanded(!expanded)}
      data-cursor
    >
      <div className="exp-row-left">
        <span className="exp-row-num">0{index + 1}</span>
        <div className="exp-row-line" />
      </div>
      <div className="exp-row-body">
        <div className="exp-row-meta">
          <span className="exp-row-company">{item.company}</span>
          <span className="exp-row-toggle">{expanded ? '−' : '+'}</span>
        </div>
        {expanded && (
          <div className="exp-row-details" style={{ animation: 'drawer-in 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
            <span className="exp-row-period">{item.period}</span>
            <h3 className="exp-row-role">{item.role}</h3>
            <p className="exp-row-desc">{item.description}</p>
            <div className="exp-row-tech">
              {item.tech.map(t => <span key={t} className="exp-row-chip">{t}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EduDot({ item, index }) {
  const [ref, inView] = useInView({ once: true, rootMargin: '-60px' });

  return (
    <div
      ref={ref}
      className={`edu-dot-item item-fade ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="edu-dot-marker">
        <div className="edu-dot-inner" />
      </div>
      <div className="edu-dot-content">
        <div className="edu-dot-meta">
          <span className="edu-dot-period">{item.period}</span>
          {item.grade && <span className="edu-dot-grade">{item.grade}</span>}
        </div>
        <h3 className="edu-dot-degree">{item.degree}</h3>
        <p className="edu-dot-org">{item.institution}</p>
        {item.major && <p className="edu-dot-major">Major: {item.major}</p>}
        {item.minor && <p className="edu-dot-minor">Minor: {item.minor}</p>}
      </div>
    </div>
  );
}

export default function Details() {
  const [expInView, setExpInView] = useState(false);
  const [eduInView, setEduInView] = useState(false);
  const expHeaderRef = useRef(null);
  const eduHeaderRef = useRef(null);

  useEffect(() => {
    const expEl = expHeaderRef.current;
    const eduEl = eduHeaderRef.current;
    if (!expEl && !eduEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.target === expEl && entry.isIntersecting) setExpInView(true);
        if (entry.target === eduEl && entry.isIntersecting) setEduInView(true);
      },
      { threshold: 0.3 }
    );
    if (expEl) obs.observe(expEl);
    if (eduEl) obs.observe(eduEl);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="details-page" aria-label="Experience and Education">
      <GlobalBackground />
      <div className="details-nav">
        <div className="container nav-inner">
          <Link to="/" className="back-link" data-cursor>
            <span className="back-arrow">←</span>
            <span className="back-label">Back</span>
          </Link>
          <span className="details-nav-tag">Experience & Education</span>
        </div>
      </div>

      {/* Experience */}
      <section id="experience" className="exp-section" aria-label="Professional Experience">
        <CanvasBg theme="timeline" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={expHeaderRef} className={`exp-section-header header-fade ${expInView ? 'is-visible' : ''}`} style={{ transitionDelay: '0s' }}>
            <span className="section-label">Experience</span>
            <h2 className="exp-section-title">
              <span className="section-title-outline">
                <WaveText text="Career" inView={expInView} baseDelay={0.1} />
              </span>{' '}
              <span className="section-title-fill">
                <WaveText text="timeline" inView={expInView} baseDelay={0.1 + "Career".length * 0.04} />
              </span>
            </h2>
          </div>
          <div className="exp-rows">
            {experience.map((item, i) => (
              <ExpRow key={`${item.company}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="edu-section section-alt" aria-label="Education">
        <CanvasBg theme="float" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div ref={eduHeaderRef} className={`edu-section-header header-fade ${eduInView ? 'is-visible' : ''}`} style={{ transitionDelay: '0s' }}>
            <span className="section-label">Education</span>
            <h2 className="edu-section-title">
              <span className="section-title-outline">
                <KineticText text="Academic" inView={eduInView} baseDelay={0.1} />
              </span>{' '}
              <span className="section-title-fill">
                <KineticText text="path" inView={eduInView} baseDelay={0.1 + "Academic".length * 0.03} />
              </span>
            </h2>
          </div>
          <div className="edu-dots">
            {education.map((item, i) => (
              <EduDot key={`${item.institution}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>





      <style>{`
        .details-page { min-height: 100vh; background: var(--bg); padding-top: 64px; }

        .details-nav { border-bottom: 1px solid var(--border); position: sticky; top: 64px; background: var(--bg); z-index: 40; }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; height: 56px; }
        .back-link { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--secondary); transition: color 0.3s ease, gap 0.3s ease; }
        .back-link:hover { color: var(--primary); gap: 12px; }
        .back-arrow { font-size: 16px; }
        .back-label { font-family: var(--font-sans); font-size: 13px; font-weight: 500; }
        .details-nav-tag { font-family: var(--font-mono); font-size: 11px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }

        /* ===== EXPERIENCE ===== */
        .exp-section { padding: 100px 0; border-top: 1px solid var(--border); }
        .exp-section-header { margin-bottom: 56px; }
        .exp-section-title { font-family: var(--font-heading); font-size: clamp(32px, 5vw, 64px); font-weight: 700; color: var(--primary-bold); letter-spacing: -1px; line-height: 1.1; }

        .exp-rows { display: flex; flex-direction: column; gap: 0; }

        .exp-row {
          display: flex;
          gap: 24px;
          padding: 32px 0;
          border-bottom: 1px solid var(--border-light);
          cursor: pointer;
          transition: border-color 0.3s ease;
          will-change: transform;
        }

        .exp-row:hover { border-color: var(--border); }
        .exp-row.is-expanded { border-color: var(--primary); }

        .exp-row-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 32px;
        }

        .exp-row-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          flex-shrink: 0;
        }

        .exp-row-line {
          width: 1px;
          flex: 1;
          background: var(--border-light);
          min-height: 20px;
        }

        .exp-row-body { flex: 1; }

        .exp-row-meta {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .exp-row-period {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.3px;
        }

        .exp-row-company {
          font-family: var(--font-heading);
          font-size: clamp(18px, 2.5vw, 28px);
          color: var(--primary);
          font-weight: 700;
          letter-spacing: -0.3px;
        }

        .exp-row-toggle {
          margin-left: auto;
          font-size: 16px;
          color: var(--muted);
          font-weight: 300;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .exp-row:hover .exp-row-toggle {
          color: var(--primary);
          transform: rotate(90deg);
        }

        .exp-row-role {
          font-family: var(--font-heading);
          font-size: clamp(22px, 3vw, 36px);
          font-weight: 700;
          color: var(--primary-bold);
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        .exp-row-details { overflow: hidden; }

        .exp-row-desc {
          font-size: 14px;
          color: var(--secondary-light);
          line-height: 1.7;
          max-width: 600px;
          margin-top: 16px;
        }

        .exp-row-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        .exp-row-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--primary);
          border: 1px solid var(--border-light);
          padding: 4px 12px;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .exp-row-chip:hover {
          background: var(--primary);
          color: var(--bg);
        }

        /* ===== EDUCATION ===== */
        .edu-section { padding: 100px 0; border-top: 1px solid var(--border); }
        .edu-section-header { margin-bottom: 56px; }
        .edu-section-title { font-family: var(--font-heading); font-size: clamp(32px, 5vw, 64px); font-weight: 700; color: var(--primary-bold); letter-spacing: -1px; line-height: 1.1; }

        .edu-dots { position: relative; padding-left: 28px; }
        .edu-dots::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: var(--border-light);
        }

        .edu-dot-item {
          position: relative;
          margin-bottom: 36px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .edu-dot-item:last-child { margin-bottom: 0; }

        .edu-dot-marker {
          position: absolute;
          left: -24px;
          top: 4px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg);
          border: 1.5px solid var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, transform 0.3s ease;
          z-index: 2;
        }

        .edu-dot-item:hover .edu-dot-marker {
          background: var(--primary);
          transform: scale(1.2);
        }

        .edu-dot-inner {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--bg);
        }

        .edu-dot-content { flex: 1; }

        .edu-dot-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .edu-dot-period {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.3px;
        }

        .edu-dot-grade {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--secondary);
          border: 1px solid var(--border-light);
          padding: 1px 8px;
        }

        .edu-dot-degree {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-bold);
          margin-bottom: 2px;
          letter-spacing: -0.2px;
        }

        .edu-dot-org {
          font-size: 13px;
          color: var(--secondary);
          font-weight: 500;
        }

        .edu-dot-major, .edu-dot-minor {
          font-size: 12px;
          color: var(--muted);
          margin-top: 2px;
          font-family: var(--font-mono);
        }

        .exp-row-details .exp-row-period {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.3px;
          display: inline-block;
          margin-bottom: 6px;
        }

        .exp-row-details .exp-row-role {
          font-family: var(--font-heading);
          font-size: clamp(22px, 3vw, 36px);
          font-weight: 700;
          color: var(--primary-bold);
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin-bottom: 12px;
        }

        @media (max-width: 1024px) {
          .exp-section-title { font-size: clamp(28px, 5vw, 44px); }
          .edu-section-title { font-size: clamp(28px, 5vw, 44px); }
        }

        @media (max-width: 768px) {
          .details-title { letter-spacing: -2px; font-size: clamp(36px, 8vw, 48px); }
          .exp-row { padding: 20px 0; gap: 16px; }
          .exp-row-details .exp-row-role { font-size: 18px; }
          .exp-row-company { font-size: clamp(16px, 3vw, 22px); }
          .exp-row-desc { font-size: 12px; }
          .edu-dot-degree { font-size: 16px; }
          .edu-dot-org { font-size: 12px; }
          .proj-item-title { font-size: 16px; }
          .details-cta { flex-direction: column; align-items: flex-start; padding: 24px 0; gap: 20px; }
          .details-cta-text { font-size: 22px; }
          .btn-primary { padding: 10px 24px; font-size: 12px; }
        }

        @media (max-width: 480px) {
          .details-page { padding-top: 48px; }
          .exp-section { padding: 60px 0; }
          .exp-section-header { margin-bottom: 32px; }
          .edu-section { padding: 60px 0; }
          .edu-section-header { margin-bottom: 32px; }
          .exp-row { padding: 16px 0; }
          .exp-row-role { font-size: 18px; }
          .exp-row-details .exp-row-role { font-size: 16px; }
          .edu-dot-degree { font-size: 14px; }
          .edu-dot-item { margin-bottom: 24px; gap: 12px; }
          .details-nav-tag { display: none; }
          .exp-row-period { font-size: 10px; }
          .edu-dot-period { font-size: 10px; }
          .edu-dot-org { font-size: 11px; }
        }

        @media (max-width: 430px) {
          .exp-section { padding: 50px 0; }
          .edu-section { padding: 50px 0; }
          .exp-row { padding: 14px 0; }
        }

        @media (max-width: 360px) {
          .details-page { padding-top: 40px; }
          .exp-section { padding: 40px 0; }
          .exp-section-header { margin-bottom: 24px; }
          .edu-section { padding: 40px 0; }
          .edu-section-header { margin-bottom: 24px; }
          .exp-row { padding: 12px 0; gap: 12px; }
          .exp-row-company { font-size: 15px; }
          .exp-row-role { font-size: 15px; }
          .exp-row-details .exp-row-role { font-size: 14px; }
          .exp-row-desc { font-size: 12px; }
          .edu-dot-degree { font-size: 13px; }
          .edu-dot-item { margin-bottom: 20px; gap: 10px; }
          .edu-dot-org { font-size: 12px; }
          .exp-row-period { font-size: 9px; }
          .edu-dot-period { font-size: 9px; }
          .edu-dots { padding-left: 24px; }
          .edu-dot-marker { width: 12px; height: 12px; left: -20px; }
        }
      `}</style>
    </main>
  );
}
