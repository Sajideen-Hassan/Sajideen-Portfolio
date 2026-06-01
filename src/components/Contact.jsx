import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { personal } from '../data/portfolio';
import CanvasBg from './CanvasBg';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

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
            <m.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <span className="contact-tag">Contact</span>
            </m.div>

            <m.h2
              className="contact-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's create<br />something great.
            </m.h2>

            <m.p
              className="contact-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Have a project, idea, or just want to connect? Drop me a message.
            </m.p>

            <m.a
              href={`mailto:${personal.email}`}
              className="contact-cta"
              data-cursor
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="cta-text">Send a message</span>
              <span className="cta-arrow">→</span>
            </m.a>
          </div>

          <div className="contact-channels">
            {links.map((link, i) => (
              <m.div
                key={link.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
              </m.div>
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
          font-weight: 700;
          letter-spacing: -2.5px;
          line-height: 1;
          color: var(--bg);
        }

        .contact-desc {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.45;
          max-width: 360px;
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
          padding: 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: var(--bg);
          transition: opacity 0.3s ease, gap 0.3s ease;
          cursor: pointer;
        }

        .channel-row:last-child {
          border-bottom: none;
        }

        .channel-row:hover {
          opacity: 0.6;
          gap: 28px;
        }

        .channel-row-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.3;
          min-width: 68px;
        }

        .channel-row-value {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          flex: 1;
        }

        .channel-row-icon {
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .channel-row:hover .channel-row-icon {
          opacity: 1;
          transform: translateX(2px) translateY(-2px);
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 32px 0 16px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .contact-heading {
            letter-spacing: -1.5px;
          }

          .contact-cta {
            width: 100%;
            justify-content: space-between;
          }

          .channel-row-label {
            min-width: 56px;
          }
        }
      `}</style>
    </section>
  );
}
