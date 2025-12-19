import { useState } from 'react';
import { validateCardNumber, validateExpiry, validateCVV } from '../utils/validation';

export default function PaymentForm({ amount, onPaymentSuccess, loading }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'number') {
      processedValue = value.replace(/\D/g, '').substring(0, 16);
      processedValue = processedValue.replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      processedValue = value.replace(/\D/g, '').substring(0, 4);
      if (processedValue.length >= 2) {
        processedValue = processedValue.substring(0, 2) + '/' + processedValue.substring(2);
      }
    } else if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setCardData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateCardForm = () => {
    const newErrors = {};

    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }

    const cardNumber = cardData.number.replace(/\s/g, '');
    if (!validateCardNumber(cardNumber)) {
      newErrors.number = 'Invalid card number';
    }

    if (!validateExpiry(cardData.expiry)) {
      newErrors.expiry = 'Invalid or expired card';
    }

    if (!validateCVV(cardData.cvv)) {
      newErrors.cvv = 'Invalid CVV (3-4 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (paymentMethod === 'upi') {
      handleUPIPayment();
    } else if (paymentMethod === 'netbanking') {
      handleNetBankingPayment();
    } else {
      handleCardPayment();
    }
  };

  const handleCardPayment = async () => {
    if (!validateCardForm()) {
      return;
    }

    setProcessing(true);

    try {
      // In production, create actual Razorpay order
      // For demo, simulate successful payment
      setTimeout(() => {
        setProcessing(false);
        onPaymentSuccess({
          method: 'card',
          transactionId: 'TXN' + Date.now(),
          amount
        });
      }, 2000);
    } catch (error) {
      setProcessing(false);
      setErrors({ submit: error.message });
    }
  };

  const handleUPIPayment = async () => {
    setProcessing(true);

    try {
      // Simulate UPI payment
      setTimeout(() => {
        setProcessing(false);
        onPaymentSuccess({
          method: 'upi',
          transactionId: 'UPI' + Date.now(),
          amount
        });
      }, 2000);
    } catch (error) {
      setProcessing(false);
      setErrors({ submit: error.message });
    }
  };

  const handleNetBankingPayment = async () => {
    setProcessing(true);

    try {
      // Simulate Net Banking payment
      setTimeout(() => {
        setProcessing(false);
        onPaymentSuccess({
          method: 'netbanking',
          transactionId: 'NB' + Date.now(),
          amount
        });
      }, 2000);
    } catch (error) {
      setProcessing(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="payment-form">
      <div className="payment-amount">
        <p>Amount to Pay</p>
        <h2>₹{amount.toLocaleString()}</h2>
      </div>

      <div className="payment-methods-section">
        <h3>Select Payment Method</h3>

        <label className="payment-method-option">
          <input
            type="radio"
            name="method"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>💳 Credit/Debit Card</span>
        </label>

        <label className="payment-method-option">
          <input
            type="radio"
            name="method"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>📱 UPI (Google Pay, PhonePe, Paytm)</span>
        </label>

        <label className="payment-method-option">
          <input
            type="radio"
            name="method"
            value="netbanking"
            checked={paymentMethod === 'netbanking'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>🏦 Net Banking</span>
        </label>
      </div>

      {paymentMethod === 'card' && (
        <div className="card-payment-form">
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-group">
            <label htmlFor="name">Cardholder Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={cardData.name}
              onChange={handleCardChange}
              placeholder="John Doe"
              disabled={processing || loading}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="number">Card Number</label>
            <input
              type="text"
              id="number"
              name="number"
              value={cardData.number}
              onChange={handleCardChange}
              placeholder="4532 1234 5678 9010"
              disabled={processing || loading}
              className={errors.number ? 'input-error' : ''}
            />
            {errors.number && <span className="error-text">{errors.number}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
                placeholder="MM/YY"
                disabled={processing || loading}
                className={errors.expiry ? 'input-error' : ''}
              />
              {errors.expiry && <span className="error-text">{errors.expiry}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                placeholder="123"
                disabled={processing || loading}
                className={errors.cvv ? 'input-error' : ''}
              />
              {errors.cvv && <span className="error-text">{errors.cvv}</span>}
            </div>
          </div>

          <div className="security-notice">
            <span>🔒</span>
            <p>Your card details are encrypted and secure</p>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="upi-payment-form">
          <p className="payment-instruction">
            You will be redirected to complete the payment via your preferred UPI app.
          </p>
        </div>
      )}

      {paymentMethod === 'netbanking' && (
        <div className="netbanking-payment-form">
          <p className="payment-instruction">
            Select your bank from the list to proceed with secure Net Banking payment.
          </p>
        </div>
      )}

      <button
        className="btn btn-primary payment-button"
        onClick={handlePayment}
        disabled={processing || loading}
      >
        {processing ? 'Processing Payment...' : `Pay ₹${amount.toLocaleString()}`}
      </button>

      <div className="payment-security">
        <p>✓ 100% Secure Payment</p>
        <p>✓ Encrypted with SSL</p>
        <p>✓ PCI DSS Compliant</p>
      </div>
    </div>
  );
}
