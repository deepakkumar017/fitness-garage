import { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import '../styles/ExerciseTracker.css';

export default function ExerciseTracker({ exercise, week, day }) {
  const { completeExercise, getCompletedExercises } = useWorkout();
  const [expandedExercise, setExpandedExercise] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    reps: exercise.reps,
    sets: exercise.sets,
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const completedData = getCompletedExercises(week, day).find(
    w => w.exercise === exercise.order
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.weight) {
      completeExercise(week, day, exercise.order, formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div className={`exercise-card ${completedData ? 'completed' : ''}`}>
      <div className="exercise-header">
        <div className="exercise-title">
          <h4>{exercise.order}. {exercise.name}</h4>
          {completedData && <span className="completed-badge">✓ Done</span>}
        </div>
        <button
          className="expand-btn"
          onClick={() => setExpandedExercise(!expandedExercise)}
        >
          {expandedExercise ? '▼' : '▶'}
        </button>
      </div>

      <div className="exercise-quick-info">
        <span className="info-item">
          <strong>{exercise.sets}</strong> sets
        </span>
        <span className="info-item">
          <strong>{exercise.reps}</strong> reps
        </span>
        <span className="info-item">
          <strong>{exercise.rest}</strong> rest
        </span>
      </div>

      {expandedExercise && (
        <div className="exercise-details">
          <p className="description">{exercise.description}</p>

          <div className="tips-section">
            <h5>💡 Tips for Perfect Form:</h5>
            <ul className="tips-list">
              {exercise.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="progression-section">
            <h5>📈 Progression Guide:</h5>
            <p className="progression">{exercise.progression}</p>
          </div>

          {/* Exercise Log Form */}
          <form onSubmit={handleSubmit} className="exercise-form">
            <h5>Log Your Performance</h5>
            
            <div className="form-group">
              <label htmlFor={`weight-${exercise.order}`}>Weight (kg)</label>
              <input
                type="number"
                id={`weight-${exercise.order}`}
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight used"
                step="0.5"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`sets-${exercise.order}`}>Sets Completed</label>
                <input
                  type="number"
                  id={`sets-${exercise.order}`}
                  name="sets"
                  value={formData.sets}
                  onChange={handleChange}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`reps-${exercise.order}`}>Reps per Set</label>
                <input
                  type="text"
                  id={`reps-${exercise.order}`}
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  placeholder="e.g., 8-10"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`notes-${exercise.order}`}>Notes</label>
              <textarea
                id={`notes-${exercise.order}`}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="How did the exercise feel? Any modifications?"
                rows="2"
              />
            </div>

            <button type="submit" className="btn btn-primary log-btn">
              {submitted ? '✓ Logged!' : 'Log Exercise'}
            </button>
          </form>

          {completedData && (
            <div className="last-performance">
              <h5>Last Performance:</h5>
              <div className="performance-details">
                <p>
                  <strong>{completedData.weight}kg</strong> x{completedData.sets} sets x {completedData.reps} reps
                </p>
                <p className="date">
                  {new Date(completedData.completedAt).toLocaleDateString()} at {new Date(completedData.completedAt).toLocaleTimeString()}
                </p>
                {completedData.notes && (
                  <p className="notes">{completedData.notes}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
