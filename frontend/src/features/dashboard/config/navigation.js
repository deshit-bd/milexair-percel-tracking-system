export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'shipments', label: 'Shipments', icon: 'cube' },
  { id: 'tracking', label: 'Tracking', icon: 'search' },
  { id: 'manifest', label: 'Manifest', icon: 'layers' },
  { id: 'invoices', label: 'Invoices', icon: 'receipt' },
  { id: 'reports', label: 'Reports', icon: 'chart' },
  { id: 'international', label: 'International', icon: 'globe' },
  { id: 'onboarding', label: 'Onboarding', icon: 'user-plus' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export const sectionRoutes = {
  dashboard: '/superadmin',
  shipments: '/superadmin/shipments',
  tracking: '/superadmin/tracking',
  manifest: '/superadmin/manifest',
  invoices: '/superadmin/invoices',
  reports: '/superadmin/reports',
  international: '/superadmin/international',
  onboarding: '/superadmin/onboarding',
  settings: '/superadmin/settings',
};

export function getSectionFromPath(pathname) {
  const matchedSection = Object.entries(sectionRoutes).find(([, route]) => route === pathname);
  return matchedSection ? matchedSection[0] : 'dashboard';
}
