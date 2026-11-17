import { useState } from 'react';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!value || busy) return;

    setBusy(true);
    setError(null);
    try {
      await onLogin(value);
    } catch (err) {
      setError(err.status === 401 ? 'Senha incorreta.' : err.message);
      setBusy(false);
    }
  }

  return (
    <section className="login">
      <div className="login__brand">
        <svg
          className="login__icon"
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
        <h1 className="login__title">Ligar PC</h1>
        <p className="login__subtitle">Digite a senha para continuar.</p>
      </div>

      <form className="card login__form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          className="login__input"
          type="password"
          autoComplete="current-password"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoFocus
        />
        {error && (
          <p className="login__error" role="alert">
            {error}
          </p>
        )}
        <button className="login__submit" type="submit" disabled={!value || busy}>
          {busy ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </section>
  );
}
