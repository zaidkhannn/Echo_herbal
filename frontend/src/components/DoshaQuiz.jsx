import { useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { doshaQuestions, plants } from '../data/plants';

const doshaInfo = {
  vata: {
    name: 'Vata',
    emoji: '💨',
    color: 'hsl(210, 60%, 65%)',
    colorLight: 'hsl(210, 60%, 65%, 0.1)',
    element: 'Air + Space',
    description: 'You have a Vata-dominant constitution! Vata types are creative, quick-thinking, and energetic. You may be prone to anxiety, dry skin, and irregular digestion.',
    traits: ['Creative & imaginative', 'Quick learner', 'Light & thin frame', 'Variable appetite', 'Light sleeper'],
    diet: ['Warm, cooked foods', 'Sweet, sour, salty tastes', 'Warming spices (ginger, cinnamon)', 'Regular meal times', 'Avoid raw/cold foods'],
    herbs: [2, 5, 17, 39, 40], // Ashwagandha, Brahmi, Shankhpushpi, Jatamansi, Ginger
  },
  pitta: {
    name: 'Pitta',
    emoji: '🔥',
    color: 'hsl(15, 85%, 65%)',
    colorLight: 'hsl(15, 85%, 65%, 0.1)',
    element: 'Fire + Water',
    description: 'You have a Pitta-dominant constitution! Pitta types are sharp, determined, and natural leaders. You may be prone to inflammation, acidity, and irritability.',
    traits: ['Sharp intellect', 'Strong digestion', 'Medium, athletic build', 'Natural leaders', 'Sensitive to heat'],
    diet: ['Cool, refreshing foods', 'Sweet, bitter, astringent tastes', 'Cooling herbs (mint, fennel)', 'Avoid spicy/fried foods', 'Plenty of water & coconut water'],
    herbs: [6, 27, 18, 1, 11], // Amla, Vetiver, Manjistha, Tulsi, Aloe Vera
  },
  kapha: {
    name: 'Kapha',
    emoji: '🌊',
    color: 'hsl(150, 45%, 40%)',
    colorLight: 'hsl(150, 45%, 40%, 0.1)',
    element: 'Earth + Water',
    description: 'You have a Kapha-dominant constitution! Kapha types are steady, nurturing, and resilient. You may be prone to weight gain, sluggishness, and congestion.',
    traits: ['Calm & patient', 'Strong endurance', 'Sturdy, solid build', 'Excellent memory', 'Deep, sound sleep'],
    diet: ['Light, warm foods', 'Pungent, bitter, astringent tastes', 'Stimulating spices (pepper, turmeric)', 'Avoid heavy/oily foods', 'Regular exercise'],
    herbs: [3, 40, 44, 21, 4], // Turmeric, Ginger, Pepper, Guggul, Neem
  },
};

export default function DoshaQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);

  const totalQuestions = doshaQuestions.length;
  const progress = (currentQ / totalQuestions) * 100;

  const selectAnswer = (dosha) => {
    const newAnswers = { ...answers, [currentQ]: dosha };
    setAnswers(newAnswers);

    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      // Calculate result
      const counts = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(newAnswers).forEach(d => counts[d]++);
      const dominant = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setResult({
        dominant,
        counts,
        total: totalQuestions,
      });
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setStarted(false);
  };

  // Start screen
  if (!started) {
    return (
      <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
        <div className="container" style={{
          paddingTop: '4rem',
          paddingBottom: '4rem',
          maxWidth: '700px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            animation: 'float 4s ease-in-out infinite',
          }}>
            🧘
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            Discover Your{' '}
            <span className="text-gradient">Dosha</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'hsl(var(--muted-foreground))',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}>
            In Ayurveda, your Dosha is your unique mind-body type. Understanding it helps you
            make optimal choices for diet, lifestyle, and herbal remedies.
          </p>

          {/* Dosha Preview Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            {Object.values(doshaInfo).map(d => (
              <div key={d.name} className="glass-card" style={{
                padding: '1.25rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{d.emoji}</div>
                <h3 style={{
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: d.color,
                  marginBottom: '0.25rem',
                }}>
                  {d.name}
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
                  {d.element}
                </p>
              </div>
            ))}
          </div>

          <button onClick={() => setStarted(true)} className="btn btn-primary btn-lg">
            <Sparkles size={18} /> Start Quiz ({totalQuestions} questions)
          </button>
        </div>
      </section>
    );
  }

  // Result screen
  if (result) {
    const dosha = doshaInfo[result.dominant];
    const recommendedPlants = dosha.herbs.map(id => plants.find(p => p.id === id)).filter(Boolean);

    return (
      <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
        <div className="container" style={{
          paddingTop: '2rem',
          paddingBottom: '4rem',
          maxWidth: '800px',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeUp 0.8s ease-out' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              background: dosha.colorLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 1.5rem',
              boxShadow: `0 0 30px ${dosha.color}40`,
              animation: 'herbalPulse 4s ease-in-out infinite',
            }}>
              {dosha.emoji}
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '0.5rem',
            }}>
              You are{' '}
              <span style={{ color: dosha.color }}>{dosha.name}</span>
              {' '}Dominant!
            </h1>
            <p style={{
              fontSize: '1rem',
              color: 'hsl(var(--muted-foreground))',
              lineHeight: 1.7,
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              {dosha.description}
            </p>
          </div>

          {/* Dosha Distribution */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '1rem',
            }}>Your Dosha Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {Object.entries(result.counts).map(([d, count]) => {
                const info = doshaInfo[d];
                const pct = Math.round((count / result.total) * 100);
                return (
                  <div key={d}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.35rem',
                      fontSize: '0.85rem',
                    }}>
                      <span style={{ fontWeight: 600, color: info.color }}>
                        {info.emoji} {info.name}
                      </span>
                      <span style={{ color: 'hsl(var(--muted-foreground))' }}>{pct}%</span>
                    </div>
                    <div style={{
                      height: '0.6rem',
                      borderRadius: '9999px',
                      background: 'hsl(var(--muted))',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        borderRadius: '9999px',
                        background: info.color,
                        transition: 'width 1s ease-out',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Traits */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.75rem',
            }}>Key Traits</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {dosha.traits.map((trait, i) => (
                <span key={i} style={{
                  padding: '0.35rem 0.8rem',
                  borderRadius: '9999px',
                  background: dosha.colorLight,
                  color: dosha.color,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}>
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Diet */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.75rem',
            }}>🍽️ Diet Recommendations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {dosha.diet.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  color: 'hsl(var(--foreground) / 0.85)',
                }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: dosha.color,
                    flexShrink: 0,
                  }} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Herbs */}
          <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'hsl(var(--muted-foreground))',
              marginBottom: '0.75rem',
            }}>🌿 Recommended Herbs for {dosha.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recommendedPlants.map(plant => (
                <div key={plant.id} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'hsl(var(--muted) / 0.5)',
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: 'var(--radius-sm)',
                    background: `${plant.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                  }}>
                    {plant.emoji}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'hsl(var(--foreground))' }}>
                      {plant.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.15rem' }}>
                      {plant.medicinalUses.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restart */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button onClick={restart} className="btn btn-secondary btn-lg">
              <RotateCcw size={16} /> Retake Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Quiz screen
  const question = doshaQuestions[currentQ];

  return (
    <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
      <div className="container" style={{
        paddingTop: '2rem',
        paddingBottom: '4rem',
        maxWidth: '650px',
      }}>
        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.8rem',
            color: 'hsl(var(--muted-foreground))',
          }}>
            <span>Question {currentQ + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="glass-card" style={{ padding: '2.5rem', animation: 'fadeUp 0.4s ease-out' }} key={currentQ}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '2rem',
            lineHeight: 1.3,
          }}>
            {question.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {question.options.map((option, i) => {
              const doshaColors = {
                vata: { bg: 'hsl(210, 60%, 65%, 0.08)', border: 'hsl(210, 60%, 65%, 0.3)', active: 'hsl(210, 60%, 65%)' },
                pitta: { bg: 'hsl(15, 85%, 65%, 0.08)', border: 'hsl(15, 85%, 65%, 0.3)', active: 'hsl(15, 85%, 65%)' },
                kapha: { bg: 'hsl(150, 45%, 40%, 0.08)', border: 'hsl(150, 45%, 40%, 0.3)', active: 'hsl(150, 45%, 40%)' },
              };
              const c = doshaColors[option.dosha];
              const isSelected = answers[currentQ] === option.dosha;

              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(option.dosha)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius)',
                    border: isSelected ? `2px solid ${c.active}` : `1px solid hsl(var(--border))`,
                    background: isSelected ? c.bg : 'hsl(var(--card))',
                    color: 'hsl(var(--foreground))',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                  }}
                >
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? c.active : 'hsl(var(--border))'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'var(--transition-smooth)',
                  }}>
                    {isSelected && (
                      <div style={{
                        width: '0.6rem',
                        height: '0.6rem',
                        borderRadius: '50%',
                        background: c.active,
                      }} />
                    )}
                  </div>
                  {option.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
        }}>
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="btn btn-secondary"
            style={{ opacity: currentQ === 0 ? 0.5 : 1 }}
          >
            <ArrowLeft size={16} /> Previous
          </button>
          <button onClick={restart} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
            <RotateCcw size={14} /> Start Over
          </button>
        </div>
      </div>
    </section>
  );
}
