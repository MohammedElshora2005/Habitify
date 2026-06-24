import React from 'react';

function DayButton({ dayName, isCompleted, onToggle }) {
  return (
    <button
      className={`day-btn ${isCompleted ? 'completed' : ''}`}
      onClick={onToggle}
      aria-label={`${dayName} - ${isCompleted ? 'مكتمل' : 'غير مكتمل'}`}
    >
      {isCompleted ? '✓' : dayName}
    </button>
  );
}

export default DayButton;