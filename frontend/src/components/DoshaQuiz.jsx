import { useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { doshaQuestions, plants } from '../data/plants';
import PageHeader from './PageHeader';

const doshaInfo = {
  vata: {
    name: 'Vata',
    emoji: '💨',
    color: '#2C6E91',
    colorLight: '#EBF4FA',
    element: 'Air + Space',
    description: 'You have a Vata-dominant constitution! Vata types are creative, quick-thinking, and energetic. You may be prone to anxiety, dry skin, and irregular digestion.',
    traits: ['Creative & imaginative', 'Quick learner', 'Light & thin frame', 'Variable appetite', 'Light sleeper'],
    diet: ['Warm, cooked foods', 'Sweet, sour, salty tastes', 'Warming spices (ginger, cinnamon)', 'Regular meal times', 'Avoid raw/cold foods'],
    herbs: [2, 5, 17, 39, 40], // Ashwagandha, Brahmi, Shankhpushpi, Jatamansi, Ginger
  },
  pitta: {
    name: 'Pitta',
    emoji: '🔥',
    color: '#C05C2B',
    colorLight: '#FDF0E9',
    element: 'Fire + Water',
    description: 'You have a Pitta-dominant constitution! Pitta types are sharp, determined, and natural leaders. You may be prone to inflammation, acidity, and irritability.',
    traits: ['Sharp intellect', 'Strong digestion', 'Medium, athletic build', 'Natural leaders', 'Sensitive to heat'],
    diet: ['Cool, refreshing foods', 'Sweet, bitter, astringent tastes', 'Cooling herbs (mint, fennel)', 'Avoid spicy/fried foods', 'Plenty of water & coconut water'],
    herbs: [6, 27, 18, 1, 11], // Amla, Vetiver, Manjistha, Tulsi, Aloe Vera
  },
  kapha: {
    name: 'Kapha',
    emoji: '🌊',
    color: '#1B7556',
    colorLight: '#EAF4EE',
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
      <section className="page-tool page-tool--soft">
        <div className="container page-inner" style={{ maxWidth: '740px', textAlign: 'center' }}>
          <div className="quiz-intro-icon">🧘</div>
          <PageHeader
            eyebrow="Ayurvedic constitution"
            subtitle="In Ayurveda, your Dosha is your unique mind-body constitution. Understanding it helps you make optimal choices for diet, lifestyle, and herbal remedies."
          >
            <h1 className="page-header__title font-display">
              Discover Your <span className="text-gradient">Dosha</span>
            </h1>
          </PageHeader>

          {/* Dosha Preview Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}>
            {Object.values(doshaInfo).map(d => (
              <div key={d.name} className="glass-card" style={{
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem' }}>{d.emoji}</div>
                <h3 style={{
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  color: d.color,
                  marginBottom: '0.35rem',
                }}>
                  {d.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-text)', fontWeight: 500 }}>
                  {d.element}
                </p>
              </div>
            ))}
          </div>

          <button onClick={() => setStarted(true)} className="btn btn-primary btn-lg" style={{ padding: '0.9rem 2.25rem', fontSize: '1.1rem', fontWeight: 700 }}>
            <Sparkles size={20} /> Start Quiz ({totalQuestions} questions)
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
      <section className="page-tool page-tool--soft">
        <div className="container page-inner" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', animation: 'fadeUp 0.8s ease-out' }}>
            <div style={{
              width: '5.5rem',
              height: '5.5rem',
              borderRadius: '50%',
              background: dosha.colorLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.8rem',
              margin: '0 auto 1.5rem',
              boxShadow: `0 0 30px ${dosha.color}30`,
              animation: 'herbalPulse 4s ease-in-out infinite',
            }}>
              {dosha.emoji}
            </div>
            <h1 style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              color: 'var(--heading-color)',
              marginBottom: '0.75rem',
              letterSpacing: '-0.02em',
            }}>
              You are{' '}
              <span style={{ color: dosha.color }}>{dosha.name}</span>
              {' '}Dominant!
            </h1>
            <p style={{
              fontSize: '1.08rem',
              color: 'var(--body-text)',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto',
            }}>
              {dosha.description}
            </p>
          </div>

          {/* Dosha Distribution */}
          <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            <h3 style={{
              fontWeight: 700,
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--heading-color)',
              marginBottom: '1.25rem',
            }}>Your Dosha Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(result.counts).map(([d, count]) => {
                const info = doshaInfo[d];
                const pct = Math.round((count / result.total) * 100);
                return (
                  <div key={d}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.45rem',
                      fontSize: '0.92rem',
                    }}>
                      <span style={{ fontWeight: 700, color: info.color }}>
                        {info.emoji} {info.name}
                      </span>
                      <span style={{ color: 'var(--muted-text)', fontWeight: 600 }}>{pct}%</span>
                    </div>
                    <div style={{
                      height: '0.75rem',
                      borderRadius: '9999px',
                      background: 'var(--secondary)',
                      border: '1px solid var(--border)',
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
          <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            <h3 style={{
              fontWeight: 700,
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--heading-color)',
              marginBottom: '1rem',
            }}>Key Personality & Physical Traits</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {dosha.traits.map((trait, i) => (
                <span key={i} style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '9999px',
                  background: dosha.colorLight,
                  border: `1px solid ${dosha.color}30`,
                  color: dosha.color,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                }}>
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Diet */}
          <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            <h3 style={{
              fontWeight: 700,
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--heading-color)',
              marginBottom: '1rem',
            }}>🍽️ Diet & Lifestyle Recommendations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {dosha.diet.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.95rem',
                  color: 'var(--body-text)',
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
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
          <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
            <h3 style={{
              fontWeight: 700,
              fontSize: '0.92rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--heading-color)',
              marginBottom: '1rem',
            }}>🌿 Recommended Herbs for {dosha.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recommendedPlants.map(plant => (
                <div key={plant.id} style={{
                  display: 'flex',
                  gap: '0.85rem',
                  padding: '0.9rem',
                  borderRadius: 'var(--radius)',
                  background: 'var(--secondary)',
                  border: '1px solid var(--border)',
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-sm)',
                    background: `${plant.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    flexShrink: 0,
                  }}>
                    {plant.emoji}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--heading-color)' }}>
                      {plant.name}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>
                      {plant.medicinalUses.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restart */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={restart} className="btn btn-secondary btn-lg" style={{ fontWeight: 700 }}>
              <RotateCcw size={18} /> Retake Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Quiz screen
  const question = doshaQuestions[currentQ];

  return (
    <section className="page-tool page-tool--soft">
      <div className="container page-inner" style={{ maxWidth: '700px' }}>
        {/* Progress */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.6rem',
            fontSize: '0.88rem',
            color: 'var(--muted-text)',
            fontWeight: 600,
          }}>
            <span>Question {currentQ + 1} of {totalQuestions}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="glass-card content-panel--top-accent" style={{ padding: '2.75rem', animation: 'fadeUp 0.4s ease-out' }} key={currentQ}>
          <h2 style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--heading-color)',
            marginBottom: '2rem',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
          }}>
            {question.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {question.options.map((option, i) => {
              const doshaColors = {
                vata: { bg: '#EBF4FA', border: '#2C6E91', active: '#2C6E91' },
                pitta: { bg: '#FDF0E9', border: '#C05C2B', active: '#C05C2B' },
                kapha: { bg: '#EAF4EE', border: '#1B7556', active: '#1B7556' },
              };
              const c = doshaColors[option.dosha];
              const isSelected = answers[currentQ] === option.dosha;

              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(option.dosha)}
                  style={{
                    padding: '1.15rem 1.35rem',
                    borderRadius: 'var(--radius)',
                    border: isSelected ? `2px solid ${c.active}` : '1px solid var(--border)',
                    background: isSelected ? c.bg : 'var(--card-bg)',
                    color: 'var(--body-text)',
                    fontSize: '1rem',
                    fontWeight: isSelected ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    width: '100%',
                    boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  <div style={{
                    width: '1.6rem',
                    height: '1.6rem',
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? c.active : 'var(--border)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'var(--transition-smooth)',
                  }}>
                    {isSelected && (
                      <div style={{
                        width: '0.65rem',
                        height: '0.65rem',
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
          marginTop: '1.75rem',
        }}>
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="btn btn-secondary"
            style={{ opacity: currentQ === 0 ? 0.5 : 1, fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Previous
          </button>
          <button onClick={restart} className="btn btn-secondary" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
            <RotateCcw size={14} /> Start Over
          </button>
        </div>
      </div>
    </section>
  );
}
