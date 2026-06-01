import { useRef, useEffect } from 'react';

export default function SlantedMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let raf = null;

    const animate = () => {
      x += 0.6;
      track.style.transform = `translateX(${x}px)`;

      const halfW = track.scrollWidth / 2;
      if (x >= 0) x -= halfW;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, []);

  const text = "FULL STACK • REACT • NODE.JS • AI • TYPESCRIPT • NEXT.JS • ";
  const doubled = Array.from({ length: 4 }, (_, i) => text);

  return (
    <div className="slanted-marquee" aria-hidden="true">
      <div className="marquee-fade" />
      <div className="marquee-track" ref={trackRef}>
        {doubled.map((t, i) => (
          <span key={i} className="marquee-block">
            {t.split('').map((char, ci) => (
              <span
                key={ci}
                className="marquee-char"
                style={{ '--char-idx': ci }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        ))}
      </div>

      <style>{`
        .slanted-marquee {
          width: 100%;
          overflow: hidden;
          transform: skewY(-3deg);
          padding: 44px 0;
          background: var(--primary-bold);
          margin: 40px 0;
          position: relative;
        }

        .marquee-fade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to right,
            var(--primary-bold) 0%,
            transparent 10%,
            transparent 90%,
            var(--primary-bold) 100%
          );
        }

        .marquee-track {
          display: flex;
          white-space: nowrap;
          will-change: transform;
        }

        .marquee-block {
          display: flex;
          white-space: nowrap;
        }

        .marquee-char {
          display: inline-block;
          font-family: var(--font-heading);
          font-size: clamp(20px, 3vw, 36px);
          font-weight: 700;
          color: var(--bg);
          opacity: 0.2;
          letter-spacing: -0.5px;
          animation: char-glow 3s ease-in-out infinite;
          animation-delay: calc(var(--char-idx) * 0.05s);
          transition: opacity 0.3s ease, color 0.3s ease;
        }

        .marquee-char:hover {
          opacity: 1;
          color: var(--text-muted);
        }

        @keyframes char-glow {
          0%, 100% {
            opacity: 0.2;
            text-shadow: none;
          }
          25% {
            opacity: 0.55;
            text-shadow: 0 0 12px rgba(255,255,255,0.06);
          }
          50% {
            opacity: 0.3;
            text-shadow: none;
          }
          75% {
            opacity: 0.45;
            text-shadow: 0 0 8px rgba(255,255,255,0.04);
          }
        }

        @media (max-width: 768px) {
          .slanted-marquee {
            padding: 28px 0;
            margin: 24px 0;
          }
          .marquee-char {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
