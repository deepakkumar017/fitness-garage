import { Link } from 'react-router-dom';
import '../styles/Supplements.css';
import { getProductsByCategory } from '../data/products';

const supplements = getProductsByCategory('supplements');

export default function Supplements() {
  return (
    <section className="supplements-section">
      <div className="supplements-container">
        <h2 className="section-title">
          FITNESS GARAGE <span className="title-highlight">SUPPLEMENTS</span>
        </h2>
        <p className="section-subtitle">
          Premium Indian Brands. 100% Authentic. Lab Verified.
        </p>

        <div className="trust-icons">
          <div className="trust-icon-item">
            <span className="trust-icon">✓</span>
            <span>Authentic Products</span>
          </div>
          <div className="trust-icon-item">
            <span className="trust-icon">🔒</span>
            <span>Secure Payments</span>
          </div>
          <div className="trust-icon-item">
            <span className="trust-icon">🚚</span>
            <span>Fast Delivery</span>
          </div>
        </div>

        <div className="supplements-grid">
          {supplements.map(supplement => (
            <Link key={supplement.id} to={`/product/${supplement.id}`} className="supplement-card-link">
              <div className="supplement-card">
                <div className="supplement-image">{supplement.image}</div>

                <h3 className="supplement-name">{supplement.name}</h3>

                <div className="supplement-badges">
                  {supplement.certifications && supplement.certifications.map((badge, idx) => (
                    <span key={idx} className="supplement-badge">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="supplement-rating">
                  ⭐ {supplement.rating}
                </div>

                <div className="supplement-footer">
                  <span className="supplement-price">₹{supplement.price.toLocaleString()}</span>
                  <button className="add-cart-btn" onClick={e => e.preventDefault()}>View Details</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
