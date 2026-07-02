import { useState } from 'react';

export default function PlantCard({ plant, onClick }) {
  const [hovered, setHovered] = useState(false);

  const categoryColors = {
    'Ayurveda': { bg: 'hsl(150, 45%, 40%, 0.1)', color: 'hsl(150, 45%, 35%)' },
    'Unani': { bg: 'hsl(210, 60%, 65%, 0.1)', color: 'hsl(210, 60%, 55%)' },
    'Siddha': { bg: 'hsl(15, 85%, 65%, 0.1)', color: 'hsl(15, 85%, 55%)' },
    'Homeopathy': { bg: 'hsl(270, 50%, 60%, 0.1)', color: 'hsl(270, 50%, 50%)' },
  };

  const catStyle = categoryColors[plant.category] || categoryColors['Ayurveda'];

  return (
    <div
      className="glass-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'var(--transition-smooth)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Plant Visual */}
      <div style={{
        height: '180px',
        background: `linear-gradient(135deg, ${plant.color}15, ${plant.color}30)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span style={{
          fontSize: '4rem',
          transition: 'var(--transition-spring)',
          transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
        }}>
          {plant.emoji}
        </span>
        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          background: catStyle.bg,
          color: catStyle.color,
          fontSize: '0.65rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          backdropFilter: 'blur(4px)',
        }}>
          {plant.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.15rem',
          fontWeight: 600,
          color: 'hsl(var(--foreground))',
          marginBottom: '0.2rem',
        }}>
          {plant.name}
        </h3>
        <p style={{
          fontStyle: 'italic',
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.8rem',
          marginBottom: '0.75rem',
        }}>
          {plant.scientificName}
        </p>
        <p style={{
          fontSize: '0.82rem',
          color: 'hsl(var(--muted-foreground))',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '0.75rem',
        }}>
          {plant.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {plant.medicinalUses.slice(0, 3).map((use, i) => (
            <span key={i} style={{
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              background: 'hsl(var(--muted))',
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.7rem',
              fontWeight: 500,
            }}>
              {use}
            </span>
          ))}
          {plant.medicinalUses.length > 3 && (
            <span style={{
              padding: '0.15rem 0.5rem',
              borderRadius: '9999px',
              background: 'hsl(var(--primary) / 0.08)',
              color: 'hsl(var(--primary))',
              fontSize: '0.7rem',
              fontWeight: 500,
            }}>
              +{plant.medicinalUses.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
