import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/prescription', label: 'Rx Scanner' },
  { path: '/scanner', label: 'Plant Scanner' },
  { path: '/encyclopedia', label: 'Encyclopedia' },
  { path: '/garden', label: 'My Garden' },
  { path: '/therapy', label: 'Therapy' },
  { path: '/quiz', label: 'Dosha Quiz' },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '0.625rem 0' : '0.85rem 0',
        background: darkMode
          ? 'rgba(15, 29, 23, 0.92)'
          : 'rgba(248, 250, 248, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'var(--transition-smooth)',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
          }}>
            <div style={{
              width: '2.4rem',
              height: '2.4rem',
              borderRadius: '0.65rem',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(27, 117, 86, 0.22)',
            }}>
              <Leaf size={17} color="white" strokeWidth={2.5} />
            </div>
            <span className="font-ui" style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--heading-color)',
            }}>
              Echo<span className="text-gradient-soft">Veda</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            background: 'var(--card-bg)',
            padding: '0.3rem',
            borderRadius: '9999px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? 'var(--primary)' : 'var(--body-text)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    transition: 'var(--transition-smooth)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link to="/prescription" className="btn btn-primary btn-sm hide-mobile" style={{
              borderRadius: '9999px',
              padding: '0.5rem 1.15rem',
              fontSize: '0.88rem',
            }}>
              Scan Rx
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: '2.3rem',
                height: '2.3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--card-bg)',
                color: 'var(--heading-color)',
                transition: 'var(--transition-smooth)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: '2.3rem',
                height: '2.3rem',
                borderRadius: '0.5rem',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--card-bg)',
                color: 'var(--heading-color)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(22, 51, 40, 0.45)',
          backdropFilter: 'blur(4px)',
        }} onClick={() => setMobileOpen(false)}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '280px',
              height: '100%',
              background: 'var(--card-bg)',
              padding: '5rem 1.25rem 2rem',
              boxShadow: 'var(--shadow-lg)',
              animation: 'slideIn 0.25s ease-out',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? 'var(--primary)' : 'var(--heading-color)',
                    background: isActive ? 'var(--primary-light)' : 'transparent',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
