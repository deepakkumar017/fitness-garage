import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">FITNESS GARAGE</span>
          <span className="logo-accent">💪</span>
        </div>
        
        <ul className="navbar-menu">
          <li><a href="#shop">Shop</a></li>
          <li><a href="#plans">Plans</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="navbar-actions">
          <button className="cart-btn">🛒 Cart</button>
        </div>
      </div>
    </nav>
  );
}
