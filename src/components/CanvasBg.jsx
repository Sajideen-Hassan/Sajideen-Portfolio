import { useRef, useEffect } from 'react';

/* Minimal, performant canvas backgrounds — single rAF loop per section */

export default function CanvasBg({ theme, variant, focusX, focusY }) {
  const ref = useRef(null);
  const dark = variant === 'dark';

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let w, h, t = 0, raf, parts = [];
    const col = (a) => dark ? `rgba(255,255,255,${a})` : `rgba(17,17,17,${a})`;

    const resize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // ── init ──
    if (theme === 'system') {
      for (let i = 0; i < 18; i++) parts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
        r: 1 + Math.random() * 2, ph: Math.random() * 6,
      });
    }

    if (theme === 'grid') {
      const gap = 48;
      for (let x = gap; x < w; x += gap)
        for (let y = gap; y < h; y += gap)
          parts.push({ x, y, ph: Math.random() * 6 });
    }

    if (theme === 'ripple') {
      for (let i = 0; i < 4; i++) parts.push({
        x: Math.random() * w, y: Math.random() * h,
        mr: 60 + Math.random() * 100, sp: 0.5 + Math.random() * 0.5, ph: Math.random() * 6,
      });
    }

    if (theme === 'timeline') {
      for (let i = 0; i < 5; i++) parts.push({
        x: (w / 6) * (i + 1), ph: Math.random() * 6,
      });
    }

    if (theme === 'float') {
      for (let i = 0; i < 6; i++) parts.push({
        x: Math.random() * w, y: Math.random() * h,
        pw: 40 + Math.random() * 60, ph: 30 + Math.random() * 40,
        ang: Math.random() * 6, sp: 0.005 + Math.random() * 0.005,
        dx: (Math.random() - 0.5) * 0.2, dy: (Math.random() - 0.5) * 0.2,
      });
    }

    // ── draw ──
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      if (theme === 'system') {
        for (const p of parts) {
          p.x += p.vx + Math.sin(t * 0.005 + p.ph) * 0.1;
          p.y += p.vy + Math.cos(t * 0.004 + p.ph) * 0.1;
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 6.28);
          ctx.fillStyle = col(0.07);
          ctx.fill();
        }
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 160) {
              ctx.beginPath();
              ctx.moveTo(parts[i].x, parts[i].y);
              ctx.lineTo(parts[j].x, parts[j].y);
              ctx.strokeStyle = col(0.025 * (1 - d / 160));
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      if (theme === 'grid') {
        const scan = (t * 1.8) % h;
        for (const p of parts) {
          const d = Math.abs(p.y - scan);
          if (d < 20) {
            const b = 1 - d / 20;
            const pu = Math.sin(t * 0.04 + p.ph) * 0.5 + 0.5;
            ctx.fillStyle = col(0.08 * b * (0.5 + pu * 0.5));
            ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
          } else {
            ctx.fillStyle = col(0.02);
            ctx.fillRect(p.x - 0.5, p.y - 0.5, 1, 1);
          }
        }
        ctx.fillStyle = col(0.03);
        ctx.fillRect(0, scan - 15, w, 30);
      }

      if (theme === 'spotlight') {
        const dx = focusX != null ? focusX / w : 0.5 + Math.sin(t * 0.003) * 0.2;
        const dy = focusY != null ? focusY / h : 0.5 + Math.cos(t * 0.002) * 0.15;
        const g1 = ctx.createRadialGradient(dx * w, dy * h, 0, dx * w, dy * h, 500);
        g1.addColorStop(0, col(0.025)); g1.addColorStop(0.5, col(0.008)); g1.addColorStop(1, col(0));
        ctx.fillStyle = g1; ctx.fillRect(0, 0, w, h);
        const sx = (0.7 + Math.sin(t * 0.001) * 0.3) * w;
        const sy = (0.3 + Math.cos(t * 0.0015) * 0.3) * h;
        const g2 = ctx.createRadialGradient(sx, sy, 0, sx, sy, 350);
        g2.addColorStop(0, col(0.015)); g2.addColorStop(1, col(0));
        ctx.fillStyle = g2; ctx.fillRect(0, 0, w, h);
      }

      if (theme === 'calm') {
        for (let i = 0; i < 4; i++) {
          const x = w * (0.2 + Math.sin(t * 0.004 + i * 1.5) * 0.3);
          const y = h * (0.2 + Math.cos(t * 0.003 + i * 1.2) * 0.3);
          const r = 100 + Math.sin(t * 0.005 + i) * 40;
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, col(dark ? 0.06 : 0.04));
          g.addColorStop(0.5, col(dark ? 0.025 : 0.015));
          g.addColorStop(1, col(0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(x, y, r, 0, 6.28); ctx.fill();
        }
      }

      if (theme === 'ripple') {
        for (const p of parts) {
          const prog = ((t * p.sp + p.ph * 10) % 200) / 200;
          const r = prog * p.mr;
          const a = 1 - prog;
          ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.28);
          ctx.strokeStyle = col(0.06 * a);
          ctx.lineWidth = 1.2 * a;
          ctx.stroke();
          if (r > 15) {
            ctx.beginPath(); ctx.arc(p.x, p.y, r * 0.6, 0, 6.28);
            ctx.strokeStyle = col(0.03 * a);
            ctx.lineWidth = 0.6 * a;
            ctx.stroke();
          }
        }
      }

      if (theme === 'timeline') {
        for (const p of parts) {
          const wave = Math.sin(t * 0.015 + p.ph) * 18;
          const pu = Math.sin(t * 0.03 + p.ph) * 0.5 + 0.5;
          const ny = h / 2 + wave;
          ctx.beginPath(); ctx.arc(p.x, ny, 3 + pu * 2, 0, 6.28);
          ctx.fillStyle = col(0.07 * (0.5 + pu * 0.5));
          ctx.fill();
          ctx.beginPath(); ctx.arc(p.x, ny, 6 + pu * 3, 0, 6.28);
          ctx.fillStyle = col(0.02 * (0.5 + pu * 0.5));
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(p.x, ny - 18 - pu * 8);
          ctx.lineTo(p.x, ny + 18 + pu * 8);
          ctx.strokeStyle = col(0.04 * (0.3 + pu * 0.7));
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (theme === 'float') {
        for (const p of parts) {
          p.ang += p.sp;
          p.x += p.dx + Math.sin(p.ang) * 0.12;
          p.y += p.dy + Math.cos(p.ang * 0.7) * 0.08;
          if (p.x < -80) p.x = w + 80; if (p.x > w + 80) p.x = -80;
          if (p.y < -80) p.y = h + 80; if (p.y > h + 80) p.y = -80;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.ang) * 0.05);
          ctx.strokeStyle = col(0.035);
          ctx.lineWidth = 0.7;
          ctx.strokeRect(-p.pw / 2, -p.ph / 2, p.pw, p.ph);
          ctx.beginPath();
          ctx.moveTo(-p.pw / 2 + 6, -p.ph / 2 + 5);
          ctx.lineTo(-p.pw / 2 + 6 + 16, -p.ph / 2 + 5);
          ctx.strokeStyle = col(0.02);
          ctx.lineWidth = 0.4;
          ctx.stroke();
          ctx.restore();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme, dark, focusX, focusY]);

  return (
    <div className="cbg" aria-hidden="true">
      <canvas ref={ref} className="cbg-c" />
      <style>{`
        .cbg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .cbg-c { width: 100%; height: 100%; display: block; }
      `}</style>
    </div>
  );
}
