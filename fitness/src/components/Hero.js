import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div 
        className="hero-background"
        style={{
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay"></div>
        
        <div className="hero-athletes">
          <div className="athlete athlete-male">
            <img
              src="https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg"
              alt="Muscular male bodybuilder in gym"
              className="athlete-image"
            />
          </div>
          <div className="athlete athlete-female">
            <img
              src="https://images.pexels.com/photos/4754139/pexels-photo-4754139.jpeg"
              alt="Strong female athlete training"
              className="athlete-image"
            />
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            BUILD YOUR<br />
            <span className="hero-title-highlight">FITNESS GARAGE MODE</span>
          </h1>
          
          <p className="hero-subtitle">
            Gym Wear • Supplements • Accessories • Training Plans
          </p>

          <div className="hero-badges">
            <span className="badge">Apna Gym, Apna Style 🇮🇳</span>
            <span className="badge">Strong Body, Strong Mind</span>
          </div>

          <div className="hero-cta">
            <button className="btn btn-primary">Shop Now</button>
            <button className="btn btn-secondary">Explore Plans</button>
          </div>
        </div>
      </div>
    </section>
  );
}
