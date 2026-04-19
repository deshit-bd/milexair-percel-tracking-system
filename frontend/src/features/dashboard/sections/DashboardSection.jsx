import Icon from '../components/Icon';
import { statCards, statusItems, serviceItems, shipmentSeed, trendDates, trendPoints } from '../data/dashboardData';
import { formatAmount } from '../utils/formatters';

export default function DashboardSection({
  hoveredStatus,
  pieSlices,
  setHoveredStatus,
  onCardAction,
  onStatusFilter,
  onServiceFilter,
  onShipmentOpen,
}) {
  const trendPolyline = trendPoints
    .map((point, index) => `${40 + index * 63},${190 - (point / 8) * 150}`)
    .join(' ');

  return (
    <>
      <div className="dashboard-intro">
        <h1>Welcome back, Super Admin!</h1>
        <p>Here&apos;s what&apos;s happening with your logistics operations today.</p>
      </div>

      <section className="stats-grid">
        {statCards.map((card) => (
          <button key={card.label} type="button" className="stat-card stat-card-button" onClick={() => onCardAction(card)}>
            <div className="stat-header">
              <span className="stat-label">{card.label}</span>
              <Icon name={card.icon} className={`card-icon tone-${card.tone}`} />
            </div>
            <strong className="stat-value">{card.value}</strong>
            <span className={`stat-note tone-${card.tone}`}>{card.note}</span>
          </button>
        ))}
      </section>

      <section className="analytics-grid">
        <article className="analytics-card">
          <h2>Shipments Trend (Last 7 Days)</h2>
          <div className="trend-chart">
            <div className="trend-grid" />
            <svg viewBox="0 0 430 220" preserveAspectRatio="none" className="trend-svg" aria-hidden="true">
              <polyline
                points={trendPolyline}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {trendPoints.map((point, index) => (
                <circle
                  key={`${trendDates[index]}-${point}`}
                  cx={40 + index * 63}
                  cy={190 - (point / 8) * 150}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="y-axis-labels" aria-hidden="true">
              <span>8</span>
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>
            <div className="x-axis-labels">
              {trendDates.map((date) => (
                <span key={date || 'blank'}>{date}</span>
              ))}
            </div>
            <div className="trend-legend">
              <span className="legend-line" />
              <span>shipments</span>
            </div>
          </div>
        </article>

        <article className="analytics-card">
          <h2>Shipment Status Distribution</h2>
          <div className="status-card-body">
            <div className="status-pie-wrapper">
              <svg viewBox="0 0 144 144" className="status-pie" aria-label="Shipment status distribution">
                {pieSlices.map((item) => (
                  <path
                    key={item.label}
                    d={item.path}
                    fill={item.color}
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="status-slice"
                    onMouseEnter={() => setHoveredStatus(item)}
                    onMouseLeave={() => setHoveredStatus(null)}
                  />
                ))}
              </svg>
              {hoveredStatus ? (
                <div
                  className="status-tooltip"
                  style={{
                    left: `${hoveredStatus.tooltipX + 48}px`,
                    top: `${hoveredStatus.tooltipY + 30}px`,
                  }}
                >
                  {hoveredStatus.label} : {hoveredStatus.count}
                </div>
              ) : null}
            </div>

            <div className="status-labels">
              {statusItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`status-label-item status-label-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ color: item.color }}
                  onClick={() => onStatusFilter(item.label.toLowerCase())}
                >
                  {item.label}: {item.value}
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="analytics-grid analytics-grid-secondary">
        <article className="analytics-card">
          <h2>Service Type Distribution</h2>
          <div className="service-chart">
            <div className="service-grid" />
            <div className="service-bars" aria-hidden="true">
              {serviceItems.map((item) => (
                <button key={item.label} type="button" className="service-bar-group service-button" onClick={() => onServiceFilter(item.label)}>
                  <div className={`service-bar-shell${item.highlighted ? ' is-highlighted' : ''}`}>
                    <div className="service-bar-fill" style={{ height: `${(item.value / 60) * 100}%` }} />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <div className="service-y-axis" aria-hidden="true">
              <span>60</span>
              <span>45</span>
              <span>30</span>
              <span>15</span>
              <span>0</span>
            </div>
            <div className="service-legend">
              <span className="service-legend-box" />
              <span>value</span>
            </div>
          </div>
        </article>

        <article className="analytics-card">
          <h2>Recent Shipments</h2>
          <div className="shipment-list">
            {shipmentSeed.slice(0, 5).map((shipment) => (
              <button key={shipment.id} type="button" className="shipment-row shipment-button" onClick={() => onShipmentOpen(shipment.id)}>
                <div className="shipment-copy">
                  <strong>
                    {shipment.id}
                    {shipment.international ? <Icon name="globe-small" className="shipment-globe" /> : null}
                  </strong>
                  <span>{shipment.city}</span>
                </div>

                <div className="shipment-meta">
                  <span className={`shipment-status tone-${shipment.tone}`}>{shipment.status}</span>
                  <span className="shipment-amount">{formatAmount(shipment.amount)}</span>
                </div>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="performance-card">
        <h2>Performance Metrics</h2>
        <div className="performance-grid">
          <div className="performance-item">
            <div className="performance-head">
              <span>Delivery Success Rate</span>
              <strong>98%</strong>
            </div>
            <div className="performance-track">
              <span className="performance-fill performance-fill-dark" style={{ width: '98%' }} />
            </div>
          </div>
          <div className="performance-item">
            <div className="performance-head">
              <span>On-Time Delivery</span>
              <strong>95%</strong>
            </div>
            <div className="performance-track">
              <span className="performance-fill performance-fill-gray" style={{ width: '95%' }} />
            </div>
          </div>
          <div className="performance-item">
            <div className="performance-head">
              <span>Customer Satisfaction</span>
              <strong>96%</strong>
            </div>
            <div className="performance-track">
              <span className="performance-fill performance-fill-dark" style={{ width: '96%' }} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
