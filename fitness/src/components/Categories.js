import '../styles/Categories.css';

const categories = [
  {
    id: 1,
    name: 'Gym Wear',
    icon: '👕',
    description: 'Stringers, Oversized Tees',
    color: 'category-orange'
  },
  {
    id: 2,
    name: 'Accessories',
    icon: '⌚',
    description: 'Belts, Straps, Shakers',
    color: 'category-red'
  },
  {
    id: 3,
    name: 'Supplements',
    icon: '💊',
    description: 'Protein, Creatine, Pre-Workout',
    color: 'category-gold'
  },
  {
    id: 4,
    name: 'Workout Plans',
    icon: '📱',
    description: 'Digital Training Programs',
    color: 'category-orange'
  }
];

export default function Categories() {
  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="section-title">
          Choose Your <span className="title-highlight">FITNESS PATH</span>
        </h2>
        
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className={`category-card ${category.color}`}>
              <div className="category-icon">{category.icon}</div>
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <button className="category-btn">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
