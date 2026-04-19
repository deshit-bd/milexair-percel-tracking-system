import './LoginPage.css';
import { useState } from 'react';

const demoCredentials = [
  ['Super Admin', 'superadmin@parcel.com / admin123'],
  ['Admin', 'admin@parcel.com / admin123'],
  ['Sales', 'sales@parcel.com / sales123'],
  ['Operations', 'operations@parcel.com / ops123'],
  ['Accounts', 'accounts@parcel.com / acc123'],
  ['Branch Manager', 'manager@parcel.com / manager123'],
  ['Customer', 'customer@example.com / customer123'],
];

function CubeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="cube-icon">
      <path
        d="M32 8 48 17.2v18.6L32 45 16 35.8V17.2L32 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M32 8v18.5M16 17.2l16 9.3 16-9.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = onLogin?.(formData);

    if (result?.success) {
      setErrorMessage('');
      return;
    }

    setErrorMessage(result?.message || 'Unable to sign in with those credentials.');
  };

  return (
    <main className="page-shell">
      <section className="login-card">
        <div className="brand-mark" aria-hidden="true">
          <CubeIcon />
        </div>

        <header className="hero-copy">
          <h1>Parcel Logistics System</h1>
          <p>Enter your credentials to access the system</p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>

        <div className="divider" />

        <section className="demo-panel">
          <h2>Demo Credentials:</h2>
          <div className="credentials-box">
            {demoCredentials.map(([role, credential]) => (
              <p key={role}>
                <strong>{role}:</strong> {credential}
              </p>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
