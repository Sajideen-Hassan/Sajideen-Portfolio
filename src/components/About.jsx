import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personal } from '../data/portfolio';
import CanvasBg from './CanvasBg';
import BlurImage from './BlurImage';

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [imgParallax, setImgParallax] = useState(0);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { rootMargin: '-80px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
      setImgParallax(-8 + 16 * progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = personal.tagline.split(' ');
  const midIdx = Math.ceil(words.length / 2);
  const aboutFirst = words.slice(0, midIdx).join(' ');
  const aboutRest = words.slice(midIdx).join(' ');

  return (
    <section id="about" ref={sectionRef} className="about-section snap-section section-alt" aria-label="About">
      <CanvasBg theme="calm" />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={`about-spread spread-fade ${inView ? 'is-visible' : ''}`}>
          <div className="about-image-col">
            <div
              ref={imageRef}
              className="about-image-wrap"
            >
              <BlurImage
                src={personal.photo}
                alt={personal.name}
                imgClass="about-image"
                width={320}
                height={340}
                style={{ transform: `translateY(${imgParallax}%)` }}
              />
            </div>
          </div>

          <div className="about-text-col">
            <div className={`bio-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0s' }}>
              <span className="section-label">About</span>
            </div>

            <h2 ref={headingRef} className="about-heading">
              <span className="section-title-outline">
{aboutFirst}</span>{' '}
              <span className="section-title-fill">{aboutRest}
              </span>
            </h2>

            <p
              className={`about-bio bio-fade ${inView ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.5s' }}
            >
              {personal.bio}
            </p>

            <div
              className={`about-stats bio-fade ${inView ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.65s' }}
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
            </div>

            <div className={`bio-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
              <Link to="/details" className="about-cta" data-cursor>
                <span className="about-cta-border" />
                <span className="about-cta-text">View more</span>
                <span className="about-cta-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          overflow: hidden;
          position: relative;
        }

        .about-spread {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 32px;
          align-items: center;
        }

        .about-image-col { position: relative; }

        .about-image-wrap {
          position: relative;
          overflow: hidden;
          cursor: crosshair;
          border-radius: 20px;
        }

        .about-image {
          width: 100%;
          max-width: 320px;
          height: 340px;
          object-fit: contain;
          object-position: center;
          display: block;
          will-change: transform;
          border-radius: 20px;
        }

        .about-text-col {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .about-heading {
          font-family: var(--font-heading);
          font-size: clamp(24px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.5px;
          color: transparent;
          -webkit-text-stroke: 1.2px #000000;
          text-stroke: 1.2px #000000;
          paint-order: stroke fill;
        }

        .about-bio {
          font-size: 13px;
          line-height: 1.7;
          color: var(--secondary-light);
          max-width: 440px;
        }

        .about-stats {
          display: flex;
          gap: 48px;
          padding-top: 28px;
          border-top: 1px solid var(--border);
        }

        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: transform 0.3s ease;
        }

        .about-stat:hover {
          transform: translateY(-4px);
        }

        .about-stat-num {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 700;
          color: #000000;
          line-height: 1;
        }

        .about-stat-label {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 600;
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
          padding: 14px 0;
          position: relative;
          transition: gap 0.3s ease, color 0.3s ease;
          font-weight: 600;
        }

        .about-cta:hover { gap: 24px; }

        .about-cta-border {
          position: absolute;
          left: 0; bottom: 0;
          width: 100%; height: 2px;
          background: #000000;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.5;
        }

        .about-cta:hover .about-cta-border {
          height: 3px;
          opacity: 1;
        }

        .about-cta-text {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: #000000;
          letter-spacing: 0.5px;
        }

        .about-cta-arrow {
          font-size: 18px;
          color: #000000;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .about-cta:hover .about-cta-arrow { 
          transform: translateX(6px) rotate(45deg);
        }

        @media (max-width: 1024px) {
          .about-spread { gap: 28px; }
          .about-image { max-width: 280px; height: 280px; }
          .about-bio { max-width: 100%; }
        }

        @media (max-width: 768px) {
          .about-spread { grid-template-columns: 1fr; gap: 32px; }
          .about-image-wrap { max-width: 220px; }
          .about-image { max-width: 220px; height: 240px; }
          .about-stats { gap: 24px; flex-wrap: wrap; }
          .about-bio { max-width: 100%; }
          .about-image-col { order: -1; }
        }

        @media (max-width: 480px) {
          .about-spread { gap: 24px; }
          .about-image { max-width: 180px; height: 200px; }
          .about-heading { font-size: clamp(18px, 5vw, 22px); }
          .about-bio { font-size: 12px; }
          .about-stats { gap: 16px; }
          .about-stat-num { font-size: 20px; }
          .about-stat-label { font-size: 8px; }
        }

        @media (max-width: 430px) {
          .about-image { max-width: 160px; height: 180px; }
          .about-heading { font-size: clamp(16px, 4.5vw, 20px); }
          .about-stats { gap: 14px; }
          .about-stat-num { font-size: 18px; }
        }

        @media (max-width: 360px) {
          .about-image { max-width: 140px; height: 160px; }
          .about-image-wrap { max-width: 140px; }
          .about-heading { font-size: clamp(15px, 4vw, 18px); }
          .about-bio { font-size: 12px; }
          .about-stats { gap: 12px; }
          .about-stat-num { font-size: 16px; }
          .about-stat-label { font-size: 8px; }
        }
      `}</style>
    </section>
  );
}
