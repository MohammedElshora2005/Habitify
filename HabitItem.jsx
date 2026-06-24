import React from 'react';
import DayButton from './DayButton';

function HabitItem({ habit, onToggleDay, onDeleteHabit }) {
  const daysNames = ['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'];
  const completedCount = habit.days.filter(day => day).length;
  const totalDays = habit.days.length;
  const percentage = Math.round((completedCount / totalDays) * 100);
  
  // حساب الـ streak (عدد الأيام المتتالية من آخر يوم)
  let streak = 0;
  for (let i = habit.days.length - 1; i >= 0; i--) {
    if (habit.days[i]) {
      streak++;
    } else {
      break;
    }
  }

  return (
    <div className="habit-item">
      <div className="habit-info">
        <h3>{habit.name}</h3>
        <div className="habit-stats">
          <span className="habit-progress">{percentage}%</span>
          {streak > 0 && <span className="habit-streak">🔥 {streak} أيام</span>}
        </div>
      </div>
      <div className="habit-actions">
        <div className="days-container">
          {habit.days.map((isCompleted, index) => (
            <DayButton
              key={index}
              dayName={daysNames[index]}
              isCompleted={isCompleted}
              onToggle={() => onToggleDay(habit.id, index)}
            />
          ))}
        </div>
        <button 
          className="delete-btn"
          onClick={() => onDeleteHabit(habit.id)}
          title="حذف العادة"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default HabitItem;