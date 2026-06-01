import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m } from 'framer-motion';
import { personal } from '../data/portfolio';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Work', href: '/#projects' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    const [path, id] = href.includes('#') ? href.split('#') : [href, null];
    if (!id) { window.location.href = href; return; }
    if (location.pathname === path) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  };

  return (
    <m.header
      className={`navbar ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-inner container">
        <button
          type="button"
          className="nav-logo"
          onClick={() => handleNav('/#hero')}
          data-cursor
        >
          {personal.name.split(' ')[0]}.
          <span className="nav-logo-last">{personal.name.split(' ')[1]}</span>
        </button>

        <nav className="nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className="nav-link link-sweep"
              onClick={() => handleNav(link.href)}
              data-cursor
            >
              {link.label}
            </button>
          ))}
          <a
            href={personal.cvUrl}
            download
            className="nav-cta"
            data-cursor
          >
            CV
          </a>
        </nav>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: var(--bg);
          border-bottom: 1px solid transparent;
          transition: border-color 0.4s ease;
        }

        .navbar.is-scrolled {
          border-bottom: 1px solid var(--border);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .nav-logo {
          font-family: var(--font-heading);
          font-size: 20px;
          font-weight: 700;
          text-decoration: none;
          color: var(--primary);
          letter-spacing: -0.5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .nav-logo-last {
          font-weight: 400;
          color: var(--muted);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          background: var(--primary);
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .nav-cta {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--bg);
          background: var(--primary);
          text-decoration: none;
          padding: 6px 16px;
          transition: opacity 0.3s ease;
        }

        .nav-cta:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .nav-links { gap: 20px; }
          .nav-link { font-size: 12px; }
          .nav-logo { font-size: 18px; }
        }
      `}</style>
    </m.header>
  );
}
