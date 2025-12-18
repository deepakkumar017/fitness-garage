import '../styles/Plans.css';

const plans = [
  {
    id: 1,
    name: 'Fat Loss',
    icon: '🔥',
    description: 'Burn fat, build confidence',
    duration: '12 weeks',
    price: '₹2,999'
  },
  {
    id: 2,
    name: 'Lean Muscle',
    icon: '💪',
    description: 'Get shredded and strong',
    duration: '16 weeks',
    price: '₹3,499'
  },
  {
    id: 3,
    name: 'Strength Training',
    icon: '⚡',
    description: 'Build raw power and size',
    duration: '20 weeks',
    price: '₹3,999'
  }
];

export default function Plans() {
  return (
    <section className="plans-section">
      <div className="plans-container">
        <h2 className="section-title">
          DIGITAL <span className="title-highlight">WORKOUT PLANS</span>
        </h2>
        <p className="section-subtitle">
          Train Anywhere • Anytime • Follow India's Top Coaches
        </p>

        <div className="plans-content">
          <div className="plans-mockup">
            <div className="phone-frame">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="app-header">BEAST MODE</div>
                <div className="app-content">
                  <div className="app-item active">Workout 1/10</div>
                  <div className="app-item">Squat 4x8</div>
                  <div className="app-item">Bench Press 4x6</div>
                  <div className="app-item">Rows 4x8</div>
                </div>
              </div>
            </div>
          </div>

          <div className="plans-grid">
            {plans.map(plan => (
              <div key={plan.id} className="plan-card">
                <div className="plan-icon">{plan.icon}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-details">
                  <span className="plan-duration">⏱️ {plan.duration}</span>
                </div>
                <div className="plan-footer">
                  <span className="plan-price">{plan.price}</span>
                  <button className="btn btn-primary">Get Plan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
