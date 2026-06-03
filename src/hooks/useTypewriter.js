import { useState, useEffect, useRef } from 'react';

export default function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;

    const delayTimer = setTimeout(() => {
      setDisplayed('');
      setDone(false);

      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayed(text.slice(0, indexRef.current + 1));
          indexRef.current++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
