import { useState } from 'react';

export default function PlantCard({ plant, onClick }) {
  const [hovered, setHovered] = useState(false);

  const categoryColors = {
    'Ayurveda': { bg: 'rgba(27, 117, 86, 0.15)', color: '#1B7556' },
    'Unani': { bg: 'rgba(41, 128, 185, 0.15)', color: '#2980B9' },
    'Siddha': { bg: 'rgba(194, 125, 0, 0.15)', color: '#C27D00' },
    'Homeopathy': { bg: 'rgba(142, 68, 173, 0.15)', color: '#8E44AD' },
  };

  const catStyle = categoryColors[plant.category] || categoryColors['Ayurveda'];

  return (
    <div
      className="glass-card plant-card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'var(--transition-smooth)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-card)',
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
        {plant.image ? (
          <img 
            src={plant.image} 
            alt={plant.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'var(--transition-smooth)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : (
          <span style={{
            fontSize: '4rem',
            transition: 'var(--transition-smooth)',
            transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
          }}>
            {plant.emoji}
          </span>
        )}
        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          background: catStyle.bg,
          color: catStyle.color,
          fontSize: '0.68rem',
          fontWeight: 700,
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
          fontSize: '1.2rem',
          fontWeight: 800,
          color: 'var(--heading-color)',
          marginBottom: '0.2rem',
        }}>
          {plant.name}
        </h3>
        <p style={{
          fontStyle: 'italic',
          color: 'var(--muted-text)',
          fontSize: '0.85rem',
          marginBottom: '0.65rem',
        }}>
          {plant.scientificName}
        </p>
        <p style={{
          fontSize: '0.88rem',
          color: 'var(--body-text)',
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          marginBottom: '0.85rem',
        }}>
          {plant.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {plant.medicinalUses.slice(0, 3).map((use, i) => (
            <span key={i} style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: 'var(--secondary)',
              color: 'var(--heading-color)',
              fontSize: '0.72rem',
              fontWeight: 600,
              border: '1px solid var(--border)',
            }}>
              {use}
            </span>
          ))}
          {plant.medicinalUses.length > 3 && (
            <span style={{
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}>
              +{plant.medicinalUses.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
