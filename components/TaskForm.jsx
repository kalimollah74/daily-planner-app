'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'work', name: 'Work', color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' },
  { id: 'study', name: 'Study', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
  { id: 'health', name: 'Health', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
  { id: 'personal', name: 'Personal', color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' },
];

export default function TaskForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'work',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      setFormData({ title: '', description: '', category: 'work' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 animate-slide-in">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Task Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter task..."
          className="input-field"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          placeholder="Add details..."
          className="input-field resize-none"
          rows="3"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-2">
          Category
        </label>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat.id })}
              className={`p-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                formData.category === cat.id
                  ? cat.color + ' ring-2 ring-offset-2 ring-offset-white dark:ring-offset-secondary-800 ring-primary-500'
                  : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1">
          Add Task
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
