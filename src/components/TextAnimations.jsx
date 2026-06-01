import { m } from 'framer-motion';

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

export function KineticText({ text, inView, baseDelay = 0, className = '' }) {
  return (
    <span className={`kinetic-text ${className}`}>
      {text.split('').map((char, i) => (
        <m.span
          key={i}
          className="kinetic-char"
          initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.35,
            delay: baseDelay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </m.span>
      ))}
    </span>
  );
}

export function WaveText({ text, inView, baseDelay = 0, className = '' }) {
  return (
    <span className={`wave-text ${className}`}>
      {text.split('').map((char, i) => (
        <m.span
          key={i}
          className="wave-char"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: baseDelay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileInView={inView ? undefined : undefined}
        >
          {char === ' ' ? '\u00A0' : char}
        </m.span>
      ))}
    </span>
  );
}

export function ElasticText({ text, inView, baseDelay = 0, className = '' }) {
  return (
    <span className={`elastic-text ${className}`}>
      {text.split('').map((char, i) => (
        <m.span
          key={i}
          className="elastic-char"
          initial={{ opacity: 0, scale: 1.4, y: -10 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: baseDelay + i * 0.035,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </m.span>
      ))}
    </span>
  );
}

export function MaskRevealText({ text, inView, baseDelay = 0, className = '' }) {
  return (
    <span className={`mask-reveal-text ${className}`}>
      <span className="mask-reveal-track">
        {text.split('').map((char, i) => (
          <m.span
            key={i}
            className="mask-reveal-char"
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={inView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{
              duration: 0.6,
              delay: baseDelay + i * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </m.span>
        ))}
      </span>
    </span>
  );
}
