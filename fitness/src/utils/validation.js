// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

// Phone number validation (Indian format)
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Card number validation (Luhn algorithm)
export const validateCardNumber = (cardNumber) => {
  const sanitized = cardNumber.replace(/\D/g, '');
  if (sanitized.length !== 16) return false;

  let sum = 0;
  for (let i = 0; i < sanitized.length; i++) {
    let digit = parseInt(sanitized[i], 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

// Expiry date validation
export const validateExpiry = (expiry) => {
  const [month, year] = expiry.split('/');
  if (!month || !year) return false;

  const currentDate = new Date();
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);

  return expiryDate > currentDate;
};

// CVV validation
export const validateCVV = (cvv) => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

// Address validation
export const validateAddress = (address) => {
  return {
    street: !address.street ? 'Street address is required' : null,
    city: !address.city ? 'City is required' : null,
    state: !address.state ? 'State is required' : null,
    zip: !address.zip || !/^\d{6}$/.test(address.zip) ? 'Valid 6-digit PIN code required' : null,
    phone: !validatePhone(address.phone) ? 'Valid 10-digit phone number required' : null
  };
};

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = data[field];
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
};

// Sanitize input
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};
