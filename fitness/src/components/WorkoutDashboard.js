import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import { workoutPlans, getWorkoutPlansByLevel, getWorkoutPlansByFocus } from '../data/workoutPlans';
import '../styles/WorkoutDashboard.css';

export default function WorkoutDashboard() {
  const navigate = useNavigate();
  const { selectedPlan, selectPlan, currentWeek, getWeekStats } = useWorkout();
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterFocus, setFilterFocus] = useState('all');

  const filteredPlans = workoutPlans.filter(plan => {
    const levelMatch = filterLevel === 'all' || plan.level === filterLevel;
    const focusMatch = filterFocus === 'all' || plan.focus === filterFocus;
    return levelMatch && focusMatch;
  });

  const levels = ['beginner', 'intermediate', 'advanced'];
  const focuses = ['strength', 'hypertrophy', 'cardio'];

  return (
    <div className="workout-dashboard-container">
      <div className="workout-header">
        <h1>💪 Workout Plans</h1>
        <p>Choose your perfect training program</p>
      </div>

      {selectedPlan && (
        <div className="active-plan-section">
          <div className="active-plan-card">
            <div className="plan-status">
              <div className="plan-badge">{selectedPlan.level.toUpperCase()}</div>
              <div className="plan-progress">
                <h3>{selectedPlan.name}</h3>
                <div className="week-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(currentWeek / selectedPlan.duration) * 100}%` }}
                    ></div>
                  </div>
                  <p>Week {currentWeek} of {selectedPlan.duration}</p>
                </div>
              </div>
            </div>
            <div className="plan-actions">
              <button 
                className="btn btn-primary"
                onClick={() => navigate(`/workout-plan/${selectedPlan.id}`)}
              >
                Start Workout
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
      )}

      <div className="filters-section">
        <h2>Filter Plans</h2>
        
        <div className="filter-group">
          <h3>Level</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterLevel === 'all' ? 'active' : ''}`}
              onClick={() => setFilterLevel('all')}
            >
              All Levels
            </button>
            {levels.map(level => (
              <button
                key={level}
                className={`filter-btn ${filterLevel === level ? 'active' : ''}`}
                onClick={() => setFilterLevel(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>Focus</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filterFocus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterFocus('all')}
            >
              All Focuses
            </button>
            {focuses.map(focus => (
              <button
                key={focus}
                className={`filter-btn ${filterFocus === focus ? 'active' : ''}`}
                onClick={() => setFilterFocus(focus)}
              >
                {focus.charAt(0).toUpperCase() + focus.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="plans-grid">
        {filteredPlans.map(plan => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <div className="plan-emoji">{plan.image}</div>
              <h2>{plan.name}</h2>
              <p className="plan-level">{plan.level.toUpperCase()}</p>
            </div>

            <div className="plan-info">
              <div className="info-item">
                <span className="label">Duration:</span>
                <span className="value">{plan.duration} weeks</span>
              </div>
              <div className="info-item">
                <span className="label">Frequency:</span>
                <span className="value">{plan.daysPerWeek}x/week</span>
              </div>
              <div className="info-item">
                <span className="label">Focus:</span>
                <span className="value">{plan.focus}</span>
              </div>
            </div>

            <p className="plan-description">{plan.description}</p>

            <div className="plan-goals">
              <h4>Goals:</h4>
              <ul>
                {plan.goals?.map((goal, idx) => (
                  <li key={idx}>✓ {goal}</li>
                ))}
              </ul>
            </div>

            <button
              className={`btn ${selectedPlan?.id === plan.id ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => {
                selectPlan(plan);
                navigate(`/workout-plan/${plan.id}`);
              }}
            >
              {selectedPlan?.id === plan.id ? 'Active Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="no-plans">
          <p>No plans match your filters. Try adjusting your selections.</p>
        </div>
      )}
    </div>
  );
}
