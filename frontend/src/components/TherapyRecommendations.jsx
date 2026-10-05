import { useState } from 'react';
import { Search, Leaf, Loader2, Sparkles } from 'lucide-react';
import { plants, ailments, ailmentRemedies } from '../data/plants';
import PageHeader from './PageHeader';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function TherapyRecommendations() {
  const [selectedAilment, setSelectedAilment] = useState(null);
  const [customQuery, setCustomQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendedPlants = (ailment) => {
    const ids = ailmentRemedies[ailment] || [];
    return ids.map(id => plants.find(p => p.id === id)).filter(Boolean);
  };

  const askAI = async () => {
    if (!customQuery.trim()) return;
    setLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.8-27b',
          messages: [
            {
              role: 'system',
              content: `You are an expert AYUSH medicine practitioner with deep knowledge of Ayurveda, Yoga, Unani, Siddha, and Homeopathy. Provide detailed, helpful therapeutic recommendations for health queries. Structure your response clearly with sections. Always include:
1. A brief explanation of the condition from an AYUSH perspective
2. 3-5 recommended herbs/plants with their preparation methods
3. Lifestyle and dietary recommendations
4. Yoga/breathing exercises if applicable
5. Important precautions and when to see a doctor

Always add a disclaimer that this is informational and not a substitute for professional medical advice. Format your response with clear headings using ** for bold.`
            },
            {
              role: 'user',
              content: `Please provide AYUSH therapy recommendations for: ${customQuery}`
            }
          ],
          temperature: 0.5,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error: ${response.status}`);
      }
      const data = await response.json();
      setAiResponse(data.choices[0]?.message?.content);
    } catch (err) {
      setError(err.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-tool page-tool--soft">
      <div className="container page-inner">
        <PageHeader
          eyebrow="AI + traditional wisdom"
          subtitle="Find personalized herbal remedies based on AYUSH therapeutic principles. Select a common ailment or ask our AI for custom guidance."
        >
          <h1 className="page-header__title font-display">
            Therapy <span className="text-gradient">Recommendations</span>
          </h1>
        </PageHeader>

        <div className="glass-card content-panel--top-accent" style={{
          padding: '2.25rem',
          maxWidth: '740px',
          margin: '0 auto 3rem',
        }}>
          <h3 style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: 'var(--heading-color)',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            letterSpacing: '-0.01em',
          }}>
            🤖 Ask AI for Custom Recommendations
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--muted-text)',
            marginBottom: '1.25rem',
            lineHeight: 1.6,
          }}>
            Describe your health concern and get personalized AYUSH therapy recommendations powered by clinical AI.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && askAI()}
              placeholder="e.g., I have chronic back pain and trouble sleeping..."
              className="input"
              style={{
                flex: 1,
                height: '3.25rem',
                borderRadius: 'var(--radius)',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                fontSize: '1rem',
                color: 'var(--body-text)',
              }}
            />
            <button
              onClick={askAI}
              disabled={loading || !customQuery.trim()}
              className="btn btn-primary"
              style={{ opacity: loading ? 0.7 : 1, padding: '0 1.5rem', fontWeight: 700 }}
            >
              {loading ? (
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Sparkles size={18} />
              )}
              Ask AI
            </button>
          </div>

          {/* AI Response */}
          {aiResponse && (
            <div className="ai-response-panel">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                <Sparkles size={16} /> Verified AYUSH Recommendation
              </div>
              <div style={{
                fontSize: '0.98rem',
                color: 'var(--body-text)',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}>
                {aiResponse.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i} style={{ color: 'var(--heading-color)', fontWeight: 700 }}>{part}</strong> : <span key={i}>{part}</span>
                )}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              marginTop: '1.25rem',
              padding: '0.9rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              background: '#FDF0E9',
              border: '1px solid #F8C8B0',
              color: '#C05C2B',
              fontSize: '0.92rem',
              fontWeight: 500,
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Common Ailments */}
        <h2 className="section-heading-row">Or Select a Common Ailment</h2>

        <div className="chip-row" style={{ maxWidth: '850px', margin: '0 auto 2.5rem' }}>
          {ailments.map(ailment => (
            <button
              key={ailment}
              type="button"
              onClick={() => setSelectedAilment(selectedAilment === ailment ? null : ailment)}
              className={`chip${selectedAilment === ailment ? ' chip--active' : ''}`}
            >
              {ailment}
            </button>
          ))}
        </div>

        {/* Recommended Plants */}
        {selectedAilment && (
          <div style={{ animation: 'fadeUp 0.5s ease-out' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--heading-color)',
              textAlign: 'center',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}>
              Recommended Herbs for{' '}
              <span className="text-gradient">{selectedAilment}</span>
            </h3>
            <p style={{
              textAlign: 'center',
              color: 'var(--muted-text)',
              fontSize: '0.95rem',
              marginBottom: '2rem',
            }}>
              These herbs are traditionally recommended in AYUSH systems for {selectedAilment.toLowerCase()}.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem',
              maxWidth: '1050px',
              margin: '0 auto',
            }}>
              {getRecommendedPlants(selectedAilment).map((plant, i) => (
                <div key={plant.id} className="glass-card" style={{
                  padding: '1.75rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'flex-start',
                  animation: `fadeUp 0.5s ease-out ${i * 0.1}s both`,
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: 'var(--radius)',
                    background: `linear-gradient(135deg, ${plant.color}20, ${plant.color}40)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    flexShrink: 0,
                  }}>
                    {plant.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div>
                        <h4 style={{
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          color: 'var(--heading-color)',
                        }}>
                          {plant.name}
                        </h4>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '0.82rem',
                          color: 'var(--muted-text)',
                        }}>
                          {plant.scientificName}
                        </p>
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                        {plant.category}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--body-text)',
                      lineHeight: 1.55,
                      marginTop: '0.65rem',
                      marginBottom: '0.65rem',
                    }}>
                      {plant.preparation}
                    </p>

                    <div style={{
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--primary-light)',
                      border: '1px solid rgba(27, 117, 86, 0.15)',
                      fontSize: '0.82rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                    }}>
                      💊 <strong>Dosage:</strong> {plant.dosage}
                    </div>

                    {plant.precautions && (
                      <p style={{
                        fontSize: '0.78rem',
                        color: '#92400E',
                        marginTop: '0.6rem',
                        background: '#FFF9EB',
                        padding: '0.4rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid #FDE68A',
                      }}>
                        ⚠️ {plant.precautions}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div style={{
              maxWidth: '750px',
              margin: '2.5rem auto 0',
              padding: '1.25rem',
              borderRadius: 'var(--radius)',
              background: 'var(--secondary)',
              border: '1px solid var(--border)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                ⚕️ <strong>Disclaimer:</strong> These recommendations are based on traditional AYUSH systems and are for informational purposes only.
                Always consult a qualified healthcare practitioner before starting any herbal treatment.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
