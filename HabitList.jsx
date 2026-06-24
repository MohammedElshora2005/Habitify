import React from 'react';
import HabitItem from './HabitItem';

function HabitList({ habits, onToggleDay, onDeleteHabit }) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <p>✨ لا توجد عادات بعد</p>
        <p>أضف عادة جديدة من الأعلى!</p>
      </div>
    );
  }

  return (
    <div className="habit-list">
      {habits.map(habit => (
        <HabitItem 
          key={habit.id} 
          habit={habit} 
          onToggleDay={onToggleDay}
          onDeleteHabit={onDeleteHabit}
        />
      ))}
    </div>
  );
}

export default HabitList;