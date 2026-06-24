import React from 'react';

function HabitHeader({ habits }) {
  let totalDays = 0;
  let completedDays = 0;

  habits.forEach(habit => {
    habit.days.forEach(day => {
      totalDays++;
      if (day) completedDays++;
    });
  });

  const percentage = totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);
  
  let bestHabit = null;
  let bestPercentage = -1;
  
  habits.forEach(habit => {
    const habitTotal = habit.days.length;
    const habitCompleted = habit.days.filter(day => day).length;
    const habitPercentage = habitTotal === 0 ? 0 : Math.round((habitCompleted / habitTotal) * 100);
    if (habitPercentage > bestPercentage) {
      bestPercentage = habitPercentage;
      bestHabit = habit;
    }
  });

  return (
    <div className="header">
      <h2>📋 متتبع العادات الأسبوعي</h2>
      <div className="stats-container">
        <p>📊 نسبة الإنجاز: <strong>{percentage}%</strong></p>
        <p>📌 عدد العادات: <strong>{habits.length}</strong></p>
        {bestHabit && bestPercentage > 0 && (
          <p>🏆 الأفضل: <strong>{bestHabit.name}</strong> ({bestPercentage}%)</p>
        )}
      </div>
    </div>
  );
}

export default HabitHeader;