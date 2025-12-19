import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import '../styles/WorkoutProgress.css';

export default function WorkoutProgress() {
  const navigate = useNavigate();
  const { selectedPlan, workoutHistory, getProgressOverTime } = useWorkout();

  if (!selectedPlan) {
    return (
      <div className="progress-container">
        <div className="no-plan">
          <p>No active workout plan selected</p>
          <button className="btn btn-primary" onClick={() => navigate('/workouts')}>
            Select a Plan
          </button>
        </div>
      </div>
    );
  }

  const recentWorkouts = workoutHistory
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10);

  const workoutStats = {
    totalWorkouts: workoutHistory.length,
    totalExercises: workoutHistory.filter(w => w.exercise).length,
    totalDaysCompleted: new Set(workoutHistory.map(w => `${w.week}-${w.day}`)).size,
    lastWorkout: workoutHistory.length > 0 
      ? new Date(workoutHistory[workoutHistory.length - 1].completedAt)
      : null
  };

  const bestLifts = {};
  workoutHistory.forEach(workout => {
    if (workout.weight) {
      const key = `${workout.week}-${workout.day}-${workout.exercise}`;
      if (!bestLifts[key] || workout.weight > bestLifts[key].weight) {
        bestLifts[key] = workout;
      }
    }
  });

  return (
    <div className="progress-container">
      <button className="back-btn" onClick={() => navigate('/workouts')}>
        ← Back to Plans
      </button>

      <div className="progress-header">
        <h1>📊 Workout Progress</h1>
        <p>{selectedPlan.name}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🏋️</span>
          <div className="stat-content">
            <span className="stat-label">Total Workouts</span>
            <span className="stat-value">{workoutStats.totalWorkouts}</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">💪</span>
          <div className="stat-content">
            <span className="stat-label">Exercises Logged</span>
            <span className="stat-value">{workoutStats.totalExercises}</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">✓</span>
          <div className="stat-content">
            <span className="stat-label">Days Completed</span>
            <span className="stat-value">{workoutStats.totalDaysCompleted}</span>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📅</span>
          <div className="stat-content">
            <span className="stat-label">Last Workout</span>
            <span className="stat-value">
              {workoutStats.lastWorkout 
                ? workoutStats.lastWorkout.toLocaleDateString()
                : 'Not started'}
            </span>
          </div>
        </div>
      </div>

      {recentWorkouts.length > 0 && (
        <div className="recent-workouts">
          <h2>📝 Recent Workout History</h2>
          <div className="workouts-list">
            {recentWorkouts.map((workout, idx) => (
              <div key={idx} className="workout-log-item">
                <div className="log-header">
                  <span className="log-date">
                    {new Date(workout.completedAt).toLocaleDateString()}
                  </span>
                  <span className="log-time">
                    {new Date(workout.completedAt).toLocaleTimeString()}
                  </span>
                </div>

                {workout.exercise ? (
                  <div className="exercise-log">
                    <p className="exercise-name">Week {workout.week}, Day {workout.day}</p>
                    <p className="performance">
                      <strong>{workout.weight}kg</strong> × {workout.sets}s × {workout.reps}r
                    </p>
                    {workout.notes && (
                      <p className="notes">💬 {workout.notes}</p>
                    )}
                  </div>
                ) : (
                  <div className="day-log">
                    <p className="day-info">
                      Week {workout.week}, Day {workout.day} - {workout.exercises} exercises
                    </p>
                    <p className="duration">⏱️ {workout.duration} minutes</p>
                    {workout.notes && (
                      <p className="notes">💬 {workout.notes}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(bestLifts).length > 0 && (
        <div className="best-lifts">
          <h2>🏆 Best Performance</h2>
          <div className="lifts-grid">
            {Object.entries(bestLifts).slice(0, 6).map(([key, lift]) => (
              <div key={key} className="best-lift-card">
                <p className="lift-week">Week {lift.week}</p>
                <p className="lift-weight">{lift.weight}kg</p>
                <p className="lift-reps">{lift.sets}×{lift.reps}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {recentWorkouts.length === 0 && (
        <div className="empty-state">
          <p>No workouts logged yet. Start your first workout!</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/workout-plan/${selectedPlan.id}`)}
          >
            Start First Workout
          </button>
        </div>
      )}
    </div>
  );
}
