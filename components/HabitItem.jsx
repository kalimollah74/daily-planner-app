'use client';

import { calculateStreak } from '@/lib/utils';
import { useState } from 'react';

export default function HabitItem({ habit, onToggle, onDelete, onEdit, today }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const isCompletedToday = habit.completedDates?.includes(today);
  const streak = calculateStreak(habit.completedDates || []);

  const handleSave = () => {
    if (editName.trim()) {
      onEdit({ ...habit, name: editName });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="card space-y-3 animate-fade-in">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="input-field font-medium"
          autoFocus
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="btn-primary flex-1 text-sm">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn-secondary flex-1 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card group animate-fade-in hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={() => onToggle(habit.id, today)}
            className={`flex-shrink-0 w-10 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center font-bold ${
              isCompletedToday
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-secondary-300 dark:border-secondary-600 text-secondary-400 hover:border-primary-600'
            }`}
          >
            {isCompletedToday ? '✓' : ''}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 truncate">
              {habit.name}
            </h3>
            <p className="text-2xl font-bold text-primary-600 mt-1">
              {streak}
              <span className="text-xs text-secondary-500 dark:text-secondary-400 ml-1 font-normal">
                day streak
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-icon text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900"
            title="Edit"
          >
            ✎
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="btn-icon text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
