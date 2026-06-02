function charStyle(inView, baseDelay, i, delayPerChar, from, to, duration, ease) {
  const delay = baseDelay + i * delayPerChar;
  const visible = inView ? to : from;
  const hidden = inView ? from : to;
  return {
    opacity: visible.opacity,
    transform: visible.transform || '',
    filter: visible.filter || '',
    transition: `all ${duration}s ${ease} ${delay}s`,
  };
}

export function KineticText({ text, inView, baseDelay = 0, className = '' }) {
  const from = { opacity: 0, transform: 'translateX(-20px)', filter: 'blur(8px)' };
  const to = { opacity: 1, transform: 'translateX(0)', filter: 'blur(0px)' };
  return (
    <span className={`kinetic-text ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="kinetic-char"
          style={charStyle(inView, baseDelay, i, 0.03, from, to, 0.35, 'cubic-bezier(0.16,1,0.3,1)')}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function WaveText({ text, inView, baseDelay = 0, className = '' }) {
  const from = { opacity: 0, transform: 'translateY(20px)' };
  const to = { opacity: 1, transform: 'translateY(0)' };
  return (
    <span className={`wave-text ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="wave-char"
          style={charStyle(inView, baseDelay, i, 0.04, from, to, 0.5, 'cubic-bezier(0.16,1,0.3,1)')}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}


