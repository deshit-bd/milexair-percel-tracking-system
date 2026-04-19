import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import ParcelLogo from '../components/ParcelLogo';
import { getSectionFromPath, sectionRoutes, sidebarItems } from '../config/navigation';
import {
  invoiceSeed,
  onboardingContractSeed,
  onboardingNotificationSeed,
  onboardingOfferLetterSeed,
  onboardingProfileSeed,
  internationalShipmentSeed,
  manifestSeed,
  onboardingSeed,
  settingSeed,
  shipmentSeed,
  statusItems,
} from '../data/dashboardData';
import {
  DashboardSection,
  InternationalSection,
  InvoicesSection,
  ManifestSection,
  OnboardingSection,
  ReportsSection,
  SettingsSection,
  ShipmentsSection,
  TrackingSection,
} from '../sections';
import { describePieSlice } from '../utils/charts';
import './SuperAdminDashboard.css';

export default function SuperAdminDashboard({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = getSectionFromPath(location.pathname);
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [shipmentSearch, setShipmentSearch] = useState('');
  const [shipmentFilter, setShipmentFilter] = useState('all');
  const [shipmentServiceFilter, setShipmentServiceFilter] = useState('all');
  const [shipmentScopeFilter, setShipmentScopeFilter] = useState('all');
  const [selectedShipmentId, setSelectedShipmentId] = useState(shipmentSeed[0].id);
  const [manifests, setManifests] = useState(manifestSeed);
  const [manifestSearch, setManifestSearch] = useState('');
  const [manifestFilter, setManifestFilter] = useState('all');
  const [invoices, setInvoices] = useState(invoiceSeed);
  const [onboardingItems, setOnboardingItems] = useState(onboardingSeed);
  const [settings, setSettings] = useState(settingSeed);
  const [toastMessage, setToastMessage] = useState('');
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackingSearched, setTrackingSearched] = useState(false);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const pieSlices = useMemo(() => {
    let currentAngle = 0;

    return statusItems.map((item) => {
      const startAngle = currentAngle;
      const angleSize = (item.percent / 100) * 360;
      const endAngle = startAngle + angleSize;
      const midAngle = startAngle + angleSize / 2;
      currentAngle = endAngle;

      return {
        ...item,
        path: describePieSlice(72, 72, 72, startAngle, endAngle),
        tooltipX: 72 + 54 * Math.cos(((midAngle - 90) * Math.PI) / 180),
        tooltipY: 72 + 54 * Math.sin(((midAngle - 90) * Math.PI) / 180),
      };
    });
  }, []);

  const filteredShipments = useMemo(() => {
    const query = shipmentSearch.trim().toLowerCase();

    return shipmentSeed.filter((shipment) => {
      const matchesFilter = shipmentFilter === 'all' ? true : shipment.status === shipmentFilter;
      const matchesService = shipmentServiceFilter === 'all' ? true : shipment.service.toLowerCase() === shipmentServiceFilter;
      const matchesScope =
        shipmentScopeFilter === 'all'
          ? true
          : shipmentScopeFilter === 'international'
            ? shipment.international
            : !shipment.international;
      const matchesQuery =
        !query ||
        shipment.id.toLowerCase().includes(query) ||
        shipment.city.toLowerCase().includes(query) ||
        shipment.customer.toLowerCase().includes(query) ||
        shipment.service.toLowerCase().includes(query) ||
        shipment.senderName.toLowerCase().includes(query) ||
        shipment.receiverName.toLowerCase().includes(query) ||
        shipment.branch.toLowerCase().includes(query);

      return matchesFilter && matchesService && matchesScope && matchesQuery;
    });
  }, [shipmentFilter, shipmentScopeFilter, shipmentSearch, shipmentServiceFilter]);

  const trackingShipment = shipmentSeed.find((shipment) => shipment.id.toLowerCase() === trackingQuery.trim().toLowerCase()) || null;
  const internationalShipments = internationalShipmentSeed;
  const filteredManifests = manifests.filter((manifest) => {
    const query = manifestSearch.trim().toLowerCase();
    const matchesFilter = manifestFilter === 'all' ? true : manifest.status === manifestFilter;
    const matchesQuery =
      !query ||
      manifest.id.toLowerCase().includes(query) ||
      manifest.manifestType.toLowerCase().includes(query) ||
      manifest.fromBranch.toLowerCase().includes(query) ||
      manifest.toBranch.toLowerCase().includes(query) ||
      manifest.vehicle.toLowerCase().includes(query) ||
      manifest.driverLabel.toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  const navigateToSection = (sectionId) => navigate(sectionRoutes[sectionId] || sectionRoutes.dashboard);

  const handleCardAction = (card) => {
    navigateToSection(card.target);
    if (card.filter) {
      setShipmentFilter(card.filter);
    }
    setToastMessage(`${card.label} opened.`);
  };

  const handleShipmentOpen = (shipmentId, nextSection = 'shipments') => {
    setSelectedShipmentId(shipmentId);
    setTrackingQuery(shipmentId);
    setTrackingSearched(nextSection === 'tracking');
    navigateToSection(nextSection);
  };

  const handleTrackingSearch = () => {
    setTrackingSearched(true);
    setToastMessage(trackingShipment ? `Tracking refreshed for ${trackingShipment.id}.` : 'Shipment not found.');
  };

  const markInvoicePaid = (invoiceId) => {
    setInvoices((current) => current.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice)));
    setToastMessage(`${invoiceId} marked as paid.`);
  };

  const toggleManifestStatus = (manifestId) => {
    setManifests((current) =>
      current.map((manifest) =>
        manifest.id === manifestId
          ? { ...manifest, status: manifest.status === 'in_transit' ? 'closed' : 'in_transit' }
          : manifest,
      ),
    );
    setToastMessage(`${manifestId} status updated.`);
  };

  const toggleSetting = (settingId) => {
    setSettings((current) => current.map((setting) => (setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting)));
  };

  const sectionContent = {
    dashboard: (
      <DashboardSection
        hoveredStatus={hoveredStatus}
        pieSlices={pieSlices}
        setHoveredStatus={setHoveredStatus}
        onCardAction={handleCardAction}
        onStatusFilter={(value) => {
          setShipmentFilter(value);
          navigateToSection('shipments');
        }}
        onServiceFilter={(value) => {
          setShipmentSearch(value);
          navigateToSection('shipments');
          setToastMessage(`${value} service filter applied.`);
        }}
        onShipmentOpen={handleShipmentOpen}
      />
    ),
    shipments: (
      <ShipmentsSection
        filteredShipments={filteredShipments}
        selectedShipmentId={selectedShipmentId}
        onCreate={() => setToastMessage('New shipment workflow opened.')}
        onExport={() => setToastMessage('Shipment export generated.')}
        onFilterChange={setShipmentFilter}
        onServiceFilterChange={setShipmentServiceFilter}
        onScopeFilterChange={setShipmentScopeFilter}
        onSearchChange={setShipmentSearch}
        onSelectShipment={setSelectedShipmentId}
        onTrackingOpen={(shipmentId) => handleShipmentOpen(shipmentId, 'tracking')}
        onPrint={(shipmentId) => {
          setSelectedShipmentId(shipmentId);
          setToastMessage(`Print prepared for ${shipmentId}.`);
        }}
        shipmentFilter={shipmentFilter}
        shipmentScopeFilter={shipmentScopeFilter}
        shipmentSearch={shipmentSearch}
        shipmentServiceFilter={shipmentServiceFilter}
      />
    ),
    tracking: (
      <TrackingSection
        onTrack={handleTrackingSearch}
        onTrackingQueryChange={(value) => {
          setTrackingQuery(value);
          setTrackingSearched(false);
        }}
        trackingQuery={trackingQuery}
        trackingSearched={trackingSearched}
        trackingShipment={trackingShipment}
      />
    ),
    manifest: (
      <ManifestSection
        filteredManifests={filteredManifests}
        manifestFilter={manifestFilter}
        manifestSearch={manifestSearch}
        onCreate={() => setToastMessage('New manifest flow opened.')}
        onFilterChange={setManifestFilter}
        onSearchChange={setManifestSearch}
        onToggleStatus={toggleManifestStatus}
        onView={(manifestId) => setToastMessage(`Viewing ${manifestId}.`)}
      />
    ),
    invoices: (
      <InvoicesSection
        invoices={invoices}
        onDownload={(invoiceId) => setToastMessage(`Download prepared for ${invoiceId}.`)}
        onMarkPaid={markInvoicePaid}
        onView={(invoiceId) => setToastMessage(`Viewing ${invoiceId}.`)}
      />
    ),
    reports: (
      <ReportsSection
        onDownload={(report) => setToastMessage(`${report} downloaded.`)}
        onExportDaily={() => setToastMessage('Daily report export started.')}
      />
    ),
    international: (
      <InternationalSection
        internationalShipments={internationalShipments}
        onAction={(shipmentId, actionLabel) => setToastMessage(actionLabel ? `${actionLabel} started for ${shipmentId}.` : `Viewing ${shipmentId}.`)}
        onView={(shipmentId) => setToastMessage(`Viewing ${shipmentId}.`)}
      />
    ),
    onboarding: (
      <OnboardingSection
        onboardingItems={onboardingItems}
        offerLetters={onboardingOfferLetterSeed}
        serviceContracts={onboardingContractSeed}
        customerProfiles={onboardingProfileSeed}
        notifications={onboardingNotificationSeed}
        onCreate={() => setToastMessage('New recommendation flow opened.')}
        onDownload={(reference) => setToastMessage(`Download prepared for ${reference}.`)}
        onSend={(reference) => setToastMessage(`Offer sent for ${reference}.`)}
        onView={(reference) => setToastMessage(`Viewing ${reference}.`)}
      />
    ),
    settings: <SettingsSection settings={settings} onToggle={toggleSetting} />,
  };

  return (
    <main className="superadmin-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark">
            <ParcelLogo />
          </div>
          <div className="brand-copy">
            <strong>Parcel Logistics</strong>
            <span>System</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="header-user">
            <div className="header-user-copy">
              <strong>Super Admin</strong>
              <span>Workspace Active</span>
            </div>
            <div className="avatar-circle">SA</div>
          </div>

          <button type="button" className="logout-link" onClick={onLogout}>
            <Icon name="logout" className="header-icon" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav" aria-label="Primary">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link${activeSection === item.id ? ' is-active' : ''}`}
                onClick={() => navigateToSection(item.id)}
              >
                <Icon name={item.icon} className="sidebar-icon" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="dashboard-content">
          {toastMessage ? <div className="toast-banner">{toastMessage}</div> : null}
          {sectionContent[activeSection]}
        </section>
      </div>
    </main>
  );
}
