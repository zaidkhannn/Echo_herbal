import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Sparkles, Microscope, HeartPulse } from 'lucide-react';
import Navbar from './components/Navbar';
import DashboardHub from './components/DashboardHub';
import Hero from './components/Hero';
import Features from './components/Features';
import PlantScanner from './components/PlantScanner';
import PrescriptionScanner from './components/PrescriptionScanner';
import PlantEncyclopedia from './components/PlantEncyclopedia';
import VirtualGarden from './components/VirtualGarden';
import TherapyRecommendations from './components/TherapyRecommendations';
import DoshaQuiz from './components/DoshaQuiz';
import Footer from './components/Footer';

function HomePage() {
  return (
    <>
      <Hero />
      <DashboardHub />
      <Features />
      <HomeStats />
      <HomeCTA />
    </>
  );
}

function HomeStats() {
  const stats = [
    { value: '500+', label: 'Medicinal Plants', icon: Leaf },
    { value: '5', label: 'AYUSH Systems', icon: Sparkles },
    { value: 'AI', label: 'Prescription OCR', icon: Microscope },
    { value: '50+', label: 'Therapy Guides', icon: HeartPulse },
  ];

  return (
    <section className="section" style={{ background: 'var(--gradient-garden)' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <div className="section-eyebrow">Platform at a glance</div>
          <h2 className="section-title">
            Trusted by <span className="text-gradient-soft">holistic health</span> explorers
          </h2>
        </div>
        <div className="stat-grid">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="stat-card">
                <span className="stat-card__icon">
                  <Icon size={22} strokeWidth={2.25} />
                </span>
                <div className="stat-card__value">{stat.value}</div>
                <div className="stat-card__label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner__orb cta-banner__orb--1" />
          <div className="cta-banner__orb cta-banner__orb--2" />

          <h2 className="font-display" style={{
            fontSize: '2.35rem',
            color: '#FFFFFF',
            marginBottom: '1rem',
            position: 'relative',
            zIndex: 1,
          }}>
            Start Your Evidence-Based Herbal Journey
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.18rem',
            maxWidth: '580px',
            margin: '0 auto 2.25rem',
            position: 'relative',
            zIndex: 1,
            lineHeight: 1.65,
          }}>
            Discover AYUSH wisdom backed by clinical AI. Scan doctor prescriptions,
            verify medicine details, and find reliable herbal alternatives.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
          }}>
            <Link to="/prescription" className="btn btn-primary btn-lg" style={{
              background: '#FFFFFF',
              color: '#1B7556',
              fontWeight: 800,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
            }}>
              📋 Scan Prescription
              <ArrowRight size={17} />
            </Link>
            <Link to="/scanner" className="btn btn-secondary btn-lg" style={{
              background: 'rgba(255, 255, 255, 0.12)',
              borderColor: 'rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              fontSize: '1.1rem',
              fontWeight: 700,
            }}>
              🌿 Plant Recognition
            </Link>
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
            <Route path="/prescription" element={<PrescriptionScanner />} />
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
