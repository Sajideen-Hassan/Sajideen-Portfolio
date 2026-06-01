import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleNav = (href) => {
    const [path, id] = href.includes('#') ? href.split('#') : [href, null];
    if (!id) { window.location.href = href; return; }
    if (location.pathname === path) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
    >
      <div className="nav-inner container">
        <button
          type="button"
          className="nav-logo"
          onClick={() => handleNav('/#hero')}
          data-cursor
        >
          <span className="nav-logo-mark">SH</span>
        </button>

        <button
          type="button"
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        </button>

        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
        <nav className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
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
            onClick={() => setMenuOpen(false)}
          >
            Download CV
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
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          animation: nav-enter 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes nav-enter {
          from { transform: translateY(-80px); }
          to { transform: translateY(0); }
        }

        .navbar.is-scrolled {
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .nav-logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background: #000;
          color: #fff;
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.5px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: #666666;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: #000000;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: #000000;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          background: #000000;
          text-decoration: none;
          padding: 10px 24px;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          border: none;
          letter-spacing: 0.3px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 60;
        }

        .ham-line {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--primary);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-radius: 2px;
        }

        .ham-line.open:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .ham-line.open:nth-child(2) {
          opacity: 0;
          width: 0;
        }

        .ham-line.open:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .nav-overlay {
          position: fixed;
          inset: 0;
          z-index: 54;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
        }

        @media (max-width: 1024px) {
          .nav-links { gap: 24px; }
          .nav-link { font-size: 12px; }
        }

        @media (max-width: 768px) {
          .nav-links { gap: 20px; }
          .nav-link { font-size: 12px; }
          .nav-logo-mark { width: 30px; height: 30px; font-size: 12px; }
          .nav-hamburger { display: flex; }
          .nav-links {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 260px;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            background: var(--bg);
            border-left: 1px solid var(--border);
            padding: 80px 32px 32px;
            transform: translateX(100%);
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 55;
          }
          .nav-links.is-open {
            transform: translateX(0);
          }
          .nav-link {
            font-size: 15px;
            padding: 14px 0;
            width: 100%;
            text-align: left;
            border-bottom: 1px solid var(--border-light);
          }
          .nav-cta {
            margin-top: 20px;
            width: 100%;
            text-align: center;
            font-size: 14px;
            padding: 14px 24px;
          }
        }

        @media (max-width: 480px) {
          .nav-inner { height: 56px; }
          .nav-logo-mark { width: 28px; height: 28px; font-size: 11px; }
          .nav-links { width: 100%; border-left: none; }
        }

        @media (max-width: 360px) {
          .nav-inner { height: 48px; }
          .nav-logo-mark { width: 24px; height: 24px; font-size: 10px; border-radius: 6px; }
          .nav-links { padding: 64px 20px 24px; }
          .nav-link { font-size: 14px; padding: 12px 0; }
          .nav-cta { padding: 12px 20px; font-size: 13px; }
        }
      `}</style>
    </header>
  );
}
