import './PowerButton.css';

export default function PowerButton({ onClick, busy = false, disabled = false, label }) {
  return (
    <div className="power">
      <button
        type="button"
        className="power__btn"
        onClick={onClick}
        disabled={disabled}
        aria-busy={busy}
        aria-label="Ligar o computador"
      >
        {busy && <span className="power__ring" aria-hidden="true" />}
        <svg
          className="power__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v8" />
          <path d="M6.3 6.6a8 8 0 1 0 11.4 0" />
        </svg>
      </button>
      <p className="power__label">{label}</p>
    </div>
  );
}
