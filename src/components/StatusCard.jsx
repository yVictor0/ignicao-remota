import { formatAgo, formatDateTime } from '../utils/time';
import './StatusCard.css';

function Row({ label, children }) {
  return (
    <div className="status__row">
      <dt className="status__label">{label}</dt>
      <dd className="status__value">{children}</dd>
    </div>
  );
}

export default function StatusCard({ status, loading, error }) {
  const device = status?.device;
  const online = Boolean(device?.online);
  const lastSeenAgo = device?.lastSeenAt ? status.serverTime - device.lastSeenAt : null;
  const lastWake = status?.lastWake;

  return (
    <section className="card" aria-live="polite">
      <h2 className="card__title">Status</h2>

      {error && <p className="status__error">{error}</p>}

      {loading && !status && <p className="status__muted">Carregando…</p>}

      {status && (
        <dl className="status__list">
          <Row label="ESP32">
            <span className={`dot ${online ? 'dot--on' : 'dot--off'}`} aria-hidden="true" />
            {online ? 'Online' : 'Offline'}
            <span className="status__hint">
              · {lastSeenAgo === null ? 'nunca visto' : `visto ${formatAgo(lastSeenAgo)}`}
            </span>
          </Row>

          <Row label="Pedido">
            {status.pending ? (
              <>
                <span className="dot dot--wait" aria-hidden="true" />
                Aguardando o ESP32
              </>
            ) : (
              'Nenhum pendente'
            )}
          </Row>

          <Row label="Último envio">
            {lastWake ? (
              <span title={formatDateTime(lastWake.sentAt)}>
                {formatAgo(status.serverTime - lastWake.sentAt)}
              </span>
            ) : (
              '—'
            )}
          </Row>
        </dl>
      )}
    </section>
  );
}
