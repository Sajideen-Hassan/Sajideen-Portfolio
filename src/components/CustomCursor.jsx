import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const pos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let raf = null;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
    };

    const animate = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.12;
      ringPos.y += (pos.y - ringPos.y) * 0.12;
      ring.style.transform = `translate(${ringPos.x - 16}px, ${ringPos.y - 16}px)`;
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    };
    const onLeave = () => {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          transition: width 0.25s, height 0.25s, background 0.25s;
        }
        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 32px;
          height: 32px;
          border: 1.5px solid var(--primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          will-change: transform;
          transition: width 0.35s ease, height 0.35s ease, border-color 0.35s ease, background 0.35s ease;
        }
        .cursor-dot.cursor-hover {
          width: 10px;
          height: 10px;
          background: var(--primary-bold);
        }
        .cursor-ring.cursor-hover {
          width: 48px;
          height: 48px;
          border-color: var(--secondary-light);
          background: rgba(17, 17, 17, 0.04);
        }
        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none; }
          body { cursor: auto; }
        }
      `}</style>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
