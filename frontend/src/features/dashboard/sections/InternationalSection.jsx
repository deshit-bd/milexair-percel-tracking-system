import { useMemo, useState } from 'react';
import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';

function getStatusTone(status) {
  switch (status) {
    case 'delivered':
      return 'green';
    case 'booked':
      return 'slate';
    case 'in transit':
      return 'indigo';
    case 'customs clearance':
      return 'rose';
    case 'kyc pending':
      return 'amber-soft';
    case 'air cargo':
      return 'purple';
    default:
      return 'amber-soft';
  }
}

function getKycTone(status) {
  return status === 'Verified' ? 'dark' : 'soft';
}

function getCustomsTone(status) {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'green';
    case 'submitted':
      return 'indigo';
    case 'cleared':
      return 'blue';
    default:
      return 'soft';
  }
}

export default function InternationalSection({ internationalShipments, onAction, onView }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredShipments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return internationalShipments.filter((shipment) => {
      const matchesStatus = statusFilter === 'all' ? true : shipment.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        shipment.id.toLowerCase().includes(normalizedQuery) ||
        shipment.senderName.toLowerCase().includes(normalizedQuery) ||
        shipment.receiverName.toLowerCase().includes(normalizedQuery) ||
        shipment.fromCountry.toLowerCase().includes(normalizedQuery) ||
        shipment.toCountry.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [internationalShipments, query, statusFilter]);

  const kycPendingCount = internationalShipments.filter((shipment) => shipment.status === 'kyc pending').length;
  const customsCount = internationalShipments.filter((shipment) => shipment.status === 'customs clearance').length;
  const airCargoCount = internationalShipments.filter((shipment) => shipment.status === 'air cargo').length;

  return (
    <>
      <SectionHeader title="International Shipments" subtitle="Manage international shipments, KYC, and customs clearance" />

      <section className="international-stats-grid">
        <article className="international-stat-card">
          <div className="international-stat-head">
            <span>Total International</span>
            <Icon name="plane" className="card-icon tone-blue" />
          </div>
          <strong>{internationalShipments.length}</strong>
        </article>
        <article className="international-stat-card">
          <div className="international-stat-head">
            <span>KYC Pending</span>
            <Icon name="alert" className="card-icon tone-orange-dark" />
          </div>
          <strong>{kycPendingCount}</strong>
        </article>
        <article className="international-stat-card">
          <div className="international-stat-head">
            <span>Customs Clearance</span>
            <Icon name="receipt" className="card-icon tone-red" />
          </div>
          <strong>{customsCount}</strong>
        </article>
        <article className="international-stat-card">
          <div className="international-stat-head">
            <span>In Air Cargo</span>
            <Icon name="plane" className="card-icon tone-purple" />
          </div>
          <strong>{airCargoCount}</strong>
        </article>
      </section>

      <section className="international-toolbar-card">
        <div className="international-toolbar">
          <div className="international-search-shell">
            <Icon name="search" className="international-search-icon" />
            <input
              className="international-search-input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by tracking number or receiver..."
            />
          </div>

          <select className="shipment-select international-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="booked">Booked</option>
            <option value="in transit">In Transit</option>
            <option value="customs clearance">Customs Clearance</option>
            <option value="kyc pending">KYC Pending</option>
            <option value="air cargo">Air Cargo</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </section>

      <section className="international-table-card">
        <div className="international-table">
          <div className="international-table-header" aria-hidden="true">
            <span>Tracking Number</span>
            <span>Sender/Receiver</span>
            <span>Countries</span>
            <span>Status</span>
            <span>KYC</span>
            <span>Customs</span>
            <span>Actions</span>
          </div>

          <div className="international-table-body">
            {filteredShipments.map((shipment) => (
              <div key={shipment.id} className="international-table-row">
                <div className="international-cell international-tracking-cell">
                  <Icon name="plane" className="international-row-icon" />
                  <div>
                    <strong>{shipment.id}</strong>
                    <span>{shipment.createdAt}</span>
                  </div>
                </div>

                <div className="international-cell">
                  <strong>{shipment.senderName}</strong>
                  <span>→ {shipment.receiverName}</span>
                </div>

                <div className="international-cell">
                  <strong>{shipment.fromCountry}</strong>
                  <span>→ {shipment.toCountry}</span>
                </div>

                <div className="international-cell">
                  <span className={`shipment-status tone-${getStatusTone(shipment.status)}`}>{shipment.status}</span>
                </div>

                <div className="international-cell">
                  <span className={`international-pill international-pill-${getKycTone(shipment.kycStatus)}`}>{shipment.kycStatus}</span>
                </div>

                <div className="international-cell">
                  <span className={`international-pill international-pill-${getCustomsTone(shipment.customsStatus)}`}>{shipment.customsStatus}</span>
                </div>

                <div className="international-actions">
                  {shipment.actionLabel ? (
                    <button type="button" className="secondary-button compact-button international-action-button" onClick={() => onAction(shipment.id, shipment.actionLabel)}>
                      {shipment.actionLabel}
                    </button>
                  ) : null}
                  <button type="button" className="icon-action-button icon-only-action-button" aria-label={`View ${shipment.id}`} onClick={() => onView(shipment.id)}>
                    <Icon name="eye" className="shipment-management-action-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
