import React, { createContext, useState, useContext, useEffect } from 'react';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedUserWorkouts = localStorage.getItem('fitnessUserWorkouts');
    const savedHistory = localStorage.getItem('fitnessWorkoutHistory');
    const savedPlan = localStorage.getItem('fitnessSelectedPlan');
    
    if (savedUserWorkouts) {
      try {
        setUserWorkouts(JSON.parse(savedUserWorkouts));
      } catch (error) {
        console.error('Error loading workouts:', error);
      }
    }
    
    if (savedHistory) {
      try {
        setWorkoutHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }

    if (savedPlan) {
      try {
        setSelectedPlan(JSON.parse(savedPlan));
      } catch (error) {
        console.error('Error loading plan:', error);
      }
    }
    
    setLoading(false);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('fitnessUserWorkouts', JSON.stringify(userWorkouts));
      localStorage.setItem('fitnessWorkoutHistory', JSON.stringify(workoutHistory));
      if (selectedPlan) {
        localStorage.setItem('fitnessSelectedPlan', JSON.stringify(selectedPlan));
      }
    }
  }, [userWorkouts, workoutHistory, selectedPlan, loading]);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    setCurrentWeek(1);
  };

  const completeExercise = (weekNum, dayNum, exerciseNum, data) => {
    const exerciseKey = `${weekNum}-${dayNum}-${exerciseNum}`;
    
    const completedExercise = {
      key: exerciseKey,
      week: weekNum,
      day: dayNum,
      exercise: exerciseNum,
      weight: data.weight,
      reps: data.reps,
      sets: data.sets,
      notes: data.notes,
      completedAt: new Date().toISOString(),
      planId: selectedPlan?.id
    };

    setUserWorkouts(prev => {
      const existing = prev.findIndex(w => w.key === exerciseKey);
      if (existing >= 0) {
        prev[existing] = completedExercise;
      } else {
        prev.push(completedExercise);
      }
      return [...prev];
    });

    addToHistory(completedExercise);
  };

  const addToHistory = (workout) => {
    setWorkoutHistory(prev => [...prev, workout]);
  };

  const completeWorkoutDay = (weekNum, dayNum) => {
    const dayKey = `${weekNum}-${dayNum}`;
    
    const completedDay = {
      key: dayKey,
      week: weekNum,
      day: dayNum,
      completedAt: new Date().toISOString(),
      planId: selectedPlan?.id,
      duration: 60, // minutes
      exercises: 4,
      notes: ''
    };

    const existing = workoutHistory.findIndex(h => h.key === dayKey);
    if (existing >= 0) {
      workoutHistory[existing] = completedDay;
    } else {
      addToHistory(completedDay);
    }
  };

  const getCompletedExercises = (weekNum, dayNum) => {
    return userWorkouts.filter(w => w.week === weekNum && w.day === dayNum);
  };

  const getWeekStats = (weekNum) => {
    const weekWorkouts = userWorkouts.filter(w => w.week === weekNum);
    return {
      totalExercises: weekWorkouts.length,
      daysCompleted: new Set(weekWorkouts.map(w => w.day)).size,
      lastWorkout: weekWorkouts.length > 0 ? new Date(weekWorkouts[weekWorkouts.length - 1].completedAt) : null
    };
  };

  const getProgressOverTime = (exerciseNum) => {
    return userWorkouts
      .filter(w => w.exercise === exerciseNum)
      .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt))
      .map(w => ({
        date: new Date(w.completedAt),
        weight: w.weight,
        reps: w.reps
      }));
  };

  const updateNotes = (weekNum, dayNum, notes) => {
    const dayKey = `${weekNum}-${dayNum}`;
    const index = workoutHistory.findIndex(h => h.key === dayKey);
    
    if (index >= 0) {
      workoutHistory[index].notes = notes;
    }
  };

  const advanceToNextWeek = () => {
    if (selectedPlan && currentWeek < selectedPlan.duration) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const resetPlan = () => {
    setUserWorkouts([]);
    setWorkoutHistory([]);
    setSelectedPlan(null);
    setCurrentWeek(1);
    localStorage.removeItem('fitnessUserWorkouts');
    localStorage.removeItem('fitnessWorkoutHistory');
    localStorage.removeItem('fitnessSelectedPlan');
  };

  return (
    <WorkoutContext.Provider value={{
      userWorkouts,
      selectedPlan,
      selectPlan,
      workoutHistory,
      currentWeek,
      setCurrentWeek,
      completeExercise,
      completeWorkoutDay,
      getCompletedExercises,
      getWeekStats,
      getProgressOverTime,
      updateNotes,
      advanceToNextWeek,
      resetPlan,
      loading
    }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within WorkoutProvider');
  }
  return context;
}
