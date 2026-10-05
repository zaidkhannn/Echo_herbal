import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, Leaf, Sparkles, X } from 'lucide-react';
import PageHeader from './PageHeader';

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
          model: 'qwen/qwen3.8-27b',
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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content?.trim();
      
      const cleanJson = content.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      setResult(parsed);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to identify plant. Please try again with a clearer photo.');
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
    <section className="page-tool page-tool--soft">
      <div className="container page-inner">
        <PageHeader
          eyebrow="Vision AI plant identification"
          subtitle="Upload a photo of any plant and our AI will identify it, providing detailed medicinal properties and AYUSH therapy information."
        >
          <h1 className="page-header__title font-display">
            Identify Any <span className="text-gradient">Medicinal Plant</span>
          </h1>
        </PageHeader>

        <div style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1fr' : '1fr',
          gap: '2rem',
          maxWidth: result ? '1100px' : '620px',
          margin: '0 auto',
          transition: 'all 0.5s ease',
        }}>
          {/* Upload Area */}
          <div>
            {!imagePreview ? (
              <div
                className={`upload-zone${dragOver ? ' upload-zone--active' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="upload-zone__icon">
                  <Camera size={32} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--heading-color)' }}>
                    Drop your plant image here
                  </p>
                  <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
                    or click to browse • PNG, JPG, WebP
                  </p>
                </div>
                <div className="btn btn-primary">
                  <Upload size={16} /> Upload Image
                </div>
              </div>
            ) : (
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
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
                  {/* Close button */}
                  <button
                    onClick={reset}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      width: '2.2rem',
                      height: '2.2rem',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <X size={15} />
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
                        <Loader2 size={16} className="animate-spin" />
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
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(192, 57, 43, 0.08)',
                color: 'var(--destructive)',
                fontSize: '0.92rem',
                border: '1px solid rgba(192, 57, 43, 0.2)',
              }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Results Panel */}
          {result && (
            <div>
              <div style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
                padding: '2rem',
              }}>
                {/* Confidence Badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                }}>
                  <div className="badge badge-primary" style={{ fontSize: '0.8rem' }}>
                    <Leaf size={14} />
                    {result.ayushSystem || 'Ayurveda'}
                  </div>
                  <div style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '9999px',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}>
                    {result.confidence}% confidence
                  </div>
                </div>

                {/* Plant Name */}
                <h2 style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: 'var(--heading-color)',
                  marginBottom: '0.25rem',
                }}>
                  {result.commonName}
                </h2>
                <p style={{
                  fontStyle: 'italic',
                  color: 'var(--muted-text)',
                  fontSize: '0.95rem',
                  marginBottom: '0.5rem',
                }}>
                  {result.scientificName}
                </p>
                {result.family && (
                  <p style={{
                    color: 'var(--muted-text)',
                    fontSize: '0.85rem',
                    marginBottom: '1rem',
                  }}>
                    Family: {result.family}
                  </p>
                )}

                {/* Description */}
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--body-text)',
                  lineHeight: 1.65,
                  marginBottom: '1.5rem',
                  padding: '1.1rem',
                  background: 'var(--secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border)',
                }}>
                  {result.description}
                </p>

                {/* Medicinal Uses */}
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--muted-text)',
                  marginBottom: '0.75rem',
                }}>
                  Medicinal Uses
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {(result.medicinalUses || []).map((use, i) => (
                    <span key={i} style={{
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                    }}>
                      {use}
                    </span>
                  ))}
                </div>

                {/* Dosha Effect */}
                {result.doshaEffect && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--muted-text)',
                      marginBottom: '0.5rem',
                    }}>
                      Dosha Effect
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--body-text)' }}>
                      {result.doshaEffect}
                    </p>
                  </div>
                )}

                {/* Preparation */}
                {result.preparation && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--muted-text)',
                      marginBottom: '0.5rem',
                    }}>
                      Preparation
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--body-text)', lineHeight: 1.6 }}>
                      {result.preparation}
                    </p>
                  </div>
                )}

                {/* Precautions */}
                {result.precautions && (
                  <div style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(194, 125, 0, 0.08)',
                    border: '1px solid rgba(194, 125, 0, 0.2)',
                    marginBottom: '1.5rem',
                  }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--warning)', lineHeight: 1.5 }}>
                      ⚠️ <strong>Precautions:</strong> {result.precautions}
                    </p>
                  </div>
                )}

                {/* Fun Fact */}
                {result.funFact && (
                  <div style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--secondary)',
                    border: '1px solid var(--border)',
                  }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--body-text)' }}>
                      💡 <strong>Did you know?</strong> {result.funFact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="tip-grid">
          {[
            { emoji: '📸', title: 'Clear Photo', desc: 'Take a well-lit, focused photo of the plant' },
            { emoji: '🌿', title: 'Show Leaves', desc: 'Include leaves, flowers, or distinctive features' },
            { emoji: '📏', title: 'Close Up', desc: 'Get close enough to show plant details clearly' },
          ].map((tip, i) => (
            <div key={i} className="tip-card">
              <span className="tip-card__emoji">{tip.emoji}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--heading-color)' }}>
                  {tip.title}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-text)', marginTop: '0.25rem' }}>
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
