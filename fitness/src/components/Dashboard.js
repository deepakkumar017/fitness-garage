import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const { selectedPlan, currentWeek, getWeekStats } = useWorkout();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Account</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              👤 Profile
            </button>
            <button
              className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
            <button
              className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              📍 Addresses
            </button>
            <button
              className={`nav-item ${activeTab === 'fitness' ? 'active' : ''}`}
              onClick={() => setActiveTab('fitness')}
            >
              💪 Fitness
            </button>
          </nav>
        </div>

        <div className="dashboard-main">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Profile Information</h2>
              
              {!editMode ? (
                <div className="profile-view">
                  <div className="profile-item">
                    <label>Name</label>
                    <p>{formData.name || 'Not set'}</p>
                  </div>
                  <div className="profile-item">
                    <label>Email</label>
                    <p>{formData.email}</p>
                  </div>
                  <div className="profile-item">
                    <label>Phone</label>
                    <p>{formData.phone || 'Not set'}</p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <form className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditMode(false);
                        setFormData({
                          name: user.name,
                          email: user.email,
                          phone: user.phone || ''
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>Order History</h2>
              {user.orders && user.orders.length > 0 ? (
                <div className="orders-list">
                  {user.orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <span className="order-id">Order #{order.id}</span>
                        <span className={`order-status ${order.status}`}>{order.status}</span>
                      </div>
                      <div className="order-details">
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ₹{order.total.toLocaleString()}</p>
                        <p><strong>Items:</strong> {order.items} product(s)</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No orders yet</p>
                  <button className="btn btn-primary" onClick={() => navigate('/')}>
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="addresses-section">
              <h2>Delivery Addresses</h2>
              {user.addresses && user.addresses.length > 0 ? (
                <div className="addresses-list">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="address-card">
                      <div className="address-header">
                        <h4>{address.label}</h4>
                        {address.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zip}</p>
                      <p>{address.phone}</p>
                      <div className="address-actions">
                        <button className="btn-link">Edit</button>
                        <button className="btn-link">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No addresses saved yet</p>
                </div>
              )}
              <button className="btn btn-primary add-address-btn">
                + Add New Address
              </button>
            </div>
          )}

          {activeTab === 'fitness' && (
            <div className="fitness-section">
              <h2>💪 My Fitness</h2>

              {selectedPlan ? (
                <div className="fitness-content">
                  <div className="active-plan-card-dashboard">
                    <div className="plan-info-dashboard">
                      <h3>{selectedPlan.name}</h3>
                      <p className="plan-level-badge">{selectedPlan.level.toUpperCase()}</p>
                      <div className="plan-progress-dashboard">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${(currentWeek / selectedPlan.duration) * 100}%` }}
                          ></div>
                        </div>
                        <p>Week {currentWeek} of {selectedPlan.duration}</p>
                      </div>
                    </div>

                    <div className="quick-stats">
                      <div className="quick-stat">
                        <span className="stat-value">{selectedPlan.daysPerWeek}</span>
                        <span className="stat-label">Days/Week</span>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-value">{selectedPlan.focus}</span>
                        <span className="stat-label">Focus</span>
                      </div>
                    </div>

                    <div className="fitness-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/workout-plan/${selectedPlan.id}`)}
                      >
                        Continue Workout
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/workout-progress')}
                      >
                        View Progress
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No active workout plan</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/workouts')}
                  >
                    Browse Workout Plans
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
