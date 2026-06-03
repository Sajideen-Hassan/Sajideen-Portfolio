import { useState, useRef, useEffect } from 'react';

export default function BlurImage({ src, alt, className, imgClass, width, height, style, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={`blur-image-wrap ${className || ''}`}
      style={{ width, height, ...style }}
    >
      <div className={`blur-image-placeholder ${loaded ? 'is-loaded' : ''}`} />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`blur-image-img ${imgClass || ''} ${loaded ? 'is-loaded' : ''}`}
        {...props}
      />
      <style>{`
        .blur-image-wrap {
          position: relative;
          overflow: hidden;
          display: inline-block;
          line-height: 0;
        }

        .blur-image-placeholder {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          background-size: 200% 200%;
          animation: shimmer 1.5s ease-in-out infinite;
          opacity: 1;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .blur-image-placeholder.is-loaded {
          opacity: 0;
        }

        .blur-image-img {
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
          width: 100%;
          height: auto;
        }

        .blur-image-img.is-loaded {
          opacity: 1;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
