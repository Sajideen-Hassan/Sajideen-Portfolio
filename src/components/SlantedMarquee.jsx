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
          padding: 48px 0;
          background: linear-gradient(135deg, var(--primary-bold) 0%, #1a1a1a 50%, var(--primary-bold) 100%);
          margin: 60px 0;
          position: relative;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .marquee-fade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            to right,
            var(--primary-bold) 0%,
            transparent 8%,
            transparent 92%,
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
          font-size: clamp(20px, 3vw, 40px);
          font-weight: 800;
          color: rgba(255,255,255,0.15);
          letter-spacing: -1px;
          animation: char-glow 3s ease-in-out infinite;
          animation-delay: calc(var(--char-idx) * 0.05s);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          font-feature-settings: "ss01";
        }

        .marquee-char:hover {
          color: #ffffff;
          filter: drop-shadow(0 0 12px rgba(255,255,255,0.5));
          transform: scale(1.15);
        }

        @keyframes char-glow {
          0%, 100% {
            color: rgba(255,255,255,0.15);
            filter: drop-shadow(0 0 0 rgba(255,255,255,0.2));
          }
          25% {
            color: rgba(255,255,255,0.4);
            filter: drop-shadow(0 0 12px rgba(255,255,255,0.4));
          }
          50% {
            color: rgba(255,255,255,0.2);
            filter: drop-shadow(0 0 0 rgba(255,255,255,0.2));
          }
          75% {
            color: rgba(255,255,255,0.35);
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
          }
        }

        @media (max-width: 768px) {
          .slanted-marquee {
            padding: 32px 0;
            margin: 40px 0;
          }
          .marquee-char {
            font-size: 16px;
          }
        }
        @media (max-width: 480px) {
          .slanted-marquee {
            padding: 20px 0;
            margin: 24px 0;
          }
          .marquee-char {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
