import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="confirmation-container">
        <div className="error-state">
          <p>Order not found</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const subtotal = order.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal >= 1000 ? 0 : 100;
  const total = subtotal + tax + shipping;

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p className="order-number">Order #: {order.id}</p>
        </div>

        <div className="confirmation-content">
          <div className="confirmation-section">
            <h2>Estimated Delivery</h2>
            <p className="delivery-date">
              {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="delivery-note">Free shipping on this order</p>
          </div>

          <div className="confirmation-section">
            <h2>Delivery Address</h2>
            <div className="address-display">
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
              <p>Phone: {order.address.phone}</p>
            </div>
          </div>

          <div className="confirmation-section">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.products.map((item, index) => (
                <div key={index} className="confirmation-item">
                  <div className="item-info">
                    <span className="item-emoji">{item.image}</span>
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-variants">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="confirmation-section">
            <h2>Order Summary</h2>
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">{shipping === 0 ? 'FREE' : '₹' + shipping}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              View Order Details
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>

          <div className="confirmation-footer">
            <p>We have sent a confirmation email to your registered email address.</p>
            <p>You can track your order in the "Orders" section of your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
