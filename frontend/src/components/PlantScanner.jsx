import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, Leaf, Sparkles, X, BookOpen, Plus } from 'lucide-react';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export default function PlantScanner() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    setResult(null);
    setImage(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const identifyPlant = async () => {
    if (!image) return;
    setScanning(true);
    setError(null);

    try {
      // Convert image to base64
      const reader = new FileReader();
      const base64 = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(image);
      });

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.2-90b-vision-preview',
          messages: [
            {
              role: 'system',
              content: `You are an expert botanist and AYUSH medicine specialist. When shown a plant image, identify it and provide detailed information. Always respond in this exact JSON format (no markdown, just raw JSON):
{
  "identified": true,
  "confidence": 85,
  "commonName": "Plant Name",
  "scientificName": "Scientific name",
  "family": "Plant family",
  "ayushSystem": "Ayurveda/Unani/Siddha/Homeopathy",
  "medicinalUses": ["use1", "use2", "use3", "use4", "use5"],
  "doshaEffect": "Which doshas it balances",
  "preparation": "How to prepare and use medicinally",
  "precautions": "Safety precautions",
  "description": "A 2-3 sentence description of the plant and its significance in traditional medicine",
  "funFact": "An interesting fact about this plant"
}
If you cannot identify the plant clearly, set "identified" to false and provide your best guess with lower confidence.`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Please identify this plant and provide its AYUSH medicinal information.'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: base64
                  }
                }
              ]
            }
          ],
          temperature: 0.3,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      // Parse JSON from response (handle markdown code blocks)
      let parsed;
      try {
        const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(jsonStr);
      } catch {
        throw new Error('Could not parse plant identification results.');
      }

      setResult(parsed);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to identify plant. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const reset = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <section style={{ paddingTop: '6rem', minHeight: '100vh', background: 'var(--gradient-garden)' }}>
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Header */}
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
            <Sparkles size={12} /> AI-Powered
          </div>
          <h1 className="section-title">Plant Scanner</h1>
          <p className="section-subtitle">
            Upload a photo of any plant and our AI will identify it, providing detailed
            medicinal properties and AYUSH therapy information.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1fr' : '1fr',
          gap: '2rem',
          maxWidth: result ? '1100px' : '600px',
          margin: '0 auto',
          transition: 'all 0.5s ease',
        }}>
          {/* Upload Area */}
          <div>
            {!imagePreview ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="glass-card"
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: dragOver ? '2px dashed hsl(var(--primary))' : '2px dashed hsl(var(--border))',
                  background: dragOver ? 'hsl(var(--primary) / 0.05)' : undefined,
                  transition: 'var(--transition-smooth)',
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem',
                }}
              >
                <div style={{
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '50%',
                  background: 'hsl(var(--primary) / 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'float 3s ease-in-out infinite',
                }}>
                  <Camera size={32} style={{ color: 'hsl(var(--primary))' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'hsl(var(--foreground))' }}>
                    Drop your plant image here
                  </p>
                  <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    or click to browse • PNG, JPG, WebP
                  </p>
                </div>
                <div className="btn btn-primary">
                  <Upload size={16} /> Upload Image
                </div>
              </div>
            ) : (
              <div className="glass-card" style={{
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Image Preview */}
                <div style={{ position: 'relative' }}>
                  <img
                    src={imagePreview}
                    alt="Plant to identify"
                    style={{
                      width: '100%',
                      height: '350px',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Scan line animation */}
                  {scanning && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
                      animation: 'scanLine 2s ease-in-out infinite',
                      boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
                    }} />
                  )}
                  {/* Close button */}
                  <button
                    onClick={reset}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Actions */}
                <div style={{ padding: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={identifyPlant}
                    disabled={scanning}
                    className="btn btn-primary"
                    style={{
                      flex: 1,
                      opacity: scanning ? 0.7 : 1,
                    }}
                  >
                    {scanning ? (
                      <>
                        <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} /> Identify Plant
                      </>
                    )}
                  </button>
                  <button onClick={reset} className="btn btn-secondary">
                    New Scan
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              style={{ display: 'none' }}
            />

            {error && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                background: 'hsl(var(--destructive) / 0.1)',
                color: 'hsl(var(--destructive))',
                fontSize: '0.9rem',
                border: '1px solid hsl(var(--destructive) / 0.2)',
              }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Results Panel */}
          {result && (
            <div style={{ animation: 'fadeUp 0.6s ease-out' }}>
              <div className="glass-card" style={{ padding: '2rem', overflow: 'hidden' }}>
                {/* Confidence Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                }}>
                  <div className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                    <Leaf size={12} />
                    {result.ayushSystem || 'Ayurveda'}
                  </div>
                  <div style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: result.confidence >= 80
                      ? 'hsl(150, 60%, 40%, 0.1)'
                      : result.confidence >= 60
                        ? 'hsl(42, 90%, 50%, 0.1)'
                        : 'hsl(0, 84%, 60%, 0.1)',
                    color: result.confidence >= 80
                      ? 'hsl(150, 60%, 35%)'
                      : result.confidence >= 60
                        ? 'hsl(42, 90%, 40%)'
                        : 'hsl(0, 84%, 50%)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}>
                    {result.confidence}% confidence
                  </div>
                </div>

                {/* Plant Name */}
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'hsl(var(--foreground))',
                  marginBottom: '0.25rem',
                }}>
                  {result.commonName}
                </h2>
                <p style={{
                  fontStyle: 'italic',
                  color: 'hsl(var(--muted-foreground))',
                  fontSize: '0.95rem',
                  marginBottom: '0.5rem',
                }}>
                  {result.scientificName}
                </p>
                {result.family && (
                  <p style={{
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '0.8rem',
                    marginBottom: '1rem',
                  }}>
                    Family: {result.family}
                  </p>
                )}

                {/* Description */}
                <p style={{
                  fontSize: '0.9rem',
                  color: 'hsl(var(--foreground) / 0.8)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  background: 'hsl(var(--muted) / 0.5)',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  {result.description}
                </p>

                {/* Medicinal Uses */}
                <h3 style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'hsl(var(--muted-foreground))',
                  marginBottom: '0.75rem',
                }}>
                  Medicinal Uses
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {(result.medicinalUses || []).map((use, i) => (
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

                {/* Dosha Effect */}
                {result.doshaEffect && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'hsl(var(--muted-foreground))',
                      marginBottom: '0.5rem',
                    }}>
                      Dosha Effect
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.8)' }}>
                      {result.doshaEffect}
                    </p>
                  </div>
                )}

                {/* Preparation */}
                {result.preparation && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'hsl(var(--muted-foreground))',
                      marginBottom: '0.5rem',
                    }}>
                      Preparation
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'hsl(var(--foreground) / 0.8)', lineHeight: 1.6 }}>
                      {result.preparation}
                    </p>
                  </div>
                )}

                {/* Precautions */}
                {result.precautions && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'hsl(var(--accent) / 0.08)',
                    border: '1px solid hsl(var(--accent) / 0.2)',
                    marginBottom: '1.5rem',
                  }}>
                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--accent-foreground))' }}>
                      ⚠️ <strong>Precautions:</strong> {result.precautions}
                    </p>
                  </div>
                )}

                {/* Fun Fact */}
                {result.funFact && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'hsl(var(--primary) / 0.05)',
                    border: '1px solid hsl(var(--primary) / 0.1)',
                  }}>
                    <p style={{ fontSize: '0.85rem', color: 'hsl(var(--foreground) / 0.8)' }}>
                      💡 <strong>Did you know?</strong> {result.funFact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          maxWidth: '900px',
          margin: '3rem auto 0',
        }}>
          {[
            { emoji: '📸', title: 'Clear Photo', desc: 'Take a well-lit, focused photo of the plant' },
            { emoji: '🌿', title: 'Show Leaves', desc: 'Include leaves, flowers, or distinctive features' },
            { emoji: '📏', title: 'Close Up', desc: 'Get close enough to show plant details clearly' },
          ].map((tip, i) => (
            <div key={i} className="glass-card" style={{
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}>
              <span style={{ fontSize: '1.5rem' }}>{tip.emoji}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'hsl(var(--foreground))' }}>
                  {tip.title}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--muted-foreground))', marginTop: '0.25rem' }}>
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
