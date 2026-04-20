function getShipmentTone(status) {
  switch (status) {
    case 'delivered':
      return 'green';
    case 'pending':
    case 'booked':
    case 'out for delivery':
      return 'amber-soft';
    case 'in transit':
      return 'indigo';
    case 'sorting':
      return 'purple';
    case 'hub':
      return 'slate';
    case 'customs clearance':
      return 'rose';
    case 'kyc pending':
      return 'orange-dark';
    case 'air cargo':
      return 'blue';
    default:
      return 'slate';
  }
}

function normalizeStatus(status) {
  return status.replace(/_/g, ' ');
}

function buildTimeline(status, scope) {
  const normalizedStatus = normalizeStatus(status);
  const base = ['Booked', 'Processing'];

  if (scope === 'international') {
    base.push('Export Review');
  }

  if (normalizedStatus === 'booked') {
    return [...base, 'Shipment Booked'];
  }
  if (normalizedStatus === 'hub') {
    return [...base, 'Hub Arrival'];
  }
  if (normalizedStatus === 'sorting') {
    return [...base, 'Sorting'];
  }
  if (normalizedStatus === 'in transit') {
    return [...base, 'Departed Hub', 'In Transit'];
  }
  if (normalizedStatus === 'out for delivery') {
    return [...base, 'In Transit', 'Out for Delivery'];
  }
  if (normalizedStatus === 'customs clearance') {
    return [...base, 'At Customs', 'Clearance Review'];
  }
  if (normalizedStatus === 'kyc pending') {
    return [...base, 'KYC Verification'];
  }
  if (normalizedStatus === 'air cargo') {
    return [...base, 'Airport Handling'];
  }
  if (normalizedStatus === 'delivered') {
    return [...base, 'Out for Delivery', 'Delivered'];
  }

  return [...base, normalizedStatus];
}

function createShipment(record) {
  const normalizedStatus = normalizeStatus(record.status);
  const international = record.scope === 'international';

  return {
    id: record.id,
    createdAt: record.createdAt,
    senderName: record.senderName,
    senderCity: record.senderCity,
    receiverName: record.receiverName,
    receiverCity: record.receiverCity,
    city: record.receiverCity,
    status: normalizedStatus,
    amount: record.amount,
    tone: getShipmentTone(normalizedStatus),
    service: record.service,
    manifest: `MNF-${record.branch.replace(/\s+/g, '-').toUpperCase()}`,
    eta: record.createdAt,
    international,
    kyc: normalizedStatus === 'kyc pending',
    customer: `${record.senderName} to ${record.receiverName}`,
    timeline: buildTimeline(record.status, record.scope),
    scope: record.scope,
    weightKg: record.weightKg,
    branch: record.branch,
    codAmount: record.codAmount || null,
  };
}

export const shipmentSeed = [
  { id: 'CN1776589983461204', createdAt: '4/6/2026', senderName: 'Person 426', senderCity: 'Dallas, Georgia', receiverName: 'Person 252', receiverCity: 'Philadelphia, Texas', scope: 'domestic', service: 'overnight', weightKg: 19.1, status: 'booked', branch: 'Main Branch', amount: 604.04 },
  { id: 'CN1776589983466825', createdAt: '3/24/2026', senderName: 'Person 394', senderCity: 'New York, Illinois', receiverName: 'Person 641', receiverCity: 'Houston, Georgia', scope: 'domestic', service: 'standard', weightKg: 9.1, status: 'delivered', branch: 'Main Branch', amount: 92.09 },
  { id: 'CN1776589983466513', createdAt: '3/22/2026', senderName: 'Person 140', senderCity: 'New York, Pennsylvania', receiverName: 'Person 463', receiverCity: 'Chicago, Texas', scope: 'domestic', service: 'express', weightKg: 24.3, status: 'hub', branch: 'South Branch', amount: 461.09 },
  { id: 'CN1776589983466429', createdAt: '3/22/2026', senderName: 'Person 949', senderCity: 'Los Angeles, North Carolina', receiverName: 'Person 48', receiverCity: 'Philadelphia, Florida', scope: 'domestic', service: 'economy', weightKg: 22, status: 'in transit', branch: 'East Branch', amount: 278.3 },
  { id: 'CN177658998346615', createdAt: '4/4/2026', senderName: 'Person 475', senderCity: 'San Jose, California', receiverName: 'Person 652', receiverCity: 'New York, New York', scope: 'domestic', service: 'express', weightKg: 26.1, status: 'sorting', branch: 'Main Branch', amount: 396.2 },
  { id: 'CN1776589983466320', createdAt: '3/30/2026', senderName: 'Person 441', senderCity: 'New York, Ohio', receiverName: 'Person 812', receiverCity: 'Houston, Florida', scope: 'domestic', service: 'standard', weightKg: 24.2, status: 'booked', branch: 'North Branch', amount: 306.13 },
  { id: 'CN1776589983466416', createdAt: '4/10/2026', senderName: 'Person 799', senderCity: 'Dallas, Pennsylvania', receiverName: 'Person 526', receiverCity: 'Phoenix, California', scope: 'domestic', service: 'express', weightKg: 43.5, status: 'booked', branch: 'South Branch', amount: 660.33 },
  { id: 'CN1776589983467298', createdAt: '3/29/2026', senderName: 'Person 531', senderCity: 'San Antonio, Pennsylvania', receiverName: 'Person 711', receiverCity: 'Chicago, Arizona', scope: 'domestic', service: 'overnight', weightKg: 8, status: 'sorting', branch: 'North Branch', amount: 253.0 },
  { id: 'CN1776589983467170', createdAt: '4/4/2026', senderName: 'Person 40', senderCity: 'San Antonio, Illinois', receiverName: 'Person 752', receiverCity: 'Los Angeles, California', scope: 'international', service: 'standard', weightKg: 4.8, status: 'pending', branch: 'Main Branch', amount: 212.52 },
  { id: 'CN1776589983467988', createdAt: '3/22/2026', senderName: 'Person 764', senderCity: 'Dallas, Georgia', receiverName: 'Person 50', receiverCity: 'Austin, Illinois', scope: 'domestic', service: 'express', weightKg: 27.2, status: 'out for_delivery', branch: 'Main Branch', amount: 688.16 },
  { id: 'CN1776589983467134', createdAt: '3/29/2026', senderName: 'Person 677', senderCity: 'San Jose, Georgia', receiverName: 'Person 347', receiverCity: 'Austin, Illinois', scope: 'domestic', service: 'overnight', weightKg: 39.1, status: 'delivered', branch: 'Main Branch', amount: 1251.8, codAmount: 763 },
  { id: 'CN1776589983467427', createdAt: '3/28/2026', senderName: 'Person 509', senderCity: 'San Antonio, Florida', receiverName: 'Person 868', receiverCity: 'Phoenix, Illinois', scope: 'international', service: 'express', weightKg: 39.5, status: 'pending', branch: 'East Branch', amount: 2498.38 },
  { id: 'CN1776589983467996', createdAt: '4/16/2026', senderName: 'Person 794', senderCity: 'Phoenix, Arizona', receiverName: 'Person 351', receiverCity: 'Phoenix, Pennsylvania', scope: 'domestic', service: 'standard', weightKg: 12.5, status: 'hub', branch: 'South Branch', amount: 179.25, codAmount: 1056 },
  { id: 'CN1776589983467334', createdAt: '4/13/2026', senderName: 'Person 760', senderCity: 'New York, California', receiverName: 'Person 407', receiverCity: 'Los Angeles, New York', scope: 'domestic', service: 'economy', weightKg: 38.3, status: 'pending', branch: 'East Branch', amount: 242.25 },
  { id: 'CN1776589983467827', createdAt: '4/14/2026', senderName: 'Person 123', senderCity: 'San Antonio, California', receiverName: 'Person 164', receiverCity: 'Houston, California', scope: 'domestic', service: 'economy', weightKg: 2.6, status: 'hub', branch: 'East Branch', amount: 31.63 },
  { id: 'CN1776589983467136', createdAt: '3/30/2026', senderName: 'Person 134', senderCity: 'Houston, California', receiverName: 'Person 259', receiverCity: 'Dallas, Texas', scope: 'domestic', service: 'express', weightKg: 42.1, status: 'hub', branch: 'Main Branch', amount: 1065.13 },
  { id: 'CN1776589983467172', createdAt: '4/2/2026', senderName: 'Person 894', senderCity: 'Chicago, Texas', receiverName: 'Person 751', receiverCity: 'Houston, North Carolina', scope: 'international', service: 'express', weightKg: 1.8, status: 'booked', branch: 'South Branch', amount: 272.16, codAmount: 958 },
  { id: 'CN1776589983468839', createdAt: '4/1/2026', senderName: 'Person 271', senderCity: 'Los Angeles, Arizona', receiverName: 'Person 520', receiverCity: 'Houston, Texas', scope: 'domestic', service: 'economy', weightKg: 37.5, status: 'sorting', branch: 'Main Branch', amount: 474.38 },
  { id: 'CN17765899834680', createdAt: '4/6/2026', senderName: 'Person 57', senderCity: 'San Antonio, Georgia', receiverName: 'Person 868', receiverCity: 'Phoenix, Ohio', scope: 'domestic', service: 'economy', weightKg: 17.2, status: 'hub', branch: 'East Branch', amount: 217.58 },
  { id: 'CN1776589983468873', createdAt: '3/20/2026', senderName: 'Person 79', senderCity: 'San Jose, Arizona', receiverName: 'Person 810', receiverCity: 'Phoenix, Georgia', scope: 'domestic', service: 'overnight', weightKg: 47.5, status: 'hub', branch: 'North Branch', amount: 1201.75 },
  { id: 'CN177658998346833', createdAt: '4/2/2026', senderName: 'Person 1', senderCity: 'Phoenix, Arizona', receiverName: 'Person 364', receiverCity: 'Houston, Ohio', scope: 'international', service: 'economy', weightKg: 44, status: 'customs clearance', branch: 'Main Branch', amount: 1391.5 },
].map(createShipment);

export const statCards = [
  { label: 'Total Shipments', value: '150', note: '+1 today', tone: 'blue', icon: 'cube', target: 'shipments', filter: 'all' },
  { label: 'Pending Deliveries', value: '130', note: '12 out for delivery', tone: 'orange', icon: 'clock', target: 'shipments', filter: 'pending' },
  { label: 'Delivered Today', value: '8', note: 'On-time delivery rate: 98%', tone: 'green', icon: 'check', target: 'shipments', filter: 'delivered' },
  { label: 'Monthly Revenue', value: '$69,020.59', note: '+12.5% from last month', tone: 'violet', icon: 'trend', target: 'reports' },
  { label: 'Active Manifests', value: '8', note: 'Currently in transit', tone: 'purple', icon: 'layers', target: 'manifest' },
  { label: 'Pending Invoices', value: '5', note: '$22,457.58 outstanding', tone: 'red', icon: 'receipt', target: 'invoices' },
  { label: 'KYC Pending', value: '4', note: 'International shipments', tone: 'amber', icon: 'alert', target: 'international' },
  { label: 'Customs Clearance', value: '6', note: 'Awaiting clearance', tone: 'orange-dark', icon: 'globe', target: 'international' },
];

export const trendPoints = [6, 3, 5, 7, 1, 4, 1];
export const trendDates = ['Apr 13', 'Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', '', 'Apr 19'];
export const statusItems = [
  { label: 'Pending', value: '33%', percent: 33, count: 27, color: '#3f7ae0' },
  { label: 'Customs', value: '7%', percent: 7, count: 6, color: '#8b5cf6' },
  { label: 'Delivered', value: '24%', percent: 24, count: 20, color: '#f44343' },
  { label: 'Out For Delivery', value: '14%', percent: 14, count: 11, color: '#f59e0b' },
  { label: 'In Transit', value: '22%', percent: 22, count: 18, color: '#10b981' },
];

export const serviceItems = [
  { label: 'Express', value: 35 },
  { label: 'Standard', value: 34, highlighted: true },
  { label: 'Economy', value: 40 },
  { label: 'Overnight', value: 41 },
];

export const manifestSeed = [
  { id: 'MN17765899834790', manifestType: 'hub_transfer', status: 'received', fromBranch: 'North Branch', toBranch: 'Main Branch', scanned: 6, total: 7, vehicle: 'VH-5195', driverLabel: 'Driver 1' },
  { id: 'MN17765899834791', manifestType: 'delivery', status: 'in_transit', fromBranch: 'East Branch', toBranch: 'Hub Center', scanned: 6, total: 7, vehicle: 'VH-8917', driverLabel: 'Driver 2' },
  { id: 'MN17765899834802', manifestType: 'sorting', status: 'closed', fromBranch: 'North Branch', toBranch: 'North Branch', scanned: 5, total: 7, vehicle: 'VH-5161', driverLabel: 'Driver 3' },
  { id: 'MN17765899834803', manifestType: 'delivery', status: 'received', fromBranch: 'Hub Center', toBranch: 'East Branch', scanned: 3, total: 7, vehicle: 'VH-1187', driverLabel: 'Driver 4' },
  { id: 'MN17765899834804', manifestType: 'sorting', status: 'received', fromBranch: 'North Branch', toBranch: 'North Branch', scanned: 2, total: 7, vehicle: 'VH-4050', driverLabel: 'Driver 5' },
  { id: 'MN17765899834805', manifestType: 'hub_transfer', status: 'received', fromBranch: 'South Branch', toBranch: 'Hub Center', scanned: 6, total: 7, vehicle: 'VH-8286', driverLabel: 'Driver 6' },
  { id: 'MN17765899834806', manifestType: 'hub_transfer', status: 'in_transit', fromBranch: 'South Branch', toBranch: 'Hub Center', scanned: 6, total: 7, vehicle: 'VH-7333', driverLabel: 'Driver 7' },
  { id: 'MN17765899834807', manifestType: 'sorting', status: 'created', fromBranch: 'East Branch', toBranch: 'North Branch', scanned: 5, total: 7, vehicle: 'VH-9351', driverLabel: 'Driver 8' },
  { id: 'MN17765899834808', manifestType: 'delivery', status: 'in_transit', fromBranch: 'Main Branch', toBranch: 'Main Branch', scanned: 3, total: 7, vehicle: 'VH-7495', driverLabel: 'Driver 9' },
  { id: 'MN17765899834809', manifestType: 'delivery', status: 'received', fromBranch: 'Main Branch', toBranch: 'North Branch', scanned: 3, total: 7, vehicle: 'VH-8373', driverLabel: 'Driver 10' },
  { id: 'MN177658998348010', manifestType: 'international', status: 'created', fromBranch: 'North Branch', toBranch: 'North Branch', scanned: 3, total: 7, vehicle: 'VH-4533', driverLabel: 'Driver 11' },
  { id: 'MN177658998348011', manifestType: 'delivery', status: 'closed', fromBranch: 'South Branch', toBranch: 'East Branch', scanned: 4, total: 7, vehicle: 'VH-8836', driverLabel: 'Driver 12' },
  { id: 'MN177658998348012', manifestType: 'delivery', status: 'received', fromBranch: 'South Branch', toBranch: 'North Branch', scanned: 5, total: 7, vehicle: 'VH-4853', driverLabel: 'Driver 13' },
  { id: 'MN177658998348013', manifestType: 'international', status: 'in_transit', fromBranch: 'Hub Center', toBranch: 'South Branch', scanned: 2, total: 7, vehicle: 'VH-7100', driverLabel: 'Driver 14' },
  { id: 'MN177658998348014', manifestType: 'international', status: 'closed', fromBranch: 'Main Branch', toBranch: 'North Branch', scanned: 2, total: 7, vehicle: 'VH-9643', driverLabel: 'Driver 15' },
  { id: 'MN177658998348015', manifestType: 'hub_transfer', status: 'received', fromBranch: 'North Branch', toBranch: 'East Branch', scanned: 4, total: 7, vehicle: 'VH-4474', driverLabel: 'Driver 16' },
  { id: 'MN177658998348016', manifestType: 'hub_transfer', status: 'received', fromBranch: 'South Branch', toBranch: 'North Branch', scanned: 2, total: 7, vehicle: 'VH-3574', driverLabel: 'Driver 17' },
  { id: 'MN177658998348017', manifestType: 'international', status: 'in_transit', fromBranch: 'Main Branch', toBranch: 'East Branch', scanned: 5, total: 7, vehicle: 'VH-9632', driverLabel: 'Driver 18' },
  { id: 'MN177658998348018', manifestType: 'hub_transfer', status: 'received', fromBranch: 'South Branch', toBranch: 'Hub Center', scanned: 0, total: 7, vehicle: 'VH-9454', driverLabel: 'Driver 19' },
  { id: 'MN177658998348019', manifestType: 'hub_transfer', status: 'created', fromBranch: 'South Branch', toBranch: 'Hub Center', scanned: 6, total: 7, vehicle: 'VH-9360', driverLabel: 'Driver 20' },
];

export const internationalShipmentSeed = [
  { id: 'CN1776589983467170', createdAt: '4/4/2026', senderName: 'Person 40', receiverName: 'Person 752', fromCountry: 'UK', toCountry: 'Canada', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983467427', createdAt: '3/28/2026', senderName: 'Person 509', receiverName: 'Person 868', fromCountry: 'USA', toCountry: 'Japan', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983467172', createdAt: '4/2/2026', senderName: 'Person 894', receiverName: 'Person 751', fromCountry: 'France', toCountry: 'Australia', status: 'booked', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN177658998346833', createdAt: '4/2/2026', senderName: 'Person 1', receiverName: 'Person 364', fromCountry: 'USA', toCountry: 'Australia', status: 'customs clearance', kycStatus: 'Verified', customsStatus: 'Pending', actionLabel: 'Clear Customs' },
  { id: 'CN1776589983468980', createdAt: '4/8/2026', senderName: 'Person 138', receiverName: 'Person 71', fromCountry: 'France', toCountry: 'Singapore', status: 'delivered', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983468264', createdAt: '3/27/2026', senderName: 'Person 560', receiverName: 'Person 761', fromCountry: 'Canada', toCountry: 'USA', status: 'customs clearance', kycStatus: 'Verified', customsStatus: 'Pending', actionLabel: 'Clear Customs' },
  { id: 'CN1776589983468146', createdAt: '3/22/2026', senderName: 'Person 170', receiverName: 'Person 154', fromCountry: 'Germany', toCountry: 'USA', status: 'kyc pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: 'Verify KYC' },
  { id: 'CN1776589983468452', createdAt: '4/1/2026', senderName: 'Person 294', receiverName: 'Person 186', fromCountry: 'Canada', toCountry: 'France', status: 'delivered', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983468535', createdAt: '3/28/2026', senderName: 'Person 934', receiverName: 'Person 122', fromCountry: 'USA', toCountry: 'Germany', status: 'air cargo', kycStatus: 'Verified', customsStatus: 'submitted', actionLabel: '' },
  { id: 'CN1776589983468887', createdAt: '4/12/2026', senderName: 'Person 328', receiverName: 'Person 403', fromCountry: 'USA', toCountry: 'Canada', status: 'kyc pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: 'Verify KYC' },
  { id: 'CN1776589983468891', createdAt: '4/18/2026', senderName: 'Person 503', receiverName: 'Person 595', fromCountry: 'UK', toCountry: 'Canada', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983471481', createdAt: '4/5/2026', senderName: 'Person 331', receiverName: 'Person 112', fromCountry: 'Germany', toCountry: 'Australia', status: 'customs clearance', kycStatus: 'Verified', customsStatus: 'Pending', actionLabel: 'Clear Customs' },
  { id: 'CN177658998347186', createdAt: '4/16/2026', senderName: 'Person 791', receiverName: 'Person 637', fromCountry: 'Singapore', toCountry: 'Australia', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983471166', createdAt: '4/1/2026', senderName: 'Person 742', receiverName: 'Person 935', fromCountry: 'Singapore', toCountry: 'UK', status: 'customs clearance', kycStatus: 'Verified', customsStatus: 'Pending', actionLabel: 'Clear Customs' },
  { id: 'CN1776589983472837', createdAt: '3/23/2026', senderName: 'Person 608', receiverName: 'Person 473', fromCountry: 'Japan', toCountry: 'Germany', status: 'booked', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983472222', createdAt: '4/1/2026', senderName: 'Person 139', receiverName: 'Person 186', fromCountry: 'France', toCountry: 'UK', status: 'in transit', kycStatus: 'Verified', customsStatus: 'submitted', actionLabel: '' },
  { id: 'CN1776589983472372', createdAt: '4/17/2026', senderName: 'Person 935', receiverName: 'Person 380', fromCountry: 'Germany', toCountry: 'France', status: 'booked', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN177658998347293', createdAt: '3/29/2026', senderName: 'Person 855', receiverName: 'Person 676', fromCountry: 'USA', toCountry: 'Singapore', status: 'booked', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN177658998347328', createdAt: '4/3/2026', senderName: 'Person 177', receiverName: 'Person 532', fromCountry: 'France', toCountry: 'Japan', status: 'booked', kycStatus: 'Verified', customsStatus: 'submitted', actionLabel: '' },
  { id: 'CN1776589983473438', createdAt: '4/8/2026', senderName: 'Person 244', receiverName: 'Person 87', fromCountry: 'France', toCountry: 'Germany', status: 'in transit', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983473995', createdAt: '4/12/2026', senderName: 'Person 474', receiverName: 'Person 16', fromCountry: 'Canada', toCountry: 'Japan', status: 'air cargo', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983473160', createdAt: '3/31/2026', senderName: 'Person 521', receiverName: 'Person 318', fromCountry: 'USA', toCountry: 'Germany', status: 'in transit', kycStatus: 'Verified', customsStatus: 'cleared', actionLabel: '' },
  { id: 'CN1776589983473121', createdAt: '4/16/2026', senderName: 'Person 66', receiverName: 'Person 90', fromCountry: 'Canada', toCountry: 'UK', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983473320', createdAt: '4/10/2026', senderName: 'Person 860', receiverName: 'Person 239', fromCountry: 'Singapore', toCountry: 'Canada', status: 'kyc pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: 'Verify KYC' },
  { id: 'CN1776589983473390', createdAt: '3/21/2026', senderName: 'Person 760', receiverName: 'Person 942', fromCountry: 'Canada', toCountry: 'Japan', status: 'customs clearance', kycStatus: 'Verified', customsStatus: 'Pending', actionLabel: 'Clear Customs' },
  { id: 'CN1776589983474790', createdAt: '4/12/2026', senderName: 'Person 657', receiverName: 'Person 400', fromCountry: 'USA', toCountry: 'France', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983474103', createdAt: '3/25/2026', senderName: 'Person 104', receiverName: 'Person 156', fromCountry: 'Australia', toCountry: 'Germany', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983474254', createdAt: '3/28/2026', senderName: 'Person 657', receiverName: 'Person 272', fromCountry: 'Singapore', toCountry: 'Canada', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983474775', createdAt: '4/16/2026', senderName: 'Person 680', receiverName: 'Person 420', fromCountry: 'Germany', toCountry: 'UK', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983474550', createdAt: '3/26/2026', senderName: 'Person 398', receiverName: 'Person 432', fromCountry: 'Japan', toCountry: 'UK', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983474697', createdAt: '3/28/2026', senderName: 'Person 309', receiverName: 'Person 394', fromCountry: 'Australia', toCountry: 'Singapore', status: 'booked', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983474968', createdAt: '4/19/2026', senderName: 'Person 802', receiverName: 'Person 785', fromCountry: 'USA', toCountry: 'Canada', status: 'customs clearance', kycStatus: 'Verified', customsStatus: 'Pending', actionLabel: 'Clear Customs' },
  { id: 'CN177658998347488', createdAt: '3/31/2026', senderName: 'Person 924', receiverName: 'Person 331', fromCountry: 'Canada', toCountry: 'France', status: 'delivered', kycStatus: 'Verified', customsStatus: 'submitted', actionLabel: '' },
  { id: 'CN1776589983474947', createdAt: '4/6/2026', senderName: 'Person 923', receiverName: 'Person 545', fromCountry: 'Japan', toCountry: 'Germany', status: 'air cargo', kycStatus: 'Verified', customsStatus: 'cleared', actionLabel: '' },
  { id: 'CN1776589983474719', createdAt: '3/30/2026', senderName: 'Person 701', receiverName: 'Person 954', fromCountry: 'Australia', toCountry: 'Canada', status: 'booked', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983475409', createdAt: '3/29/2026', senderName: 'Person 645', receiverName: 'Person 821', fromCountry: 'France', toCountry: 'Singapore', status: 'delivered', kycStatus: 'Verified', customsStatus: 'cleared', actionLabel: '' },
  { id: 'CN177658998347533', createdAt: '4/13/2026', senderName: 'Person 891', receiverName: 'Person 283', fromCountry: 'France', toCountry: 'Australia', status: 'kyc pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: 'Verify KYC' },
  { id: 'CN1776589983475647', createdAt: '4/14/2026', senderName: 'Person 297', receiverName: 'Person 331', fromCountry: 'UK', toCountry: 'France', status: 'in transit', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983475381', createdAt: '4/4/2026', senderName: 'Person 94', receiverName: 'Person 182', fromCountry: 'Germany', toCountry: 'Germany', status: 'pending', kycStatus: 'Not Submitted', customsStatus: 'Pending', actionLabel: '' },
  { id: 'CN1776589983475232', createdAt: '4/4/2026', senderName: 'Person 798', receiverName: 'Person 559', fromCountry: 'Australia', toCountry: 'Singapore', status: 'delivered', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983475821', createdAt: '4/6/2026', senderName: 'Person 235', receiverName: 'Person 251', fromCountry: 'Germany', toCountry: 'Singapore', status: 'air cargo', kycStatus: 'Verified', customsStatus: 'approved', actionLabel: '' },
  { id: 'CN1776589983475388', createdAt: '3/30/2026', senderName: 'Person 829', receiverName: 'Person 196', fromCountry: 'UK', toCountry: 'Australia', status: 'air cargo', kycStatus: 'Verified', customsStatus: 'submitted', actionLabel: '' },
];

export const invoiceSeed = [
  { id: 'INV-2026-10000', customer: 'Customer 1', customerCode: 'CUST100', issueDate: '4/16/2026', dueDate: '5/16/2026', amount: 1831.72, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10001', customer: 'Customer 2', customerCode: 'CUST101', issueDate: '3/5/2026', dueDate: '4/4/2026', amount: 2120.14, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10002', customer: 'Customer 3', customerCode: 'CUST102', issueDate: '2/20/2026', dueDate: '3/22/2026', amount: 4203.31, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10003', customer: 'Customer 4', customerCode: 'CUST103', issueDate: '3/3/2026', dueDate: '4/2/2026', overdueLabel: '17 days overdue', amount: 3231.0, shipments: 5, status: 'overdue' },
  { id: 'INV-2026-10004', customer: 'Customer 5', customerCode: 'CUST104', issueDate: '4/11/2026', dueDate: '5/11/2026', amount: 4903.54, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10005', customer: 'Customer 6', customerCode: 'CUST105', issueDate: '3/7/2026', dueDate: '4/6/2026', amount: 5889.53, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10006', customer: 'Customer 7', customerCode: 'CUST106', issueDate: '3/5/2026', dueDate: '4/4/2026', amount: 5462.06, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10007', customer: 'Customer 8', customerCode: 'CUST107', issueDate: '4/14/2026', dueDate: '5/14/2026', amount: 3299.88, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10008', customer: 'Customer 9', customerCode: 'CUST108', issueDate: '3/29/2026', dueDate: '4/28/2026', amount: 2135.71, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10009', customer: 'Customer 10', customerCode: 'CUST109', issueDate: '4/17/2026', dueDate: '5/17/2026', amount: 6767.12, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10010', customer: 'Customer 11', customerCode: 'CUST110', issueDate: '3/28/2026', dueDate: '4/27/2026', amount: 3752.25, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10011', customer: 'Customer 12', customerCode: 'CUST111', issueDate: '3/12/2026', dueDate: '4/11/2026', amount: 2245.39, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10012', customer: 'Customer 13', customerCode: 'CUST112', issueDate: '3/25/2026', dueDate: '4/24/2026', amount: 7443.68, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10013', customer: 'Customer 14', customerCode: 'CUST113', issueDate: '4/13/2026', dueDate: '5/13/2026', amount: 3116.59, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10014', customer: 'Customer 15', customerCode: 'CUST114', issueDate: '3/1/2026', dueDate: '3/31/2026', overdueLabel: '19 days overdue', amount: 4657.49, shipments: 5, status: 'overdue' },
  { id: 'INV-2026-10015', customer: 'Customer 16', customerCode: 'CUST115', issueDate: '4/15/2026', dueDate: '5/15/2026', amount: 2452.58, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10016', customer: 'Customer 17', customerCode: 'CUST116', issueDate: '3/14/2026', dueDate: '4/13/2026', amount: 2277.87, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10017', customer: 'Customer 18', customerCode: 'CUST117', issueDate: '3/25/2026', dueDate: '4/24/2026', amount: 2953.32, shipments: 5, status: 'sent' },
  { id: 'INV-2026-10018', customer: 'Customer 19', customerCode: 'CUST118', issueDate: '2/27/2026', dueDate: '3/29/2026', overdueLabel: '21 days overdue', amount: 6668.46, shipments: 5, status: 'overdue' },
  { id: 'INV-2026-10019', customer: 'Customer 20', customerCode: 'CUST119', issueDate: '2/26/2026', dueDate: '3/28/2026', amount: 3437.48, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10020', customer: 'Customer 21', customerCode: 'CUST120', issueDate: '2/19/2026', dueDate: '3/21/2026', amount: 3072.58, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10021', customer: 'Customer 22', customerCode: 'CUST121', issueDate: '2/18/2026', dueDate: '3/20/2026', amount: 4719.38, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10022', customer: 'Customer 23', customerCode: 'CUST122', issueDate: '3/20/2026', dueDate: '4/19/2026', amount: 1856.76, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10023', customer: 'Customer 24', customerCode: 'CUST123', issueDate: '4/3/2026', dueDate: '5/3/2026', amount: 4511.32, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10024', customer: 'Customer 25', customerCode: 'CUST124', issueDate: '3/31/2026', dueDate: '4/30/2026', amount: 4947.31, shipments: 5, status: 'sent' },
  { id: 'INV-2026-10025', customer: 'Customer 26', customerCode: 'CUST125', issueDate: '3/13/2026', dueDate: '4/12/2026', amount: 7523.64, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10026', customer: 'Customer 27', customerCode: 'CUST126', issueDate: '4/18/2026', dueDate: '5/18/2026', amount: 2691.92, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10027', customer: 'Customer 28', customerCode: 'CUST127', issueDate: '4/6/2026', dueDate: '5/6/2026', amount: 2537.62, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10028', customer: 'Customer 29', customerCode: 'CUST128', issueDate: '4/1/2026', dueDate: '5/1/2026', amount: 1030.97, shipments: 5, status: 'paid' },
  { id: 'INV-2026-10029', customer: 'Customer 30', customerCode: 'CUST129', issueDate: '3/28/2026', dueDate: '4/27/2026', amount: 2245.33, shipments: 5, status: 'paid' },
];

export const onboardingSeed = [
  {
    id: 'REC-100',
    company: 'Global Trade Solutions Ltd',
    contact: 'Sarah Johnson',
    reference: 'REF-2026-000245',
    status: 'approved',
    type: 'Recommendations',
    country: 'USA',
    parcelVolume: '500 parcels/month',
    submittedBy: 'Ahmed Rahman',
    submittedAt: '3/25/2026',
    details: {
      phone: '+880-1712-345678',
      email: 'sarah.j@globaltradesolutions.com',
      address: 'House 45, Road 12, Gulshan-2, Dhaka',
      businessType: 'E-commerce',
      monthlyVolume: '500 parcels',
      monthlyValue: '$25,000',
      serviceRequired: 'Freight Forwarding',
      primaryDestination: 'USA',
      areaName: 'Dhaka',
      zoneName: 'North',
      expectedRate: '$45/kg',
      salesperson: 'Ahmed Rahman',
      department: 'Sales - Corporate',
      submissionDate: '3/25/2026',
      reviewedBy: 'Director - Operations',
      reviewDate: '3/27/2026',
      reviewNotes: 'Approved with standard corporate rates for USA shipments',
      creditLimit: '$50,000',
      accountMode: 'Prepaid',
      creditPeriod: '30 days',
      accountType: 'Corporate',
    },
  },
  {
    id: 'REC-101',
    company: 'Fashion Express BD',
    contact: 'Kamal Hossain',
    reference: 'REF-2026-000246',
    status: 'under review',
    type: 'Recommendations',
    country: 'UK',
    parcelVolume: '1200 parcels/month',
    submittedBy: 'Fatima Begum',
    submittedAt: '3/28/2026',
    details: {
      phone: '+880-1811-223344',
      email: 'kamal@fashionexpress.com',
      address: 'Plot 18, Sector 7, Uttara, Dhaka',
      businessType: 'Retail',
      monthlyVolume: '1200 parcels',
      monthlyValue: '$42,000',
      serviceRequired: 'Express Delivery',
      primaryDestination: 'UK',
      areaName: 'Dhaka',
      zoneName: 'Central',
      expectedRate: '$39/kg',
      salesperson: 'Fatima Begum',
      department: 'Sales - Corporate',
      submissionDate: '3/28/2026',
      reviewedBy: 'Pending Review',
      reviewDate: '-',
      reviewNotes: 'Awaiting management approval for international pricing.',
      creditLimit: '$100,000',
      accountMode: 'Postpaid',
      creditPeriod: '30 days',
      accountType: 'Corporate',
    },
  },
  {
    id: 'REC-102',
    company: 'Tech Gadgets Pro',
    contact: 'Rashed Ahmed',
    reference: 'REF-2026-000247',
    status: 'submitted',
    type: 'Recommendations',
    country: 'UAE',
    parcelVolume: '300 parcels/month',
    submittedBy: 'Ahmed Rahman',
    submittedAt: '3/30/2026',
    details: {
      phone: '+880-1955-887766',
      email: 'rashed@techgadgets.com',
      address: 'Suite 8B, Banani DOHS, Dhaka',
      businessType: 'Electronics',
      monthlyVolume: '300 parcels',
      monthlyValue: '$18,000',
      serviceRequired: 'Freight Forwarding',
      primaryDestination: 'UAE',
      areaName: 'Dhaka',
      zoneName: 'East',
      expectedRate: '$41/kg',
      salesperson: 'Ahmed Rahman',
      department: 'Sales - SME',
      submissionDate: '3/30/2026',
      reviewedBy: 'Not yet reviewed',
      reviewDate: '-',
      reviewNotes: 'Submitted for operational and pricing review.',
      creditLimit: '$35,000',
      accountMode: 'Prepaid',
      creditPeriod: '15 days',
      accountType: 'Corporate',
    },
  },
  {
    id: 'REC-103',
    company: 'Handicrafts International',
    contact: 'Nadia Islam',
    reference: 'REF-2026-000248',
    status: 'draft',
    type: 'Recommendations',
    country: 'USA',
    parcelVolume: '200 parcels/month',
    submittedBy: 'Fatima Begum',
    submittedAt: '3/31/2026',
    details: {
      phone: '+880-1711-667788',
      email: 'nadia@handicraftsintl.com',
      address: '24 Lake Drive Road, Dhanmondi, Dhaka',
      businessType: 'Handicrafts',
      monthlyVolume: '200 parcels',
      monthlyValue: '$12,000',
      serviceRequired: 'Warehousing',
      primaryDestination: 'USA',
      areaName: 'Dhaka',
      zoneName: 'West',
      expectedRate: '$36/kg',
      salesperson: 'Fatima Begum',
      department: 'Sales - SME',
      submissionDate: '3/31/2026',
      reviewedBy: 'Draft',
      reviewDate: '-',
      reviewNotes: 'Draft saved, awaiting internal completion.',
      creditLimit: '$20,000',
      accountMode: 'Prepaid',
      creditPeriod: '15 days',
      accountType: 'Corporate',
    },
  },
];

export const onboardingOfferLetterSeed = [
  {
    id: 'OL-100',
    company: 'Global Trade Solutions Ltd',
    reference: 'OL-2026-00125',
    status: 'accepted',
    validUntil: '6/25/2026',
    destinations: 'USA',
    rateMatrix: '1 rate matrix',
    issueDate: '3/27/2026',
    sentDate: '3/27/2026',
  },
  {
    id: 'OL-101',
    company: 'Fashion Express BD',
    reference: 'OL-2026-00126',
    status: 'sent',
    validUntil: '6/27/2026',
    destinations: 'UK',
    rateMatrix: '1 rate matrix',
    issueDate: '3/29/2026',
    sentDate: '3/29/2026',
  },
];

export const onboardingContractSeed = [
  {
    id: 'SC-100',
    company: 'Global Trade Solutions Ltd',
    reference: 'SC-2026-00089',
    status: 'active',
    activeRange: '4/1/2026 - 3/31/2027',
    credit: '$50,000',
    billing: 'Weekly billing',
    createdAt: '3/28/2026',
    signedAt: '3/30/2026',
    details: {
      offerLetterReference: 'OL-2026-00125',
      contactPerson: 'Sarah Johnson',
      startDate: '4/1/2026',
      endDate: '3/31/2027',
      rateValidity: '365 days',
      paymentMethod: 'Bank Transfer',
      invoiceCycle: 'Weekly',
      paymentDuePeriod: '15 days',
      specialTerms: 'Volume discount of 5% for shipments exceeding 1000 parcels per month',
      discountConditions: '5% discount on monthly volume > 1000 parcels',
      serviceRestrictions: 'No hazardous materials, Maximum parcel weight: 30kg',
      handlingInstructions: 'Fragile items require special handling approval',
    },
  },
  {
    id: 'SC-101',
    company: 'Fashion Express BD',
    reference: 'SC-2026-00090',
    status: 'pending signature',
    activeRange: '4/1/2026 - 3/31/2027',
    credit: '$100,000',
    billing: 'Monthly billing',
    createdAt: '3/30/2026',
    signedAt: '',
    details: {
      offerLetterReference: 'OL-2026-00126',
      contactPerson: 'Kamal Hossain',
      startDate: '4/1/2026',
      endDate: '3/31/2027',
      rateValidity: '365 days',
      paymentMethod: 'Bank Transfer',
      invoiceCycle: 'Monthly',
      paymentDuePeriod: '30 days',
      specialTerms: 'International packaging inspection required before first pickup',
      discountConditions: 'Discount applicable after three consecutive billing cycles',
      serviceRestrictions: 'No temperature-sensitive items without prior notice',
      handlingInstructions: 'International packaging inspection required.',
    },
  },
];

export const onboardingProfileSeed = [
  {
    id: 'CP-100',
    company: 'Global Trade Solutions Ltd',
    customerId: 'CUST-000458',
    email: 'sarah.j@globaltradesolutions.com',
    status: 'active',
    credit: '$50,000',
    parcelVolume: '500 parcels/month',
    activatedAt: '3/30/2026',
    shipmentSummary: '125 shipments',
    revenueSummary: '$12,500 revenue',
    details: {
      businessType: 'E-commerce',
      contactPerson: 'Sarah Johnson',
      contractNumber: 'SC-2026-00089',
      phone: '+880-1712-345678',
      address: 'House 45, Road 12, Gulshan-2, Dhaka',
      shippingDestinations: ['USA'],
      approvedShippingRates: [
        { destination: 'USA', baseRate: '$45.00' },
      ],
      paymentMethod: 'Bank Transfer',
      invoiceCycle: 'Weekly',
      paymentDue: '15 days',
      departmentNotifications: 'Sent',
      monthlyVolume: '500',
      monthlyVolumeUnit: 'parcels/month',
      totalRevenue: '$12,500',
      totalShipments: '125',
      averageMonthlyVolume: '125',
    },
  },
  {
    id: 'CP-101',
    company: 'Fashion Express BD',
    customerId: 'CUST-000459',
    email: 'kamal@fashionexpress.com',
    status: 'active',
    credit: '$100,000',
    parcelVolume: '1200 parcels/month',
    activatedAt: '3/31/2026',
    shipmentSummary: '',
    revenueSummary: '',
    details: {
      businessType: 'Fashion Retail',
      contactPerson: 'Kamal Hossain',
      contractNumber: 'SC-2026-00090',
      phone: '+880-1811-223344',
      address: 'Plot 18, Avenue 6, Banani, Dhaka',
      shippingDestinations: ['UK', 'UAE'],
      approvedShippingRates: [
        { destination: 'UK', baseRate: '$42.00' },
        { destination: 'UAE', baseRate: '$39.50' },
      ],
      paymentMethod: 'Bank Transfer',
      invoiceCycle: 'Monthly',
      paymentDue: '30 days',
      departmentNotifications: 'Sent',
      monthlyVolume: '1200',
      monthlyVolumeUnit: 'parcels/month',
      totalRevenue: '$28,400',
      totalShipments: '276',
      averageMonthlyVolume: '230',
    },
  },
  {
    id: 'CP-102',
    company: 'Tech Gadgets Pro',
    customerId: 'CUST-000460',
    email: 'rashed@techgadgets.com',
    status: 'inactive',
    credit: '$35,000',
    parcelVolume: '300 parcels/month',
    activatedAt: '3/31/2026',
    shipmentSummary: '',
    revenueSummary: '',
    details: {
      businessType: 'Electronics',
      contactPerson: 'Rashed Karim',
      contractNumber: 'SC-2026-00091',
      phone: '+880-1912-998877',
      address: 'Suite 9B, Tech Park, Mohakhali, Dhaka',
      shippingDestinations: ['UAE'],
      approvedShippingRates: [
        { destination: 'UAE', baseRate: '$37.00' },
      ],
      paymentMethod: 'Bank Transfer',
      invoiceCycle: 'Weekly',
      paymentDue: '15 days',
      departmentNotifications: 'Pending',
      monthlyVolume: '300',
      monthlyVolumeUnit: 'parcels/month',
      totalRevenue: '$4,200',
      totalShipments: '48',
      averageMonthlyVolume: '48',
    },
  },
];

export const onboardingNotificationSeed = [
  {
    id: 'NT-100',
    department: 'Accounts',
    status: 'sent',
    date: '3/30/2026',
    company: 'Global Trade Solutions Ltd',
    customerId: 'CUST-000458',
    subject: 'Billing and invoicing setup',
    message:
      'New customer account activated. Please set up billing profile for CUST-000458 - Global Trade Solutions Ltd. Credit limit: $50,000. Invoice cycle: Weekly. Payment terms: 15 days.',
    recipient: 'accounts@parcellogistics.com',
    sentLabel: 'Sent on 3/30/2026',
  },
  {
    id: 'NT-101',
    department: 'Operations',
    status: 'sent',
    date: '3/30/2026',
    company: 'Global Trade Solutions Ltd',
    customerId: 'CUST-000458',
    subject: 'Shipment pickup readiness',
    message:
      'New customer ready for service. CUST-000458 - Global Trade Solutions Ltd. Primary destination: USA. Expected monthly volume: 500 parcels. Special handling: Fragile items require approval.',
    recipient: 'operations@parcellogistics.com',
    sentLabel: 'Sent on 3/30/2026',
  },
  {
    id: 'NT-102',
    department: 'Sales',
    status: 'sent',
    date: '3/30/2026',
    company: 'Global Trade Solutions Ltd',
    customerId: 'CUST-000458',
    subject: 'Customer activation confirmation',
    message:
      'Customer onboarding completed successfully. CUST-000458 - Global Trade Solutions Ltd is now active and ready to place shipment orders. Sales executive: Ahmed Rahman.',
    recipient: 'sales@parcellogistics.com',
    sentLabel: 'Sent on 3/30/2026',
  },
  {
    id: 'NT-103',
    department: 'Management',
    status: 'sent',
    date: '3/30/2026',
    company: 'Global Trade Solutions Ltd',
    customerId: 'CUST-000458',
    subject: 'Customer onboarding report',
    message:
      'New customer onboarding completed. CUST-000458 - Global Trade Solutions Ltd. Monthly estimated value: $25,000. Contract term: 1 year. Service start date: 2026-04-01.',
    recipient: 'management@parcellogistics.com',
    sentLabel: 'Sent on 3/30/2026',
  },
  {
    id: 'NT-104',
    department: 'Accounts',
    status: 'sent',
    date: '3/31/2026',
    company: 'Fashion Express BD',
    customerId: 'CUST-000459',
    subject: 'Billing and invoicing setup',
    message:
      'New customer account activated. Please set up billing profile for CUST-000459 - Fashion Express BD. Credit limit: $100,000. Invoice cycle: Monthly. Payment terms: 30 days.',
    recipient: 'accounts@parcellogistics.com',
    sentLabel: 'Sent on 3/31/2026',
  },
  {
    id: 'NT-105',
    department: 'Operations',
    status: 'sent',
    date: '3/31/2026',
    company: 'Fashion Express BD',
    customerId: 'CUST-000459',
    subject: 'Shipment pickup readiness',
    message:
      'New customer ready for service. CUST-000459 - Fashion Express BD. Primary destination: UK. Expected monthly volume: 1200 parcels. Special requirement: Packaging inspection for international shipments.',
    recipient: 'operations@parcellogistics.com',
    sentLabel: 'Sent on 3/31/2026',
  },
  {
    id: 'NT-106',
    department: 'Accounts',
    status: 'pending',
    date: '3/31/2026',
    company: 'Tech Gadgets Pro',
    customerId: 'CUST-000460',
    subject: 'Billing and invoicing setup',
    message:
      'New customer account activated. Please set up billing profile for CUST-000460 - Tech Gadgets Pro. Credit limit: $35,000. Invoice cycle: Weekly. Payment terms: 15 days.',
    recipient: 'accounts@parcellogistics.com',
    sentLabel: '',
  },
  {
    id: 'NT-107',
    department: 'Operations',
    status: 'pending',
    date: '3/31/2026',
    company: 'Tech Gadgets Pro',
    customerId: 'CUST-000460',
    subject: 'Shipment pickup readiness',
    message:
      'New customer ready for service. CUST-000460 - Tech Gadgets Pro. Primary destination: UAE. Expected monthly volume: 300 parcels.',
    recipient: 'operations@parcellogistics.com',
    sentLabel: '',
  },
];

export const settingSeed = [
  { id: 'email_alerts', label: 'Email Alerts', enabled: true },
  { id: 'sms_alerts', label: 'SMS Alerts', enabled: false },
  { id: 'auto_manifest', label: 'Auto-create Manifest', enabled: true },
  { id: 'kyc_required', label: 'Require KYC for International', enabled: true },
];
