import { useStatus } from '../hooks/useStatus';
import { useWake } from '../hooks/useWake';
import Header from '../components/Header';
import StatusCard from '../components/StatusCard';
import PowerButton from '../components/PowerButton';
import ActivityLog from '../components/ActivityLog';
import './DashboardPage.css';

function buttonLabel({ sending, waiting }) {
  if (sending) return 'Enviando pedido…';
  if (waiting) return 'Aguardando o ESP32 buscar o pedido…';
  return 'Toque para ligar o PC';
}

export default function DashboardPage({ password, onLogout }) {
  const { status, loading, error, refresh } = useStatus(password, onLogout);
  const { sending, feedback, wake } = useWake(password, refresh);

  const waiting = Boolean(status?.pending);
  const busy = sending || waiting;

  return (
    <>
      <Header onLogout={onLogout} />

      <StatusCard status={status} loading={loading} error={error} />

      <section className="card dashboard__power">
        <PowerButton
          onClick={wake}
          busy={busy}
          disabled={busy}
          label={buttonLabel({ sending, waiting })}
        />
        {feedback && (
          <p className={`dashboard__feedback dashboard__feedback--${feedback.type}`} role="status">
            {feedback.message}
          </p>
        )}
      </section>

      <ActivityLog events={status?.history ?? []} />
    </>
  );
}
