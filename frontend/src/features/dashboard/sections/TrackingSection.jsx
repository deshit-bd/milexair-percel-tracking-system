import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';

export default function TrackingSection({ onTrack, onTrackingQueryChange, trackingQuery, trackingSearched, trackingShipment }) {
  return (
    <>
      <SectionHeader title="Track Shipment" subtitle="Enter your tracking number to get real-time updates" />

      <div className="workspace-grid">
        <article className="tracking-workspace workspace-wide">
          <div className="tracking-search-card">
            <div className="tracking-search-shell">
              <Icon name="search" className="tracking-search-icon" />
              <input
                className="tracking-search-input"
                type="text"
                value={trackingQuery}
                onChange={(event) => onTrackingQueryChange(event.target.value)}
                placeholder="Enter tracking number (e.g., CN1234567890)"
              />
            </div>
            <button type="button" className="primary-button tracking-search-button" onClick={onTrack}>
              <Icon name="search" className="tracking-button-icon" />
              Track
            </button>
          </div>

          {trackingSearched && trackingShipment ? (
            <div className="tracking-panel">
              <div className="tracking-summary">
                <div>
                  <span className="detail-label">Shipment</span>
                  <strong>{trackingShipment.id}</strong>
                </div>
                <div>
                  <span className="detail-label">Status</span>
                  <strong>{trackingShipment.status}</strong>
                </div>
                <div>
                  <span className="detail-label">ETA</span>
                  <strong>{trackingShipment.eta}</strong>
                </div>
                <div>
                  <span className="detail-label">Customer</span>
                  <strong>{trackingShipment.customer}</strong>
                </div>
              </div>

              <div className="timeline-list tracking-timeline">
                {trackingShipment.timeline.map((step, index) => (
                  <div key={step} className="timeline-item">
                    <span className="timeline-dot" />
                    <div>
                      <strong>{step}</strong>
                      <span>{index === trackingShipment.timeline.length - 1 ? 'Current stage' : 'Completed'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : trackingSearched ? (
            <p className="empty-state">No shipment found for that tracking ID.</p>
          ) : null}
        </article>
      </div>
    </>
  );
}
