import { useState, useEffect, useRef } from 'react';

export default function useParallax(ref, { inputRange = [0, 1], outputRange = [0, 0] } = {}) {
  const [value, setValue] = useState(outputRange[0]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh + rect.height)));
      const t = (progress - inputRange[0]) / (inputRange[1] - inputRange[0]);
      const clamped = Math.max(0, Math.min(1, t));
      setValue(outputRange[0] + (outputRange[1] - outputRange[0]) * clamped);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return value;
}
