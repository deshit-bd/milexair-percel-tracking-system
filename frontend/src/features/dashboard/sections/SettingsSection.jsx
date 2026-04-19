import SectionHeader from '../components/SectionHeader';

export default function SettingsSection({ onToggle, settings }) {
  return (
    <>
      <SectionHeader title="Settings" subtitle="Adjust operational preferences used across the superadmin workspace." />
      <div className="workspace-grid settings-grid">
        {settings.map((setting) => (
          <article key={setting.id} className="workspace-card setting-card">
            <div>
              <h3>{setting.label}</h3>
              <p className="muted-text">Toggle this operational preference for the dashboard workspace.</p>
            </div>
            <button
              type="button"
              className={`toggle-switch${setting.enabled ? ' is-enabled' : ''}`}
              onClick={() => onToggle(setting.id)}
              aria-pressed={setting.enabled}
            >
              <span />
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
