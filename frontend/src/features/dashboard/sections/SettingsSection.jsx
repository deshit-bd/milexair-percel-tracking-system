import { useState } from 'react';

import Icon from '../components/Icon';

const settingsTabs = ['General', 'Rates & Zones', 'Branches', 'Users'];
const deliveryZones = [
  {
    id: 'zone-a',
    title: 'Zone A - Local',
    coverage: ['New York', 'New Jersey', 'Connecticut'],
    rates: [
      { serviceType: 'Express', baseRate: '$12.00', minimumCharge: '$50.00' },
      { serviceType: 'Standard', baseRate: '$8.00', minimumCharge: '$30.00' },
      { serviceType: 'Economy', baseRate: '$5.00', minimumCharge: '$20.00' },
      { serviceType: 'Overnight', baseRate: '$20.00', minimumCharge: '$80.00' },
    ],
  },
  {
    id: 'zone-b',
    title: 'Zone B - Regional',
    coverage: ['Pennsylvania', 'Delaware', 'Maryland', 'Virginia'],
    rates: [
      { serviceType: 'Express', baseRate: '$15.00', minimumCharge: '$60.00' },
      { serviceType: 'Standard', baseRate: '$10.00', minimumCharge: '$40.00' },
      { serviceType: 'Economy', baseRate: '$7.00', minimumCharge: '$25.00' },
      { serviceType: 'Overnight', baseRate: '$25.00', minimumCharge: '$100.00' },
    ],
  },
  {
    id: 'zone-c',
    title: 'Zone C - National',
    coverage: ['California', 'Texas', 'Florida', 'Illinois', 'Ohio'],
    rates: [
      { serviceType: 'Express', baseRate: '$20.00', minimumCharge: '$80.00' },
      { serviceType: 'Standard', baseRate: '$15.00', minimumCharge: '$50.00' },
      { serviceType: 'Economy', baseRate: '$10.00', minimumCharge: '$30.00' },
      { serviceType: 'Overnight', baseRate: '$35.00', minimumCharge: '$120.00' },
    ],
  },
  {
    id: 'international',
    title: 'International',
    coverage: [],
    rates: [
      { serviceType: 'Express', baseRate: '$50.00', minimumCharge: '$200.00' },
      { serviceType: 'Standard', baseRate: '$35.00', minimumCharge: '$150.00' },
      { serviceType: 'Economy', baseRate: '$25.00', minimumCharge: '$100.00' },
      { serviceType: 'Overnight', baseRate: '$75.00', minimumCharge: '$300.00' },
    ],
  },
];
const branchRows = [
  {
    code: 'HQ',
    name: 'Headquarters',
    type: 'hub',
    locationCity: 'New York, New York',
    locationCountry: 'USA',
    contactName: 'James Wilson',
    contactPhone: '+1-555-0000',
    status: 'Active',
  },
  {
    code: 'MB',
    name: 'Main Branch',
    type: 'branch',
    locationCity: 'New York, New York',
    locationCountry: 'USA',
    contactName: 'Lisa Manager',
    contactPhone: '+1-555-0001',
    status: 'Active',
  },
  {
    code: 'NB',
    name: 'North Branch',
    type: 'branch',
    locationCity: 'Chicago, Illinois',
    locationCountry: 'USA',
    contactName: 'Robert North',
    contactPhone: '+1-555-0002',
    status: 'Active',
  },
  {
    code: 'SB',
    name: 'South Branch',
    type: 'branch',
    locationCity: 'Houston, Texas',
    locationCountry: 'USA',
    contactName: 'Maria South',
    contactPhone: '+1-555-0003',
    status: 'Active',
  },
  {
    code: 'EB',
    name: 'East Branch',
    type: 'franchise',
    locationCity: 'Philadelphia, Pennsylvania',
    locationCountry: 'USA',
    contactName: 'David East',
    contactPhone: '+1-555-0004',
    status: 'Active',
  },
];
const userRows = [
  { initials: 'SA', name: 'Super Admin', email: 'superadmin@parcel.com', role: 'Super Admin', status: 'Active' },
  { initials: 'SA', name: 'System Admin', email: 'admin@parcel.com', role: 'Admin', status: 'Active' },
  { initials: 'JS', name: 'John Sales', email: 'sales@parcel.com', role: 'Sales Executive', status: 'Active' },
  { initials: 'SO', name: 'Sarah Operations', email: 'operations@parcel.com', role: 'Operation Officer', status: 'Active' },
  { initials: 'MA', name: 'Mike Accounts', email: 'accounts@parcel.com', role: 'Accounts Officer', status: 'Active' },
  { initials: 'LM', name: 'Lisa Manager', email: 'manager@parcel.com', role: 'Branch Manager', status: 'Active' },
];

export default function SettingsSection({ onToggle, settings }) {
  const [activeTab, setActiveTab] = useState('General');
  const [vatPercentage, setVatPercentage] = useState('15');
  const [fuelSurcharge, setFuelSurcharge] = useState('10');
  const [codEnabled, setCodEnabled] = useState(true);

  const getSettingEnabled = (id, fallback = false) => settings.find((setting) => setting.id === id)?.enabled ?? fallback;

  const generalToggles = [
    {
      id: 'cod_service',
      label: 'COD Service',
      description: 'Enable Cash on Delivery service',
      enabled: codEnabled,
      onToggle: () => setCodEnabled((current) => !current),
    },
    {
      id: 'auto_manifest',
      label: 'Auto Invoice Generation',
      description: 'Automatically generate invoices for delivered shipments',
      enabled: getSettingEnabled('auto_manifest', true),
      onToggle: () => onToggle('auto_manifest'),
    },
    {
      id: 'sms_alerts',
      label: 'SMS Notifications',
      description: 'Send SMS updates to customers',
      enabled: getSettingEnabled('sms_alerts', true),
      onToggle: () => onToggle('sms_alerts'),
    },
    {
      id: 'email_alerts',
      label: 'Email Notifications',
      description: 'Send email updates to customers',
      enabled: getSettingEnabled('email_alerts', true),
      onToggle: () => onToggle('email_alerts'),
    },
  ];

  return (
    <>
      <div className="settings-hero">
        <div className="settings-hero-copy">
          <h1>System Settings</h1>
          <p>Configure system parameters and preferences</p>
        </div>

        <div className="settings-tabs-wrap" role="tablist" aria-label="Settings categories">
          {settingsTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`settings-tab${activeTab === tab ? ' is-active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'General' ? (
        <article className="workspace-card settings-panel-card">
          <div className="settings-panel-head">
            <h3>Financial Configuration</h3>
            <p>Configure VAT, fuel surcharge, and other financial parameters</p>
          </div>

          <div className="settings-financial-grid">
            <label className="settings-field">
              <span>VAT Percentage (%)</span>
              <div className="settings-input-shell">
                <span>%</span>
                <input type="text" value={vatPercentage} onChange={(event) => setVatPercentage(event.target.value)} />
              </div>
            </label>

            <label className="settings-field">
              <span>Fuel Surcharge (%)</span>
              <div className="settings-input-shell">
                <span>%</span>
                <input type="text" value={fuelSurcharge} onChange={(event) => setFuelSurcharge(event.target.value)} />
              </div>
            </label>
          </div>

          <div className="settings-toggle-list">
            {generalToggles.map((setting) => (
              <article key={setting.id} className="settings-toggle-card">
                <div>
                  <h4>{setting.label}</h4>
                  <p>{setting.description}</p>
                </div>
                <button
                  type="button"
                  className={`toggle-switch${setting.enabled ? ' is-enabled' : ''}`}
                  onClick={setting.onToggle}
                  aria-pressed={setting.enabled}
                >
                  <span />
                </button>
              </article>
            ))}
          </div>

          <button type="button" className="settings-save-button">
            <Icon name="file-text" className="settings-save-button-icon" />
            <span>Save Settings</span>
          </button>
        </article>
      ) : activeTab === 'Rates & Zones' ? (
        <article className="workspace-card settings-panel-card">
          <div className="settings-rates-header">
            <div className="settings-panel-head">
              <h3>Delivery Zones & Rates</h3>
              <p>Manage delivery zones and pricing</p>
            </div>

            <button type="button" className="settings-add-button">
              <Icon name="plus" className="settings-add-button-icon" />
              <span>Add Zone</span>
            </button>
          </div>

          <div className="settings-zone-list">
            {deliveryZones.map((zone) => (
              <article key={zone.id} className="settings-zone-card">
                <div className="settings-zone-head">
                  <div className="settings-zone-title">
                    <Icon name="pin" className="settings-zone-title-icon" />
                    <h4>{zone.title}</h4>
                  </div>

                  <div className="settings-zone-actions">
                    <button type="button" className="settings-zone-action-button" aria-label={`Edit ${zone.title}`}>
                      <Icon name="edit" className="settings-zone-action-icon" />
                    </button>
                    <button type="button" className="settings-zone-action-button" aria-label={`Delete ${zone.title}`}>
                      <Icon name="trash" className="settings-zone-action-icon" />
                    </button>
                  </div>
                </div>

                {zone.coverage.length ? (
                  <div className="settings-zone-coverage">
                    <span>Coverage:</span>
                    <div className="settings-zone-chip-list">
                      {zone.coverage.map((area) => (
                        <span key={area} className="settings-zone-chip">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="settings-zone-table">
                  <div className="settings-zone-table-row settings-zone-table-head">
                    <span>Service Type</span>
                    <span>Base Rate ($/kg)</span>
                    <span>Minimum Charge ($)</span>
                  </div>

                  {zone.rates.map((rate) => (
                    <div key={rate.serviceType} className="settings-zone-table-row">
                      <strong>{rate.serviceType}</strong>
                      <span>{rate.baseRate}</span>
                      <span>{rate.minimumCharge}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </article>
      ) : activeTab === 'Branches' ? (
        <article className="workspace-card settings-panel-card">
          <div className="settings-rates-header">
            <div className="settings-panel-head">
              <h3>Branch Management</h3>
              <p>Manage branch offices and operations</p>
            </div>

            <button type="button" className="settings-add-button">
              <Icon name="plus" className="settings-add-button-icon" />
              <span>Add Branch</span>
            </button>
          </div>

          <div className="settings-branch-table">
            <div className="settings-branch-table-row settings-branch-table-head">
              <span>Branch Code</span>
              <span>Branch Name</span>
              <span>Type</span>
              <span>Location</span>
              <span>Contact</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {branchRows.map((branch) => (
              <div key={branch.code} className="settings-branch-table-row">
                <strong>{branch.code}</strong>
                <span>{branch.name}</span>
                <span>
                  <span className={`settings-branch-type-pill settings-branch-type-${branch.type}`}>{branch.type}</span>
                </span>
                <span className="settings-branch-location-cell">
                  <strong>{branch.locationCity}</strong>
                  <small>{branch.locationCountry}</small>
                </span>
                <span className="settings-branch-contact-cell">
                  <strong>{branch.contactName}</strong>
                  <small>{branch.contactPhone}</small>
                </span>
                <span>
                  <span className="settings-branch-status-pill">{branch.status}</span>
                </span>
                <span>
                  <button type="button" className="settings-zone-action-button" aria-label={`Edit ${branch.name}`}>
                    <Icon name="edit" className="settings-zone-action-icon" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </article>
      ) : activeTab === 'Users' ? (
        <article className="workspace-card settings-panel-card">
          <div className="settings-rates-header">
            <div className="settings-panel-head">
              <h3>User Management</h3>
              <p>Manage user accounts and permissions</p>
            </div>

            <button type="button" className="settings-add-button">
              <Icon name="plus" className="settings-add-button-icon" />
              <span>Add User</span>
            </button>
          </div>

          <div className="settings-user-list">
            {userRows.map((user) => (
              <article key={`${user.email}-${user.role}`} className="settings-user-card">
                <div className="settings-user-profile">
                  <div className="settings-user-avatar">{user.initials}</div>
                  <div className="settings-user-copy">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="settings-user-actions">
                  <span className="settings-user-role-pill">{user.role}</span>
                  <span className="settings-branch-status-pill">{user.status}</span>
                  <button type="button" className="settings-zone-action-button" aria-label={`Edit ${user.name}`}>
                    <Icon name="edit" className="settings-zone-action-icon" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </article>
      ) : (
        <article className="workspace-card settings-placeholder-card">
          <h3>{activeTab}</h3>
          <p className="muted-text">This settings panel can be added next. The General tab is now fully styled and interactive.</p>
        </article>
      )}
    </>
  );
}
