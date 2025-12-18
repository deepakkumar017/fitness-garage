import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import '../styles/ProductDetail.css';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      <div className="product-detail-content">
        {/* Left: Zoomed Product Image */}
        <div className="product-image-section">
          <div className="product-image-zoom">
            <div className="zoom-image">{product.image}</div>
            {product.badge && (
              <span className="product-badge-detail">{product.badge}</span>
            )}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-rating-detail">
              <span className="stars">⭐ {product.rating}</span>
              <span className="reviews-count">({product.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>

          <div className="product-price-section">
            <span className="price-value">₹{product.price.toLocaleString()}</span>
            {product.inStock ? (
              <span className="stock-status in-stock">✓ In Stock ({product.inventory} available)</span>
            ) : (
              <span className="stock-status out-of-stock">Out of Stock</span>
            )}
          </div>

          <p className="product-description">{product.fullDescription}</p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="product-option">
              <label className="option-label">Size</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div className="product-option">
              <label className="option-label">Color</label>
              <div className="color-options">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          <div className="product-option">
            <label className="option-label">Quantity</label>
            <div className="quantity-selector">
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.inventory}
                className="qty-input"
              />
              <button
                className="qty-btn"
                onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="btn btn-primary add-cart-btn-detail"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>

          {/* Product Details Tabs */}
          <div className="product-details-tabs">
            <div className="details-section">
              <h3 className="details-heading">Product Details</h3>
              <ul className="details-list">
                {product.material && (
                  <li><strong>Material:</strong> {product.material}</li>
                )}
                {product.fit && (
                  <li><strong>Fit:</strong> {product.fit}</li>
                )}
                {product.weight && (
                  <li><strong>Weight/Size:</strong> {product.weight}</li>
                )}
                {product.protein && (
                  <li><strong>Protein per serving:</strong> {product.protein}</li>
                )}
                {product.servings && (
                  <li><strong>Servings:</strong> {product.servings}</li>
                )}
                {product.caffeine && (
                  <li><strong>Caffeine:</strong> {product.caffeine}</li>
                )}
              </ul>
            </div>

            <div className="details-section">
              <h3 className="details-heading">Care & Shipping</h3>
              <ul className="details-list">
                {product.care && (
                  <li><strong>Care Instructions:</strong> {product.care}</li>
                )}
                {product.certifications && (
                  <li><strong>Certifications:</strong> {product.certifications.join(', ')}</li>
                )}
                <li><strong>Shipping:</strong> {product.shipping}</li>
                <li><strong>Returns:</strong> {product.returns}</li>
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-section">
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <span>100% Authentic</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span>Secure Checkout</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
