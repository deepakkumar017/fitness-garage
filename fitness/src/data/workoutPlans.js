export const workoutPlans = [
  {
    id: 1,
    name: 'Full Body Strength - Beginner',
    level: 'beginner',
    focus: 'strength',
    duration: 4,
    daysPerWeek: 3,
    image: '💪',
    description: 'Build a solid foundation with compound movements. Perfect for beginners.',
    overview: 'This 4-week program focuses on fundamental movements with progressive overload. Train 3 days per week with rest days in between.',
    goals: ['Build foundational strength', 'Improve movement patterns', 'Increase work capacity'],
    
    weeks: [
      {
        week: 1,
        theme: 'Foundation Building',
        days: [
          {
            day: 1,
            dayName: 'Monday - Chest & Triceps',
            warmup: {
              title: 'Warm-up (5-10 minutes)',
              exercises: [
                { name: 'Arm Circles', reps: '10 each direction' },
                { name: 'Jumping Jacks', reps: '20' },
                { name: 'Light Cardio (Jogging)', duration: '3 minutes' }
              ]
            },
            exercises: [
              {
                order: 1,
                name: 'Barbell Bench Press',
                sets: 4,
                reps: '8-10',
                rest: '2 min',
                description: 'Lie flat on bench, feet on floor. Lower bar to chest, press up explosively.',
                tips: ['Keep shoulders back', 'Full range of motion', 'Control the descent'],
                progression: 'Week 1: 60kg, Week 2: 62.5kg, Week 3: 65kg, Week 4: 67.5kg'
              },
              {
                order: 2,
                name: 'Incline Dumbbell Press',
                sets: 3,
                reps: '10-12',
                rest: '90 sec',
                description: 'Incline bench at 45 degrees. Press dumbbells up and slightly inward.',
                tips: ['Control the weight', 'Chest up', 'Full stretch at bottom'],
                progression: 'Week 1: 20kg, Week 2: 22.5kg, Week 3-4: 25kg'
              },
              {
                order: 3,
                name: 'Rope Pushdowns',
                sets: 3,
                reps: '12-15',
                rest: '60 sec',
                description: 'Attach rope to cable. Elbows stay fixed, push down and spread rope.',
                tips: ['Squeeze at bottom', 'Controlled tempo', 'No shoulder movement'],
                progression: 'Increase weight each week'
              },
              {
                order: 4,
                name: 'Dumbbell Flyes',
                sets: 3,
                reps: '12-15',
                rest: '60 sec',
                description: 'Lie on flat bench, arms slightly bent. Lower arms in arc motion.',
                tips: ['Slight elbow bend', 'Stretch at bottom', 'Control momentum'],
                progression: 'Add 1kg each week'
              }
            ],
            recovery: {
              title: 'Cool-down & Stretch (5 minutes)',
              exercises: [
                { name: 'Chest Stretch', duration: '30 sec each side' },
                { name: 'Tricep Stretch', duration: '30 sec each side' },
                { name: 'Shoulder Rolls', reps: '10 each direction' },
                { name: 'Deep Breathing', duration: '1 minute' }
              ]
            }
          },
          {
            day: 2,
            dayName: 'Wednesday - Back & Biceps',
            warmup: {
              title: 'Warm-up (5-10 minutes)',
              exercises: [
                { name: 'Arm Circles', reps: '10 each direction' },
                { name: 'Band Pull-aparts', reps: '15' },
                { name: 'Light Cardio (Rowing)', duration: '3 minutes' }
              ]
            },
            exercises: [
              {
                order: 1,
                name: 'Barbell Rows',
                sets: 4,
                reps: '8-10',
                rest: '2 min',
                description: 'Bend at hips, chest up. Row bar to chest, lower with control.',
                tips: ['Keep back straight', 'Drive elbows back', 'Squeeze shoulder blades'],
                progression: 'Week 1: 60kg, Week 2: 62.5kg, Week 3: 65kg, Week 4: 67.5kg'
              },
              {
                order: 2,
                name: 'Lat Pulldowns',
                sets: 3,
                reps: '10-12',
                rest: '90 sec',
                description: 'Pull bar down to chest, elbows wide. Control the return.',
                tips: ['Full range of motion', 'Chest up', 'Feel the lats working'],
                progression: 'Add 5kg each week'
              },
              {
                order: 3,
                name: 'Barbell Curls',
                sets: 3,
                reps: '10-12',
                rest: '90 sec',
                description: 'Stand tall, elbows at sides. Curl bar up, lower with control.',
                tips: ['No momentum', 'Full range', 'Elbows stay fixed'],
                progression: 'Week 1: 30kg, Week 2: 32.5kg, Week 3-4: 35kg'
              },
              {
                order: 4,
                name: 'Rowing Machine',
                sets: 3,
                reps: '30 seconds hard',
                rest: '60 sec',
                description: 'Legs first, then back, then arms. Reverse order on return.',
                tips: ['Proper form matters', 'Steady pace', 'Full range of motion'],
                progression: 'Increase intensity each week'
              }
            ],
            recovery: {
              title: 'Cool-down & Stretch (5 minutes)',
              exercises: [
                { name: 'Lat Stretch', duration: '30 sec each side' },
                { name: 'Bicep Stretch', duration: '30 sec each side' },
                { name: 'Shoulder and Chest Stretch', duration: '30 sec' },
                { name: 'Deep Breathing', duration: '1 minute' }
              ]
            }
          },
          {
            day: 3,
            dayName: 'Friday - Legs & Core',
            warmup: {
              title: 'Warm-up (5-10 minutes)',
              exercises: [
                { name: 'Leg Swings', reps: '10 each direction' },
                { name: 'Bodyweight Squats', reps: '15' },
                { name: 'Light Cardio (Walking)', duration: '3 minutes' }
              ]
            },
            exercises: [
              {
                order: 1,
                name: 'Barbell Back Squats',
                sets: 4,
                reps: '8-10',
                rest: '2 min',
                description: 'Bar on shoulders, chest up. Squat to parallel, stand up powerfully.',
                tips: ['Knees track toes', 'Chest up', 'Weight in heels'],
                progression: 'Week 1: 60kg, Week 2: 65kg, Week 3: 70kg, Week 4: 75kg'
              },
              {
                order: 2,
                name: 'Romanian Deadlifts',
                sets: 3,
                reps: '10-12',
                rest: '90 sec',
                description: 'Hinge at hips, slight knee bend. Feel hamstring stretch.',
                tips: ['Back stays straight', 'Slight knee bend', 'Stretch hamstrings'],
                progression: 'Add 5kg each week'
              },
              {
                order: 3,
                name: 'Leg Press',
                sets: 3,
                reps: '12-15',
                rest: '90 sec',
                description: 'Place feet on platform, lower weight to 90 degrees.',
                tips: ['Full range of motion', 'Knees track toes', 'No locking out'],
                progression: 'Add 10kg each week'
              },
              {
                order: 4,
                name: 'Plank Hold',
                sets: 3,
                reps: '45-60 seconds',
                rest: '60 sec',
                description: 'Core tight, body straight. Hold position.',
                tips: ['Engage core', 'No sagging hips', 'Breathe steadily'],
                progression: 'Add 15 seconds each week'
              }
            ],
            recovery: {
              title: 'Cool-down & Stretch (5 minutes)',
              exercises: [
                { name: 'Quad Stretch', duration: '30 sec each side' },
                { name: 'Hamstring Stretch', duration: '30 sec each side' },
                { name: 'Hip Flexor Stretch', duration: '30 sec each side' },
                { name: 'Deep Breathing', duration: '1 minute' }
              ]
            }
          }
        ]
      },
      {
        week: 2,
        theme: 'Progressive Overload Week 1',
        note: 'Increase weight by 2.5-5% from week 1'
      },
      {
        week: 3,
        theme: 'Progressive Overload Week 2',
        note: 'Increase weight by another 2.5-5%'
      },
      {
        week: 4,
        theme: 'Deload & Assess',
        note: 'Reduce weight by 10%, focus on form. Test maxes at end of week.'
      }
    ],

    nutrition: {
      macros: {
        protein: { value: 1.6, unit: 'g per kg bodyweight', description: 'Essential for muscle growth and recovery' },
        carbs: { value: 4, unit: 'g per kg bodyweight', description: 'Energy for workouts and recovery' },
        fats: { value: 0.8, unit: 'g per kg bodyweight', description: 'Hormone production and satiety' }
      },
      mealPlan: {
        title: 'Sample Day Meal Plan (2000 kcal)',
        meals: [
          {
            name: 'Breakfast',
            time: '7:00 AM',
            items: [
              { name: 'Oatmeal', quantity: '50g', macros: 'P: 5g, C: 27g, F: 3g' },
              { name: 'Banana', quantity: '1 medium', macros: 'P: 1g, C: 27g, F: 0g' },
              { name: 'Peanut Butter', quantity: '1 tbsp', macros: 'P: 4g, C: 3g, F: 8g' },
              { name: 'Whole Milk', quantity: '200ml', macros: 'P: 6.6g, C: 9.2g, F: 7.2g' }
            ],
            totals: 'P: 16.6g, C: 66.2g, F: 18.2g, Kcal: ~483'
          },
          {
            name: 'Mid-Morning Snack',
            time: '10:00 AM',
            items: [
              { name: 'Protein Powder', quantity: '25g', macros: 'P: 20g, C: 2g, F: 1g' },
              { name: 'Apple', quantity: '1 medium', macros: 'P: 0g, C: 25g, F: 0g' },
              { name: 'Almonds', quantity: '20g', macros: 'P: 6g, C: 4g, F: 14g' }
            ],
            totals: 'P: 26g, C: 31g, F: 15g, Kcal: ~343'
          },
          {
            name: 'Lunch',
            time: '1:00 PM',
            items: [
              { name: 'Chicken Breast', quantity: '200g', macros: 'P: 44g, C: 0g, F: 3.6g' },
              { name: 'Brown Rice', quantity: '150g cooked', macros: 'P: 4.5g, C: 30g, F: 1.5g' },
              { name: 'Broccoli', quantity: '150g', macros: 'P: 4.5g, C: 6g, F: 0.6g' },
              { name: 'Olive Oil', quantity: '1 tbsp', macros: 'P: 0g, C: 0g, F: 14g' }
            ],
            totals: 'P: 57g, C: 36g, F: 19.7g, Kcal: ~569'
          },
          {
            name: 'Pre-Workout',
            time: '4:00 PM',
            items: [
              { name: 'Banana', quantity: '1 medium', macros: 'P: 1g, C: 27g, F: 0g' },
              { name: 'White Bread', quantity: '2 slices', macros: 'P: 6g, C: 42g, F: 2g' },
              { name: 'Honey', quantity: '1 tbsp', macros: 'P: 0g, C: 17g, F: 0g' }
            ],
            totals: 'P: 7g, C: 86g, F: 2g, Kcal: ~367'
          },
          {
            name: 'Post-Workout',
            time: '6:30 PM',
            items: [
              { name: 'Whey Protein', quantity: '30g', macros: 'P: 24g, C: 2g, F: 1g' },
              { name: 'Dextrose', quantity: '30g', macros: 'P: 0g, C: 30g, F: 0g' },
              { name: 'Water', quantity: '300ml', macros: 'P: 0g, C: 0g, F: 0g' }
            ],
            totals: 'P: 24g, C: 32g, F: 1g, Kcal: ~228'
          },
          {
            name: 'Dinner',
            time: '8:00 PM',
            items: [
              { name: 'Salmon', quantity: '150g', macros: 'P: 25g, C: 0g, F: 13g' },
              { name: 'Sweet Potato', quantity: '200g', macros: 'P: 1.8g, C: 20g, F: 0.2g' },
              { name: 'Asparagus', quantity: '150g', macros: 'P: 3.3g, C: 5g, F: 0.2g' }
            ],
            totals: 'P: 30.1g, C: 25g, F: 13.4g, Kcal: ~380'
          }
        ]
      },
      hydration: {
        recommendation: 'Drink at least 3-4 liters of water daily',
        tips: [
          'Drink water between meals',
          'Drink water during workouts (500ml per 30 min)',
          'Monitor urine color (pale yellow = hydrated)',
          'Electrolytes important if training >60 min'
        ]
      },
      supplements: [
        { name: 'Whey Protein', purpose: 'Convenient protein source', timing: 'Post-workout or anytime' },
        { name: 'Creatine Monohydrate', purpose: 'Strength and muscle gains', timing: 'Daily, 5g per day' },
        { name: 'Multivitamin', purpose: 'Fill nutritional gaps', timing: 'With breakfast' },
        { name: 'Vitamin D', purpose: 'Bone health and immunity', timing: 'Daily, 2000-4000 IU' }
      ]
    }
  },

  {
    id: 2,
    name: 'Push/Pull/Legs - Intermediate',
    level: 'intermediate',
    focus: 'hypertrophy',
    duration: 6,
    daysPerWeek: 6,
    image: '🏋️',
    description: 'Classic split for muscle building with higher volume and frequency.',
    overview: 'A 6-week PPL split designed for muscle hypertrophy. Train 6 days per week with progressive overload and volume increases.',
    goals: ['Build lean muscle mass', 'Improve muscle definition', 'Increase strength']
  },

  {
    id: 3,
    name: 'HIIT Fat Loss - Intermediate',
    level: 'intermediate',
    focus: 'cardio',
    duration: 8,
    daysPerWeek: 4,
    image: '🔥',
    description: 'High-intensity intervals combined with strength for maximum fat loss.',
    overview: 'An 8-week program combining HIIT and strength training for superior fat loss.',
    goals: ['Lose fat', 'Preserve muscle', 'Improve conditioning']
  },

  {
    id: 4,
    name: 'Advanced Strength - Elite',
    level: 'advanced',
    focus: 'strength',
    duration: 12,
    daysPerWeek: 5,
    image: '👑',
    description: 'Advanced periodization for maximum strength gains. For experienced lifters.',
    overview: 'A 12-week periodized strength program with progressive peaks.',
    goals: ['Max strength gains', 'Break personal records', 'Competitive preparation']
  },

  {
    id: 5,
    name: 'Bodyweight Fitness - Beginner',
    level: 'beginner',
    focus: 'strength',
    duration: 4,
    daysPerWeek: 3,
    image: '🤸',
    description: 'Build strength using only bodyweight. No equipment needed.',
    overview: 'A 4-week beginner-friendly program using only bodyweight exercises.',
    goals: ['Build functional strength', 'Improve body awareness', 'Establish routine']
  }
];

export const getWorkoutPlanById = (id) => {
  return workoutPlans.find(plan => plan.id === parseInt(id));
};

export const getWorkoutPlansByLevel = (level) => {
  return workoutPlans.filter(plan => plan.level === level);
};

export const getWorkoutPlansByFocus = (focus) => {
  return workoutPlans.filter(plan => plan.focus === focus);
};
