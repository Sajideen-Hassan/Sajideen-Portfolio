import { useState } from 'react';
import useInView from '../hooks/useInView';
import { skills } from '../data/portfolio';
import CanvasBg from './CanvasBg';

const categoryIcons = {
  Frontend: '⎔',
  Backend: '⚙',
  Databases: '⊞',
  'AI & Automation': '◇',
  'Tools & DevOps': '⌘',
};

export default function Skills() {
  const [ref, inView] = useInView({ once: true, rootMargin: '-80px' });
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" ref={ref} className="skills-section snap-section" aria-label="Skills">
      <CanvasBg theme="ripple" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={`section-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0s' }}>
          <div className={`label-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <span className="section-label">Capabilities</span>
          </div>

          <h2
            className={`section-title skills-title title-fade ${inView ? 'is-visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <span className="section-title-outline">Tech</span>{' '}
            <span className="section-title-fill">Stack.</span>
          </h2>
        </div>

        <div
          className={`skills-grid grid-fade ${inView ? 'is-visible' : ''}`}
        >
          {skills.map((group, gIdx) => (
            <div
              key={group.category}
              className={`skills-card card-fade ${activeCategory === gIdx ? 'is-active' : ''} ${inView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${0.2 + 0.12 * gIdx}s` }}
              onMouseEnter={() => setActiveCategory(gIdx)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="skills-card-header">
                <span className="skills-card-icon">{categoryIcons[group.category] || '⎔'}</span>
                <h3 className="skills-card-category">{group.category}</h3>
              </div>
              <div className="skills-card-items">
                {group.items.map((item, i) => (
                  <span
                    key={item}
                    className={`skills-chip chip-fade ${inView ? 'is-visible' : ''}`}
                    style={{ transitionDelay: `${0.12 * gIdx + 0.3 + i * 0.04}s` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          padding-top: var(--section-gap);
          padding-bottom: var(--section-gap);
        }

        .skills-title { margin-bottom: 48px; }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .skills-card {
          border: 1px solid #e0e0e0;
          padding: 32px 28px;
          background: #ffffff;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .skills-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .skills-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid transparent;
          background: linear-gradient(135deg, #000000 0%, rgba(0,0,0,0.3) 100%) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 12px;
        }

        .skills-card:hover,
        .skills-card.is-active {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          border-color: #000000;
          background: #ffffff;
        }

        .skills-card:hover::before,
        .skills-card.is-active::before {
          opacity: 1;
        }

        .skills-card:hover::after,
        .skills-card.is-active::after {
          opacity: 1;
        }

        .skills-card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .skills-card-icon {
          font-size: 20px;
          color: var(--muted);
          width: 24px;
          text-align: center;
        }

        .skills-card-category {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          color: var(--primary-bold);
          letter-spacing: -0.3px;
        }

        .skills-card-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .skills-chip {
          font-family: var(--font-sans);
          font-size: 13px;
          color: #333333;
          border: 1px solid #d0d0d0;
          padding: 6px 16px;
          cursor: default;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 20px;
          background: #fafafa;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        .skills-chip:hover {
          background: #000000;
          color: #ffffff;
          border-color: #000000;
          transform: translateY(-2px) scale(1.08);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }

        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; gap: 16px; }
          .skills-card { padding: 24px 20px; }
          .skills-card-category { font-size: 18px; }
        }

        @media (max-width: 480px) {
          .skills-card { padding: 20px 16px; }
          .skills-card-header { gap: 8px; margin-bottom: 16px; padding-bottom: 12px; }
          .skills-card-category { font-size: 16px; }
          .skills-chip { font-size: 11px; padding: 4px 10px; }
          .skills-card-icon { font-size: 16px; width: 20px; }
        }

        @media (max-width: 430px) {
          .skills-card { padding: 18px 14px; }
          .skills-chip { font-size: 10px; padding: 4px 9px; }
        }

        @media (max-width: 360px) {
          .skills-card { padding: 16px 12px; }
          .skills-card-header { gap: 6px; margin-bottom: 12px; padding-bottom: 10px; }
          .skills-card-category { font-size: 14px; }
          .skills-chip { font-size: 11px; padding: 4px 9px; min-height: 30px; }
          .skills-card-icon { font-size: 14px; width: 18px; }
          .skills-grid { gap: 12px; }
        }
      `}</style>
    </section>
  );
}
