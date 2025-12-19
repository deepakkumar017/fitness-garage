import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import { getWorkoutPlanById } from '../data/workoutPlans';
import ExerciseTracker from './ExerciseTracker';
import '../styles/WorkoutPlanDetail.css';

export default function WorkoutPlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plan = getWorkoutPlanById(id);
  const { selectedPlan, selectPlan, currentWeek, setCurrentWeek, getWeekStats } = useWorkout();
  const [selectedDay, setSelectedDay] = useState(null);
  const [showNutrition, setShowNutrition] = useState(false);

  if (!plan) {
    return (
      <div className="plan-detail-container">
        <div className="not-found">
          <p>Workout plan not found</p>
          <button className="btn btn-primary" onClick={() => navigate('/workouts')}>
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  if (selectedPlan?.id !== plan.id) {
    selectPlan(plan);
  }

  const currentWeekData = plan.weeks[currentWeek - 1];
  const weekStats = getWeekStats(currentWeek);

  return (
    <div className="plan-detail-container">
      <button className="back-btn" onClick={() => navigate('/workouts')}>
        ← Back to Plans
      </button>

      <div className="plan-detail-header">
        <h1>{plan.name}</h1>
        <p className="plan-level">{plan.level.toUpperCase()} • {plan.focus.toUpperCase()} • {plan.duration} weeks</p>
        <p className="plan-description">{plan.overview}</p>
      </div>

      <div className="plan-stats">
        <div className="stat">
          <span className="stat-label">Current Week</span>
          <span className="stat-value">{currentWeek}/{plan.duration}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Days Completed</span>
          <span className="stat-value">{weekStats.daysCompleted}/3</span>
        </div>
        <div className="stat">
          <span className="stat-label">Training Days/Week</span>
          <span className="stat-value">{plan.daysPerWeek}</span>
        </div>
      </div>

      <div className="week-selector">
        <h2>Week {currentWeek}: {currentWeekData.theme}</h2>
        {currentWeekData.note && <p className="week-note">📝 {currentWeekData.note}</p>}
        
        <div className="week-controls">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
            disabled={currentWeek === 1}
          >
            ← Previous Week
          </button>
          <span className="week-indicator">
            {currentWeek}/{plan.duration}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentWeek(Math.min(plan.duration, currentWeek + 1))}
            disabled={currentWeek === plan.duration}
          >
            Next Week →
          </button>
        </div>
      </div>

      {currentWeekData.days && (
        <div className="workout-days">
          {currentWeekData.days.map((day) => (
            <div key={day.day} className="day-card">
              <button
                className={`day-header-btn ${selectedDay?.day === day.day ? 'active' : ''}`}
                onClick={() => setSelectedDay(selectedDay?.day === day.day ? null : day)}
              >
                <h3>{day.dayName}</h3>
                <span className="exercise-count">{day.exercises.length} exercises</span>
              </button>

              {selectedDay?.day === day.day && (
                <div className="day-content">
                  {/* Warm-up Section */}
                  {day.warmup && (
                    <div className="warmup-section">
                      <h4>🔥 {day.warmup.title}</h4>
                      <div className="warmup-exercises">
                        {day.warmup.exercises.map((ex, idx) => (
                          <div key={idx} className="warmup-item">
                            <span className="warmup-name">{ex.name}</span>
                            <span className="warmup-detail">
                              {ex.reps || ex.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Main Exercises */}
                  <div className="exercises-section">
                    <h4>🏋️ Main Workout</h4>
                    {day.exercises.map((exercise) => (
                      <ExerciseTracker
                        key={exercise.order}
                        exercise={exercise}
                        week={currentWeek}
                        day={day.day}
                      />
                    ))}
                  </div>

                  {/* Recovery Section */}
                  {day.recovery && (
                    <div className="recovery-section">
                      <h4>💪 {day.recovery.title}</h4>
                      <div className="recovery-exercises">
                        {day.recovery.exercises.map((ex, idx) => (
                          <div key={idx} className="recovery-item">
                            <span className="recovery-name">{ex.name}</span>
                            <span className="recovery-duration">{ex.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Nutrition Section */}
      <div className="nutrition-toggle">
        <button
          className="btn btn-secondary"
          onClick={() => setShowNutrition(!showNutrition)}
        >
          {showNutrition ? '❌ Hide Nutrition' : '🥗 Show Nutrition Guide'}
        </button>
      </div>

      {showNutrition && plan.nutrition && (
        <div className="nutrition-section">
          <h2>🥗 Nutrition Guide</h2>

          <div className="macros-grid">
            <div className="macro-card protein">
              <h3>Protein</h3>
              <p className="macro-value">{plan.nutrition.macros.protein.value}</p>
              <p className="macro-unit">{plan.nutrition.macros.protein.unit}</p>
              <p className="macro-desc">{plan.nutrition.macros.protein.description}</p>
            </div>
            <div className="macro-card carbs">
              <h3>Carbs</h3>
              <p className="macro-value">{plan.nutrition.macros.carbs.value}</p>
              <p className="macro-unit">{plan.nutrition.macros.carbs.unit}</p>
              <p className="macro-desc">{plan.nutrition.macros.carbs.description}</p>
            </div>
            <div className="macro-card fats">
              <h3>Fats</h3>
              <p className="macro-value">{plan.nutrition.macros.fats.value}</p>
              <p className="macro-unit">{plan.nutrition.macros.fats.unit}</p>
              <p className="macro-desc">{plan.nutrition.macros.fats.description}</p>
            </div>
          </div>

          {plan.nutrition.mealPlan && (
            <div className="meal-plan">
              <h3>{plan.nutrition.mealPlan.title}</h3>
              <div className="meals-list">
                {plan.nutrition.mealPlan.meals.map((meal, idx) => (
                  <div key={idx} className="meal-card">
                    <div className="meal-header">
                      <h4>{meal.name}</h4>
                      <span className="meal-time">{meal.time}</span>
                    </div>
                    <div className="meal-items">
                      {meal.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="meal-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-qty">{item.quantity}</span>
                          <span className="item-macros">{item.macros}</span>
                        </div>
                      ))}
                    </div>
                    <div className="meal-totals">
                      <strong>{meal.totals}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {plan.nutrition.hydration && (
            <div className="hydration-guide">
              <h3>💧 Hydration</h3>
              <p className="hydration-rec">{plan.nutrition.hydration.recommendation}</p>
              <ul className="hydration-tips">
                {plan.nutrition.hydration.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {plan.nutrition.supplements && (
            <div className="supplements-guide">
              <h3>💊 Recommended Supplements</h3>
              <div className="supplements-list">
                {plan.nutrition.supplements.map((supp, idx) => (
                  <div key={idx} className="supplement-item">
                    <h4>{supp.name}</h4>
                    <p><strong>Purpose:</strong> {supp.purpose}</p>
                    <p><strong>Timing:</strong> {supp.timing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
