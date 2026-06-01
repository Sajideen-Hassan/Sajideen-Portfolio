export function CharReveal({ text, inView, baseDelay = 0 }) {
  return (
    <span>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char-reveal"
          style={{
            transitionDelay: `${baseDelay + i * 0.04}s`,
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) rotate(0deg)' : 'translateY(40px) rotate(5deg)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

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

export function ElasticText({ text, inView, baseDelay = 0, className = '' }) {
  const from = { opacity: 0, transform: 'translateY(-10px) scale(1.4)' };
  const to = { opacity: 1, transform: 'translateY(0) scale(1)' };
  return (
    <span className={`elastic-text ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="elastic-char"
          style={charStyle(inView, baseDelay, i, 0.035, from, to, 0.6, 'cubic-bezier(0.34,1.56,0.64,1)')}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function MaskRevealText({ text, inView, baseDelay = 0, className = '' }) {
  const from = { opacity: 0, transform: '', filter: '' };
  const to = { opacity: 1, transform: '', filter: '' };
  return (
    <span className={`mask-reveal-text ${className}`}>
      <span className="mask-reveal-track">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="mask-reveal-char"
            style={{
              opacity: inView ? 1 : 0,
              clipPath: inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 0.05}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
}
