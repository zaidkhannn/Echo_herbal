import { Link } from 'react-router-dom';
import { Leaf, Heart, Globe, ExternalLink, Mail } from 'lucide-react';

export default function Footer() {
  const linkGroups = {
    Explore: [
      { label: 'Rx Scanner', path: '/prescription' },
      { label: 'Plant Scanner', path: '/scanner' },
      { label: 'Encyclopedia', path: '/encyclopedia' },
      { label: 'Virtual Garden', path: '/garden' },
    ],
    Learn: [
      { label: 'Therapy Guide', path: '/therapy' },
      { label: 'Dosha Quiz', path: '/quiz' },
      { label: 'AYUSH Systems', path: '/encyclopedia' },
    ],
    AYUSH: [
      { label: 'Ayurveda', path: '/encyclopedia' },
      { label: 'Yoga & Naturopathy', path: '/encyclopedia' },
      { label: 'Unani', path: '/encyclopedia' },
      { label: 'Siddha', path: '/encyclopedia' },
      { label: 'Homeopathy', path: '/encyclopedia' },
    ],
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              marginBottom: '0.875rem',
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.5rem',
                background: 'var(--gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(27, 117, 86, 0.35)',
              }}>
                <Leaf size={14} color="white" strokeWidth={2.5} />
              </div>
              <span className="font-ui" style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: '#FFFFFF',
              }}>
                Echo<span style={{ color: '#8CE0C4' }}>Veda AI</span>
              </span>
            </Link>
            <p style={{
              fontSize: '0.875rem',
              color: '#A2B8AC',
              lineHeight: 1.65,
              maxWidth: '260px',
              marginBottom: '1.25rem',
            }}>
              Bridging ancient AYUSH wisdom with modern AI technology.
              Discover, learn, and heal with verified herbal research.
            </p>

            <div>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}>
                Stay updated
              </p>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="input"
                  style={{
                    flex: 1,
                    height: '2.125rem',
                    fontSize: '0.8125rem',
                    padding: '0 0.75rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                  }}
                />
                <button type="button" className="btn btn-primary" style={{
                  padding: '0 0.875rem',
                  fontSize: '0.75rem',
                  height: '2.125rem',
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {Object.entries(linkGroups).map(([title, items]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: '0.72rem',
                color: '#FFFFFF',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, i) => (
                  <Link key={i} to={item.path} className="footer-link">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          height: '1px',
          background: 'rgba(255, 255, 255, 0.08)',
          marginBottom: '1.25rem',
        }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{
            fontSize: '0.8125rem',
            color: '#849E91',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}>
            © {new Date().getFullYear()} EchoVeda AI. Made with{' '}
            <Heart size={12} style={{ color: '#E74C3C', fill: '#E74C3C' }} /> for healthcare wellness.
          </p>

          <div style={{ display: 'flex', gap: '0.375rem' }}>
            {[
              { icon: <Globe size={15} />, label: 'Website' },
              { icon: <ExternalLink size={15} />, label: 'Community' },
              { icon: <Mail size={15} />, label: 'Email' },
            ].map((social, i) => (
              <button
                key={i}
                type="button"
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#CBDAD2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
                aria-label={social.label}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
