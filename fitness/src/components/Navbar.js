import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const cartCount = getTotalItems();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">FITNESS GARAGE</span>
          <span className="logo-accent">💪</span>
        </Link>

        <ul className="navbar-menu">
          <li><a href="#shop">Shop</a></li>
          <li><a href="#plans">Plans</a></li>
          <li><Link to="/workouts">Workouts</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn">
            🛒 Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <Link to="/dashboard" className="user-link">
                👤 {user.name}
              </Link>
              <button className="logout-link" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
