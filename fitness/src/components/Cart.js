import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p className="cart-count">{cart.length} items</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
              <div className="cart-item-image">
                <span className="item-emoji">{item.image}</span>
              </div>

              <div className="cart-item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-variants">
                  {item.size && <span className="variant-badge">Size: {item.size}</span>}
                  {item.color && <span className="variant-badge">Color: {item.color}</span>}
                </div>
                <div className="item-price">₹{item.price.toLocaleString()}</div>
              </div>

              <div className="cart-item-quantity">
                <button
                  className="qty-adjust-btn"
                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-adjust-btn"
                  onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                  disabled={item.quantity >= item.inventory}
                >
                  +
                </button>
              </div>

              <div className="cart-item-subtotal">
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id, item.size, item.color)}
                title="Remove from cart"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getTotalPrice().toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>

          <div className="summary-row">
            <span>Tax (18% GST)</span>
            <span>₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}</span>
          </div>

          <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
