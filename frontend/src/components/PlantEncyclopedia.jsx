import { useState, useMemo } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { plants, categories } from '../data/plants';
import PlantCard from './PlantCard';
import PageHeader from './PageHeader';

function PlantModal({ plant, onClose }) {
  if (!plant) return null;

  const categoryColors = {
    'Ayurveda': '#1B7556',
    'Unani': '#2A7A8C',
    'Siddha': '#C06C3E',
    'Homeopathy': '#6B5B95',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(22, 51, 40, 0.45)',
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
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: 'var(--shadow-deep)',
          border: '1px solid var(--border)',
          animation: 'dropIn 0.4s ease-out',
        }}
      >
        {/* Header */}
        <div style={{
          height: '220px',
          background: `linear-gradient(135deg, ${plant.color}20, ${plant.color}40)`,
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
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: '5.5rem' }}>{plant.emoji}</span>
          )}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              background: 'rgba(22, 51, 40, 0.6)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            <X size={18} />
          </button>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1.5rem',
            padding: '0.4rem 0.9rem',
            borderRadius: '9999px',
            background: categoryColors[plant.category] || 'var(--primary)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            {plant.category}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2.25rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--heading-color)',
            marginBottom: '0.35rem',
            letterSpacing: '-0.02em',
          }}>
            {plant.name}
          </h2>
          <p style={{
            fontStyle: 'italic',
            color: 'var(--muted-text)',
            fontSize: '1.05rem',
            fontWeight: 500,
            marginBottom: '1.35rem',
          }}>
            {plant.scientificName}
          </p>

          <p style={{
            fontSize: '1rem',
            color: 'var(--body-text)',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}>
            {plant.description}
          </p>

          {/* Medicinal Uses */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted-text)',
              marginBottom: '0.65rem',
            }}>Medicinal Uses</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {plant.medicinalUses.map((use, i) => (
                <span key={i} style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}>
                  {use}
                </span>
              ))}
            </div>
          </div>

          {/* Dosha Effect */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted-text)',
              marginBottom: '0.65rem',
            }}>Dosha Balance</h3>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {Object.entries(plant.doshaEffect).map(([dosha, effect]) => {
                const colors = {
                  vata: { bg: '#EBF4FA', color: '#2C6E91', label: 'Vata' },
                  pitta: { bg: '#FDF0E9', color: '#C05C2B', label: 'Pitta' },
                  kapha: { bg: '#EAF4EE', color: '#1B7556', label: 'Kapha' },
                };
                const c = colors[dosha];
                return (
                  <div key={dosha} style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: c.bg,
                    border: `1px solid ${c.color}25`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '105px',
                  }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: c.color, textTransform: 'uppercase' }}>
                      {c.label}
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--heading-color)', marginTop: '0.2rem', textTransform: 'capitalize' }}>
                      {effect}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preparation */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius)',
            background: 'var(--secondary)',
            border: '1px solid var(--border)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--heading-color)',
              marginBottom: '0.45rem',
            }}>Preparation</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--body-text)', lineHeight: 1.6 }}>
              {plant.preparation}
            </p>
          </div>

          {/* Dosage */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius)',
            background: 'var(--primary-light)',
            border: '1px solid rgba(27, 117, 86, 0.2)',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--primary)',
              marginBottom: '0.45rem',
            }}>💊 Recommended Dosage</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--heading-color)', fontWeight: 500 }}>
              {plant.dosage}
            </p>
          </div>

          {/* Precautions */}
          <div style={{
            padding: '1.15rem',
            borderRadius: 'var(--radius)',
            background: '#FFF9EB',
            border: '1px solid #FDE68A',
            marginBottom: '1.25rem',
          }}>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: '#92400E',
              marginBottom: '0.45rem',
            }}>⚠️ Precautions</h3>
            <p style={{ fontSize: '0.92rem', color: '#78350F' }}>
              {plant.precautions}
            </p>
          </div>

          {/* Regions */}
          <div>
            <h3 style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--muted-text)',
              marginBottom: '0.45rem',
            }}>🌍 Native Regions</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {plant.regions.map((region, i) => (
                <span key={i} style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--body-text)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
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
    <section className="page-tool page-tool--soft">
      <div className="container page-inner">
        <PageHeader
          eyebrow="500+ medicinal plants"
          subtitle="Explore our comprehensive database of medicinal plants from all five AYUSH systems."
        >
          <h1 className="page-header__title font-display">
            Plant <span className="text-gradient">Encyclopedia</span>
          </h1>
        </PageHeader>

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
            <Search size={20} style={{
              position: 'absolute',
              left: '1.15rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted-text)',
            }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search plants by name, scientific name, or medicinal use..."
              className="input"
              style={{
                paddingLeft: '3rem',
                paddingRight: search ? '2.75rem' : '1.25rem',
                height: '3.25rem',
                borderRadius: 'var(--radius)',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                fontSize: '1.02rem',
                color: 'var(--body-text)',
                boxShadow: 'var(--shadow-card)',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: '50%',
                  background: 'var(--secondary)',
                  color: 'var(--muted-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={14} />
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
                {cat.emoji && <span style={{ marginRight: '0.35rem' }}>{cat.emoji}</span>}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p style={{
          textAlign: 'center',
          color: 'var(--muted-text)',
          fontSize: '0.92rem',
          fontWeight: 500,
          marginBottom: '1.75rem',
        }}>
          Showing <strong style={{ color: 'var(--heading-color)' }}>{filtered.length}</strong> of {plants.length} plants
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
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
            <p style={{ fontSize: '1.2rem', color: 'var(--heading-color)', fontWeight: 700 }}>
              No plants found
            </p>
            <p style={{ color: 'var(--muted-text)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Try a different search term or select another category filter
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
