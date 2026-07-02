import { useState } from 'react';
import { Search, Leaf, Loader2, Sparkles } from 'lucide-react';
import { plants, ailments, ailmentRemedies } from '../data/plants';

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
          model: 'llama-3.1-70b-versatile',
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

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setAiResponse(data.choices[0]?.message?.content);
    } catch (err) {
      setError(err.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
            <Sparkles size={12} /> AI + Traditional Wisdom
          </div>
          <h1 className="section-title">Therapy Recommendations</h1>
          <p className="section-subtitle">
            Find personalized herbal remedies based on AYUSH therapeutic principles.
            Select a common ailment or ask our AI for custom guidance.
          </p>
        </div>

        {/* AI Query Section */}
        <div className="glass-card" style={{
          padding: '2rem',
          maxWidth: '700px',
          margin: '0 auto 3rem',
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.2rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            🤖 Ask AI for Custom Recommendations
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: 'hsl(var(--muted-foreground))',
            marginBottom: '1rem',
          }}>
            Describe your health concern and get personalized AYUSH therapy recommendations powered by AI.
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
                height: '3rem',
                borderRadius: 'var(--radius)',
                background: 'hsl(var(--input))',
              }}
            />
            <button
              onClick={askAI}
              disabled={loading || !customQuery.trim()}
              className="btn btn-primary"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
              ) : (
                <Sparkles size={16} />
              )}
              Ask
            </button>
          </div>

          {/* AI Response */}
          {aiResponse && (
            <div style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              borderRadius: 'var(--radius)',
              background: 'hsl(var(--muted) / 0.5)',
              border: '1px solid hsl(var(--primary) / 0.1)',
              animation: 'fadeUp 0.5s ease-out',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'hsl(var(--primary))',
              }}>
                <Sparkles size={14} /> AI Recommendation
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'hsl(var(--foreground) / 0.85)',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
              }}>
                {aiResponse.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                )}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'hsl(var(--destructive) / 0.1)',
              color: 'hsl(var(--destructive))',
              fontSize: '0.85rem',
            }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Common Ailments */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.5rem',
          fontWeight: 600,
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          Or Select a Common Ailment
        </h2>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: '0 auto 2.5rem',
        }}>
          {ailments.map(ailment => (
            <button
              key={ailment}
              onClick={() => setSelectedAilment(selectedAilment === ailment ? null : ailment)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: selectedAilment === ailment
                  ? '2px solid hsl(var(--primary))'
                  : '1px solid hsl(var(--border))',
                background: selectedAilment === ailment
                  ? 'hsl(var(--primary) / 0.1)'
                  : 'hsl(var(--card))',
                color: selectedAilment === ailment
                  ? 'hsl(var(--primary))'
                  : 'hsl(var(--foreground))',
                fontSize: '0.85rem',
                fontWeight: selectedAilment === ailment ? 600 : 400,
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              {ailment}
            </button>
          ))}
        </div>

        {/* Recommended Plants */}
        {selectedAilment && (
          <div style={{ animation: 'fadeUp 0.5s ease-out' }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.3rem',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}>
              Recommended Herbs for{' '}
              <span className="text-gradient">{selectedAilment}</span>
            </h3>
            <p style={{
              textAlign: 'center',
              color: 'hsl(var(--muted-foreground))',
              fontSize: '0.85rem',
              marginBottom: '2rem',
            }}>
              These herbs are traditionally recommended in AYUSH systems for {selectedAilment.toLowerCase()}.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
              maxWidth: '1000px',
              margin: '0 auto',
            }}>
              {getRecommendedPlants(selectedAilment).map((plant, i) => (
                <div key={plant.id} className="glass-card" style={{
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  animation: `fadeUp 0.5s ease-out ${i * 0.1}s both`,
                }}>
                  <div style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: 'var(--radius)',
                    background: `linear-gradient(135deg, ${plant.color}20, ${plant.color}40)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {plant.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{
                          fontWeight: 600,
                          fontSize: '1rem',
                          color: 'hsl(var(--foreground))',
                        }}>
                          {plant.name}
                        </h4>
                        <p style={{
                          fontStyle: 'italic',
                          fontSize: '0.75rem',
                          color: 'hsl(var(--muted-foreground))',
                        }}>
                          {plant.scientificName}
                        </p>
                      </div>
                      <span className="badge badge-primary" style={{ fontSize: '0.6rem', flexShrink: 0 }}>
                        {plant.category}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.82rem',
                      color: 'hsl(var(--foreground) / 0.8)',
                      lineHeight: 1.5,
                      marginTop: '0.5rem',
                      marginBottom: '0.5rem',
                    }}>
                      {plant.preparation}
                    </p>

                    <div style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'hsl(var(--primary) / 0.05)',
                      fontSize: '0.75rem',
                      color: 'hsl(var(--primary))',
                    }}>
                      💊 <strong>Dosage:</strong> {plant.dosage}
                    </div>

                    {plant.precautions && (
                      <p style={{
                        fontSize: '0.72rem',
                        color: 'hsl(var(--accent))',
                        marginTop: '0.5rem',
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
              maxWidth: '700px',
              margin: '2rem auto 0',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'hsl(var(--accent) / 0.06)',
              border: '1px solid hsl(var(--accent) / 0.15)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))' }}>
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
