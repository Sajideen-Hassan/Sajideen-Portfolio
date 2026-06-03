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
    const id = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(id);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
    <>
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
            onClick={() => setMenuOpen(false)}
          >
            Download CV
          </a>
        </nav>
      </div>
    </header>

    {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    <div className={`nav-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
      <div className="nav-mobile-header">
        <button
          type="button"
          className="nav-logo"
          onClick={() => { setMenuOpen(false); handleNav('/#hero'); }}
          data-cursor
        >
          <span className="nav-logo-mark">SH</span>
        </button>
        <button
          type="button"
          className="nav-close-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="close-line" />
          <span className="close-line" />
        </button>
      </div>
      <nav className="nav-mobile-links" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <button
            key={link.label}
            type="button"
            className="nav-mob-link"
            onClick={() => handleNav(link.href)}
            data-cursor
          >
            <span className="nav-mob-label">{link.label}</span>
          </button>
        ))}
        <a
          href={personal.cvUrl}
          download
          className="nav-mob-cta"
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
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 11px;
          min-width: 44px;
          min-height: 44px;
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

        .nav-mobile-menu {
          display: none;
        }

        @media (max-width: 1024px) {
          .nav-links { gap: 24px; }
          .nav-link { font-size: 12px; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-logo-mark { width: 30px; height: 30px; font-size: 12px; }
          .nav-hamburger { display: flex; z-index: 60; }
          .nav-overlay { z-index: 54; }
          .nav-mobile-menu {
            display: flex;
            flex-direction: column;
            position: fixed;
            inset: 0;
            z-index: 55;
            background: #ffffff;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.35s ease, visibility 0.35s ease;
          }
          .nav-mobile-menu.is-open {
            opacity: 1;
            visibility: visible;
          }
          .nav-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px;
            padding: 0 24px;
            border-bottom: 1px solid var(--border-light);
            flex-shrink: 0;
          }
          .nav-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: none;
            border: none;
            cursor: pointer;
            position: relative;
          }
          .close-line {
            position: absolute;
            display: block;
            width: 20px;
            height: 2px;
            background: var(--primary);
            border-radius: 2px;
          }
          .close-line:nth-child(1) { transform: rotate(45deg); }
          .close-line:nth-child(2) { transform: rotate(-45deg); }
          .nav-mobile-links {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }
          .nav-mob-link {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            cursor: pointer;
            width: 100%;
            border-bottom: 1px solid var(--border-light);
            padding: 0 24px;
          }
          .nav-mob-label {
            font-family: var(--font-heading);
            font-size: 20px;
            font-weight: 700;
            color: var(--primary);
            letter-spacing: -0.3px;
          }
          .nav-mob-link:hover .nav-mob-label { color: var(--muted); }
          .nav-mob-cta {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            background: #000000;
            text-decoration: none;
            padding: 0 24px;
            letter-spacing: 0.3px;
            border: none;
          }
        }

        @media (max-width: 480px) {
          .nav-inner { height: 56px; }
          .nav-logo-mark { width: 28px; height: 28px; font-size: 11px; }
          .nav-mobile-header { height: 56px; padding: 0 16px; }
        }

        @media (max-width: 360px) {
          .nav-inner { height: 48px; }
          .nav-logo-mark { width: 24px; height: 24px; font-size: 10px; border-radius: 6px; }
          .nav-mobile-header { height: 48px; }
        }
      `}</style>
    </>
  );
}
