import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Sun, Moon } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', emoji: '🏠' },
  { path: '/scanner', label: 'AI Scanner', emoji: '🔍' },
  { path: '/encyclopedia', label: 'Encyclopedia', emoji: '📚' },
  { path: '/garden', label: 'My Garden', emoji: '🌿' },
  { path: '/therapy', label: 'Therapy', emoji: '💊' },
  { path: '/quiz', label: 'Dosha Quiz', emoji: '🧘' },
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
        padding: scrolled ? '0.5rem 0' : '0.75rem 0',
        background: scrolled
          ? (darkMode ? 'rgba(10, 20, 16, 0.85)' : 'rgba(255, 255, 255, 0.85)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
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
            gap: '0.5rem',
            textDecoration: 'none',
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'var(--gradient-herbal)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-herbal)',
            }}>
              <Leaf size={18} color="white" />
            </div>
            <div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'hsl(var(--foreground))',
              }}>ECHO</span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                background: 'var(--gradient-herbal)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginLeft: '0.25rem',
              }}>VedaAI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hide-mobile" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: location.pathname === link.path ? 600 : 500,
                  color: location.pathname === link.path
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--muted-foreground))',
                  background: location.pathname === link.path
                    ? 'hsl(var(--primary) / 0.1)'
                    : 'transparent',
                  transition: 'var(--transition-smooth)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'hsl(var(--secondary))',
                color: 'hsl(var(--secondary-foreground))',
                transition: 'var(--transition-smooth)',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="mobile-only"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-sm)',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'hsl(var(--secondary))',
                color: 'hsl(var(--secondary-foreground))',
                border: 'none',
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
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }} onClick={() => setMobileOpen(false)}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '280px',
              height: '100%',
              background: 'hsl(var(--card))',
              padding: '5rem 1.5rem 2rem',
              boxShadow: 'var(--shadow-deep)',
              animation: 'slideIn 0.3s ease-out',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === link.path ? 600 : 400,
                  color: location.pathname === link.path
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--foreground))',
                  background: location.pathname === link.path
                    ? 'hsl(var(--primary) / 0.1)'
                    : 'transparent',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-only {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
