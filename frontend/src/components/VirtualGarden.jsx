import { useState, useEffect } from 'react';
import { Sprout, Droplets, Sun, Trash2, Plus, Sparkles } from 'lucide-react';
import { plants } from '../data/plants';
import PageHeader from './PageHeader';

const GARDEN_SIZE = 12;

const growthStages = [
  { name: 'Seed', emoji: '🟤', progress: 0 },
  { name: 'Sprout', emoji: '🌱', progress: 25 },
  { name: 'Growing', emoji: '🌿', progress: 50 },
  { name: 'Mature', emoji: '🌳', progress: 75 },
  { name: 'Blooming', emoji: '🌸', progress: 100 },
];

function getGrowthStage(progress) {
  for (let i = growthStages.length - 1; i >= 0; i--) {
    if (progress >= growthStages[i].progress) return growthStages[i];
  }
  return growthStages[0];
}

export default function VirtualGarden() {
  const [garden, setGarden] = useState(() => {
    const saved = localStorage.getItem('echovedai-garden');
    if (saved) {
      try { return JSON.parse(saved); } catch { }
    }
    return Array(GARDEN_SIZE).fill(null);
  });

  const [showPlantPicker, setShowPlantPicker] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [gardenName, setGardenName] = useState(() =>
    localStorage.getItem('echovedai-garden-name') || 'My Herbal Garden'
  );
  const [weather, setWeather] = useState('sunny');

  useEffect(() => {
    localStorage.setItem('echovedai-garden', JSON.stringify(garden));
  }, [garden]);

  useEffect(() => {
    localStorage.setItem('echovedai-garden-name', gardenName);
  }, [gardenName]);

  // Auto-grow plants
  useEffect(() => {
    const interval = setInterval(() => {
      setGarden(prev => prev.map(slot => {
        if (!slot) return null;
        const growthRate = weather === 'sunny' ? 3 : weather === 'rainy' ? 5 : 1;
        return {
          ...slot,
          progress: Math.min(100, slot.progress + growthRate),
          lastWatered: slot.lastWatered,
        };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, [weather]);

  const plantInSlot = (slotIndex, plantId) => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant) return;
    setGarden(prev => {
      const next = [...prev];
      next[slotIndex] = {
        plantId: plant.id,
        name: plant.name,
        emoji: plant.emoji,
        color: plant.color,
        progress: 0,
        plantedAt: Date.now(),
        lastWatered: Date.now(),
      };
      return next;
    });
    setShowPlantPicker(null);
  };

  const waterPlant = (index) => {
    setGarden(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = {
          ...next[index],
          progress: Math.min(100, next[index].progress + 10),
          lastWatered: Date.now(),
        };
      }
      return next;
    });
  };

  const removePlant = (index) => {
    setGarden(prev => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const plantedCount = garden.filter(Boolean).length;
  const bloomingCount = garden.filter(s => s && s.progress >= 100).length;
  const avgProgress = plantedCount > 0
    ? Math.round(garden.filter(Boolean).reduce((sum, s) => sum + s.progress, 0) / plantedCount)
    : 0;

  return (
    <section className="page-tool page-tool--soft">
      <div className="container page-inner">
        <PageHeader
          eyebrow="Interactive wellness"
          subtitle="Plant, nurture, and watch your personal herbal garden grow. Each plant develops through stages as you care for it."
        >
          <h1 className="page-header__title font-display">
            Virtual <span className="text-gradient-soft">Garden</span>
          </h1>
        </PageHeader>

        <div className="mini-stat-grid">
          <div className="mini-stat-card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>🌿</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>{plantedCount}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)', fontWeight: 600 }}>Plants Growing</div>
          </div>
          <div className="mini-stat-card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>🌸</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#C05C2B' }}>{bloomingCount}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)', fontWeight: 600 }}>Blooming</div>
          </div>
          <div className="mini-stat-card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>📊</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--heading-color)' }}>{avgProgress}%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)', fontWeight: 600 }}>Avg Growth</div>
          </div>
          <div className="mini-stat-card">
            <div style={{ fontSize: '0.85rem', color: 'var(--muted-text)', fontWeight: 600, marginBottom: '0.6rem' }}>Weather Condition</div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {[
                { id: 'sunny', emoji: '☀️' },
                { id: 'cloudy', emoji: '⛅' },
                { id: 'rainy', emoji: '🌧️' },
              ].map(w => (
                <button
                  key={w.id}
                  onClick={() => setWeather(w.id)}
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '50%',
                    border: weather === w.id ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: weather === w.id ? 'var(--primary-light)' : 'var(--card-bg)',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  {w.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Garden Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.25rem',
          maxWidth: '950px',
          margin: '0 auto',
        }}>
          {garden.map((slot, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: slot ? 'default' : 'pointer',
                border: slot ? '1px solid var(--border)' : '2px dashed var(--border)',
                background: slot
                  ? `linear-gradient(180deg, ${slot.color}08, ${slot.color}15)`
                  : 'var(--card-bg)',
              }}
              onClick={() => !slot && setShowPlantPicker(index)}
            >
              {slot ? (
                <>
                  {/* Plant Display */}
                  <div style={{
                    fontSize: '3.2rem',
                    marginBottom: '0.6rem',
                    transition: 'var(--transition-spring)',
                    animation: slot.progress >= 100 ? 'leafFloat 4s ease-in-out infinite' : undefined,
                  }}>
                    {getGrowthStage(slot.progress).emoji === '🌸' ? slot.emoji : getGrowthStage(slot.progress).emoji}
                  </div>

                  <p style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--heading-color)',
                    marginBottom: '0.25rem',
                    textAlign: 'center',
                  }}>
                    {slot.name}
                  </p>

                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--muted-text)',
                    fontWeight: 500,
                    marginBottom: '0.6rem',
                  }}>
                    {getGrowthStage(slot.progress).name}
                  </p>

                  {/* Progress Bar */}
                  <div className="progress-bar" style={{ width: '100%', marginBottom: '0.85rem' }}>
                    <div className="progress-fill" style={{
                      width: `${slot.progress}%`,
                      background: slot.progress >= 100
                        ? 'linear-gradient(90deg, #1B7556, #228B67)'
                        : undefined,
                    }} />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); waterPlant(index); }}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem', fontWeight: 600 }}
                    >
                      <Droplets size={13} /> Water
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removePlant(index); }}
                      className="btn btn-sm"
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.78rem',
                        background: '#FDF0E9',
                        color: '#C05C2B',
                        border: '1px solid #F8C8B0',
                        fontWeight: 600,
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Blooming badge */}
                  {slot.progress >= 100 && (
                    <div style={{
                      position: 'absolute',
                      top: '0.6rem',
                      right: '0.6rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      border: '1px solid rgba(27, 117, 86, 0.2)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                    }}>
                      ✨ Blooming!
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div style={{
                    width: '3.25rem',
                    height: '3.25rem',
                    borderRadius: '50%',
                    background: 'var(--secondary)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.85rem',
                  }}>
                    <Plus size={22} style={{ color: 'var(--primary)' }} />
                  </div>
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--muted-text)',
                    fontWeight: 600,
                  }}>
                    Plant here
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Plant Picker Modal */}
        {showPlantPicker !== null && (
          <div
            onClick={() => setShowPlantPicker(null)}
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
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '520px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: 'var(--shadow-deep)',
                border: '1px solid var(--border)',
                animation: 'dropIn 0.4s ease-out',
              }}
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--heading-color)',
                }}>
                  Choose a Plant 🌱
                </h3>
                <button
                  onClick={() => setShowPlantPicker(null)}
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    background: 'var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted-text)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {plants.slice(0, 20).map(plant => (
                  <button
                    key={plant.id}
                    onClick={() => plantInSlot(showPlantPicker, plant.id)}
                    style={{
                      padding: '0.85rem 1.15rem',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                      background: 'var(--card-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      textAlign: 'left',
                      width: '100%',
                      color: 'var(--body-text)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--secondary)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--card-bg)'}
                  >
                    <span style={{ fontSize: '1.75rem' }}>{plant.emoji}</span>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--heading-color)' }}>{plant.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--muted-text)' }}>
                        {plant.scientificName} • {plant.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
