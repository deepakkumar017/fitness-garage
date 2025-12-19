import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import GymWear from './components/GymWear';
import Supplements from './components/Supplements';
import Plans from './components/Plans';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import WorkoutDashboard from './components/WorkoutDashboard';
import WorkoutPlanDetail from './components/WorkoutPlanDetail';
import WorkoutProgress from './components/WorkoutProgress';

function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <GymWear />
      <Supplements />
      <Plans />
    </>
  );
}

function ProtectedRoute({ element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

function AppContent() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route path="/order-confirmation/:id" element={<ProtectedRoute element={<OrderConfirmation />} />} />
        <Route path="/workouts" element={<WorkoutDashboard />} />
        <Route path="/workout-plan/:id" element={<WorkoutPlanDetail />} />
        <Route path="/workout-progress" element={<WorkoutProgress />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <WorkoutProvider>
            <AppContent />
          </WorkoutProvider>
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
