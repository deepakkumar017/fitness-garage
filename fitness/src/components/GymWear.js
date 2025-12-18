import { Link } from 'react-router-dom';
import '../styles/GymWear.css';
import { getProductsByCategory } from '../data/products';

const gymWearProducts = getProductsByCategory('gymwear');

export default function GymWear() {
  return (
    <section className="gymwear-section">
      <div className="gymwear-container">
        <h2 className="section-title">
          <span className="title-highlight">PREMIUM</span> GYM WEAR
        </h2>
        <p className="section-subtitle">
          Designed for the Indian Athlete. Engineered for Performance.
        </p>

        <div className="gymwear-grid">
          {gymWearProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
              <div className="product-card">
                <div className="product-image-container">
                  <div className="product-image">{product.image}</div>
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>

                  <div className="product-rating">
                    <span className="stars">⭐ {product.rating}</span>
                    <span className="reviews">({product.reviews.toLocaleString()} reviews)</span>
                  </div>

                  <div className="product-footer">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    <button className="add-cart-btn" onClick={e => e.preventDefault()}>View Details</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
