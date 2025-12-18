import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import GymWear from './components/GymWear';
import Supplements from './components/Supplements';
import Plans from './components/Plans';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';

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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
