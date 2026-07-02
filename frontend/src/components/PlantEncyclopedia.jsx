import { useState, useMemo } from 'react';
import { Search, X, ChevronDown, Leaf } from 'lucide-react';
import { plants, categories } from '../data/plants';
import PlantCard from './PlantCard';

function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  const categoryColors = {
    'Ayurveda': 'hsl(150, 45%, 35%)',
    'Unani': 'hsl(210, 60%, 55%)',
    'Siddha': 'hsl(15, 85%, 55%)',
    'Homeopathy': 'hsl(270, 50%, 50%)',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'scaleIn 0.3s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'hsl(var(--card))',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-deep)',
          animation: 'dropIn 0.4s ease-out',
        }}
      >
        {/* Header */}
        <div style={{
          height: '200px',
          background: `linear-gradient(135deg, ${plant.color}20, ${plant.color}40)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <span style={{ fontSize: '5rem' }}>{plant.emoji}</span>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.3)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            <X size={16} />
          </button>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1.5rem',
            padding: '0.3rem 0.8rem',
            borderRadius: '9999px',
            background: categoryColors[plant.category] || 'hsl(var(--primary))',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {plant.category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            fontWeight: 700,
            color: 'hsl(var(--foreground))',
            marginBottom: '0.25rem',
          }}>
            {plant.name}
          </h2>
          <p style={{
            fontStyle: 'italic',
            color: 'hsl(var(--muted-foreground))',
            fontSize: '1rem',
            marginBottom: '1.25rem',
          }}>
            {plant.scientificName}
          </p>

          <p style={{
            fontSize: '0.95rem',
            color: 'hsl(var(--foreground) / 0.85)',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}>
            {plant.description}
          </p>

          {/* Medicinal Uses */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.6rem',
            }}>Medicinal Uses</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {plant.medicinalUses.map((use, i) => (
                <span key={i} style={{
                  padding: '0.3rem 0.7rem',
                  borderRadius: '9999px',
                  background: 'hsl(var(--primary) / 0.08)',
                  color: 'hsl(var(--primary))',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}>
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Dosha Effect */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.6rem',
            }}>Dosha Balance</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {Object.entries(plant.doshaEffect).map(([dosha, effect]) => {
                const colors = {
                  vata: { bg: 'hsl(210, 60%, 65%, 0.1)', color: 'hsl(210, 60%, 55%)', label: 'Vata' },
                  pitta: { bg: 'hsl(15, 85%, 65%, 0.1)', color: 'hsl(15, 85%, 55%)', label: 'Pitta' },
                  kapha: { bg: 'hsl(150, 45%, 40%, 0.1)', color: 'hsl(150, 45%, 35%)', label: 'Kapha' },
                };
                const c = colors[dosha];
                return (
                  <div key={dosha} style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: c.bg,
                    border: `1px solid ${c.color}30`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '100px',
                  }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: c.color, textTransform: 'uppercase' }}>
                      {c.label}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'hsl(var(--foreground))', marginTop: '0.2rem', textTransform: 'capitalize' }}>
                      {effect}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'hsl(var(--muted) / 0.5)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.4rem',
            }}>Preparation</h3>
            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.85)', lineHeight: 1.6 }}>
              {plant.preparation}
            </p>
          </div>

          {/* Dosage */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'hsl(var(--primary) / 0.05)',
            border: '1px solid hsl(var(--primary) / 0.1)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--primary))',
              marginBottom: '0.4rem',
            }}>💊 Dosage</h3>
            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.85)' }}>
              {plant.dosage}
            </p>
          </div>

          {/* Precautions */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'hsl(var(--accent) / 0.08)',
            border: '1px solid hsl(var(--accent) / 0.2)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--accent))',
              marginBottom: '0.4rem',
            }}>⚠️ Precautions</h3>
            <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.85)' }}>
              {plant.precautions}
            </p>
          </div>

          {/* Regions */}
          <div>
            <h3 style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.4rem',
            }}>🌍 Found In</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {plant.regions.map((region, i) => (
                <span key={i} style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  background: 'hsl(var(--secondary))',
                  color: 'hsl(var(--secondary-foreground))',
                  fontSize: '0.75rem',
                }}>
                  {region}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlantEncyclopedia() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState(null);

  const filtered = useMemo(() => {
    return plants.filter(p => {
      const matchesSearch = search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
        p.medicinalUses.some(u => u.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === 'all' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
            <Leaf size={12} /> 50+ Plants
          </div>
          <h1 className="section-title">Plant Encyclopedia</h1>
          <p className="section-subtitle">
            Explore our comprehensive database of medicinal plants from all five AYUSH systems.
          </p>
        </div>

        {/* Search & Filters */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'hsl(var(--muted-foreground))',
            }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plants by name, scientific name, or medicinal use..."
              className="input"
              style={{
                paddingLeft: '2.75rem',
                paddingRight: search ? '2.5rem' : '1rem',
                height: '3rem',
                borderRadius: 'var(--radius)',
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                fontSize: '0.95rem',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  background: 'hsl(var(--muted))',
                  color: 'hsl(var(--muted-foreground))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`tab ${category === cat.id ? 'active' : ''}`}
              >
                {cat.emoji && <span style={{ marginRight: '0.3rem' }}>{cat.emoji}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p style={{
          textAlign: 'center',
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
        }}>
          Showing {filtered.length} of {plants.length} plants
        </p>

        {/* Plant Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {filtered.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onClick={() => setSelectedPlant(plant)}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
            <p style={{ fontSize: '1.1rem', color: 'hsl(var(--foreground))', fontWeight: 500 }}>
              No plants found
            </p>
            <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Try a different search term or category filter
            </p>
          </div>
        )}

        {/* Plant Detail Modal */}
        {selectedPlant && (
          <PlantModal
            plant={selectedPlant}
            onClose={() => setSelectedPlant(null)}
          />
        )}
      </div>
    </section>
  );
}
