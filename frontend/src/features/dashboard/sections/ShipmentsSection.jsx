import { useState } from 'react';

import Icon from '../components/Icon';
import { shipmentSeed } from '../data/dashboardData';
import { formatAmount, formatTitleCase } from '../utils/formatters';

const shipmentCreationTabs = ['Sender', 'Receiver', 'Package', 'Service'];

export default function ShipmentsSection({
  filteredShipments,
  selectedShipmentId,
  onExport,
  onFilterChange,
  onServiceFilterChange,
  onScopeFilterChange,
  onSearchChange,
  onSelectShipment,
  onTrackingOpen,
  onPrint,
  shipmentFilter,
  shipmentScopeFilter,
  shipmentSearch,
  shipmentServiceFilter,
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCreateStep, setActiveCreateStep] = useState('Sender');

  return (
    <>
      {showCreateModal ? (
        <div className="shipment-create-modal-overlay" role="dialog" aria-modal="true" aria-label="Create new shipment">
          <article className="shipment-create-modal-card">
            <div className="shipment-create-modal-head">
              <strong>Create New Shipment</strong>
              <button type="button" className="shipment-create-modal-close" onClick={() => setShowCreateModal(false)} aria-label="Close modal">
                x
              </button>
            </div>

            <div className="shipment-create-modal-tabs" role="radiogroup" aria-label="Shipment creation steps">
              {shipmentCreationTabs.map((tab) => (
                <label key={tab} className={`shipment-create-modal-tab${activeCreateStep === tab ? ' is-active' : ''}`}>
                  <input
                    type="radio"
                    name="shipment-create-step"
                    value={tab}
                    checked={activeCreateStep === tab}
                    onChange={() => setActiveCreateStep(tab)}
                  />
                  <span>{tab}</span>
                </label>
              ))}
            </div>

            <p className="shipment-create-modal-copy">
              Complete shipment creation form with sender details, receiver details, package information, and service selection would be
              implemented here.
            </p>

            <div className="shipment-create-modal-divider" />

            <button type="button" className="shipment-create-submit-button">
              Create Shipment
            </button>
          </article>
        </div>
      ) : null}

      <section className="shipment-management-card">
        <div className="shipment-management-head">
          <div>
            <h2>Shipment Management</h2>
            <p>Manage and track all shipments</p>
          </div>
          <button type="button" className="primary-button compact-button" onClick={() => setShowCreateModal(true)}>
            + Create Shipment
          </button>
        </div>

        <div className="shipment-management-toolbar">
          <input
            className="toolbar-input shipment-search-input"
            type="text"
            value={shipmentSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by tracking number, sender, receiver..."
          />

          <div className="shipment-select-row">
            <select className="shipment-select" value={shipmentFilter} onChange={(event) => onFilterChange(event.target.value)}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="customs clearance">Customs Clearance</option>
              <option value="sorting">Sorting</option>
              <option value="hub">Hub</option>
            </select>

            <select className="shipment-select" value={shipmentServiceFilter} onChange={(event) => onServiceFilterChange(event.target.value)}>
              <option value="all">All Services</option>
              <option value="express">Express</option>
              <option value="standard">Standard</option>
              <option value="economy">Economy</option>
              <option value="overnight">Overnight</option>
            </select>

            <select className="shipment-select" value={shipmentScopeFilter} onChange={(event) => onScopeFilterChange(event.target.value)}>
              <option value="all">All Types</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>

        <article className="shipment-management-table-card">
          <div className="shipment-management-table">
            <div className="shipment-management-header" aria-hidden="true">
              <span>Tracking Info</span>
              <span>Sender/Receiver</span>
              <span>Service</span>
              <span>Status</span>
              <span>Amount</span>
              <span>Actions</span>
            </div>

            <div className="shipment-management-body">
              {filteredShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className={`shipment-management-row${selectedShipmentId === shipment.id ? ' is-selected' : ''}`}
                  onClick={() => onSelectShipment(shipment.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onSelectShipment(shipment.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="shipment-management-track">
                    <span className="shipment-management-track-icon" aria-hidden="true">
                      <Icon name="cube" className="shipment-management-inline-icon" />
                    </span>
                    <div className="shipment-management-info">
                      <strong>
                        {shipment.id}
                        {shipment.international ? <Icon name="globe-small" className="shipment-globe" /> : null}
                      </strong>
                      <span className="shipment-management-subid">{shipment.id}</span>
                      <small>
                        <Icon name="calendar" className="shipment-management-meta-icon" />
                        {shipment.createdAt}
                      </small>
                    </div>
                  </div>

                  <div className="shipment-management-contact">
                    <div className="shipment-management-party">
                      <strong>{shipment.senderName}</strong>
                      <span>{shipment.senderCity}</span>
                    </div>
                    <small>
                      <Icon name="pin" className="shipment-management-meta-icon" />
                      {shipment.receiverName}
                    </small>
                    <span>{shipment.receiverCity}</span>
                  </div>

                  <div className="shipment-management-service">
                    <span className="shipment-service-badge shipment-service-badge-dark">{shipment.scope}</span>
                    <small>{formatTitleCase(shipment.service)}</small>
                    <span>{shipment.weightKg} kg</span>
                  </div>

                  <div className="shipment-management-status">
                    <span className={`shipment-status tone-${shipment.tone}`}>{shipment.status}</span>
                    <small>{shipment.branch}</small>
                  </div>

                  <div className="shipment-management-amount">
                    <strong>{formatAmount(shipment.amount)}</strong>
                    <small>{shipment.codAmount ? `COD: ${formatAmount(shipment.codAmount)}` : ' '}</small>
                  </div>

                  <div className="shipment-management-actions">
                    <button
                      type="button"
                      className="icon-action-button icon-only-action-button"
                      aria-label={`View ${shipment.id}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onTrackingOpen(shipment.id);
                      }}
                    >
                      <Icon name="eye" className="shipment-management-action-icon" />
                    </button>
                    <button
                      type="button"
                      className="icon-action-button icon-only-action-button"
                      aria-label={`Print ${shipment.id}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onPrint(shipment.id);
                      }}
                    >
                      <Icon name="print" className="shipment-management-action-icon" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredShipments.length === 0 ? <p className="empty-state shipment-empty-state">No shipments match the current filters.</p> : null}
            </div>
          </div>

          <div className="shipment-management-footer">
            <span>
              Showing {filteredShipments.length} of {shipmentSeed.length} total shipments
            </span>
            <button type="button" className="secondary-button compact-button" onClick={onExport}>
              Export
            </button>
          </div>
        </article>
      </section>
    </>
  );
}
