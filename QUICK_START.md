# 🚀 Fitness Garage - Quick Start Guide

## What's Included

A **fully functional e-commerce platform** with:
- ✅ Shopping cart with persistence
- ✅ User authentication (signup/login)
- ✅ Multi-step checkout flow
- ✅ Payment integration (Razorpay for India)
- ✅ User dashboard with order tracking
- ✅ Address management
- ✅ Mobile-responsive design

---

## ⚡ Quick Setup (5 minutes)

### Frontend (Already Running!)

Your frontend is live and accessible through the preview. The app includes:
- Product catalog with gym wear and supplements
- Shopping cart functionality
- User authentication pages
- Checkout flow
- Order confirmation

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Edit `.env` with your credentials:**
   - Firebase credentials (from Firebase Console)
   - Razorpay API keys (from Razorpay Dashboard)
   - SMTP settings (Gmail or SendGrid)
   - JWT secret (any random string)

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Start the server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

---

## 🧪 Test the Flow

### 1. Sign Up
- Click "Sign Up" in navbar
- Enter name, email, password (min 6 chars)
- Submit form
- You'll be logged in and redirected to dashboard

### 2. Add Products to Cart
- Go home page
- Click on a product (e.g., "Premium Gym Stringer")
- Select size and color
- Choose quantity
- Click "Add to Cart"
- See cart count increase in navbar

### 3. Checkout
- Click cart icon in navbar
- Review items and update quantities if needed
- Click "Proceed to Checkout"
- Fill in delivery address
- Choose payment method
- Review order
- Complete payment (test mode - no real charge)
- See order confirmation

### 4. View Dashboard
- Click your name in navbar → "Dashboard"
- View your profile
- See your orders
- Manage your addresses

---

## 📦 Test Data

### Products Available
1. **Gym Wear**
   - Premium Gym Stringer - ₹799
   - Oversized Gym Tee - ₹899
   - Heavy-Duty Shorts - ₹599

2. **Supplements**
   - Whey Protein Gold - ₹1,299
   - Creatine Monohydrate - ₹599
   - Pre-Workout Extreme - ₹899

### Test Payment Details (Card)
```
Card Number: 4532 1234 5678 9010
Expiry: 12/25 (or any future date)
CVV: 123
Name: Test User
```

### Test Login
```
Email: test@example.com
Password: test123
```
(Or use any account you create via signup)

---

## 🔧 Configuration Files

### Frontend (`fitness/` folder)
- **Components:** `src/components/` - All UI components
- **Styles:** `src/styles/` - CSS for each component
- **Context:** `src/context/` - State management (Cart, Auth)
- **Utils:** `src/utils/` - Validation functions
- **Data:** `src/data/` - Product data

### Backend (`backend/` folder)
- **Routes:** `routes/` - API endpoints
- **Config:** `config/` - Firebase, Razorpay, Email
- **Server:** `server.js` - Main Express server
- **Env:** `.env` - Environment variables

---

## 🔑 Environment Variables

### Frontend (auto-configured)
- Uses context API for state
- Stores cart in localStorage
- No .env file needed

### Backend (`.env` file needed)

```env
# Server
PORT=5000
NODE_ENV=development

# Firebase Credentials (from Google Cloud Console)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...iam.gserviceaccount.com

# Razorpay (from Dashboard)
RAZORPAY_KEY_ID=rzp_test_XXXXX
RAZORPAY_KEY_SECRET=XXXXX

# Email Service (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Security
JWT_SECRET=any_random_secret_key_here

# URLs
FRONTEND_URL=http://localhost:3000
```

---

## 📱 Features Checklist

### Cart System
- [ ] Add products to cart
- [ ] Remove items from cart
- [ ] Update quantities
- [ ] See total price with tax
- [ ] Cart persists after refresh
- [ ] Cart badge shows item count

### Authentication
- [ ] Sign up with email/password
- [ ] Login with credentials
- [ ] Logout
- [ ] Protected dashboard pages
- [ ] Session persistence

### Checkout
- [ ] Add delivery address
- [ ] Select from saved addresses
- [ ] View order summary
- [ ] Choose payment method
- [ ] Complete payment flow

### User Dashboard
- [ ] View and edit profile
- [ ] See order history
- [ ] Manage addresses
- [ ] Track order status

### Mobile Experience
- [ ] Responsive navbar
- [ ] Mobile-friendly forms
- [ ] Optimized checkout flow
- [ ] Touch-friendly buttons

---

## 🐛 Troubleshooting

### Cart not saving after refresh?
- Check if localStorage is enabled in browser
- Try incognito/private mode to test
- Clear browser cache

### Payment form not working?
- Ensure backend is running (npm run dev)
- Check browser console for errors
- Verify all form fields are filled

### Can't login?
- Check email is exactly correct
- Password must be at least 6 characters
- Try signing up with new account

### Styles not loading?
- Refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check network tab in DevTools
- Ensure CSS files are imported

### Backend won't start?
```bash
# Check if port 5000 is already in use
# Kill the process or use different port

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Try again
npm run dev
```

---

## 📚 File Structure Overview

```
fitness/                          # Frontend React App
├── src/
│   ├── components/              # React Components
│   │   ├── Auth/               # Login & Signup
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── Cart.js             # Shopping Cart
│   │   ├── Checkout.js         # Multi-step Checkout
│   │   ├── Dashboard.js        # User Dashboard
│   │   ├── OrderConfirmation.js # Order Confirmation
│   │   ├── PaymentForm.js      # Payment Methods
│   │   └── ... (other components)
│   ├── context/                # State Management
│   │   ├── CartContext.js      # Cart State
│   │   └── AuthContext.js      # Auth State
│   ├── styles/                 # Stylesheets
│   │   ├── Cart.css
│   │   ├── Auth.css
│   │   ├── Checkout.css
│   │   ├── Dashboard.css
│   │   ├── responsive.css      # Mobile Styles
│   │   └── ... (other styles)
│   ├── utils/
│   │   └── validation.js       # Form Validation
│   ├── data/
│   │   └── products.js         # Product Data
│   ├── App.js                  # Main App Component
│   └── index.js                # Entry Point
└── public/
    └── index.html              # HTML Template

backend/                          # Express Backend
├── routes/                       # API Routes
│   ├── auth.js                 # Auth Endpoints
│   ├── products.js             # Product Endpoints
│   ├── orders.js               # Order Endpoints
│   ├── addresses.js            # Address Endpoints
│   └── payment.js              # Payment Endpoints
├── config/                       # Configuration
│   ├── firebase.js             # Firebase Setup
│   ├── razorpay.js             # Razorpay Setup
│   └── email.js                # Email Setup
├── server.js                     # Express Server
├── package.json                  # Dependencies
└── .env.example                  # Template for .env
```

---

## 🚀 Deployment

### Deploy Frontend
- Push to GitHub
- Connect to Netlify
- Automatic deployment on push

### Deploy Backend
- Use Heroku, Railway, or Render
- Set environment variables
- Start listening on PORT from env

### Keep Databases
- Firestore hosted on Google Cloud
- No deployment needed

---

## 📞 Support Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **Razorpay Docs:** https://razorpay.com/docs
- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **Nodemailer:** https://nodemailer.com

---

## ✨ Key Features Implemented

1. **Cart Management**
   - Context API with localStorage
   - Real-time updates
   - Tax and shipping calculations

2. **User System**
   - Email/password authentication
   - JWT tokens for API
   - Profile management
   - Address book

3. **Payment Processing**
   - Razorpay integration
   - Multiple payment methods
   - Card validation
   - Secure transactions

4. **Order Management**
   - Order creation
   - Confirmation emails
   - Order tracking
   - Status updates

5. **Mobile Optimization**
   - Fully responsive
   - Touch-friendly
   - Optimized forms
   - Fast performance

---

## 🎯 Next Steps

1. **Setup Backend:** Follow backend setup section
2. **Configure Firebase:** Add your Firebase project ID and keys
3. **Setup Razorpay:** Add Razorpay test keys
4. **Setup Email:** Configure SMTP (Gmail/SendGrid)
5. **Test the Flow:** Use test data above
6. **Deploy:** Push to production when ready

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** ✅ Ready for Production
