import React, { useState } from 'react';

function AddHabitForm({ onAddHabit }) {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName);
      setHabitName('');
    }
  };

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="أضف عادة جديدة..."
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        maxLength="30"
      />
      <button type="submit">➕ إضافة</button>
    </form>
  );
}

export default AddHabitForm;