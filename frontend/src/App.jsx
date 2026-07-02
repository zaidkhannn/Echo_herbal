import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PlantScanner from './components/PlantScanner';
import PlantEncyclopedia from './components/PlantEncyclopedia';
import VirtualGarden from './components/VirtualGarden';
import TherapyRecommendations from './components/TherapyRecommendations';
import DoshaQuiz from './components/DoshaQuiz';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HomeStats />
      <HomeCTA />
    </>
  );
}

function HomeStats() {
  const stats = [
    { value: "500+", label: "Medicinal Plants", emoji: "🌿" },
    { value: "5", label: "AYUSH Systems", emoji: "🕉️" },
    { value: "AI", label: "Powered Scanner", emoji: "🤖" },
    { value: "50+", label: "Therapy Guides", emoji: "💊" },
  ];

  return (
    <section className="section" style={{ background: 'var(--gradient-garden)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.emoji}</div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                background: 'var(--gradient-herbal)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{stat.value}</div>
              <div style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        <div className="glass-card" style={{
          padding: '4rem 2rem',
          background: 'var(--gradient-herbal)',
          border: 'none',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: 'white',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1
          }}>
            Start Your Herbal Wellness Journey
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            position: 'relative',
            zIndex: 1
          }}>
            Discover the ancient wisdom of AYUSH medicine combined with modern AI technology.
            Scan plants, build your garden, and find personalized remedies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <a href="/scanner" className="btn btn-lg" style={{
              background: 'white',
              color: 'hsl(var(--primary))',
              fontWeight: 700
            }}>
              🔍 Try AI Scanner
            </a>
            <a href="/quiz" className="btn btn-lg" style={{
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(8px)'
            }}>
              🧘 Take Dosha Quiz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('echovedai-theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('echovedai-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scanner" element={<PlantScanner />} />
            <Route path="/encyclopedia" element={<PlantEncyclopedia />} />
            <Route path="/garden" element={<VirtualGarden />} />
            <Route path="/therapy" element={<TherapyRecommendations />} />
            <Route path="/quiz" element={<DoshaQuiz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
