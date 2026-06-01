import { useRef, useEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

const NODES = 12;

const WINDOW_SIZES = [
  { w: 80, h: 50 }, { w: 65, h: 45 }, { w: 90, h: 55 }, { w: 70, h: 40 },
  { w: 75, h: 48 }, { w: 85, h: 52 }, { w: 60, h: 38 }, { w: 95, h: 58 },
  { w: 72, h: 42 }, { w: 88, h: 50 }, { w: 68, h: 46 }, { w: 78, h: 54 },
];

const WINDOW_BASE = [
  { x: -135, y: -80 }, { x: -45, y: -80 }, { x: 45, y: -80 }, { x: 135, y: -80 },
  { x: -135, y: 0 }, { x: -45, y: 0 }, { x: 45, y: 0 }, { x: 135, y: 0 },
  { x: -135, y: 80 }, { x: -45, y: 80 }, { x: 45, y: 80 }, { x: 135, y: 80 },
];

const LINE_COORDS = [
  { x1: 25, y1: 20, x2: 45, y2: 60 },
  { x1: 35, y1: 80, x2: 65, y2: 30 },
  { x1: 60, y1: 15, x2: 80, y2: 70 },
  { x1: 20, y1: 50, x2: 70, y2: 50 },
  { x1: 50, y1: 25, x2: 75, y2: 75 },
  { x1: 35, y1: 40, x2: 55, y2: 85 },
  { x1: 60, y1: 60, x2: 85, y2: 25 },
  { x1: 25, y1: 70, x2: 50, y2: 35 },
];

const PARTICLE_POS = Array.from({ length: 20 }, (_, i) => ({
  spawn: 10 + ((i * 37) % 80),
  size: 1.5 + ((i * 7) % 3),
  springD: 30 + i * 2,
  springS: 100 + i * 5,
}));

function FloatingWindow({ index, size, base }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const speed = 0.15 + (index % 5) * 0.04;
    const ampX = 20 + (index % 4) * 8;
    const ampY = 10 + (index % 3) * 6;
    const phase = (index / NODES) * Math.PI * 2;
    let t = 0;
    const id = setInterval(() => {
      t += 0.008;
      x.set(Math.sin(t * speed + phase) * ampX);
      y.set(Math.cos(t * speed * 0.6 + phase) * ampY);
    }, 16);
    return () => clearInterval(id);
  }, [index, x, y]);

  return (
    <m.div
      className="absolute border border-primary/10 bg-white/40 backdrop-blur-sm"
      style={{
        width: size.w,
        height: size.h,
        left: `calc(50% + ${base.x}px)`,
        top: `calc(50% + ${base.y}px)`,
        x, y,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
    >
      <div className="flex items-center gap-1 px-2 py-1 border-b border-primary/5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
      </div>
      <div className="px-2 py-1.5 font-mono text-[6px] leading-tight text-primary/30">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-1">
            <span className="text-primary/20">const</span>
            <span className="text-primary/35">data</span>
            <span className="text-primary/20">= await</span>
            <span className="text-primary/25">fetch</span>
            <span className="text-primary/20">()</span>
          </div>
        ))}
      </div>
    </m.div>
  );
}

function DatabaseNode({ index, baseX, baseY }) {
  const rotate = useMotionValue(0);
  useEffect(() => {
    const id = setInterval(() => {
      rotate.set(rotate.get() + 0.3);
    }, 16);
    return () => clearInterval(id);
  }, [rotate]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const speed = 0.12 + index * 0.03;
    const phase = index * 1.2;
    let t = 0;
    const id = setInterval(() => {
      t += 0.008;
      x.set(Math.sin(t * speed + phase) * 15);
      y.set(Math.cos(t * speed * 0.5 + phase) * 10);
    }, 16);
    return () => clearInterval(id);
  }, [index, x, y]);

  return (
    <m.div
      className="absolute flex flex-col items-center"
      style={{ left: `calc(50% + ${baseX}px)`, top: `calc(50% + ${baseY}px)`, x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 + index * 0.2 }}
    >
      <m.div
        className="w-8 h-10 border border-primary/15 rounded-sm bg-white/30"
        style={{ rotate }}
      >
        <div className="h-2 border-b border-primary/10 bg-primary/5" />
        <div className="px-1 py-0.5 font-mono text-[4px] text-primary/25">DB</div>
      </m.div>
      <div className="mt-1 font-mono text-[5px] text-primary/20 tracking-wider">
        {index === 0 ? 'MONGODB' : 'POSTGRES'}
      </div>
    </m.div>
  );
}

function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.08 }}>
      {LINE_COORDS.map((c, i) => (
        <m.line
          key={i}
          x1={`${c.x1}%`}
          y1={`${c.y1}%`}
          x2={`${c.x2}%`}
          y2={`${c.y2}%`}
          stroke="#111111"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 + i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

function Particle({ mouseX, mouseY, config, index }) {
  const sx = useSpring(mouseX, { damping: config.springD, stiffness: config.springS });
  const sy = useSpring(mouseY, { damping: config.springD, stiffness: config.springS });
  const px = useTransform(sx, [0, 1], [-10 - index * 2, 10 + index * 2]);
  const py = useTransform(sy, [0, 1], [-10 - index * 2, 10 + index * 2]);
  return (
    <m.div
      className="absolute rounded-full bg-primary/10"
      style={{
        width: config.size,
        height: config.size,
        left: `${config.spawn}%`,
        top: `${config.spawn + ((index * 13) % 70)}%`,
        x: px,
        y: py,
      }}
    />
  );
}

function Particles({ mouseX, mouseY }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLE_POS.map((p, i) => (
        <Particle key={i} mouseX={mouseX} mouseY={mouseY} config={p} index={i} />
      ))}
    </div>
  );
}

function GlowOrb() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 0.005;
      x.set(30 + Math.sin(t * 0.3) * 25);
      y.set(30 + Math.cos(t * 0.2) * 25);
    }, 16);
    return () => clearInterval(id);
  }, [x, y]);

  return (
    <m.div
      className="absolute w-40 h-40 rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(17,17,17,0.03) 0%, transparent 70%)',
        x: useTransform(x, v => v - 5),
        y: useTransform(y, v => v - 5),
      }}
    />
  );
}

export default function AnimationScene() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouse = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      className="relative w-full h-full min-h-[400px] lg:min-h-[600px] overflow-hidden bg-[#F8F8F8]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(17,17,17,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <GlowOrb />
      <ConnectionLines />
      <DatabaseNode index={0} baseX={-100} baseY={40} />
      <DatabaseNode index={1} baseX={100} baseY={-50} />
      {WINDOW_SIZES.map((size, i) => (
        <FloatingWindow key={i} index={i} size={size} base={WINDOW_BASE[i]} />
      ))}
      <Particles mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="font-mono text-[8px] tracking-[4px] text-primary/15 mb-2">// SYSTEM ARCHITECTURE</div>
          <m.div
            className="w-12 h-px bg-primary/10 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0.5, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
      <m.div
        className="absolute left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(17,17,17,0.02), transparent)',
          animation: 'scan-line 4s linear infinite',
        }}
      />
    </div>
  );
}
