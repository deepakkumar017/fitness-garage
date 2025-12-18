import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">FITNESS GARAGE</h3>
            <p className="footer-tagline">
              Made for the Indian Fitness Community 🇮🇳
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#shop">Shop</a></li>
              <li><a href="#plans">Plans</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-contact">
              📧 info@fitnessgarage.com<br />
              📱 +917015324087<br />
              📍 haryana, India
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-icons">
              <a href="#instagram" className="social-link">📷</a>
              <a href="#youtube" className="social-link">▶️</a>
              <a href="#twitter" className="social-link">𝕏</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2024 Fitness Garage. All rights reserved. | Strong Body, Strong Mind 💪
          </p>
        </div>
      </div>
    </footer>
  );
}
<br />
