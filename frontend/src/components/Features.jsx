import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, BookOpen, Flower2, Pill, Brain, Users } from 'lucide-react';

const features = [
  {
    icon: <Scan size={28} />,
    emoji: "🔍",
    title: "AI Plant Scanner",
    description: "Upload or capture any plant image and our AI instantly identifies medicinal herbs, providing detailed AYUSH information.",
    link: "/scanner",
    color: "var(--primary)",
  },
  {
    icon: <Flower2 size={28} />,
    emoji: "🌿",
    title: "Virtual Garden",
    description: "Build and nurture your personal virtual herbal garden. Plant, grow, and track your collection of medicinal herbs.",
    link: "/garden",
    color: "150, 45%, 40%",
  },
  {
    icon: <BookOpen size={28} />,
    emoji: "📚",
    title: "Plant Encyclopedia",
    description: "Explore 500+ medicinal plants with detailed profiles, medicinal uses, preparations, and AYUSH system classifications.",
    link: "/encyclopedia",
    color: "210, 60%, 65%",
  },
  {
    icon: <Pill size={28} />,
    emoji: "💊",
    title: "Therapy Guide",
    description: "Get personalized herbal therapy recommendations based on your symptoms, constitution, and AYUSH treatment protocols.",
    link: "/therapy",
    color: "15, 85%, 65%",
  },
  {
    icon: <Brain size={28} />,
    emoji: "🧘",
    title: "Dosha Quiz",
    description: "Discover your Ayurvedic constitution through our interactive quiz. Get personalized diet and herb recommendations.",
    link: "/quiz",
    color: "42, 90%, 50%",
  },
  {
    icon: <Users size={28} />,
    emoji: "🌍",
    title: "AYUSH Wisdom",
    description: "Access knowledge from all five AYUSH systems: Ayurveda, Yoga, Unani, Siddha, and Homeopathy traditions.",
    link: "/encyclopedia",
    color: "270, 50%, 60%",
  },
];

function FeatureCard({ feature, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <Link to={feature.link} ref={ref} className="glass-card" style={{
      padding: '2rem',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1)`,
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow effect on hover */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: `hsl(${typeof feature.color === 'string' && feature.color.includes(',')
          ? feature.color : 'var(--primary)'} / 0.05)`,
        filter: 'blur(40px)',
        transition: 'var(--transition-smooth)',
      }} />

      <div style={{
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: 'var(--radius)',
        background: `hsl(${typeof feature.color === 'string' && feature.color.includes(',')
          ? feature.color : 'var(--primary)'} / 0.1)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
      }}>
        {feature.emoji}
      </div>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.3rem',
        fontWeight: 600,
        color: 'hsl(var(--foreground))',
      }}>
        {feature.title}
      </h3>

      <p style={{
        fontSize: '0.9rem',
        color: 'hsl(var(--muted-foreground))',
        lineHeight: 1.6,
        flex: 1,
      }}>
        {feature.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: 'hsl(var(--primary))',
      }}>
        Explore →
      </div>
    </Link>
  );
}

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>
            ✨ Features
          </div>
          <h2 className="section-title">
            Everything You Need for{' '}
            <span className="text-gradient">Herbal Wellness</span>
          </h2>
          <p className="section-subtitle">
            Powered by AI and rooted in 5,000 years of traditional AYUSH medicine,
            our platform brings ancient plant wisdom to your fingertips.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
