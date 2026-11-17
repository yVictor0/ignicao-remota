import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const { password, login, logout } = useAuth();

  return (
    <main className="app">
      {password ? (
        <DashboardPage password={password} onLogout={logout} />
      ) : (
        <LoginPage onLogin={login} />
      )}
    </main>
  );
}
