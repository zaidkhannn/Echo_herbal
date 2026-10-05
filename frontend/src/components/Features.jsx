import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, BookOpen, Flower2, Pill, Brain, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: <Pill size={22} />,
    title: "AI Prescription Scanner",
    description: "Upload prescriptions. Vision OCR extracts medicines, verifies therapeutic purpose, and retrieves evidence-backed herbal alternatives.",
    link: "/prescription",
    badge: "AI Powered",
  },
  {
    icon: <Scan size={22} />,
    title: "AI Plant Scanner",
    description: "Capture or upload plant photos for instant identification with detailed AYUSH medicinal properties and safety profiles.",
    link: "/scanner",
    badge: "Vision AI",
  },
  {
    icon: <Flower2 size={22} />,
    title: "Virtual Herbal Garden",
    description: "Build and care for your digital herb garden. Track growth, learn care guides, and expand your medicinal plant knowledge.",
    link: "/garden",
    badge: "Interactive",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Plant Encyclopedia",
    description: "Search 500+ medicinal plants with verified clinical uses, preparations, dosages, and AYUSH system classifications.",
    link: "/encyclopedia",
    badge: "500+ Plants",
  },
  {
    icon: <Pill size={22} />,
    title: "Therapy Guide",
    description: "Receive personalized herbal therapy recommendations tailored to your symptoms, dosha profile, and treatment goals.",
    link: "/therapy",
    badge: "Personalized",
  },
  {
    icon: <Brain size={22} />,
    title: "Dosha Assessment Quiz",
    description: "Identify your Vata, Pitta, and Kapha constitution through our clinical AYUSH questionnaire and diet planner.",
    link: "/quiz",
    badge: "AYUSH Quiz",
  },
];

function FeatureCard({ feature, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <Link to={feature.link} ref={ref} className="glass-card feature-card-link" style={{
      padding: '2rem',
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.1rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)`,
      cursor: 'pointer',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Top row: Icon + Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          width: '3.1rem',
          height: '3.1rem',
          borderRadius: '0.625rem',
          background: 'var(--primary-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
        }}>
          {feature.icon}
        </div>

        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--primary)',
          background: 'var(--secondary)',
          padding: '0.25rem 0.65rem',
          borderRadius: '9999px',
          border: '1px solid var(--border)',
        }}>
          {feature.badge}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.3rem',
        fontWeight: 800,
        color: 'var(--heading-color)',
        letterSpacing: '-0.01em',
      }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '1.02rem',
        color: 'var(--muted-text)',
        lineHeight: 1.65,
        flex: 1,
      }}>
        {feature.description}
      </p>

      {/* Link */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontSize: '0.92rem',
        fontWeight: 700,
        color: 'var(--primary)',
      }}>
        Explore feature
        <ArrowUpRight size={15} />
      </div>
    </Link>
  );
}

export default function Features() {
  return (
    <section className="section" id="features" style={{
      background: 'var(--bg-primary)',
    }}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-ai" style={{ marginBottom: '0.85rem' }}>
            ✨ AI &amp; AYUSH Features
          </div>
          <div className="section-eyebrow">Explore tools</div>
          <h2 className="section-title">
            Evidence-Based Wellness Powered by{' '}
            <span className="text-gradient">Clinical AI</span>
          </h2>
          <p className="section-subtitle">
            Combines traditional AYUSH knowledge systems with modern artificial intelligence
            to deliver verified, safe, and actionable herbal medicine insights.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
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
