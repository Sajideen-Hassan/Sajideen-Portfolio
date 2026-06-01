import { useRef, useEffect } from 'react';

export default function SwellBackground({ variant = 'light', theme = 'flow', focusX, focusY }) {
  const canvasRef = useRef(null);
  const dark = variant === 'dark';
  const col = (a) => dark ? `rgba(255,255,255,${a})` : `rgba(17,17,17,${a})`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    let particles = [];
    let t = 0;
    let mx = 0.5, my = 0.5;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => {
      mx = e.clientX / w;
      my = e.clientY / h;
    };
    if (theme === 'system' || theme === 'spotlight') {
      window.addEventListener('mousemove', onMouse, { passive: true });
    }

    // ─── SYSTEM: Floating System Architecture ───
    if (theme === 'system') {
      const frags = ['const', 'function', 'async', '=>', '{}', 'return', 'await', 'props', 'state', 'useEffect', 'fetch', 'data', 'export', 'import'];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0.1 + Math.random() * 0.25,
          text: frags[i % frags.length],
          size: 8 + Math.random() * 6,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.06 + Math.random() * 0.08,
        });
      }
    }

    // ─── TYPOGRAPHY: Sliding Typography Layers ───
    if (theme === 'typography') {
      const lines = ['BUILD', 'SCALE', 'INNOVATE', 'CREATE', 'DESIGN'];
      for (let i = 0; i < 6; i++) {
        particles.push({
          x: Math.random() * w * 0.5 - w * 0.25,
          y: (i / 6) * h + 40,
          text: lines[i % lines.length],
          speed: 0.15 + Math.random() * 0.25,
          size: 80 + Math.random() * 60,
          alpha: 0.015 + Math.random() * 0.025,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ─── GEOMETRIC: Geometric Grid Motion ───
    if (theme === 'geometric') {
      const gap = 40;
      for (let x = gap; x < w; x += gap) {
        for (let y = gap; y < h; y += gap) {
          particles.push({
            bx: x, by: y,
            size: 4 + Math.random() * 8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.005 + Math.random() * 0.01,
            angle: Math.random() * Math.PI,
          });
        }
      }
    }

    // ─── SPOTLIGHT: Dark-to-Light Spotlight Flow ───
    if (theme === 'spotlight') {
      particles = { dx: 0, dy: 0 };
    }

    // ─── CALM: Calm Flow Motion ───
    if (theme === 'calm') {
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 80 + Math.random() * 160,
          vx: (Math.random() - 0.5) * 0.08,
          vy: 0.06 + Math.random() * 0.08,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.04 + Math.random() * 0.04,
        });
      }
    }

    // ─── RIPPLE ───
    if (theme === 'ripple') {
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          maxR: 80 + Math.random() * 120,
          speed: 0.4 + Math.random() * 0.6,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ─── TIMELINE ───
    if (theme === 'timeline') {
      const count = 5;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: (w / (count + 1)) * (i + 1),
          y: h / 2,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    // ─── FLOAT ───
    if (theme === 'float') {
      for (let i = 0; i < 6; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          pw: 50 + Math.random() * 70,
          ph: 35 + Math.random() * 45,
          angle: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.008,
          driftX: (Math.random() - 0.5) * 0.2,
          driftY: (Math.random() - 0.5) * 0.2,
        });
      }
    }

    // ─── DRAW ───
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // ── SYSTEM ──
      if (theme === 'system') {
        const ox = (mx - 0.5) * 12;
        const oy = (my - 0.5) * 8;

        // perspective grid
        const vpx = w / 2 + ox * 0.3;
        const vpy = h * 0.45 + oy * 0.3;
        ctx.strokeStyle = col(0.025);
        ctx.lineWidth = 0.4;
        for (let i = -20; i <= 20; i++) {
          const spread = 600 + Math.abs(i) * 80;
          const x1 = vpx + i * 24;
          const y1 = vpy + 400;
          ctx.beginPath();
          ctx.moveTo(vpx + i * 2, vpy);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
        for (let j = 1; j < 12; j++) {
          const yy = vpy + j * 32;
          const spread = j * 50;
          ctx.beginPath();
          ctx.moveTo(vpx - spread, yy);
          ctx.lineTo(vpx + spread, yy);
          ctx.stroke();
        }

        // code fragments
        particles.forEach((p) => {
          p.x -= p.vx;
          if (p.x < -200) p.x = w + 100;
          const driftY = Math.sin(t * 0.008 + p.phase) * 6;
          ctx.font = `${p.size}px "JetBrains Mono", monospace`;
          ctx.fillStyle = col(p.alpha * (0.6 + Math.sin(t * 0.015 + p.phase) * 0.4));
          ctx.fillText(p.text, p.x + ox, p.y + driftY + oy);
        });

        // floating nodes + connections
        const nodes = [
          { x: w * 0.2, y: h * 0.25 }, { x: w * 0.8, y: h * 0.2 },
          { x: w * 0.15, y: h * 0.7 }, { x: w * 0.85, y: h * 0.75 },
          { x: w * 0.5, y: h * 0.15 }, { x: w * 0.5, y: h * 0.85 },
          { x: w * 0.35, y: h * 0.45 }, { x: w * 0.65, y: h * 0.55 },
        ];
        nodes.forEach((n) => {
          n.x += Math.sin(t * 0.005 + n.y * 0.01) * 0.3 + ox * 0.05;
          n.y += Math.cos(t * 0.004 + n.x * 0.01) * 0.3 + oy * 0.05;
        });
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 250) {
              const a = 1 - dist / 250;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = col(0.025 * a);
              ctx.lineWidth = 0.5 * a;
              ctx.stroke();
            }
          }
        }
        nodes.forEach((n) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.5 + Math.sin(t * 0.02 + n.x) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = col(0.08);
          ctx.fill();
        });
      }

      // ── TYPOGRAPHY ──
      if (theme === 'typography') {
        particles.forEach((p) => {
          p.x += p.speed;
          if (p.x > w + 200) p.x = -400;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.font = `900 ${p.size}px "Inter", sans-serif`;
          ctx.fillStyle = col(1);
          ctx.textBaseline = 'middle';
          ctx.fillText(p.text, p.x, p.y + Math.sin(t * 0.01 + p.phase) * 4);
          ctx.restore();
        });
      }

      // ── GEOMETRIC ──
      if (theme === 'geometric') {
        particles.forEach((p) => {
          const wave = Math.sin(t * p.speed + p.bx * 0.008 + p.by * 0.005) * 6;
          const waveX = Math.cos(t * p.speed * 0.7 + p.by * 0.008 + p.bx * 0.005) * 4;
          const sx = p.bx + waveX;
          const sy = p.by + wave;
          const rot = Math.sin(t * p.speed * 0.5 + p.phase) * 0.08;
          const scale = 0.8 + Math.sin(t * p.speed * 0.3 + p.phase) * 0.2;
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(rot);
          ctx.fillStyle = col(0.025);
          ctx.fillRect(-(p.size / 2) * scale, -(p.size / 2) * scale, p.size * scale, p.size * scale);
          ctx.restore();
          ctx.beginPath();
          ctx.arc(sx, sy, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = col(0.015);
          ctx.fill();
        });
      }

      // ── SPOTLIGHT ──
      if (theme === 'spotlight') {
        const dx = focusX != null ? focusX / w : (0.5 + Math.sin(t * 0.003) * 0.2);
        const dy = focusY != null ? focusY / h : (0.5 + Math.cos(t * 0.002) * 0.15);
        particles.dx += (dx - particles.dx) * 0.02;
        particles.dy += (dy - particles.dy) * 0.02;
        const sx = particles.dx * w;
        const sy = particles.dy * h;
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 500);
        if (dark) {
          grad.addColorStop(0, 'rgba(255,255,255,0.04)');
          grad.addColorStop(0.5, 'rgba(255,255,255,0.015)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
        } else {
          grad.addColorStop(0, 'rgba(17,17,17,0.025)');
          grad.addColorStop(0.5, 'rgba(17,17,17,0.008)');
          grad.addColorStop(1, 'rgba(17,17,17,0)');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // secondary ambient sweep
        const sweepX = (0.7 + Math.sin(t * 0.001 + 1) * 0.3) * w;
        const sweepY = (0.3 + Math.cos(t * 0.0015 + 2) * 0.3) * h;
        const grad2 = ctx.createRadialGradient(sweepX, sweepY, 0, sweepX, sweepY, 350);
        if (dark) {
          grad2.addColorStop(0, 'rgba(255,255,255,0.02)');
          grad2.addColorStop(1, 'rgba(255,255,255,0)');
        } else {
          grad2.addColorStop(0, 'rgba(17,17,17,0.015)');
          grad2.addColorStop(1, 'rgba(17,17,17,0)');
        }
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, w, h);
      }

      // ── CALM ──
      if (theme === 'calm') {
        particles.forEach((p) => {
          p.x += p.vx + Math.sin(t * 0.004 + p.phase) * 0.05;
          p.y += p.vy;
          if (p.y > h + p.r) { p.y = -p.r; p.x = Math.random() * w; }
          if (p.x < -p.r) p.x = w + p.r;
          if (p.x > w + p.r) p.x = -p.r;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          const a = p.alpha * (0.6 + Math.sin(t * 0.006 + p.phase) * 0.4);
          grad.addColorStop(0, col(a));
          grad.addColorStop(0.5, col(a * 0.3));
          grad.addColorStop(1, col(0));
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // ── RIPPLE ──
      if (theme === 'ripple') {
        particles.forEach((p) => {
          const progress = ((t * p.speed + p.phase * 60) % 200) / 200;
          const r = progress * p.maxR;
          const a = 1 - progress;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = col(0.06 * a);
          ctx.lineWidth = 1.2 * a;
          ctx.stroke();
          if (r > 15) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, r * 0.65, 0, Math.PI * 2);
            ctx.strokeStyle = col(0.03 * a);
            ctx.lineWidth = 0.6 * a;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = col(0.06);
          ctx.fill();
        });
      }

      // ── TIMELINE ──
      if (theme === 'timeline') {
        particles.forEach((p) => {
          const wave = Math.sin(t * 0.015 + p.phase) * 20;
          const pulse = Math.sin(t * 0.03 + p.phase) * 0.5 + 0.5;
          for (let s = 0; s < 8; s++) {
            const sy = (s / 8) * h;
            const sx = p.x + Math.sin(t * 0.01 + s + p.phase) * 15;
            ctx.beginPath();
            ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = col(0.03 * (0.3 + pulse * 0.7));
            ctx.fill();
          }
          const ny = p.y + wave;
          ctx.beginPath();
          ctx.arc(p.x, ny, 3 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = col(0.07 * (0.5 + pulse * 0.5));
          ctx.fill();
          ctx.beginPath();
          ctx.arc(p.x, ny, 6 + pulse * 3, 0, Math.PI * 2);
          ctx.fillStyle = col(0.02 * (0.5 + pulse * 0.5));
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(p.x, ny - 20 - pulse * 10);
          ctx.lineTo(p.x, ny + 20 + pulse * 10);
          ctx.strokeStyle = col(0.04 * (0.3 + pulse * 0.7));
          ctx.lineWidth = 0.6;
          ctx.stroke();
        });
      }

      // ── FLOAT ──
      if (theme === 'float') {
        particles.forEach((p) => {
          p.angle += p.speed;
          p.x += p.driftX + Math.sin(p.angle) * 0.15;
          p.y += p.driftY + Math.cos(p.angle * 0.7) * 0.1;
          if (p.x < -100) p.x = w + 100;
          if (p.x > w + 100) p.x = -100;
          if (p.y < -100) p.y = h + 100;
          if (p.y > h + 100) p.y = -100;
          const rot = Math.sin(p.angle) * 0.06;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(rot);
          ctx.strokeStyle = col(0.035);
          ctx.lineWidth = 0.8;
          ctx.strokeRect(-p.pw / 2, -p.ph / 2, p.pw, p.ph);
          ctx.beginPath();
          ctx.moveTo(-p.pw / 2 + 8, -p.ph / 2 + 6);
          ctx.lineTo(-p.pw / 2 + 8 + 20, -p.ph / 2 + 6);
          ctx.strokeStyle = col(0.025);
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.restore();
        });
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (theme === 'system' || theme === 'spotlight') {
        window.removeEventListener('mousemove', onMouse);
      }
    };
  }, [dark, theme, focusX, focusY]);

  return (
    <div className="bg-flow" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-flow-canvas" />
      <style>{`
        .bg-flow { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .bg-flow-canvas { width: 100%; height: 100%; display: block; }
      `}</style>
    </div>
  );
}
