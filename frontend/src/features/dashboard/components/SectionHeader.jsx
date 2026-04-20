export default function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="dashboard-intro section-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action ? <div className="section-header-action">{action}</div> : null}
    </div>
  );
}
