import { useRef, useEffect } from 'react';
import useInView from '../hooks/useInView';
import CanvasBg from './CanvasBg';

const testimonials = [
  {
    quote: "Working with Sajideen was a game-changer. His ability to architect scalable MERN applications and lead the team was exceptional.",
    name: "Muhammad Nadir",
    title: "CEO of Techtide Co.",
  },
  {
    quote: "A true professional. Sajideen writes clean, maintainable code. His attention to detail in UI/UX makes his projects stand out from the rest.",
    name: "Mubashir Ahmed",
    title: "Software Engineer",
  },
  {
    quote: "He understood our complex logic requirements instantly and delivered a flawless system ahead of schedule. Highly recommended!",
    name: "Zain and Tayyaba",
    title: "University Student",
  },
  {
    quote: "Sajideen created an absolutely stunning website for my business. The animations are so smooth and everything perfectly fits my brand.",
    name: "Peter",
    title: "Freelancing Client",
  },
];

function TestimonialCard({ testimonial }) {
  const initials = testimonial.name.split(' ').map(w => w[0]).join('');

  return (
    <div className="tcard">
      <div className="tcard-top">
        <span className="tcard-initials">{initials}</span>
        <span className="tcard-quote-mark">"</span>
      </div>
      <div className="tcard-quote-wrap">
        <p className="tcard-quote">{testimonial.quote}</p>
      </div>
      <div className="tcard-author">
        <span className="tcard-name">{testimonial.name}</span>
        <span className="tcard-title">{testimonial.title}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [sectionRef, inView] = useInView({ once: true, rootMargin: '-80px' });
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let raf = null;
    const card = track.querySelector('.tcard');
    const cardWidth = card ? card.offsetWidth + 24 : 384;
    const setWidth = testimonials.length * cardWidth;

    const animate = () => {
      x -= 0.35;
      if (x <= -setWidth) x += setWidth;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" ref={sectionRef} className="testimonials-section snap-section section-alt" aria-label="Testimonials">
      <CanvasBg theme="system" />
      <div className="container" style={{ position: 'relative', zIndex: 1, marginBottom: 48 }}>
        <div className={`section-label-fade ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: '0s' }}>
          <span className="section-label">Testimonials</span>
        </div>
        <h2
          className={`section-title testimonials-title title-fade-blur ${inView ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span className="section-title-outline">What people</span>{' '}
          <span className="section-title-fill">say.</span>
        </h2>
      </div>

      <div
        className={`tcards-track-wrap wrap-fade ${inView ? 'is-visible' : ''}`}
        style={{ transitionDelay: '0.2s' }}
      >
        <div className="tcards-track" ref={trackRef}>
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          padding-top: var(--section-gap);
          padding-bottom: 0;
          overflow: hidden;
          position: relative;
        }

        .testimonials-title {
          margin-bottom: 0;
        }

        .tcards-track-wrap {
          width: 100%;
          overflow: hidden;
          padding-bottom: var(--section-gap);
          margin-top: 48px;
        }

        .tcards-track {
          display: flex;
          gap: 20px;
          will-change: transform;
          padding-left: 20px;
        }

        .tcard {
          flex-shrink: 0;
          width: 300px;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: default;
          background: #ffffff;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
        }

        .tcard:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.1);
        }

        .tcard-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px 0;
        }

        .tcard-initials {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 800;
          color: #000;
          letter-spacing: 1px;
          background: #f0f0f0;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .tcard-quote-mark {
          font-family: var(--font-heading);
          font-size: 42px;
          line-height: 1;
          color: #000;
          opacity: 0.07;
          font-weight: 700;
        }

        .tcard-quote-wrap {
          padding: 12px 22px 0;
        }

        .tcard-quote {
          font-family: var(--font-sans);
          font-size: 13px;
          line-height: 1.65;
          color: var(--secondary);
        }

        .tcard-author {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 14px 22px 18px;
          margin-top: 12px;
          border-top: 1px solid var(--border-light);
          background: #fafafa;
        }

        .tcard-name {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: var(--primary-bold);
          letter-spacing: -0.2px;
        }

        .tcard-title {
          font-family: var(--font-sans);
          font-size: 11px;
          color: var(--muted);
        }

        @media (max-width: 1024px) {
          .tcard { width: 300px; }
        }

        @media (max-width: 768px) {
          .tcard { width: 260px; }
          .tcard-quote { font-size: 12px; }
          .tcard-top { padding: 14px 18px 0; }
          .tcard-quote-wrap { padding: 10px 18px 0; }
          .tcard-author { padding: 12px 18px 16px; }
        }

        @media (max-width: 480px) {
          .testimonials-section { padding-top: 60px; }
          .tcard { width: 220px; }
          .tcard-quote { font-size: 11px; }
          .tcard-top { padding: 12px 14px 0; }
          .tcard-quote-wrap { padding: 8px 14px 0; }
          .tcard-author { padding: 10px 14px 14px; }
          .tcard-quote-mark { font-size: 32px; }
          .tcard-name { font-size: 12px; }
          .tcard-title { font-size: 10px; }
        }
      `}</style>
    </section>
  );
}
