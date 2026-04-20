import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';
import { formatManifestLabel, getManifestTone } from '../utils/formatters';

export default function ManifestSection({
  filteredManifests,
  manifestFilter,
  manifestSearch,
  onCreate,
  onFilterChange,
  onSearchChange,
  onToggleStatus,
  onView,
}) {
  return (
    <>
      <SectionHeader
        title="Manifest Management"
        subtitle="Create and manage shipment manifests"
        action={
          <button type="button" className="primary-button compact-button" onClick={onCreate}>
            <Icon name="plus" className="manifest-button-icon" />
            Create Manifest
          </button>
        }
      />
      <section className="manifest-management-card">
        <div className="manifest-toolbar">
          <div className="manifest-search-shell">
            <Icon name="search" className="manifest-search-icon" />
            <input
              className="manifest-search-input"
              type="text"
              value={manifestSearch}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by manifest number or branch..."
            />
          </div>

          <select className="shipment-select manifest-select" value={manifestFilter} onChange={(event) => onFilterChange(event.target.value)}>
            <option value="all">All Status</option>
            <option value="received">Received</option>
            <option value="in_transit">In Transit</option>
            <option value="created">Created</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </section>

      <div className="workspace-grid manifest-grid">
        {filteredManifests.map((manifest) => {
          const progress = manifest.total ? (manifest.scanned / manifest.total) * 100 : 0;

          return (
            <article key={manifest.id} className="manifest-card">
              <div className="manifest-card-head">
                <div className="manifest-card-title">
                  <span className="manifest-card-icon" aria-hidden="true">
                    <Icon name="layers" className="manifest-card-icon-svg" />
                  </span>
                  <div>
                    <div className="manifest-card-topline">
                      <h3>{manifest.id}</h3>
                      <span className={`shipment-status tone-${getManifestTone(manifest.status)}`}>{formatManifestLabel(manifest.status)}</span>
                    </div>
                    <p className="muted-text manifest-card-subtitle">{manifest.manifestType}</p>
                  </div>
                </div>
              </div>

              <div className="manifest-route-list">
                <div className="manifest-route-item">
                  <Icon name="truck" className="manifest-route-icon" />
                  <span>
                    From: <strong>{manifest.fromBranch}</strong>
                  </span>
                </div>
                <div className="manifest-route-item">
                  <Icon name="truck" className="manifest-route-icon" />
                  <span>
                    To: <strong>{manifest.toBranch}</strong>
                  </span>
                </div>
              </div>

              <div className="manifest-progress-block">
                <div className="manifest-progress-head">
                  <span>Scanned</span>
                  <strong>
                    {manifest.scanned} / {manifest.total}
                  </strong>
                </div>
                <div className="manifest-progress-track" aria-hidden="true">
                  <span className="manifest-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <p className="manifest-meta-note">
                Vehicle: {manifest.vehicle} • Driver: {manifest.driverLabel}
              </p>

              <div className="manifest-card-actions">
                <button type="button" className="secondary-button manifest-view-button" onClick={() => onView(manifest.id)}>
                  <Icon name="eye" className="manifest-action-icon" />
                  View
                </button>
                <button
                  type="button"
                  className="icon-action-button manifest-toggle-button"
                  aria-label={`Update ${manifest.id}`}
                  onClick={() => onToggleStatus(manifest.id)}
                >
                  <Icon name="check" className="manifest-action-icon" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
