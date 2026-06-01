import { useRef, useMemo } from 'react';
import { m } from 'framer-motion';

/* ─── helpers ─── */
const r = (min, max) => Math.random() * (max - min) + min;
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ─── SYSTEM: Hero ─── */
function SystemBg() {
  const nodes = useMemo(() => range(18).map(() => ({
    x: r(5, 95), y: r(5, 95), d: r(1.5, 4),
    dx: r(-30, 30), dy: r(-20, 20),
    dur: r(6, 12),
  })), []);

  const code = useMemo(() => ['const', 'async', '=>', '{}', 'fetch', 'await', 'data', 'import', 'useEffect', 'return', 'props', 'state', 'export', 'function'].map((t) => ({
    text: t, y: r(5, 95),
    dur: r(12, 22), start: r(-200, 0),
  })), []);

  return (
    <div className="bg-fm" aria-hidden="true">
      {nodes.map((n, i) => (
        <m.div
          key={i}
          className="bg-fm-dot"
          style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.d, height: n.d }}
          animate={{ x: [0, n.dx, 0], y: [0, n.dy, 0] }}
          transition={{ duration: n.dur, repeat: Infinity, ease: 'easeInOut', delay: r(0, 3) }}
        />
      ))}
      {nodes.map((_, i) =>
        nodes.slice(i + 1).filter(() => Math.random() > 0.75).map((nj, j) => (
          <svg key={`${i}-${j}`} className="bg-fm-line" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <m.line
              x1={`${nodes[i].x}%`} y1={`${nodes[i].y}%`}
              x2={`${nj.x}%`} y2={`${nj.y}%`}
              stroke="rgba(17,17,17,0.04)" strokeWidth="0.5"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: r(3, 6), repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        ))
      )}
      <div className="bg-fm-grid" />
      {code.map((c, i) => (
        <m.span
          key={i}
          className="bg-fm-code"
          style={{ top: `${c.y}%` }}
          initial={{ x: c.start }}
          animate={{ x: [c.start, window.innerWidth + 200] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'linear', delay: r(0, 5) }}
        >{c.text}</m.span>
      ))}
      <style>{`
        .bg-fm { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .bg-fm-dot { position: absolute; border-radius: 50%; background: rgba(17,17,17,0.08); }
        .bg-fm-code { position: absolute; font-family: 'JetBrains Mono', monospace; font-size: 9px; color: rgba(17,17,17,0.06); white-space: nowrap; }
        .bg-fm-grid { position: absolute; inset: 0; opacity: 0.03;
          background-image: linear-gradient(rgba(17,17,17,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,17,17,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </div>
  );
}

/* ─── TYPOGRAPHY: About ─── */
function TypographyBg() {
  const layers = useMemo(() => range(6).map((i) => ({
    text: ['BUILD', 'SCALE', 'INNOVATE', 'CREATE', 'DESIGN', 'ENGINEER'][i],
    y: 5 + i * 16, size: r(60, 120), alpha: r(0.012, 0.03),
    dur: r(18, 30), start: r(-300, 0),
  })), []);

  return (
    <div className="bg-fm" aria-hidden="true">
      {layers.map((l, i) => (
        <m.div
          key={i}
          className="bg-fm-type"
          style={{ top: `${l.y}%`, fontSize: l.size, opacity: l.alpha }}
          initial={{ x: l.start }}
          animate={{ x: [l.start, window.innerWidth + 400] }}
          transition={{ duration: l.dur, repeat: Infinity, ease: 'linear', delay: r(0, 6) }}
        >{l.text}</m.div>
      ))}
      <style>{`
        .bg-fm-type { position: absolute; font-weight: 900; font-family: 'Inter', sans-serif; color: #111; white-space: nowrap; letter-spacing: 8px; line-height: 1; }
      `}</style>
    </div>
  );
}

/* ─── GRID: Skills, About, Testimonials ─── */
function GridBg() {
  const cells = useMemo(() => {
    const c = [];
    for (let x = 0; x < 20; x++) for (let y = 0; y < 12; y++) {
      c.push({ x: x * 5 + 2.5, y: y * 5 + 2.5, dur: r(2, 5), delay: r(0, 3), s: r(0.6, 1.4) });
    }
    return c;
  }, []);

  const scanRef = useRef(null);

  return (
    <div className="bg-fm" aria-hidden="true">
      <div className="bg-fm-dotgrid" />
      {cells.map((c, i) => (
        <m.div
          key={i}
          className="bg-fm-cell"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [c.s * 0.5, c.s, c.s * 0.5] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
        />
      ))}
      <m.div
        ref={scanRef}
        className="bg-fm-scan"
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <style>{`
        .bg-fm-dotgrid { position: absolute; inset: 0; opacity: 0.025;
          background-image: radial-gradient(circle, rgba(17,17,17,0.15) 0.5px, transparent 0.5px);
          background-size: 40px 40px;
        }
        .bg-fm-cell { position: absolute; width: 3px; height: 3px; background: rgba(17,17,17,0.08); }
        .bg-fm-scan { position: absolute; left: 0; right: 0; height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(17,17,17,0.02), transparent);
        }
      `}</style>
    </div>
  );
}

/* ─── SPOTLIGHT: Projects ─── */
function SpotlightBg({ focusX, focusY }) {
  return (
    <div className="bg-fm" aria-hidden="true">
      <m.div
        className="bg-fm-spot"
        animate={{
          background: focusX != null
            ? `radial-gradient(600px at ${focusX}px ${focusY}px, rgba(17,17,17,0.025), transparent 70%)`
            : [
                `radial-gradient(600px at 20% 40%, rgba(17,17,17,0.025), transparent 70%)`,
                `radial-gradient(600px at 80% 60%, rgba(17,17,17,0.025), transparent 70%)`,
                `radial-gradient(600px at 30% 70%, rgba(17,17,17,0.025), transparent 70%)`,
                `radial-gradient(600px at 20% 40%, rgba(17,17,17,0.025), transparent 70%)`,
              ],
        }}
        transition={focusX != null ? { duration: 0.3 } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="bg-fm-spot"
        animate={{
          background: [
            `radial-gradient(400px at 70% 30%, rgba(17,17,17,0.015), transparent 70%)`,
            `radial-gradient(400px at 20% 50%, rgba(17,17,17,0.015), transparent 70%)`,
            `radial-gradient(400px at 70% 30%, rgba(17,17,17,0.015), transparent 70%)`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <style>{`
        .bg-fm-spot { position: absolute; inset: 0; }
      `}</style>
    </div>
  );
}

/* ─── CALM: Contact ─── */
function CalmBg() {
  const blobs = useMemo(() => range(5).map(() => ({
    x: r(10, 90), r: r(80, 200),
    dur: r(20, 35), delay: r(0, 8),
    dx: r(-40, 40), alpha: r(0.03, 0.07),
  })), []);

  return (
    <div className="bg-fm" aria-hidden="true">
      {blobs.map((b, i) => (
        <m.div
          key={i}
          className="bg-fm-blob"
          style={{
            left: `${b.x}%`, width: b.r, height: b.r,
            marginLeft: -b.r / 2, marginTop: -b.r / 2,
            opacity: b.alpha,
            background: 'rgba(255,255,255,0.3)',
            filter: `blur(${b.r * 0.3}px)`,
          }}
          initial={{ y: '110%' }}
          animate={{ y: ['110%', '-10%'], x: [0, b.dx, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}
      <style>{`
        .bg-fm-blob { position: absolute; bottom: 0; border-radius: 50%; }
      `}</style>
    </div>
  );
}

/* ─── RIPPLE: Testimonials ─── */
function RippleBg() {
  const rings = useMemo(() => range(4).map(() => ({
    x: r(15, 85), y: r(15, 85), mr: r(80, 150),
    dur: r(4, 7), delay: r(0, 4),
  })), []);

  return (
    <div className="bg-fm" aria-hidden="true">
      {rings.map((r, i) => (
        <m.div
          key={i}
          className="bg-fm-ring"
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
          animate={{
            scale: [0, r.mr / 30],
            opacity: [0.12, 0],
          }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'easeOut', delay: r.delay }}
        />
      ))}
      <style>{`
        .bg-fm-ring { position: absolute; width: 30px; height: 30px; margin-left: -15px; margin-top: -15px;
          border: 1px solid rgba(17,17,17,0.08); border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

/* ─── TIMELINE: Experience ─── */
function TimelineBg() {
  const dots = useMemo(() => range(5).map((i) => ({
    x: 10 + i * 20, dur: r(3, 6), delay: r(0, 2),
  })), []);

  return (
    <div className="bg-fm" aria-hidden="true">
      {dots.map((d, i) => (
        <m.div
          key={i}
          className="bg-fm-tline"
          style={{ left: `${d.x}%` }}
          animate={{
            top: ['5%', '95%'],
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{ duration: d.dur, repeat: Infinity, ease: 'easeInOut', delay: d.delay }}
        />
      ))}
      <style>{`
        .bg-fm-tline { position: absolute; width: 1px; height: 6px; background: rgba(17,17,17,0.06); }
      `}</style>
    </div>
  );
}

/* ─── FLOAT: Education ─── */
function FloatBg() {
  const pages = useMemo(() => range(6).map(() => ({
    x: r(5, 90), y: r(5, 90), pw: r(40, 80), ph: r(28, 50),
    dur: r(14, 24), delay: r(0, 5), dr: r(-0.06, 0.06),
  })), []);

  return (
    <div className="bg-fm" aria-hidden="true">
      {pages.map((p, i) => (
        <m.div
          key={i}
          className="bg-fm-page"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.pw, height: p.ph,
            marginLeft: -p.pw / 2, marginTop: -p.ph / 2,
          }}
          animate={{
            x: [0, p.pw * 0.3, 0, -p.pw * 0.3, 0],
            y: [0, p.ph * 0.2, -p.ph * 0.2, p.ph * 0.1, 0],
            rotate: [0, p.dr * 2, -p.dr, p.dr, 0],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        >
          <div className="bg-fm-page-line" />
        </m.div>
      ))}
      <style>{`
        .bg-fm-page { position: absolute; border: 1px solid rgba(17,17,17,0.035); }
        .bg-fm-page-line { position: absolute; top: 6px; left: 8px; width: 40%; height: 1px; background: rgba(17,17,17,0.025); }
      `}</style>
    </div>
  );
}

/* ─── EXPORT ─── */
export default function BgAnimations({ theme, variant, focusX, focusY }) {
  const dark = variant === 'dark';

  switch (theme) {
    case 'system': return <SystemBg />;
    case 'typography': return <TypographyBg />;
    case 'grid': return <GridBg />;
    case 'spotlight': return <SpotlightBg focusX={focusX} focusY={focusY} />;
    case 'calm': return <CalmBg />;
    case 'ripple': return <RippleBg />;
    case 'timeline': return <TimelineBg />;
    case 'float': return <FloatBg />;
    default: return null;
  }
}
