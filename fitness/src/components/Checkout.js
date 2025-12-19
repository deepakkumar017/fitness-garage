import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PaymentForm from './PaymentForm';
import '../styles/Checkout.css';
import '../styles/PaymentForm.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState(user?.addresses || []);

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    label: 'Home'
  });

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <p>Your cart is empty</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal >= 1000 ? 0 : 100;
  const total = subtotal + tax + shipping;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      ...formData,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setFormData({
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      label: 'Home'
    });
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'cardNumber') {
      processedValue = value.replace(/\D/g, '').substring(0, 16);
    } else if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    
    setPaymentData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    setLoading(true);

    try {
      const selectedAddr = addresses.find(a => a.id === selectedAddress);
      
      const order = {
        id: 'ORD' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        items: cart.length,
        total: total,
        status: 'Confirmed',
        address: selectedAddr,
        products: cart
      };

      const updatedUser = {
        ...user,
        addresses,
        orders: [...(user.orders || []), order]
      };

      updateProfile(updatedUser);
      clearCart();

      setTimeout(() => {
        setLoading(false);
        navigate(`/order-confirmation/${order.id}`, { state: { order } });
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert('Error placing order. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="steps-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span> Address
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span> Payment
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span> Review
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          {step === 1 && (
            <div className="checkout-step">
              <h2>Select Delivery Address</h2>

              {addresses.length > 0 && (
                <div className="address-selection">
                  <h3>Saved Addresses</h3>
                  {addresses.map(addr => (
                    <label key={addr.id} className="address-option">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                      />
                      <div className="address-info">
                        <strong>{addr.label}</strong>
                        <p>{addr.street}</p>
                        <p>{addr.city}, {addr.state} {addr.zip}</p>
                        <p>{addr.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              <div className="address-form">
                <h3>Add New Address</h3>
                <div className="form-group">
                  <label htmlFor="label">Address Type</label>
                  <select
                    id="label"
                    name="label"
                    value={formData.label}
                    onChange={handleAddressChange}
                  >
                    <option>Home</option>
                    <option>Work</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="street">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleAddressChange}
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleAddressChange}
                      placeholder="New York"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleAddressChange}
                      placeholder="NY"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleAddressChange}
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleAddressChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <button className="btn btn-secondary" onClick={handleAddAddress}>
                  Save Address
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-step">
              <h2>Payment Method</h2>
              <PaymentForm
                amount={total}
                onPaymentSuccess={() => setStep(3)}
                loading={loading}
              />
            </div>
          )}

          {step === 3 && (
            <div className="checkout-step">
              <h2>Order Review</h2>
              <div className="review-section">
                <h3>Delivery Address</h3>
                {selectedAddress && addresses.find(a => a.id === selectedAddress) && (
                  <div className="review-item">
                    <p>{addresses.find(a => a.id === selectedAddress).street}</p>
                    <p>{addresses.find(a => a.id === selectedAddress).city}, {addresses.find(a => a.id === selectedAddress).state} {addresses.find(a => a.id === selectedAddress).zip}</p>
                    <p>Phone: {addresses.find(a => a.id === selectedAddress).phone}</p>
                  </div>
                )}
              </div>

              <div className="review-section">
                <h3>Items</h3>
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="review-item">
                    <p>{item.name} x {item.quantity}</p>
                    <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary-checkout">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'free' : ''}>
                {shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString()}
              </span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className="checkout-actions">
              {step > 1 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(step - 1)}
                  disabled={loading}
                >
                  Back
                </button>
              )}
              
              {step < 3 && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (step === 1 && !selectedAddress) {
                      alert('Please select an address');
                      return;
                    }
                    setStep(step + 1);
                  }}
                  disabled={loading}
                >
                  Continue
                </button>
              )}

              {step === 3 && (
                <button
                  className="btn btn-primary"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
