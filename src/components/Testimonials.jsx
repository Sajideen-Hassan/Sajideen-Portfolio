import { useRef, useEffect } from 'react';
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
  return (
    <div className="tcard">
      <div className="tcard-quote-mark">"</div>
      <p className="tcard-quote">{testimonial.quote}</p>
      <div className="tcard-author">
        <span className="tcard-name">{testimonial.name}</span>
        <span className="tcard-title">{testimonial.title}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
    <section id="testimonials" className="testimonials-section snap-section" aria-label="Testimonials">
      <CanvasBg theme="system" />
      <div className="container" style={{ position: 'relative', zIndex: 1, marginBottom: 48 }}>
        <span className="section-label">Testimonials</span>
        <h2 className="section-title testimonials-title">Kind words.</h2>
      </div>

      <div className="tcards-track-wrap">
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
        }

        .tcards-track {
          display: flex;
          gap: 24px;
          will-change: transform;
          padding-left: 24px;
        }

        .tcard {
          flex-shrink: 0;
          width: 360px;
          border: 2px solid var(--border-light);
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s ease;
          cursor: default;
          background: var(--bg);
        }

        .tcard:hover {
          border-color: var(--primary);
          background: rgba(17, 17, 17, 0.01);
          transform: translateY(-4px);
        }

        .tcard-quote-mark {
          font-family: var(--font-heading);
          font-size: 44px;
          line-height: 1;
          color: var(--primary);
          opacity: 0.12;
          height: 28px;
        }

        .tcard-quote {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.7;
          color: var(--secondary);
          flex: 1;
        }

        .tcard-author {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }

        .tcard-name {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--primary-bold);
          letter-spacing: -0.2px;
        }

        .tcard-title {
          font-family: var(--font-sans);
          font-size: 11px;
          color: var(--muted);
        }

        @media (max-width: 768px) {
          .tcard { width: 280px; padding: 28px 24px; }
        }
      `}</style>
    </section>
  );
}
