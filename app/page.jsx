'use client';

import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import StatCard from '@/components/StatCard';
import HabitItem from '@/components/HabitItem';
import { useLocalStorage } from '@/lib/hooks';
import { getTaskCompletionPercentage, calculateStreak, getWeekStats, getToday } from '@/lib/utils';

export default function Dashboard() {
  const [tasks] = useLocalStorage('tasks', []);
  const [habits] = useLocalStorage('habits', []);
  const today = getToday();

  const completionPercentage = getTaskCompletionPercentage(tasks);
  const topStreaks = habits
    .map((h) => ({
      ...h,
      streak: calculateStreak(h.completedDates || []),
    }))
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 3);

  const weekStats = getWeekStats(habits);
  const avgHabitCompletion = habits.length > 0
    ? Math.round(
      Object.values(weekStats).reduce((sum, stat) => sum + stat.percentage, 0) / habits.length
    )
    : 0;

  return (
    <>
      <Header />
      <Navigation>
        <div className="space-y-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
              Dashboard
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Tasks Completed"
              value={`${completionPercentage}%`}
              subtitle={`${tasks.filter((t) => t.completed).length} of ${tasks.length} tasks`}
              icon="✓"
              trend={completionPercentage > 50 ? 1 : -1}
            />
            <StatCard
              title="Habit Consistency"
              value={`${avgHabitCompletion}%`}
              subtitle="This week's average"
              icon="🔄"
              trend={avgHabitCompletion > 60 ? 1 : 0}
            />
            <StatCard
              title="Best Streak"
              value={topStreaks[0]?.streak || '0'}
              subtitle={topStreaks[0]?.name || 'No habits yet'}
              icon="🔥"
            />
          </div>

          {topStreaks.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Top Habits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topStreaks.map((habit) => (
                  <div key={habit.id} className="card smooth-gradient">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-secondary-900 dark:text-white">
                          {habit.name}
                        </p>
                        <p className="text-3xl font-bold text-primary-600 mt-2">
                          {habit.streak}
                          <span className="text-xs text-secondary-500 dark:text-secondary-400 ml-1">
                            days
                          </span>
                        </p>
                      </div>
                      <div className="text-4xl">🔥</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {habits.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Today's Habits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habits.map((habit) => (
                  <HabitItem
                    key={habit.id}
                    habit={habit}
                    today={today}
                    onToggle={() => {}}
                    onDelete={() => {}}
                    onEdit={() => {}}
                  />
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && habits.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl mb-2">👋</p>
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                Welcome to Smart Daily Planner
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                Create your first task or habit to get started
              </p>
            </div>
          )}
        </div>
      </Navigation>
    </>
  );
}
