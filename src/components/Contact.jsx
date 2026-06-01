import { useRef } from 'react';
import useInView from '../hooks/useInView';
import { personal } from '../data/portfolio';
import CanvasBg from './CanvasBg';

export default function Contact() {
  const [ref, inView] = useInView({ once: true, rootMargin: '-80px' });

  const links = [
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { label: 'GitHub', value: 'Sajideen-Hassan', href: personal.social.github },
    { label: 'LinkedIn', value: 'sajideen-hassan', href: personal.social.linkedin },
    { label: 'Location', value: personal.location },
  ];

  return (
    <section id="contact" ref={ref} className="contact-section" aria-label="Contact">
      <CanvasBg variant="dark" theme="calm" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="contact-grid">
          <div className="contact-side">
            <div className={`bio-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0s' }}>
              <span className="contact-tag">Contact</span>
            </div>

            <h2
              className={`contact-heading title-fade ${inView ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="contact-outline">Let's</span>{' '}
              <span className="contact-fill">build</span><br />
              <span className="contact-outline">something</span>{' '}
              <span className="contact-fill">amazing.</span>
            </h2>

            <p
              className={`contact-desc bio-fade ${inView ? 'is-visible' : ''}`}
              style={{ transitionDelay: '0.25s' }}
            >
              Have a project or idea? Let's talk.
            </p>

          </div>

          <div className="contact-channels">
            {links.map((link, i) => (
              <div
                key={link.label}
                className={`channel-fade ${inView ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${0.3 + i * 0.1}s` }}
              >
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="channel-row" data-cursor>
                    <span className="channel-row-label">{link.label}</span>
                    <span className="channel-row-value">{link.value}</span>
                    <span className="channel-row-icon">↗</span>
                  </a>
                ) : (
                  <div className="channel-row">
                    <span className="channel-row-label">{link.label}</span>
                    <span className="channel-row-value">{link.value}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .contact-section {
          background: var(--primary-bold);
          color: var(--bg);
          overflow: hidden;
          position: relative;
          padding: 48px 0 24px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 0;
          min-height: auto;
          align-items: center;
        }

        .contact-side {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.35;
        }

        .contact-heading {
          font-family: var(--font-heading);
          font-size: clamp(44px, 7vw, 90px);
          font-weight: 800;
          letter-spacing: -2.5px;
          line-height: 1;
        }
        .contact-outline {
          color: transparent;
          -webkit-text-stroke: 2px var(--bg);
          text-stroke: 2px var(--bg);
          paint-order: stroke fill;
        }
        .contact-fill {
          color: var(--bg);
          -webkit-text-stroke: 0;
        }

        .contact-desc {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.45;
          max-width: 360px;
          margin-bottom: 48px;
        }

        .contact-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          border: 1px solid rgba(255,255,255,0.15);
          text-decoration: none;
          color: var(--bg);
          transition: gap 0.3s ease, background 0.3s ease, border-color 0.3s ease;
          align-self: flex-start;
          margin-top: 8px;
        }

        .contact-cta:hover {
          gap: 20px;
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.25);
        }

        .cta-text {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
        }

        .cta-arrow {
          font-size: 16px;
          transition: transform 0.3s ease;
        }

        .contact-cta:hover .cta-arrow {
          transform: translateX(4px);
        }

        .contact-channels {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .channel-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
          color: var(--bg);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
        }

        .channel-row::before {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffffff;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .channel-row:last-child {
          border-bottom: none;
        }

        .channel-row:hover {
          gap: 28px;
          padding-left: 8px;
        }

        .channel-row:hover::before {
          width: 100%;
        }

        .channel-row-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.5;
          min-width: 68px;
          font-weight: 600;
        }

        .channel-row-value {
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 600;
          flex: 1;
          letter-spacing: -0.2px;
        }

        .channel-row-icon {
          font-size: 14px;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-weight: 600;
        }

        .channel-row:hover .channel-row-icon {
          opacity: 1;
          transform: translateX(4px) translateY(-4px);
        }

        @media (max-width: 1024px) {
          .contact-grid { gap: 48px; }
        }

        @media (max-width: 768px) {
          .contact-section { padding: 32px 0 16px; }
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .contact-heading { letter-spacing: -1.5px; font-size: clamp(36px, 8vw, 52px); }
          .channel-row-label { min-width: 56px; }
          .channel-row-value { font-size: 13px; }
          .channel-row { padding: 18px 0; }
        }

        @media (max-width: 480px) {
          .contact-section { padding: 24px 0 12px; }
          .contact-grid { gap: 24px; }
          .contact-heading { font-size: clamp(28px, 7vw, 36px); letter-spacing: -1px; }
          .contact-desc { font-size: 12px; margin-bottom: 32px; }
          .channel-row { padding: 14px 0; gap: 12px; flex-wrap: wrap; }
          .channel-row-label { min-width: auto; font-size: 9px; }
          .channel-row-value { font-size: 12px; min-width: 0; }
        }
      `}</style>
    </section>
  );
}
