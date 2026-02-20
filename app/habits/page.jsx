'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import HabitForm from '@/components/HabitForm';
import HabitItem from '@/components/HabitItem';
import { useLocalStorage } from '@/lib/hooks';
import { generateId, getToday, getWeekStats, calculateStreak } from '@/lib/utils';
import { useState } from 'react';

export default function HabitsPage() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [showForm, setShowForm] = useState(false);
  const today = getToday();
  const weekStats = getWeekStats(habits);

  const handleAddHabit = (formData) => {
    const newHabit = {
      id: generateId(),
      name: formData.name,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };
    setHabits([newHabit, ...habits]);
    setShowForm(false);
  };

  const handleToggleHabit = (id, date) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const completedDates = habit.completedDates || [];
          const isCompleted = completedDates.includes(date);
          return {
            ...habit,
            completedDates: isCompleted
              ? completedDates.filter((d) => d !== date)
              : [...completedDates, date],
          };
        }
        return habit;
      })
    );
  };

  const handleDeleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const handleEditHabit = (updatedHabit) => {
    setHabits(
      habits.map((habit) =>
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };

  const sortedHabits = [...habits].sort((a, b) => {
    const streakA = calculateStreak(a.completedDates || []);
    const streakB = calculateStreak(b.completedDates || []);
    return streakB - streakA;
  });

  const completedToday = habits.filter((h) => h.completedDates?.includes(today)).length;

  return (
    <>
      <Header />
      <Navigation>
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                Habits
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400">
                {completedToday} of {habits.length} completed today
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary self-start"
            >
              + Add Habit
            </button>
          </div>

          {showForm && (
            <HabitForm
              onAdd={handleAddHabit}
              onCancel={() => setShowForm(false)}
            />
          )}

          {habits.length > 0 && (
            <div className="card smooth-gradient">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {habits.map((habit) => {
                  const stats = weekStats[habit.id];
                  return (
                    <div key={habit.id} className="text-center p-3 bg-white dark:bg-secondary-700 rounded-lg">
                      <p className="font-semibold text-sm text-secondary-900 dark:text-white truncate mb-2">
                        {habit.name}
                      </p>
                      <p className="text-2xl font-bold text-primary-600">
                        {stats?.completed || 0}
                      </p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        this week
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-3">
            {sortedHabits.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-2xl mb-2">🌱</p>
                <p className="text-secondary-600 dark:text-secondary-400">
                  No habits yet. Create one to start building positive routines!
                </p>
              </div>
            ) : (
              sortedHabits.map((habit) => (
                <HabitItem
                  key={habit.id}
                  habit={habit}
                  today={today}
                  onToggle={handleToggleHabit}
                  onDelete={handleDeleteHabit}
                  onEdit={handleEditHabit}
                />
              ))
            )}
          </div>
        </div>
      </Navigation>
    </>
  );
}
