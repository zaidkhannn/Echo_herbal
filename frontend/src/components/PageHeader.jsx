/**
 * Consistent hero header for tool pages.
 */
export default function PageHeader({ eyebrow, badge, title, subtitle, children }) {
  return (
    <div className="page-header section-header">
      {badge ?? (eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null)}
      {children ?? (
        <h1 className="page-header__title font-display">{title}</h1>
      )}
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}
