import { useRef, useEffect, useState } from 'react';
import { m, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { personal } from '../data/portfolio';
import { ElasticText } from './TextAnimations';
import CanvasBg from './CanvasBg';

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const driftX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [headingInView, setHeadingInView] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeadingInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section snap-section" aria-label="About">
      <CanvasBg theme="calm" />
      <div className="drift-layer">
        <m.div className="drift-line" style={{ top: '15%', x: driftX }}>
          SOFTWARE ENGINEER • FULL STACK • AI SYSTEMS • REACT • NODE.JS •
        </m.div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <m.div
          className="about-spread"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-image-col">
            <div className={`about-frame ${inView ? 'is-revealed' : ''}`}>
              <m.div
                ref={imageRef}
                className="about-image-wrap"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <m.img
                  src={personal.photo}
                  alt={personal.name}
                  className="about-image"
                  style={{ y: imgParallax }}
                />
                <div className="about-image-border" />
              </m.div>
            </div>
          </div>

          <div className="about-text-col">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="section-label">About</span>
            </m.div>

            <h2 ref={headingRef} className="about-heading">
              <ElasticText text={personal.tagline} inView={headingInView} baseDelay={0.1} />
            </h2>

            <m.p
              className="about-bio"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {personal.bio}
            </m.p>

            <m.div
              className="about-stats"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <div className="about-stat">
                <span className="about-stat-num">2</span>
                <span className="about-stat-label">Years</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">15+</span>
                <span className="about-stat-label">Projects</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-num">
                  <span className="about-status-dot" />
                </span>
                <span className="about-stat-label">Available</span>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Link to="/details" className="about-cta" data-cursor>
                <span className="about-cta-border" />
                <span className="about-cta-text">View more</span>
                <span className="about-cta-arrow">→</span>
              </Link>
            </m.div>
          </div>
        </m.div>
      </div>

      <style>{`
        .about-section {
          padding-top: 0;
          overflow: hidden;
          position: relative;
        }

        .about-spread {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-image-col { position: relative; }

        .about-frame {
          position: relative;
          clip-path: inset(0 0 0 0);
          transition: clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-frame:not(.is-revealed) {
          clip-path: inset(0 100% 0 0);
        }

        .about-image-wrap {
          position: relative;
          overflow: hidden;
          cursor: crosshair;
        }

        .about-image {
          width: 100%;
          height: 420px;
          object-fit: contain;
          object-position: center;
          display: block;
          will-change: transform;
          background: var(--bg);
        }

        .about-image-border {
          position: absolute;
          inset: 0;
          border: 2px solid var(--border);
          pointer-events: none;
        }

        .about-text-col {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .about-heading {
          font-family: var(--font-heading);
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.2px;
          color: var(--primary-bold);
        }

        .about-bio {
          font-size: 13px;
          line-height: 1.7;
          color: var(--secondary-light);
          max-width: 440px;
        }

        .about-stats {
          display: flex;
          gap: 36px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .about-stat-num {
          font-family: var(--font-heading);
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-bold);
          line-height: 1;
        }

        .about-stat-label {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .about-status-dot {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-dot 2s infinite;
          vertical-align: middle;
        }

        @keyframes pulse-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          padding: 12px 0;
          position: relative;
          transition: gap 0.3s ease;
        }

        .about-cta:hover { gap: 20px; }

        .about-cta-border {
          position: absolute;
          left: 0; bottom: 0;
          width: 100%; height: 1px;
          background: var(--border);
          transition: height 0.3s ease, background 0.3s ease;
        }

        .about-cta:hover .about-cta-border {
          height: 2px;
          background: var(--primary);
        }

        .about-cta-text {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--primary-bold);
          letter-spacing: 0.3px;
        }

        .about-cta-arrow {
          font-size: 16px;
          color: var(--primary);
          transition: transform 0.3s ease;
        }

        .about-cta:hover .about-cta-arrow { transform: translateX(4px); }

        @media (max-width: 768px) {
          .about-spread { grid-template-columns: 1fr; gap: 40px; }
          .about-image { height: 400px; }
          .about-stats { gap: 24px; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  );
}
