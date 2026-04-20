import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginPage } from './features/auth';
import { SuperAdminDashboard } from './features/dashboard';

export default function App() {
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail === 'superadmin@parcel.com' && password === 'admin123') {
      navigate('/superadmin', { replace: true });
      return {
        success: true,
        role: 'superadmin',
      };
    }

    return {
      success: false,
      message: 'Use the Super Admin demo credentials to open the dashboard.',
    };
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/superadmin" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/shipments" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/tracking" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/manifest" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/invoices" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/reports" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/international" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/onboarding" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="/superadmin/settings" element={<SuperAdminDashboard onLogout={() => navigate('/login', { replace: true })} />} />
      <Route path="*" element={<Navigate to="/superadmin" replace />} />
    </Routes>
  );
}
