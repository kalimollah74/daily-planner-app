'use client';

import { useState } from 'react';

export default function HabitForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({ name: name.trim() });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-3 animate-slide-in">
      <div>
        <label htmlFor="habitName" className="block text-sm font-medium mb-2">
          Habit Name
        </label>
        <input
          id="habitName"
          type="text"
          placeholder="e.g., Meditate, Exercise, Read..."
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1">
          Add Habit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
