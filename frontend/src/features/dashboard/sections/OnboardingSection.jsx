import { useEffect, useMemo, useState } from 'react';
import Icon from '../components/Icon';

const onboardingTabs = [
  { id: 'Recommendations', label: 'Recommendations', icon: 'user-plus' },
  { id: 'Offer Letters', label: 'Offer Letters', icon: 'file-check' },
  { id: 'Service Contracts', label: 'Service Contracts', icon: 'file-text' },
  { id: 'Customer Profiles', label: 'Customer Profiles', icon: 'users' },
  { id: 'Notifications', label: 'Notifications', icon: 'bell' },
];

const summaryCards = [
  { id: 'draft', label: 'Draft', tone: 'neutral' },
  { id: 'submitted', label: 'Submitted', tone: 'blue' },
  { id: 'under review', label: 'Under Review', tone: 'amber' },
  { id: 'approved', label: 'Approved', tone: 'green' },
  { id: 'rejected', label: 'Rejected', tone: 'red' },
];

const offerLetterSummaryCards = [
  { id: 'draft', label: 'Draft', tone: 'neutral' },
  { id: 'sent', label: 'Sent', tone: 'blue' },
  { id: 'accepted', label: 'Accepted', tone: 'green' },
  { id: 'expired', label: 'Expired', tone: 'red' },
];

const serviceContractSummaryCards = [
  { id: 'draft', label: 'Draft', tone: 'neutral' },
  { id: 'pending signature', label: 'Pending Signature', tone: 'amber' },
  { id: 'active', label: 'Active', tone: 'green' },
  { id: 'expired', label: 'Expired', tone: 'red' },
];

const customerProfileSummaryCards = [
  { id: 'all', label: 'Total Customers', tone: 'neutral', countMode: 'total' },
  { id: 'active', label: 'Active', tone: 'green' },
  { id: 'inactive', label: 'Inactive', tone: 'blue' },
  { id: 'suspended', label: 'Suspended', tone: 'red' },
];

const notificationSummaryCards = [
  { id: 'all', label: 'Total Notifications', tone: 'neutral', countMode: 'total' },
  { id: 'pending', label: 'Pending', tone: 'amber' },
  { id: 'sent', label: 'Sent', tone: 'green' },
  { id: 'failed', label: 'Failed', tone: 'red' },
];

const notificationDepartments = [
  { id: 'Accounts', icon: 'receipt', tone: 'green', count: 3 },
  { id: 'Operations', icon: 'cube', tone: 'blue', count: 3 },
  { id: 'Sales', icon: 'users', tone: 'violet', count: 1 },
  { id: 'Management', icon: 'alert', tone: 'orange', count: 1 },
];

export default function OnboardingSection({
  onboardingItems,
  offerLetters,
  serviceContracts,
  customerProfiles,
  notifications,
  onCreate,
  onDownload,
  onSend,
  onView,
}) {
  const [activeTab, setActiveTab] = useState('Recommendations');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedOfferLetter, setSelectedOfferLetter] = useState(null);
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState(null);

  useEffect(() => {
    setSearchQuery('');
    setStatusFilter('all');
    if (activeTab !== 'Recommendations') {
      setShowRecommendationForm(false);
      setSelectedRecommendation(null);
    }
    if (activeTab !== 'Service Contracts') {
      setSelectedContract(null);
    }
    if (activeTab !== 'Offer Letters') {
      setSelectedOfferLetter(null);
    }
    if (activeTab !== 'Customer Profiles') {
      setSelectedCustomerProfile(null);
    }
  }, [activeTab]);

  const activeItems =
    activeTab === 'Offer Letters'
      ? offerLetters
      : activeTab === 'Service Contracts'
        ? serviceContracts
        : activeTab === 'Customer Profiles'
          ? customerProfiles
          : activeTab === 'Notifications'
            ? notifications
        : activeTab === 'Recommendations'
          ? onboardingItems
          : [];

  const visibleItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return activeItems.filter((item) => {
      const matchesTab =
        activeTab === 'Offer Letters' || activeTab === 'Recommendations' || activeTab === 'Service Contracts' || activeTab === 'Customer Profiles'
          ? true
          : activeTab === 'Notifications'
            ? true
            : item.type === activeTab;
      const matchesStatus =
        statusFilter === 'all'
          ? true
          : activeTab === 'Notifications'
            ? item.department === statusFilter
            : item.status === statusFilter;
      const matchesQuery =
        !query ||
        item.company.toLowerCase().includes(query) ||
        (item.reference ? item.reference.toLowerCase().includes(query) : false) ||
        (item.contact ? item.contact.toLowerCase().includes(query) : false) ||
        (item.customerId ? item.customerId.toLowerCase().includes(query) : false) ||
        (item.email ? item.email.toLowerCase().includes(query) : false) ||
        (item.subject ? item.subject.toLowerCase().includes(query) : false) ||
        (item.department ? item.department.toLowerCase().includes(query) : false) ||
        (item.recipient ? item.recipient.toLowerCase().includes(query) : false);

      return matchesTab && matchesStatus && matchesQuery;
    });
  }, [activeItems, activeTab, searchQuery, statusFilter]);

  const statusOptions =
    activeTab === 'Offer Letters'
      ? [
          { value: 'all', label: 'All Status' },
          { value: 'accepted', label: 'Accepted' },
          { value: 'sent', label: 'Sent' },
        ]
      : activeTab === 'Service Contracts'
        ? [
            { value: 'all', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'pending signature', label: 'Pending Signature' },
          ]
      : activeTab === 'Customer Profiles'
        ? [
            { value: 'all', label: 'All' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
            { value: 'suspended', label: 'Suspended' },
          ]
      : activeTab === 'Notifications'
        ? [
            { value: 'all', label: 'All Departments' },
            { value: 'Accounts', label: 'Accounts' },
            { value: 'Operations', label: 'Operations' },
            { value: 'Sales', label: 'Sales' },
            { value: 'Management', label: 'Management' },
          ]
      : [
          { value: 'all', label: 'All Status' },
          { value: 'draft', label: 'Draft' },
          { value: 'submitted', label: 'Submitted' },
          { value: 'under review', label: 'Under Review' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' },
        ];

  const activeSummaryCards =
    activeTab === 'Offer Letters'
      ? offerLetterSummaryCards
      : activeTab === 'Service Contracts'
        ? serviceContractSummaryCards
        : activeTab === 'Customer Profiles'
          ? customerProfileSummaryCards
          : activeTab === 'Notifications'
            ? notificationSummaryCards
        : summaryCards;
  const searchPlaceholder =
    activeTab === 'Offer Letters'
      ? 'Search by company name, offer number, or reference...'
      : activeTab === 'Service Contracts'
        ? 'Search by company name, contract number, or customer name...'
        : activeTab === 'Customer Profiles'
          ? 'Search by company name, customer ID, contact person, or email...'
          : activeTab === 'Notifications'
            ? 'Search by customer name, ID, or purpose...'
        : 'Search by company name, reference number, or contact person...';

  const pendingNotifications = notifications.filter((item) => item.status === 'pending');

  const openRecommendationForm = () => {
    setActiveTab('Recommendations');
    setShowRecommendationForm(true);
    onCreate();
  };

  const closeRecommendationForm = () => {
    setShowRecommendationForm(false);
  };

  const openRecommendationDetails = (item) => {
    setSelectedRecommendation(item);
  };

  const closeRecommendationDetails = () => {
    setSelectedRecommendation(null);
  };

  const openContractDetails = (item) => {
    setSelectedContract(item);
  };

  const closeContractDetails = () => {
    setSelectedContract(null);
  };

  const openOfferLetterPreview = (item) => {
    setSelectedOfferLetter(item);
  };

  const closeOfferLetterPreview = () => {
    setSelectedOfferLetter(null);
  };

  const openCustomerProfileDetails = (item) => {
    setSelectedCustomerProfile(item);
  };

  const closeCustomerProfileDetails = () => {
    setSelectedCustomerProfile(null);
  };

  return (
    <>
      <div className="page-heading onboarding-page-heading">
        <h1>Customer Onboarding</h1>
        <p>Manage customer acquisition, rate approval, and account activation</p>
      </div>

      <div className="onboarding-tabs-wrap" role="tablist" aria-label="Onboarding categories">
        {onboardingTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`onboarding-tab${activeTab === tab.id ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            <Icon name={tab.icon} className="onboarding-tab-icon" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {selectedOfferLetter ? (
        <div className="onboarding-modal-overlay" role="dialog" aria-modal="true" aria-label="Offer letter preview">
          <article className="onboarding-modal-card onboarding-preview-modal-card">
            <div className="onboarding-modal-head onboarding-preview-modal-head">
              <div>
                <strong>Offer Letter Preview</strong>
                <span>{selectedOfferLetter.reference}</span>
              </div>
              <span className={`shipment-status onboarding-status-pill onboarding-status-${selectedOfferLetter.status.replace(/\s+/g, '-')}`}>
                {selectedOfferLetter.status}
              </span>
            </div>

            <div className="onboarding-preview-modal-body">
              <div className="onboarding-preview-sheet-wrap">
                <article className="onboarding-preview-sheet">
                  <header className="onboarding-preview-sheet-header">
                    <strong>Parcel Logistics International</strong>
                    <span>456 Business Avenue, Dhaka 1000, Bangladesh</span>
                    <span>Tel: +880-2-1234567 | Email: intl@parcellogistics.com</span>
                  </header>

                  <section className="onboarding-preview-sheet-meta">
                    <div>
                      <span>Offer Number</span>
                      <strong>{selectedOfferLetter.reference}</strong>
                    </div>
                    <div>
                      <span>Date</span>
                      <strong>{selectedOfferLetter.issueDate}</strong>
                    </div>
                  </section>

                  <section className="onboarding-preview-sheet-copy">
                    <p><strong>To:</strong> {selectedOfferLetter.company}</p>
                    <p><strong>Subject:</strong> Shipping Rate Offer</p>
                    <p>Dear Sir/Madam,</p>
                    <p>
                      Thank you for your interest in our international parcel delivery service. We are pleased to present the following
                      approved shipping rates for your account.
                    </p>
                  </section>

                  <section className="onboarding-preview-rate-card">
                    <div className="onboarding-preview-rate-title">Destination: {selectedOfferLetter.destinations} - Express</div>
                    <div className="onboarding-preview-rate-table">
                      <div className="onboarding-preview-rate-row onboarding-preview-rate-row-head">
                        <span>Weight Range (kg)</span>
                        <span>Rate (USD/kg)</span>
                      </div>
                      <div className="onboarding-preview-rate-row">
                        <span>0 - 0.5 kg</span>
                        <strong>$45.00</strong>
                      </div>
                      <div className="onboarding-preview-rate-row">
                        <span>0.5 - 1 kg</span>
                        <strong>$42.00</strong>
                      </div>
                      <div className="onboarding-preview-rate-row">
                        <span>1 - 5 kg</span>
                        <strong>$40.00</strong>
                      </div>
                      <div className="onboarding-preview-rate-row">
                        <span>5 - 10 kg</span>
                        <strong>$38.00</strong>
                      </div>
                      <div className="onboarding-preview-rate-row">
                        <span>10+ kg</span>
                        <strong>$35.00</strong>
                      </div>
                    </div>
                  </section>

                  <section className="onboarding-preview-sheet-copy">
                    <strong className="onboarding-preview-subtitle">Terms & Conditions:</strong>
                    <ul className="onboarding-preview-list">
                      <li>This above rate are valid for 90 days from the date of issue.</li>
                      <li>Rates are subject to fuel surcharge adjustment.</li>
                      <li>All rates are applicable based on billable weight as per government regulations.</li>
                      <li>Minimum weight chargeable: 0.5 kg.</li>
                      <li>Volumetric weight is calculated as L x W x H (cm) / 5000.</li>
                      <li>Payment terms: Weekly billing; 15 days credit period after invoicing.</li>
                    </ul>
                    <div className="onboarding-preview-validity-note">
                      This offer is valid until {selectedOfferLetter.validUntil}.
                    </div>
                    <p>We look forward to serving your logistics needs and building a long-term partnership.</p>
                    <p>For any queries or to proceed with this offer, please contact our sales team.</p>
                  </section>

                  <footer className="onboarding-preview-sheet-footer">
                    <p>Best regards,</p>
                    <strong>Sales Department</strong>
                    <span>Parcel Logistics International</span>
                  </footer>
                </article>
              </div>
            </div>

            <div className="onboarding-modal-footer onboarding-modal-footer-actions">
              <button type="button" className="secondary-button" onClick={() => onDownload(selectedOfferLetter.reference)}>
                <Icon name="download" className="inline-icon" />
                <span>Download PDF</span>
              </button>
              <button type="button" className="secondary-button" onClick={() => onSend(selectedOfferLetter.reference)}>
                <Icon name="mail" className="inline-icon" />
                <span>Send Email</span>
              </button>
              <button type="button" className="secondary-button" onClick={() => window.print()}>
                <Icon name="file-text" className="inline-icon" />
                <span>Print</span>
              </button>
              <button type="button" className="onboarding-back-link" onClick={closeOfferLetterPreview}>
                <Icon name="arrow-left" className="onboarding-back-link-icon" />
                <span>Back to List</span>
              </button>
            </div>
          </article>
        </div>
      ) : selectedContract ? (
        <div className="onboarding-modal-overlay" role="dialog" aria-modal="true" aria-label="Service contract details">
          <article className="onboarding-modal-card">
            <div className="onboarding-modal-head">
              <div>
                <strong>Service Contract Details</strong>
                <span>{selectedContract.reference}</span>
              </div>
              <span className={`shipment-status onboarding-status-pill onboarding-status-${selectedContract.status.replace(/\s+/g, '-')}`}>
                {selectedContract.status}
              </span>
            </div>

            <div className="onboarding-modal-body">
              <section className="onboarding-modal-section">
                <h3>Contract Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-2">
                  <div><span>Contract Number</span><strong>{selectedContract.reference}</strong></div>
                  <div><span>Offer Letter Reference</span><strong>{selectedContract.details.offerLetterReference}</strong></div>
                  <div><span>Company Name</span><strong>{selectedContract.company}</strong></div>
                  <div><span>Contact Person</span><strong>{selectedContract.details.contactPerson}</strong></div>
                  <div><span>Created Date</span><strong>{selectedContract.createdAt}</strong></div>
                  <div><span>Signed Date</span><strong>{selectedContract.signedAt || '-'}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Contract Period</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-3">
                  <div><span>Start Date</span><strong>{selectedContract.details.startDate}</strong></div>
                  <div><span>End Date</span><strong>{selectedContract.details.endDate}</strong></div>
                  <div><span>Rate Validity</span><strong>{selectedContract.details.rateValidity}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Financial Terms</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-2">
                  <div><span>Payment Method</span><strong>{selectedContract.details.paymentMethod}</strong></div>
                  <div><span>Invoice Cycle</span><strong>{selectedContract.details.invoiceCycle}</strong></div>
                  <div><span>Payment Due Period</span><strong>{selectedContract.details.paymentDuePeriod}</strong></div>
                  <div><span>Credit Limit</span><strong>{selectedContract.credit}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Special Terms</h3>
                <div className="onboarding-modal-note onboarding-modal-note-blue">{selectedContract.details.specialTerms}</div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Discount Conditions</h3>
                <div className="onboarding-modal-note onboarding-modal-note-green">{selectedContract.details.discountConditions}</div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Service Restrictions</h3>
                <div className="onboarding-modal-note onboarding-modal-note-amber">{selectedContract.details.serviceRestrictions}</div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Special Handling Instructions</h3>
                <div className="onboarding-modal-note onboarding-modal-note-violet">{selectedContract.details.handlingInstructions}</div>
              </section>
            </div>

            <div className="onboarding-modal-footer onboarding-modal-footer-actions">
              <button type="button" className="secondary-button onboarding-outline-action" onClick={() => onView(`Viewing document ${selectedContract.reference}.`)}>
                <Icon name="file-text" className="inline-icon" />
                <span>View Document</span>
              </button>
              <button type="button" className="onboarding-back-link" onClick={closeContractDetails}>
                <Icon name="arrow-left" className="onboarding-back-link-icon" />
                <span>Back to List</span>
              </button>
            </div>
          </article>
        </div>
      ) : selectedCustomerProfile ? (
        <div className="onboarding-modal-overlay" role="dialog" aria-modal="true" aria-label="Customer profile details">
          <article className="onboarding-modal-card onboarding-customer-modal-card">
            <div className="onboarding-modal-head onboarding-customer-modal-head">
              <div className="onboarding-customer-modal-title">
                <div>
                  <strong>Customer Profile</strong>
                  <span>{selectedCustomerProfile.customerId}</span>
                </div>
                <span className={`shipment-status onboarding-status-pill onboarding-status-${selectedCustomerProfile.status.replace(/\s+/g, '-')}`}>
                  {selectedCustomerProfile.status}
                </span>
              </div>
            </div>

            <div className="onboarding-modal-body onboarding-customer-modal-body">
              <section className="onboarding-modal-section">
                <div className="onboarding-customer-section-title">
                  <Icon name="receipt" className="inline-icon" />
                  <h3>Company Information</h3>
                </div>
                <div className="onboarding-customer-info-card onboarding-modal-grid onboarding-modal-grid-2">
                  <div><span>Company Name</span><strong>{selectedCustomerProfile.company}</strong></div>
                  <div><span>Business Type</span><strong>{selectedCustomerProfile.details.businessType}</strong></div>
                  <div><span>Contact Person</span><strong>{selectedCustomerProfile.details.contactPerson}</strong></div>
                  <div><span>Contract Number</span><strong>{selectedCustomerProfile.details.contractNumber}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Contact Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-2">
                  <div className="onboarding-customer-contact-item">
                    <span className="onboarding-customer-contact-label">
                      <Icon name="mail" className="inline-icon" />
                      <span>Email</span>
                    </span>
                    <strong>{selectedCustomerProfile.email}</strong>
                  </div>
                  <div className="onboarding-customer-contact-item">
                    <span className="onboarding-customer-contact-label">
                      <Icon name="phone" className="inline-icon" />
                      <span>Phone</span>
                    </span>
                    <strong>{selectedCustomerProfile.details.phone}</strong>
                  </div>
                  <div className="onboarding-customer-contact-item onboarding-modal-full">
                    <span className="onboarding-customer-contact-label">
                      <Icon name="pin" className="inline-icon" />
                      <span>Address</span>
                    </span>
                    <strong>{selectedCustomerProfile.details.address}</strong>
                  </div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Business Information</h3>
                <div className="onboarding-customer-metric-grid">
                  <div className="onboarding-customer-highlight-card tone-blue">
                    <span>Shipping Destinations</span>
                    <div className="onboarding-customer-chip-list">
                      {selectedCustomerProfile.details.shippingDestinations.map((destination) => (
                        <span key={destination} className="onboarding-customer-chip">
                          {destination}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="onboarding-customer-highlight-card tone-violet">
                    <span>Monthly Volume</span>
                    <strong>{selectedCustomerProfile.details.monthlyVolume}</strong>
                    <small>{selectedCustomerProfile.details.monthlyVolumeUnit}</small>
                  </div>
                  <div className="onboarding-customer-highlight-card tone-green">
                    <span>Credit Limit</span>
                    <strong>{selectedCustomerProfile.credit}</strong>
                    <small>USD</small>
                  </div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Approved Shipping Rates</h3>
                <div className="onboarding-customer-rates-card">
                  <div className="onboarding-customer-rate-row onboarding-customer-rate-row-head">
                    <span>Destination</span>
                    <span>Base Rate (USD/kg)</span>
                  </div>
                  {selectedCustomerProfile.details.approvedShippingRates.map((rate) => (
                    <div key={rate.destination} className="onboarding-customer-rate-row">
                      <strong>{rate.destination}</strong>
                      <strong>{rate.baseRate}</strong>
                    </div>
                  ))}
                </div>
              </section>

              <section className="onboarding-modal-section">
                <div className="onboarding-customer-section-title">
                  <Icon name="receipt" className="inline-icon" />
                  <h3>Payment Terms</h3>
                </div>
                <div className="onboarding-customer-info-card onboarding-modal-grid onboarding-modal-grid-3">
                  <div><span>Payment Method</span><strong>{selectedCustomerProfile.details.paymentMethod}</strong></div>
                  <div><span>Invoice Cycle</span><strong>{selectedCustomerProfile.details.invoiceCycle}</strong></div>
                  <div><span>Payment Due</span><strong>{selectedCustomerProfile.details.paymentDue}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <div className="onboarding-customer-section-title">
                  <Icon name="calendar" className="inline-icon" />
                  <h3>Account Activation</h3>
                </div>
                <div className="onboarding-modal-grid onboarding-modal-grid-2">
                  <div><span>Activation Date</span><strong>{selectedCustomerProfile.activatedAt}</strong></div>
                  <div>
                    <span>Department Notifications</span>
                    <strong className={`onboarding-customer-notification-status onboarding-customer-notification-status-${selectedCustomerProfile.details.departmentNotifications.toLowerCase()}`}>
                      <Icon
                        name={selectedCustomerProfile.details.departmentNotifications.toLowerCase() === 'sent' ? 'check' : 'alert'}
                        className="inline-icon"
                      />
                      <span>{selectedCustomerProfile.details.departmentNotifications}</span>
                    </strong>
                  </div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <div className="onboarding-customer-section-title">
                  <Icon name="trend" className="inline-icon" />
                  <h3>Performance Metrics</h3>
                </div>
                <div className="onboarding-customer-metric-grid">
                  <div className="onboarding-customer-stat-card tone-blue">
                    <span>Total Shipments</span>
                    <strong>{selectedCustomerProfile.details.totalShipments}</strong>
                  </div>
                  <div className="onboarding-customer-stat-card tone-green">
                    <span>Total Revenue</span>
                    <strong>{selectedCustomerProfile.details.totalRevenue}</strong>
                  </div>
                  <div className="onboarding-customer-stat-card tone-violet">
                    <span>Avg. Monthly Volume</span>
                    <strong>{selectedCustomerProfile.details.averageMonthlyVolume}</strong>
                  </div>
                </div>
              </section>
            </div>

            <div className="onboarding-modal-footer onboarding-modal-footer-actions onboarding-customer-modal-footer">
              <button type="button" className="secondary-button onboarding-customer-danger-button">
                <Icon name="alert" className="inline-icon" />
                <span>Suspend Account</span>
              </button>
              <button
                type="button"
                className="secondary-button onboarding-outline-action"
                onClick={() => onView(`Viewing contract ${selectedCustomerProfile.details.contractNumber}.`)}
              >
                <Icon name="file-text" className="inline-icon" />
                <span>View Contract</span>
              </button>
              <button type="button" className="onboarding-back-link" onClick={closeCustomerProfileDetails}>
                <span>Back to List</span>
              </button>
            </div>
          </article>
        </div>
      ) : selectedRecommendation ? (
        <div className="onboarding-modal-overlay" role="dialog" aria-modal="true" aria-label="Recommendation details">
          <article className="onboarding-modal-card">
            <div className="onboarding-modal-head">
              <div>
                <strong>Recommendation Details</strong>
                <span>{selectedRecommendation.reference}</span>
              </div>
              <span className={`shipment-status onboarding-status-pill onboarding-status-${selectedRecommendation.status.replace(/\s+/g, '-')}`}>
                {selectedRecommendation.status}
              </span>
            </div>

            <div className="onboarding-modal-body">
              <section className="onboarding-modal-section">
                <h3>Customer Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-2">
                  <div><span>Company Name</span><strong>{selectedRecommendation.company}</strong></div>
                  <div><span>Contact Person</span><strong>{selectedRecommendation.contact}</strong></div>
                  <div><span>Phone</span><strong>{selectedRecommendation.details.phone}</strong></div>
                  <div><span>Email</span><strong>{selectedRecommendation.details.email}</strong></div>
                  <div className="onboarding-modal-full"><span>Address</span><strong>{selectedRecommendation.details.address}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Business Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-3">
                  <div><span>Business Type</span><strong>{selectedRecommendation.details.businessType}</strong></div>
                  <div><span>Monthly Volume</span><strong>{selectedRecommendation.details.monthlyVolume}</strong></div>
                  <div><span>Monthly Value</span><strong>{selectedRecommendation.details.monthlyValue}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Shipping Details</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-3">
                  <div><span>Service Required</span><strong>{selectedRecommendation.details.serviceRequired}</strong></div>
                  <div><span>Primary Destination</span><strong>{selectedRecommendation.details.primaryDestination}</strong></div>
                  <div><span>Area Name</span><strong>{selectedRecommendation.details.areaName}</strong></div>
                  <div><span>Zone Name</span><strong>{selectedRecommendation.details.zoneName}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Commercial Terms</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-1">
                  <div><span>Expected Rate</span><strong>{selectedRecommendation.details.expectedRate}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Sales Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-3">
                  <div><span>Salesperson</span><strong>{selectedRecommendation.details.salesperson}</strong></div>
                  <div><span>Department</span><strong>{selectedRecommendation.details.department}</strong></div>
                  <div><span>Submission Date</span><strong>{selectedRecommendation.details.submissionDate}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Review Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-3">
                  <div><span>Reviewed By</span><strong>{selectedRecommendation.details.reviewedBy}</strong></div>
                  <div><span>Review Date</span><strong>{selectedRecommendation.details.reviewDate}</strong></div>
                </div>
                <div className="onboarding-modal-grid onboarding-modal-grid-1">
                  <div><span>Review Notes</span><strong>{selectedRecommendation.details.reviewNotes}</strong></div>
                </div>
              </section>

              <section className="onboarding-modal-section">
                <h3>Credit and Account Information</h3>
                <div className="onboarding-modal-grid onboarding-modal-grid-4">
                  <div><span>Credit Limit</span><strong>{selectedRecommendation.details.creditLimit}</strong></div>
                  <div><span>Account Mode</span><strong>{selectedRecommendation.details.accountMode}</strong></div>
                  <div><span>Credit Period</span><strong>{selectedRecommendation.details.creditPeriod}</strong></div>
                  <div><span>Account Type</span><strong>{selectedRecommendation.details.accountType}</strong></div>
                </div>
              </section>
            </div>

            <div className="onboarding-modal-footer">
              <button type="button" className="onboarding-back-link" onClick={closeRecommendationDetails}>
                <Icon name="arrow-left" className="onboarding-back-link-icon" />
                <span>Back to List</span>
              </button>
            </div>
          </article>
        </div>
      ) : showRecommendationForm ? (
        <>
          <button type="button" className="onboarding-back-link" onClick={closeRecommendationForm}>
            <Icon name="arrow-left" className="onboarding-back-link-icon" />
            <span>Back to List</span>
          </button>

          <article className="onboarding-form-shell">
            <div className="onboarding-form-hero">
              <div>
                <div className="onboarding-form-hero-title">
                  <div className="onboarding-form-hero-icon">
                    <Icon name="file-text" className="onboarding-form-hero-icon-svg" />
                  </div>
                  <div>
                    <strong>New Customer Recommendation</strong>
                    <p>Complete all required fields to submit a new customer recommendation for management review and approval</p>
                  </div>
                </div>
              </div>
              <span className="onboarding-form-badge">Draft Form</span>
            </div>

            <div className="onboarding-form-body">
              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-blue">
                    <Icon name="receipt" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Customer Information</strong>
                    <span>Company and contact details</span>
                  </div>
                </div>
                <div className="onboarding-form-grid onboarding-form-grid-2">
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="receipt" className="onboarding-form-label-icon" />
                      <span>Company Name <em>*</em></span>
                    </span>
                    <input type="text" placeholder="Enter company legal name" />
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="user-plus" className="onboarding-form-label-icon" />
                      <span>Contact Person <em>*</em></span>
                    </span>
                    <input type="text" placeholder="Primary contact person name" />
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="phone" className="onboarding-form-label-icon" />
                      <span>Phone Number <em>*</em></span>
                    </span>
                    <input type="text" placeholder="+880-XXXX-XXXXXX" />
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="mail" className="onboarding-form-label-icon" />
                      <span>Email Address <em>*</em></span>
                    </span>
                    <input type="email" placeholder="email@company.com" />
                  </label>
                  <label className="onboarding-form-field onboarding-form-field-wide">
                    <span className="onboarding-form-label">
                      <Icon name="pin" className="onboarding-form-label-icon" />
                      <span>Company Address <em>*</em></span>
                    </span>
                    <input type="text" placeholder="Enter complete business address with city and postal code" />
                  </label>
                </div>
              </section>

              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-violet">
                    <Icon name="cube" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Business Information</strong>
                    <span>Business type and volume estimates</span>
                  </div>
                </div>
                <div className="onboarding-form-grid onboarding-form-grid-3">
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="receipt" className="onboarding-form-label-icon" />
                      <span>Business Type <em>*</em></span>
                    </span>
                    <select defaultValue="">
                      <option value="" disabled>Select business type</option>
                      <option>Retail</option>
                      <option>Manufacturing</option>
                      <option>Freight Forwarding</option>
                    </select>
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="cube" className="onboarding-form-label-icon" />
                      <span>Monthly Volume <em>*</em></span>
                    </span>
                    <div className="onboarding-form-input-wrap">
                      <input type="text" defaultValue="0" />
                      <small>parcels</small>
                    </div>
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="trend" className="onboarding-form-label-icon" />
                      <span>Monthly Value <em>*</em></span>
                    </span>
                    <div className="onboarding-form-input-wrap">
                      <small>USD</small>
                      <input type="text" defaultValue="0" />
                    </div>
                  </label>
                </div>
              </section>

              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-indigo">
                    <Icon name="truck" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Shipping Details</strong>
                    <span>Service type and destination information</span>
                  </div>
                </div>
                <div className="onboarding-form-grid onboarding-form-grid-3">
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="plane" className="onboarding-form-label-icon" />
                      <span>Service Required <em>*</em></span>
                    </span>
                    <select defaultValue="Freight Forwarding">
                      <option>Freight Forwarding</option>
                      <option>Express Delivery</option>
                      <option>Warehousing</option>
                    </select>
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="globe" className="onboarding-form-label-icon" />
                      <span>Primary Destination <em>*</em></span>
                    </span>
                    <select defaultValue="United States (USA)">
                      <option>United States (USA)</option>
                      <option>United Kingdom (UK)</option>
                      <option>United Arab Emirates (UAE)</option>
                    </select>
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="pin" className="onboarding-form-label-icon" />
                      <span>Area Name <em>*</em></span>
                    </span>
                    <input type="text" placeholder="Enter area name" />
                  </label>
                  <label className="onboarding-form-field">
                    <span className="onboarding-form-label">
                      <Icon name="pin" className="onboarding-form-label-icon" />
                      <span>Zone Name <em>*</em></span>
                    </span>
                    <input type="text" placeholder="Enter zone name" />
                  </label>
                </div>
              </section>

              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-green">
                    <Icon name="trend" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Commercial Terms</strong>
                    <span>Pricing information</span>
                  </div>
                </div>
                <div className="onboarding-form-grid onboarding-form-grid-2">
                  <label className="onboarding-form-field">
                    <span>Expected Shipping Rate <em>*</em></span>
                    <div className="onboarding-form-input-wrap">
                      <small>USD</small>
                      <input type="text" defaultValue="0" />
                      <small>/kg</small>
                    </div>
                  </label>
                </div>
              </section>

              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-orange">
                    <Icon name="users" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Sales Information</strong>
                    <span>Salesperson and department details</span>
                  </div>
                </div>
                <div className="onboarding-form-grid onboarding-form-grid-2">
                  <label className="onboarding-form-field">
                    <span>Salesperson Name</span>
                    <input type="text" defaultValue="Super Admin" />
                  </label>
                  <label className="onboarding-form-field">
                    <span>Department</span>
                    <select defaultValue="Sales - Corporate">
                      <option>Sales - Corporate</option>
                      <option>Sales - SME</option>
                    </select>
                  </label>
                </div>
              </section>

              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-slate">
                    <Icon name="file-text" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Additional Notes</strong>
                    <span>Any special requirements or comments (Optional)</span>
                  </div>
                </div>
                <label className="onboarding-form-field onboarding-form-field-wide">
                  <textarea rows="4" placeholder="Enter any additional information, special handling requirements, or comments about this customer..." />
                </label>
              </section>

              <section className="onboarding-form-card">
                <div className="onboarding-form-card-head">
                  <div className="onboarding-form-card-icon tone-red">
                    <Icon name="receipt" className="onboarding-form-card-icon-svg" />
                  </div>
                  <div>
                    <strong>Credit and Account Information</strong>
                    <span>Credit limits, account modes, and other financial details</span>
                  </div>
                </div>
                <div className="onboarding-form-grid onboarding-form-grid-3">
                  <label className="onboarding-form-field">
                    <span>Credit Limit <em>*</em></span>
                    <div className="onboarding-form-input-wrap">
                      <small>USD</small>
                      <input type="text" defaultValue="0" />
                    </div>
                  </label>
                  <label className="onboarding-form-field">
                    <span>Account Mode <em>*</em></span>
                    <select defaultValue="Prepaid">
                      <option>Prepaid</option>
                      <option>Postpaid</option>
                    </select>
                  </label>
                  <label className="onboarding-form-field">
                    <span>Credit Period <em>*</em></span>
                    <div className="onboarding-form-input-wrap">
                      <input type="text" defaultValue="0" />
                      <small>days</small>
                    </div>
                  </label>
                  <label className="onboarding-form-field">
                    <span>Account Type <em>*</em></span>
                    <select defaultValue="Corporate">
                      <option>Corporate</option>
                      <option>Individual</option>
                    </select>
                  </label>
                </div>
              </section>
            </div>

            <div className="onboarding-form-footer">
              <span className="onboarding-form-required-note">* Required fields must be filled before submission</span>
              <div className="onboarding-form-actions">
                <button type="button" className="secondary-button" onClick={closeRecommendationForm}>
                  Cancel
                </button>
                <button type="button" className="secondary-button onboarding-outline-action" onClick={() => onView('Draft recommendation saved.')}>
                  <Icon name="file-text" className="inline-icon" />
                  <span>Save as Draft</span>
                </button>
                <button type="button" className="tracking-search-button onboarding-primary-action" onClick={() => onSend('Recommendation submitted for review.')}>
                  <Icon name="check" className="tracking-search-button-icon" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </div>
          </article>
        </>
      ) : (
        <>
      <div className="onboarding-stats-grid">
        {activeSummaryCards.map((card) => (
          <article key={card.id} className="onboarding-stat-card">
            <strong className={`onboarding-stat-value tone-${card.tone}`}>
              {card.countMode === 'total' ? activeItems.length : activeItems.filter((item) => item.status === card.id).length}
            </strong>
            <span>{card.label}</span>
          </article>
        ))}
      </div>

      {activeTab === 'Notifications' ? (
        <div className="onboarding-notification-departments">
          {notificationDepartments.map((department) => (
            <article key={department.id} className={`onboarding-notification-card tone-${department.tone}`}>
              <div className={`onboarding-notification-icon onboarding-notification-icon-${department.tone}`}>
                <Icon name={department.icon} className="onboarding-notification-icon-svg" />
              </div>
              <div>
                <span>{department.id}</span>
                <strong>{department.count}</strong>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      <article
        className={`workspace-card onboarding-toolbar-card${
          activeTab === 'Offer Letters' || activeTab === 'Service Contracts' ? ' onboarding-toolbar-card-simple' : ''
        }${activeTab === 'Customer Profiles' ? ' onboarding-toolbar-card-profile' : ''}`}
      >
        <div className="onboarding-toolbar">
          <label className="tracking-search-shell onboarding-search-shell">
            <Icon name="search" className="tracking-search-icon" />
            <input
              type="search"
              className="tracking-search-input"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          {activeTab !== 'Offer Letters' && activeTab !== 'Service Contracts' ? (
            activeTab === 'Customer Profiles' ? (
              <div className="onboarding-profile-filters" role="tablist" aria-label="Customer profile status filters">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`onboarding-filter-pill${statusFilter === option.value ? ' is-active' : ''}`}
                    onClick={() => setStatusFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : activeTab === 'Notifications' ? (
              <div className="onboarding-notification-toolbar-actions">
                <div className="onboarding-profile-filters" role="tablist" aria-label="Department filters">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`onboarding-filter-pill${statusFilter === option.value ? ' is-active' : ''}`}
                      onClick={() => setStatusFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="tracking-search-button onboarding-send-all-button"
                  onClick={() => onSend(`Send all pending notifications (${pendingNotifications.length})`)}
                >
                  <Icon name="send" className="tracking-search-button-icon" />
                  <span>Send All Pending Notifications ({pendingNotifications.length})</span>
                </button>
              </div>
            ) : (
            <>
              <label className="invoice-select-shell onboarding-select-shell">
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <button type="button" className="tracking-search-button onboarding-create-button" onClick={openRecommendationForm}>
                <Icon name="plus" className="tracking-search-button-icon" />
                <span>New Recommendation</span>
              </button>
            </>
            )
          ) : null}
        </div>
      </article>

      {activeTab === 'Recommendations' && visibleItems.length ? (
        <article className="workspace-card onboarding-results-card onboarding-recommendations-card">
          <div className="onboarding-recommendations-head">
            <strong>Customer Recommendations</strong>
            <span>{visibleItems.length} recommendation(s) found</span>
          </div>

          <div className="onboarding-recommendations-list">
            {visibleItems.map((item) => (
              <div key={item.id} className="onboarding-recommendation-row">
                <div className="onboarding-recommendation-main">
                  <div className="onboarding-recommendation-title">
                    <strong>{item.company}</strong>
                    <span className={`shipment-status onboarding-status-pill onboarding-status-${item.status.replace(/\s+/g, '-')}`}>{item.status}</span>
                  </div>

                  <div className="onboarding-recommendation-meta">
                    <div>
                      <strong>{item.reference}</strong>
                    </div>
                    <div>
                      <strong>{item.contact}</strong>
                    </div>
                    <div>
                      <strong>{item.country}</strong>
                    </div>
                    <div>
                      <strong>{item.parcelVolume}</strong>
                    </div>
                  </div>

                  <p className="onboarding-recommendation-note">Submitted by {item.submittedBy} on {item.submittedAt}</p>
                </div>

                <button type="button" className="icon-button onboarding-view-button" onClick={() => openRecommendationDetails(item)}>
                  <Icon name="eye" className="inline-icon" />
                </button>
              </div>
            ))}
          </div>
        </article>
      ) : activeTab === 'Offer Letters' && visibleItems.length ? (
        <article className="workspace-card onboarding-results-card onboarding-offer-letters-card">
          <div className="onboarding-recommendations-head">
            <strong>Offer Letters</strong>
            <span>{visibleItems.length} offer letter(s) found</span>
          </div>

          <div className="onboarding-recommendations-list">
            {visibleItems.map((item) => (
              <div key={item.id} className="onboarding-recommendation-row onboarding-offer-row">
                <div className="onboarding-recommendation-main">
                  <div className="onboarding-recommendation-title">
                    <strong>{item.company}</strong>
                    <span className={`shipment-status onboarding-status-pill onboarding-status-${item.status.replace(/\s+/g, '-')}`}>{item.status}</span>
                  </div>

                  <div className="onboarding-offer-meta">
                    <div>
                      <strong>{item.reference}</strong>
                    </div>
                    <div>
                      <strong>Valid until: {item.validUntil}</strong>
                    </div>
                    <div>
                      <strong>Destinations: {item.destinations}</strong>
                    </div>
                    <div>
                      <strong>{item.rateMatrix}</strong>
                    </div>
                  </div>

                  <p className="onboarding-recommendation-note">
                    Issued on {item.issueDate} | Sent on {item.sentDate}
                  </p>
                </div>

                <div className="onboarding-offer-actions">
                  <button type="button" className="secondary-button onboarding-preview-button" onClick={() => openOfferLetterPreview(item)}>
                    <Icon name="eye" className="inline-icon" />
                    <span>Preview</span>
                  </button>
                  <button type="button" className="icon-button onboarding-view-button" onClick={() => onDownload(item.reference)}>
                    <Icon name="download" className="inline-icon" />
                  </button>
                  <button type="button" className="icon-button onboarding-view-button" onClick={() => onSend(item.reference)}>
                    <Icon name="mail" className="inline-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>
      ) : activeTab === 'Service Contracts' && visibleItems.length ? (
        <article className="workspace-card onboarding-results-card onboarding-offer-letters-card">
          <div className="onboarding-recommendations-head">
            <strong>Service Contracts</strong>
            <span>{visibleItems.length} contract(s) found</span>
          </div>

          <div className="onboarding-recommendations-list">
            {visibleItems.map((item) => (
              <div key={item.id} className="onboarding-recommendation-row onboarding-offer-row">
                <div className="onboarding-recommendation-main">
                  <div className="onboarding-recommendation-title">
                    <strong>{item.company}</strong>
                    <span className={`shipment-status onboarding-status-pill onboarding-status-${item.status.replace(/\s+/g, '-')}`}>{item.status}</span>
                  </div>

                  <div className="onboarding-contract-meta">
                    <div>
                      <strong>{item.reference}</strong>
                    </div>
                    <div>
                      <strong>{item.activeRange}</strong>
                    </div>
                    <div>
                      <strong>Credit: {item.credit}</strong>
                    </div>
                    <div>
                      <strong>{item.billing}</strong>
                    </div>
                  </div>

                  <p className="onboarding-recommendation-note">
                    Created on {item.createdAt}
                    {item.signedAt ? ` | Signed on ${item.signedAt}` : ''}
                  </p>
                </div>

                <button type="button" className="secondary-button onboarding-preview-button" onClick={() => openContractDetails(item)}>
                  <Icon name="eye" className="inline-icon" />
                  <span>View</span>
                </button>
              </div>
            ))}
          </div>
        </article>
      ) : activeTab === 'Customer Profiles' && visibleItems.length ? (
        <article className="workspace-card onboarding-results-card onboarding-offer-letters-card">
          <div className="onboarding-recommendations-head">
            <strong>Customer Profiles</strong>
            <span>{visibleItems.length} customer profile(s) found</span>
          </div>

          <div className="onboarding-recommendations-list">
            {visibleItems.map((item) => (
              <div key={item.id} className="onboarding-recommendation-row onboarding-offer-row">
                <div className="onboarding-recommendation-main">
                  <div className="onboarding-recommendation-title">
                    <strong>{item.company}</strong>
                    <span className={`shipment-status onboarding-status-pill onboarding-status-${item.status.replace(/\s+/g, '-')}`}>{item.status}</span>
                  </div>

                  <div className="onboarding-profile-meta">
                    <div>
                      <strong>{item.customerId}</strong>
                    </div>
                    <div>
                      <strong>{item.email}</strong>
                    </div>
                    <div>
                      <strong>Credit: {item.credit}</strong>
                    </div>
                    <div>
                      <strong>{item.parcelVolume}</strong>
                    </div>
                  </div>

                  <p className="onboarding-recommendation-note">
                    Activated on {item.activatedAt}
                    {item.shipmentSummary ? ` • ${item.shipmentSummary}` : ''}
                    {item.revenueSummary ? ` • ${item.revenueSummary}` : ''}
                  </p>
                </div>

                <button type="button" className="secondary-button onboarding-preview-button" onClick={() => openCustomerProfileDetails(item)}>
                  <Icon name="eye" className="inline-icon" />
                  <span>View Details</span>
                </button>
              </div>
            ))}
          </div>
        </article>
      ) : activeTab === 'Notifications' && visibleItems.length ? (
        <article className="workspace-card onboarding-results-card onboarding-offer-letters-card">
          <div className="onboarding-recommendations-head">
            <strong>Department Notifications</strong>
            <span>{visibleItems.length} notification(s) found</span>
          </div>

          <div className="onboarding-recommendations-list">
            {visibleItems.map((item) => (
              <div key={item.id} className="onboarding-notification-row">
                <div className="onboarding-notification-head">
                  <div className="onboarding-notification-badges">
                    <span className={`shipment-status onboarding-notification-department onboarding-notification-department-${item.department.toLowerCase()}`}>
                      {item.department}
                    </span>
                    <span className={`shipment-status onboarding-status-pill onboarding-status-${item.status.replace(/\s+/g, '-')}`}>{item.status}</span>
                  </div>
                  <span className="onboarding-notification-date">{item.date}</span>
                </div>

                <div className="onboarding-notification-company">
                  <Icon name="users" className="inline-icon" />
                  <div>
                    <strong>{item.company}</strong>
                    <span>{item.customerId}</span>
                  </div>
                </div>

                <div className="onboarding-notification-subject">
                  <Icon name="bell" className="inline-icon" />
                  <strong>{item.subject}</strong>
                </div>

                <p className="onboarding-notification-message">{item.message}</p>

                <div className="onboarding-notification-footer">
                  <div className="onboarding-notification-recipient">
                    <Icon name="mail" className="inline-icon" />
                    <span>{item.recipient}</span>
                    {item.status === 'sent' ? <span className="onboarding-notification-sent-label">• {item.sentLabel}</span> : null}
                  </div>

                  {item.status === 'pending' ? (
                    <button type="button" className="tracking-search-button onboarding-send-now-button" onClick={() => onSend(item.id)}>
                      <Icon name="send" className="tracking-search-button-icon" />
                      <span>Send Now</span>
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </article>
      ) : visibleItems.length ? (
        <article className="workspace-card onboarding-results-card">
          <div className="onboarding-results-head">
            <strong>{activeTab}</strong>
            <span>
              {visibleItems.length} record{visibleItems.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="list-stack onboarding-list-stack">
            {visibleItems.map((item) => (
              <div key={item.id} className="list-row onboarding-list-row">
                <div>
                  <strong>{item.company}</strong>
                  <span>{item.reference}</span>
                </div>
                <div>
                  <strong>{item.contact}</strong>
                  <span>{item.type}</span>
                </div>
                <div>
                  <strong className="onboarding-status-label">Status</strong>
                  <span className={`shipment-status onboarding-status-pill onboarding-status-${item.status.replace(/\s+/g, '-')}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      ) : (
        <article className="workspace-card onboarding-results-card onboarding-empty-card">
          <strong>No matching onboarding records</strong>
          <span>Try another tab or clear the status filter.</span>
        </article>
      )}</>
      )}
    </>
  );
}
