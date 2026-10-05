import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, BookOpen, Sparkles, ArrowRight, Shield, Zap } from 'lucide-react';

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--gradient-hero), var(--gradient-mesh)',
      color: 'var(--body-text)',
    }}>
      {/* Subtle gentle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(27, 117, 86, 0.08) 1px, transparent 0)`,
        backgroundSize: '36px 36px',
        pointerEvents: 'none',
      }} />

      {/* Soothing soft glow orbs */}
      <div style={{
        position: 'absolute',
        top: '12%',
        left: '-3%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(226, 242, 235, 0.7)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '4%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'rgba(239, 245, 241, 0.8)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
      }} />

      {/* Content Container */}
      <div className="container hero-grid" style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: '6.5rem',
        paddingBottom: '4.5rem',
      }}>
        {/* Left — Text Content */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {/* Badge: Soft Mint pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            background: 'var(--primary-light)',
            border: '1px solid rgba(27, 117, 86, 0.2)',
            marginBottom: '1.5rem',
            fontSize: '0.92rem',
            fontWeight: 700,
            color: 'var(--primary)',
          }}>
            <Sparkles size={16} />
            AI-Powered AYUSH Healthcare Platform
          </div>

          {/* Heading */}
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.75rem, 4.8vw, 3.85rem)',
            lineHeight: 1.12,
            marginBottom: '1.35rem',
          }}>
            Bridge{' '}
            <span className="text-gradient">Ancient Wisdom</span>
            {' '}with{' '}
            <span className="text-gradient-soft">Modern AI</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '1.18rem',
            color: 'var(--muted-text)',
            lineHeight: 1.7,
            marginBottom: '2.25rem',
            maxWidth: '580px',
          }}>
            Discover medicinal plants with AI-powered recognition. Get personalized
            therapy recommendations rooted in Ayurveda, Yoga, Unani, Siddha &amp; Homeopathy.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}>
            <Link to="/scanner" className="btn btn-primary btn-lg" style={{
              gap: '0.6rem',
              fontSize: '1.08rem',
            }}>
              <Scan size={19} />
              Scan a Plant
              <ArrowRight size={17} />
            </Link>
            <Link to="/prescription" className="btn btn-secondary btn-lg" style={{
              gap: '0.6rem',
              fontSize: '1.08rem',
            }}>
              📋 Rx Scanner
            </Link>
          </div>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
            flexWrap: 'wrap',
          }}>
            {[
              { icon: <Shield size={16} />, text: 'Evidence-Based' },
              { icon: <Zap size={16} />, text: 'Instant AI Analysis' },
              { icon: <BookOpen size={16} />, text: '500+ Herbs' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.92rem',
                color: 'var(--muted-text)',
                fontWeight: 600,
              }}>
                <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right — AYUSH Systems Orbital Visual */}
        <div className="hide-mobile" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.96)',
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
        }}>
          <div style={{
            position: 'relative',
            width: '420px',
            height: '420px',
          }}>
            {/* Outer ring */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(27, 117, 86, 0.25)',
              animation: 'float 8s ease-in-out infinite',
            }} />

            {/* Middle ring */}
            <div style={{
              position: 'absolute',
              inset: '45px',
              borderRadius: '50%',
              border: '1.5px solid rgba(27, 117, 86, 0.15)',
              background: 'rgba(226, 242, 235, 0.4)',
            }} />

            {/* Center core */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '135px',
              height: '135px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)',
              animation: 'herbalPulse 4s ease-in-out infinite',
            }}>
              <span style={{ fontSize: '3.3rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🌿</span>
            </div>

            {/* AYUSH System orbiting nodes */}
            {[
              { emoji: '🕉️', label: 'Ayurveda', angle: -90 },
              { emoji: '🧘', label: 'Yoga', angle: -18 },
              { emoji: '☪️', label: 'Unani', angle: 54 },
              { emoji: '🔱', label: 'Siddha', angle: 126 },
              { emoji: '💊', label: 'Homeopathy', angle: 198 },
            ].map((item, i) => {
              const rad = (item.angle * Math.PI) / 180;
              const dist = 175;
              const x = Math.cos(rad) * dist;
              const y = Math.sin(rad) * dist;
              return (
                <div key={i} style={{
                  position: 'absolute',
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  animation: `float ${6 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}>
                  <div style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1.5px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    boxShadow: 'var(--shadow-card)',
                  }}>
                    {item.emoji}
                  </div>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--heading-color)',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom subtle divider line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
      }} />
    </section>
  );
}
