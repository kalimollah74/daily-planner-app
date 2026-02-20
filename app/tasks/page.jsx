'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import TaskForm from '@/components/TaskForm';
import TaskItem from '@/components/TaskItem';
import { useLocalStorage } from '@/lib/hooks';
import { generateId } from '@/lib/utils';
import { useState } from 'react';

const CATEGORY_NAMES = {
  work: 'Work',
  study: 'Study',
  health: 'Health',
  personal: 'Personal',
};

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAddTask = (formData) => {
    const newTask = {
      id: generateId(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((t) => t.category === selectedCategory)
    : tasks;

  const completedCount = filteredTasks.filter((t) => t.completed).length;

  return (
    <>
      <Header />
      <Navigation>
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                Tasks
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                {completedCount} of {filteredTasks.length} completed
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary self-start"
            >
              + Add Task
            </button>
          </div>

          {showForm && (
            <TaskForm
              onAdd={handleAddTask}
              onCancel={() => setShowForm(false)}
            />
          )}

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 hover:bg-secondary-300 dark:hover:bg-secondary-600'
              }`}
            >
              All Tasks ({tasks.length})
            </button>
            {Object.entries(CATEGORY_NAMES).map(([id, name]) => {
              const count = tasks.filter((t) => t.category === id).length;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    selectedCategory === id
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 hover:bg-secondary-300 dark:hover:bg-secondary-600'
                  }`}
                >
                  {name} ({count})
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl mb-2">📭</p>
                <p className="text-secondary-600 dark:text-secondary-400">
                  {selectedCategory ? `No tasks in this category` : 'No tasks yet. Create one to get started!'}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                />
              ))
            )}
          </div>
        </div>
      </Navigation>
    </>
  );
}
