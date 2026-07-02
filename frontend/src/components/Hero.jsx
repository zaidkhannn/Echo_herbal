import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, BookOpen, Sparkles } from 'lucide-react';

function FloatingLeaf({ style, delay }) {
  return (
    <div style={{
      position: 'absolute',
      fontSize: '1.5rem',
      opacity: 0.15,
      animation: `leafFloat 8s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      pointerEvents: 'none',
      ...style,
    }}>
      🍃
    </div>
  );
}

function GlowOrb({ color, size, style }) {
  return (
    <div style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      filter: 'blur(80px)',
      opacity: 0.3,
      animation: 'glowOrb 10s ease-in-out infinite',
      pointerEvents: 'none',
      ...style,
    }} />
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--gradient-garden)',
    }}>
      {/* Background Elements */}
      <GlowOrb
        color="hsl(var(--primary) / 0.15)"
        size="400px"
        style={{ top: '-100px', right: '-100px' }}
      />
      <GlowOrb
        color="hsl(var(--accent) / 0.1)"
        size="300px"
        style={{ bottom: '-50px', left: '-50px', animationDelay: '3s' }}
      />
      <GlowOrb
        color="hsl(var(--ayush-vata) / 0.08)"
        size="250px"
        style={{ top: '40%', left: '60%', animationDelay: '6s' }}
      />

      {/* Floating Leaves */}
      <FloatingLeaf style={{ top: '15%', left: '10%' }} delay={0} />
      <FloatingLeaf style={{ top: '25%', right: '15%' }} delay={2} />
      <FloatingLeaf style={{ bottom: '20%', left: '20%' }} delay={4} />
      <FloatingLeaf style={{ top: '60%', right: '25%' }} delay={1} />
      <FloatingLeaf style={{ top: '10%', left: '50%' }} delay={3} />
      <FloatingLeaf style={{ bottom: '30%', right: '10%' }} delay={5} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        border: '2px solid hsl(var(--primary) / 0.1)',
        animation: 'float 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '8%',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '2px solid hsl(var(--accent) / 0.15)',
        animation: 'float 8s ease-in-out infinite',
        animationDelay: '2s',
      }} />

      {/* Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: '6rem',
        paddingBottom: '4rem',
      }}>
        <div style={{
          maxWidth: '800px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: 'hsl(var(--primary) / 0.1)',
            border: '1px solid hsl(var(--primary) / 0.2)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'hsl(var(--primary))',
          }}>
            <Sparkles size={14} />
            AI-Powered AYUSH Medicine Platform
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'hsl(var(--foreground))',
          }}>
            Bridge{' '}
            <span style={{
              background: 'var(--gradient-herbal)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Ancient Wisdom</span>
            {' '}with{' '}
            <span style={{
              background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--ayush-pitta)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Modern AI</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.2rem',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '650px',
          }}>
            Discover medicinal plants with AI-powered recognition. Get personalized
            AYUSH therapy recommendations based on Ayurveda, Yoga, Unani, Siddha & Homeopathy.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}>
            <Link to="/scanner" className="btn btn-primary btn-lg" style={{
              gap: '0.5rem',
            }}>
              <Scan size={18} />
              Scan a Plant
            </Link>
            <Link to="/encyclopedia" className="btn btn-secondary btn-lg" style={{
              gap: '0.5rem',
            }}>
              <BookOpen size={18} />
              Explore Encyclopedia
            </Link>
          </div>

          {/* AYUSH Systems */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <span style={{
              fontSize: '0.8rem',
              color: 'hsl(var(--muted-foreground))',
              fontWeight: 500,
            }}>Covering all AYUSH systems:</span>
            {[
              { name: 'Ayurveda', emoji: '🕉️' },
              { name: 'Yoga', emoji: '🧘' },
              { name: 'Unani', emoji: '☪️' },
              { name: 'Siddha', emoji: '🔱' },
              { name: 'Homeopathy', emoji: '💊' },
            ].map(sys => (
              <div key={sys.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.3rem 0.7rem',
                borderRadius: '9999px',
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'hsl(var(--foreground))',
              }}>
                <span>{sys.emoji}</span>
                {sys.name}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image Area */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '2rem',
          transform: 'translateY(-50%)',
          width: '380px',
          height: '380px',
          opacity: visible ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
        }} className="hide-mobile">
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'hsl(var(--primary) / 0.05)',
            border: '2px solid hsl(var(--primary) / 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            animation: 'float 6s ease-in-out infinite',
          }}>
            <div style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'hsl(var(--primary) / 0.08)',
              border: '2px solid hsl(var(--primary) / 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'var(--gradient-herbal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow)',
                animation: 'herbalPulse 4s ease-in-out infinite',
              }}>
                <span style={{ fontSize: '4rem' }}>🌿</span>
              </div>
            </div>

            {/* Orbiting icons */}
            {[
              { emoji: '🌸', angle: 0, dist: 170 },
              { emoji: '🍃', angle: 72, dist: 170 },
              { emoji: '🌺', angle: 144, dist: 170 },
              { emoji: '🌻', angle: 216, dist: 170 },
              { emoji: '🌱', angle: 288, dist: 170 },
            ].map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const x = Math.cos(rad) * item.dist;
              const y = Math.sin(rad) * item.dist;
              return (
                <div key={i} style={{
                  position: 'absolute',
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  boxShadow: 'var(--shadow-soft)',
                  animation: `float ${5 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}>
                  {item.emoji}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
