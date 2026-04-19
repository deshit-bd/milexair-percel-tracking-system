export function formatAmount(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatTitleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getManifestTone(status) {
  switch (status) {
    case 'in transit':
    case 'in_transit':
      return 'indigo';
    case 'received':
      return 'green';
    case 'created':
      return 'amber-soft';
    case 'sorting':
      return 'blue';
    case 'closed':
      return 'slate';
    default:
      return 'slate';
  }
}

export function formatManifestLabel(status) {
  if (status === 'in transit') {
    return 'in_transit';
  }

  return status;
}
