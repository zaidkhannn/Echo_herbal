import { Link } from 'react-router-dom';
import {
  FileText,
  Scan,
  Flower2,
  BookOpen,
  Pill,
  Brain,
  ArrowUpRight,
  LayoutDashboard,
} from 'lucide-react';

const quickLinks = [
  {
    to: '/prescription',
    icon: FileText,
    title: 'Prescription scan',
    desc: 'OCR medicines & herbal alternatives',
  },
  {
    to: '/scanner',
    icon: Scan,
    title: 'Plant scanner',
    desc: 'Identify herbs with vision AI',
  },
  {
    to: '/encyclopedia',
    icon: BookOpen,
    title: 'Encyclopedia',
    desc: 'Browse 500+ medicinal plants',
  },
  {
    to: '/garden',
    icon: Flower2,
    title: 'Virtual garden',
    desc: 'Grow & track your herb collection',
  },
  {
    to: '/therapy',
    icon: Pill,
    title: 'Therapy guide',
    desc: 'Personalized AYUSH recommendations',
  },
  {
    to: '/quiz',
    icon: Brain,
    title: 'Dosha quiz',
    desc: 'Discover your constitution',
  },
];

export default function DashboardHub() {
  return (
    <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="dashboard-panel">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.25rem',
            marginBottom: '1.75rem',
            position: 'relative',
            zIndex: 1,
          }}>
            <div>
              <div className="section-eyebrow">
                <LayoutDashboard size={14} strokeWidth={2.5} aria-hidden />
                Wellness dashboard
              </div>
              <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.35rem', textAlign: 'left' }}>
                Your <span className="text-gradient">AYUSH</span> command center
              </h2>
              <p className="section-subtitle" style={{ textAlign: 'left', margin: 0, maxWidth: '520px' }}>
                Jump into scans, research, and personalized wellness tools — everything in one calm workspace.
              </p>
            </div>
            <Link to="/prescription" className="btn btn-primary" style={{ borderRadius: '9999px' }}>
              Start with Rx scan
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="quick-link-grid">
            {quickLinks.map(({ to, icon: Icon, title, desc }) => (
              <Link key={to} to={to} className="quick-link">
                <span className="quick-link__icon">
                  <Icon size={20} strokeWidth={2.25} />
                </span>
                <span>
                  <div className="quick-link__title">{title}</div>
                  <div className="quick-link__desc">{desc}</div>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
