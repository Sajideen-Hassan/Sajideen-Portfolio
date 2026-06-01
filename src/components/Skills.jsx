import { useRef, useState } from 'react';
import { m, useInView } from 'framer-motion';
import { skills } from '../data/portfolio';
import { KineticText } from './TextAnimations';
import CanvasBg from './CanvasBg';

const categoryIcons = {
  Frontend: '⎔',
  Backend: '⚙',
  Databases: '⊞',
  'AI & Automation': '◇',
  'Tools & DevOps': '⌘',
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" ref={ref} className="skills-section snap-section" aria-label="Skills">
      <CanvasBg theme="ripple" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <m.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="section-label">Capabilities</span>
          </m.div>

          <m.h2
            className="section-title skills-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <KineticText text="Tech stack." inView={inView} baseDelay={0.3} />
          </m.h2>
        </m.div>

        <div className="skills-grid">
          {skills.map((group, gIdx) => (
            <m.div
              key={group.category}
              className={`skills-card ${activeCategory === gIdx ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveCategory(gIdx)}
              onMouseLeave={() => setActiveCategory(null)}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * gIdx + 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="skills-card-header">
                <span className="skills-card-icon">{categoryIcons[group.category] || '⎔'}</span>
                <h3 className="skills-card-category">{group.category}</h3>
              </div>
              <div className="skills-card-items">
                {group.items.map((item, i) => (
                  <m.span
                    key={item}
                    className="skills-chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.12 * gIdx + 0.3 + i * 0.04 }}
                    whileHover={{ scale: 1.05, background: 'var(--primary)', color: 'var(--bg)', borderColor: 'var(--primary)' }}
                  >
                    {item}
                  </m.span>
                ))}
              </div>
            </m.div>
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
          border: 2px solid var(--border-light);
          padding: 32px 28px;
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s ease;
          cursor: default;
        }

        .skills-card:hover,
        .skills-card.is-active {
          border-color: var(--primary);
          background: rgba(17, 17, 17, 0.02);
          transform: translateY(-2px);
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
          color: var(--secondary);
          border: 1px solid var(--border-light);
          padding: 5px 14px;
          cursor: default;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }

        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; }
          .skills-card { padding: 24px 20px; }
        }
      `}</style>
    </section>
  );
}
