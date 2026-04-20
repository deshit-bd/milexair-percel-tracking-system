export default function Icon({ name, className = '' }) {
  const props = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M4 10.5 12 4l8 6.5V20H4z" />
          <path {...props} d="M9.5 20v-5h5v5" />
        </svg>
      );
    case 'cube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M12 3 19 7v10l-7 4-7-4V7z" />
          <path {...props} d="M12 3v8m-7-4 7 4 7-4" />
        </svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="11" cy="11" r="6.5" />
          <path {...props} d="M16 16l4 4" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M19 12H5" />
          <path {...props} d="m11 18-6-6 6-6" />
        </svg>
      );
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="m12 4 8 4-8 4-8-4 8-4Z" />
          <path {...props} d="m4 12 8 4 8-4" />
          <path {...props} d="m4 16 8 4 8-4" />
        </svg>
      );
    case 'receipt':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M7 3.5h10v17l-2.5-1.5-2.5 1.5-2.5-1.5-2.5 1.5z" />
          <path {...props} d="M9.5 8.5h5M9.5 12h5M9.5 15.5h3.5" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M5 19V9M12 19V5M19 19v-8" />
          <path {...props} d="M4 19h16" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="12" cy="12" r="8.5" />
          <path {...props} d="M3.5 12h17M12 3.5c2.8 2.4 4.5 5.6 4.5 8.5S14.8 18.1 12 20.5c-2.8-2.4-4.5-5.6-4.5-8.5S9.2 5.9 12 3.5Z" />
        </svg>
      );
    case 'user-plus':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M15.5 19v-1a4.5 4.5 0 0 0-9 0v1" />
          <circle {...props} cx="11" cy="8" r="3.5" />
          <path {...props} d="M19 8v6M16 11h6" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M4.5 18v-.7a3.8 3.8 0 0 1 3.8-3.8h3.4a3.8 3.8 0 0 1 3.8 3.8v.7" />
          <circle {...props} cx="10" cy="8" r="3.1" />
          <path {...props} d="M15.7 13.9h1.1a3.2 3.2 0 0 1 3.2 3.2v.9" />
          <path {...props} d="M16.8 5.5a2.7 2.7 0 1 1 0 5.4" />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="12" cy="12" r="3.2" />
          <path {...props} d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6" />
        </svg>
      );
    case 'clock':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="12" cy="12" r="8.5" />
          <path {...props} d="M12 7.5v5l3.5 2" />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="12" cy="12" r="8.5" />
          <path {...props} d="m8.5 12 2.2 2.2 4.8-5" />
        </svg>
      );
    case 'trend':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M5 15.5 10 10l3.2 3.2L19 7.5" />
          <path {...props} d="M14.5 7.5H19v4.5" />
        </svg>
      );
    case 'alert':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="12" cy="12" r="8.5" />
          <path {...props} d="M12 8v4.5M12 16h.01" />
        </svg>
      );
    case 'bell':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M7.5 16.5V11a4.5 4.5 0 1 1 9 0v5.5l1.5 1.5h-12z" />
          <path {...props} d="M10 19a2.4 2.4 0 0 0 4 0" />
        </svg>
      );
    case 'file-check':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M7 3.5h7l4 4V20.5H7z" />
          <path {...props} d="M14 3.5v4h4" />
          <path {...props} d="m9.5 14.2 1.8 1.8 3.4-3.8" />
        </svg>
      );
    case 'file-text':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M7 3.5h7l4 4V20.5H7z" />
          <path {...props} d="M14 3.5v4h4" />
          <path {...props} d="M9.5 11.5h5M9.5 15h5" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M4.5 7.5h15v9h-15z" />
          <path {...props} d="m5.5 8.5 6.5 5 6.5-5" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M7.5 4.5h3l1.2 3.3-1.7 1.7a14.5 14.5 0 0 0 4.5 4.5l1.7-1.7 3.3 1.2v3a1.5 1.5 0 0 1-1.6 1.5A15.4 15.4 0 0 1 6 5.9 1.5 1.5 0 0 1 7.5 4.5Z" />
        </svg>
      );
    case 'send':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="m4 11.5 15-7-4.5 15-3.2-5.3z" />
          <path {...props} d="M19 4.5 11.3 14" />
        </svg>
      );
    case 'logout':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M10 17v2H5V5h5v2" />
          <path {...props} d="M13 16l4-4-4-4M17 12H9" />
        </svg>
      );
    case 'globe-small':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle {...props} cx="12" cy="12" r="7" />
          <path {...props} d="M5 12h14M12 5c2.2 1.8 3.5 4.3 3.5 7S14.2 17.2 12 19c-2.2-1.8-3.5-4.3-3.5-7S9.8 6.8 12 5Z" />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M12 20s5.5-5.2 5.5-9A5.5 5.5 0 1 0 6.5 11c0 3.8 5.5 9 5.5 9Z" />
          <circle {...props} cx="12" cy="11" r="2.2" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M5 7.5h14v11H5z" />
          <path {...props} d="M8 4.5v3M16 4.5v3M5 10.5h14" />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M2.5 12s3.6-5.5 9.5-5.5S21.5 12 21.5 12s-3.6 5.5-9.5 5.5S2.5 12 2.5 12Z" />
          <circle {...props} cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'print':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M7 9V4.5h10V9" />
          <path {...props} d="M6.5 18.5h11V14h-11z" />
          <path {...props} d="M6 17.5H5A2.5 2.5 0 0 1 2.5 15v-3A2.5 2.5 0 0 1 5 9.5h14A2.5 2.5 0 0 1 21.5 12v3a2.5 2.5 0 0 1-2.5 2.5h-1" />
          <path {...props} d="M17 12h.01" />
        </svg>
      );
    case 'download':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M12 4.5v10" />
          <path {...props} d="m8.5 11 3.5 3.5 3.5-3.5" />
          <path {...props} d="M5 18.5h14" />
        </svg>
      );
    case 'edit':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M4.5 19.5h4l9.7-9.7a1.8 1.8 0 0 0 0-2.6l-1.4-1.4a1.8 1.8 0 0 0-2.6 0L4.5 15.5z" />
          <path {...props} d="m13 7 4 4" />
        </svg>
      );
    case 'trash':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M4.5 7.5h15" />
          <path {...props} d="M9 7.5V5.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v1.7" />
          <path {...props} d="M7 7.5l.8 11.2c.1.9.8 1.6 1.7 1.6h5c.9 0 1.6-.7 1.7-1.6L17 7.5" />
          <path {...props} d="M10 11v5M14 11v5" />
        </svg>
      );
    case 'plus':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="M3.5 7.5h10v8h-10zM13.5 10.5h3l2 2v3h-5z" />
          <circle {...props} cx="8" cy="17.5" r="1.8" />
          <circle {...props} cx="17" cy="17.5" r="1.8" />
        </svg>
      );
    case 'plane':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path {...props} d="m3.5 14 7-2.5 8-6a1.2 1.2 0 0 1 1.7 1.6l-5.6 8.2-2.6 7.2-2.1-5.1-5.1-2.1Z" />
          <path {...props} d="m10.5 11.5 2 2" />
        </svg>
      );
    default:
      return null;
  }
}
