export default function GlobalBackground() {
  return (
    <div className="global-bg" aria-hidden="true">
      <style>{`
        .global-bg {
          position: fixed; inset: 0; z-index: 9999;
          pointer-events: none; overflow: hidden;
          opacity: 0.04;
        }
        .global-bg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
