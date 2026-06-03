import { personal } from '../data/portfolio';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Work', href: '/#projects' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const handleNav = (href) => {
    const [path, id] = href.includes('#') ? href.split('#') : [href, null];
    if (!id) { window.location.assign(href); return; }
    if (window.location.pathname === path) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign(href);
    }
  };

  return (
    <footer className="footer section-alt">
      <div className="container footer-inner">
        <span className="footer-name">{personal.name}</span>
        <nav className="footer-nav">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="footer-link"
              onClick={() => handleNav(link.href)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        .footer {
          padding: 32px 0;
          border-top: 1px solid var(--border);
          background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%);
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%);
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .footer-name {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          white-space: nowrap;
          letter-spacing: -0.3px;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
        }

        .footer-link {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 600;
          color: var(--secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px 12px;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          position: relative;
          transition: color 0.3s ease;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #000000;
          transition: width 0.3s ease;
        }

        .footer-link:hover {
          color: #000000;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .footer-nav { gap: 20px; }
        }

        @media (max-width: 768px) {
          .footer { padding: 24px 0; }
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .footer-nav { gap: 14px; }
          .footer-link { font-size: 11px; }
        }

        @media (max-width: 480px) {
          .footer { padding: 20px 0; }
          .footer-name { font-size: 16px; }
          .footer-nav { gap: 10px; }
          .footer-link { font-size: 11px; padding: 8px 10px; }
        }

        @media (max-width: 360px) {
          .footer { padding: 16px 0; }
          .footer-name { font-size: 14px; }
          .footer-link { font-size: 10px; padding: 8px 8px; }
        }
      `}</style>
    </footer>
  );
}
