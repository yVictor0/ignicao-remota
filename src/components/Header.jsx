import './Header.css';

export default function Header({ onLogout }) {
  return (
    <header className="header">
      <div>
        <h1 className="header__title">Ligar PC</h1>
        <p className="header__subtitle">Wake-on-LAN via ESP32</p>
      </div>
      <button type="button" className="header__logout" onClick={onLogout}>
        Sair
      </button>
    </header>
  );
}
