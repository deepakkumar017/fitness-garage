# Fitness Garage Backend API

Express.js backend for Fitness Garage e-commerce platform with Firebase and Razorpay integration.

## Setup

### Prerequisites
- Node.js (v14+)
- Firebase project
- Razorpay account (for payments)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Generate a service account key
3. Add the credentials to `.env`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`

### Razorpay Setup (India Payments)

1. Sign up at https://razorpay.com
2. Get your API keys from dashboard
3. Add to `.env`:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=gymwear` - Get products by category
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create order (requires token)
- `GET /api/orders` - Get user orders (requires token)
- `GET /api/orders/:id` - Get single order (requires token)

### Addresses
- `GET /api/addresses` - Get user addresses (requires token)
- `POST /api/addresses` - Add address (requires token)
- `PUT /api/addresses/:addressId` - Update address (requires token)
- `DELETE /api/addresses/:addressId` - Delete address (requires token)

### Payment
- `POST /api/payment/create-order` - Create Razorpay order (requires token)
- `POST /api/payment/verify-payment` - Verify payment (requires token)

## Database Schema (Firestore)

### Users Collection
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+91 XXXXX XXXXX",
  "password": "hashed_password",
  "addresses": [...],
  "orders": [...],
  "createdAt": "timestamp"
}
```

### Orders Collection
```json
{
  "userId": "user_id",
  "items": [...],
  "address": {...},
  "total": 5000,
  "status": "confirmed",
  "razorpayPaymentId": "payment_id",
  "createdAt": "timestamp"
}
```

## Notes

- All prices are in INR (Indian Rupees)
- Free shipping on orders above ₹1000
- 18% GST included in prices
- Token expiry: 30 days
