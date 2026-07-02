import { useState, useEffect } from 'react';
import { Sprout, Droplets, Sun, Trash2, Plus, Sparkles } from 'lucide-react';
import { plants } from '../data/plants';

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
    <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
            <Sprout size={12} /> Interactive
          </div>
          <h1 className="section-title">Virtual Garden</h1>
          <p className="section-subtitle">
            Plant, nurture, and watch your personal herbal garden grow. Each plant
            develops through stages as you care for it.
          </p>
        </div>

        {/* Stats & Weather */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          maxWidth: '900px',
          margin: '0 auto 2rem',
        }}>
          <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🌿</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>{plantedCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Plants Growing</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🌸</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'hsl(var(--accent))' }}>{bloomingCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Blooming</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📊</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'hsl(var(--foreground))' }}>{avgProgress}%</div>
            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>Avg Growth</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginBottom: '0.5rem' }}>Weather</div>
            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
              {[
                { id: 'sunny', emoji: '☀️' },
                { id: 'cloudy', emoji: '⛅' },
                { id: 'rainy', emoji: '🌧️' },
              ].map(w => (
                <button
                  key={w.id}
                  onClick={() => setWeather(w.id)}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    border: weather === w.id ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                    background: weather === w.id ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--muted))',
                    fontSize: '1.1rem',
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {garden.map((slot, index) => (
            <div
              key={index}
              className="glass-card"
              style={{
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: slot ? 'default' : 'pointer',
                border: slot ? undefined : '2px dashed hsl(var(--border))',
                background: slot
                  ? `linear-gradient(180deg, ${slot.color}08, ${slot.color}15)`
                  : undefined,
              }}
              onClick={() => !slot && setShowPlantPicker(index)}
            >
              {slot ? (
                <>
                  {/* Plant Display */}
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '0.5rem',
                    transition: 'var(--transition-spring)',
                    animation: slot.progress >= 100 ? 'leafFloat 4s ease-in-out infinite' : undefined,
                  }}>
                    {getGrowthStage(slot.progress).emoji === '🌸' ? slot.emoji : getGrowthStage(slot.progress).emoji}
                  </div>

                  <p style={{
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: 'hsl(var(--foreground))',
                    marginBottom: '0.25rem',
                    textAlign: 'center',
                  }}>
                    {slot.name}
                  </p>

                  <p style={{
                    fontSize: '0.7rem',
                    color: 'hsl(var(--muted-foreground))',
                    marginBottom: '0.5rem',
                  }}>
                    {getGrowthStage(slot.progress).name}
                  </p>

                  {/* Progress Bar */}
                  <div className="progress-bar" style={{ width: '100%', marginBottom: '0.75rem' }}>
                    <div className="progress-fill" style={{
                      width: `${slot.progress}%`,
                      background: slot.progress >= 100
                        ? 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))'
                        : undefined,
                    }} />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); waterPlant(index); }}
                      className="btn btn-sm btn-primary"
                      style={{ padding: '0.35rem 0.7rem', fontSize: '0.7rem' }}
                    >
                      <Droplets size={12} /> Water
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removePlant(index); }}
                      className="btn btn-sm"
                      style={{
                        padding: '0.35rem 0.7rem',
                        fontSize: '0.7rem',
                        background: 'hsl(var(--destructive) / 0.1)',
                        color: 'hsl(var(--destructive))',
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Blooming badge */}
                  {slot.progress >= 100 && (
                    <div style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '9999px',
                      background: 'hsl(var(--accent) / 0.15)',
                      color: 'hsl(var(--accent))',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                    }}>
                      ✨ Blooming!
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    background: 'hsl(var(--muted))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '0.75rem',
                  }}>
                    <Plus size={20} style={{ color: 'hsl(var(--muted-foreground))' }} />
                  </div>
                  <p style={{
                    fontSize: '0.8rem',
                    color: 'hsl(var(--muted-foreground))',
                    fontWeight: 500,
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
              background: 'rgba(0,0,0,0.6)',
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
                background: 'hsl(var(--card))',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: 'var(--shadow-deep)',
                animation: 'dropIn 0.4s ease-out',
              }}
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid hsl(var(--border))',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}>
                  Choose a Plant 🌱
                </h3>
                <button
                  onClick={() => setShowPlantPicker(null)}
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    background: 'hsl(var(--muted))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'hsl(var(--muted-foreground))',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {plants.slice(0, 20).map(plant => (
                  <button
                    key={plant.id}
                    onClick={() => plantInSlot(showPlantPicker, plant.id)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid hsl(var(--border))',
                      background: 'hsl(var(--card))',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      textAlign: 'left',
                      width: '100%',
                      color: 'hsl(var(--foreground))',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'hsl(var(--primary) / 0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'hsl(var(--card))'}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{plant.emoji}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{plant.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
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
