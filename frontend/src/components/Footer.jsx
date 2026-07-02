import { Link } from 'react-router-dom';
import { Leaf, Heart, ExternalLink, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const links = {
    'Explore': [
      { label: 'AI Scanner', path: '/scanner' },
      { label: 'Encyclopedia', path: '/encyclopedia' },
      { label: 'Virtual Garden', path: '/garden' },
      { label: 'Therapy Guide', path: '/therapy' },
    ],
    'Learn': [
      { label: 'Dosha Quiz', path: '/quiz' },
      { label: 'Ayurveda', path: '/encyclopedia' },
      { label: 'Unani', path: '/encyclopedia' },
      { label: 'Siddha', path: '/encyclopedia' },
    ],
    'AYUSH Systems': [
      { label: '🕉️ Ayurveda', path: '/encyclopedia' },
      { label: '🧘 Yoga & Naturopathy', path: '/encyclopedia' },
      { label: '☪️ Unani', path: '/encyclopedia' },
      { label: '🔱 Siddha', path: '/encyclopedia' },
      { label: '💊 Homeopathy', path: '/encyclopedia' },
    ],
  };

  return (
    <footer style={{
      background: 'hsl(var(--card))',
      borderTop: '1px solid hsl(var(--border))',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative element */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'hsl(var(--primary) / 0.03)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                background: 'var(--gradient-herbal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-herbal)',
              }}>
                <Leaf size={14} color="white" />
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.2rem',
                fontWeight: 700,
              }}>
                ECHO <span className="text-gradient">VedaAI</span>
              </span>
            </Link>
            <p style={{
              fontSize: '0.85rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.6,
              maxWidth: '280px',
            }}>
              Bridging ancient AYUSH wisdom with modern AI technology.
              Discover, learn, and heal with nature's pharmacy.
            </p>

            {/* Newsletter */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'hsl(var(--foreground))',
                marginBottom: '0.5rem',
              }}>
                Stay updated
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="input"
                  style={{
                    flex: 1,
                    height: '2.25rem',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
                <button className="btn btn-primary" style={{
                  padding: '0 1rem',
                  fontSize: '0.75rem',
                  height: '2.25rem',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 style={{
                fontWeight: 600,
                fontSize: '0.85rem',
                color: 'hsl(var(--foreground))',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, i) => (
                  <Link
                    key={i}
                    to={item.path}
                    style={{
                      fontSize: '0.85rem',
                      color: 'hsl(var(--muted-foreground))',
                      textDecoration: 'none',
                      transition: 'var(--transition-smooth)',
                    }}
                    onMouseEnter={e => e.target.style.color = 'hsl(var(--primary))'}
                    onMouseLeave={e => e.target.style.color = 'hsl(var(--muted-foreground))'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'hsl(var(--border))',
          marginBottom: '1.5rem',
        }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            fontSize: '0.8rem',
            color: 'hsl(var(--muted-foreground))',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}>
            Made with <Heart size={12} style={{ color: 'hsl(var(--destructive))' }} /> by ECHO VedaAI Team • {new Date().getFullYear()}
          </p>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { icon: <ExternalLink size={16} />, label: 'GitHub' },
              { icon: <MessageCircle size={16} />, label: 'Twitter' },
              { icon: <Mail size={16} />, label: 'Email' },
            ].map((social, i) => (
              <button
                key={i}
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: 'hsl(var(--muted))',
                  color: 'hsl(var(--muted-foreground))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
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
