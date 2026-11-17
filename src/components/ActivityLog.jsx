import { formatDateTime } from '../utils/time';
import './ActivityLog.css';

export default function ActivityLog({ events }) {
  return (
    <section className="card">
      <h2 className="card__title">Histórico</h2>

      {events.length === 0 ? (
        <p className="log__empty">Nenhum pacote enviado ainda.</p>
      ) : (
        <ul className="log__list">
          {events.map((event) => {
            const delaySeconds = Math.round((event.sentAt - event.requestedAt) / 1000);
            return (
              <li key={event.id} className="log__item">
                <span>
                  Magic packet enviado
                  <span className="log__delay"> · levou {delaySeconds} s</span>
                </span>
                <time className="log__time" dateTime={new Date(event.sentAt).toISOString()}>
                  {formatDateTime(event.sentAt)}
                </time>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
