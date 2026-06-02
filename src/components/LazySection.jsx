import { useState, useRef, useEffect, useCallback } from 'react';

export default function LazySection({ load, rootMargin = '200px', timeout = null, minHeight = 280, ...props }) {
  const [Mod, setMod] = useState(null);
  const ref = useRef(null);
  const triggered = useRef(false);

  const trigger = useCallback(() => {
    if (triggered.current) return;
    triggered.current = true;
    load().then(m => setMod(() => m.default));
  }, [load]);

  useEffect(() => {
    const el = ref.current;
    if (!el || triggered.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) trigger(); },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, trigger]);

  useEffect(() => {
    if (timeout == null || triggered.current) return;
    const t = setTimeout(trigger, timeout);
    return () => clearTimeout(t);
  }, [timeout, trigger]);

  return <div ref={ref} style={{ minHeight: Mod ? 0 : minHeight }}>{Mod ? <Mod {...props} /> : null}</div>;
}
