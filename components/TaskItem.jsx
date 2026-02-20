'use client';

import { useState } from 'react';

const CATEGORY_COLORS = {
  work: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  study: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  health: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
  personal: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
};

const CATEGORY_NAMES = {
  work: 'Work',
  study: 'Study',
  health: 'Health',
  personal: 'Personal',
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit({
        ...task,
        title: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="card space-y-3 animate-fade-in">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="input-field font-medium"
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="input-field resize-none text-sm"
          rows="2"
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
    <div
      className={`card group transition-all duration-200 ${
        task.completed ? 'opacity-60' : ''
      } animate-fade-in hover:shadow-md`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center mt-1 ${
            task.completed
              ? 'bg-primary-600 border-primary-600'
              : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-600'
          }`}
        >
          {task.completed && <span className="text-white text-sm font-bold">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`font-medium text-sm sm:text-base transition-all duration-200 ${
              task.completed
                ? 'line-through text-secondary-400 dark:text-secondary-600'
                : 'text-secondary-900 dark:text-secondary-100'
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs sm:text-sm text-secondary-600 dark:text-secondary-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`badge ${CATEGORY_COLORS[task.category] || CATEGORY_COLORS.work}`}>
              {CATEGORY_NAMES[task.category] || 'Work'}
            </span>
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
            onClick={() => onDelete(task.id)}
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
