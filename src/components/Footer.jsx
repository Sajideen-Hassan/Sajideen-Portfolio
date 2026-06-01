import { personal } from '../data/portfolio';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Work', href: '/#projects' },
  { label: 'Experience', href: '/details#experience' },
  { label: 'Education', href: '/details#education' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  const handleNav = (href) => {
    const [path, id] = href.includes('#') ? href.split('#') : [href, null];
    if (!id) { window.location.href = href; return; }
    if (window.location.pathname === path) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="footer">
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
          padding: 20px 0;
          border-top: 1px solid var(--border);
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
          color: var(--primary-bold);
          white-space: nowrap;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-link {
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 500;
          color: var(--secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--primary);
        }

        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}
