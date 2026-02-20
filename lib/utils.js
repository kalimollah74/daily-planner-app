export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getToday() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getTaskCompletionPercentage(tasks) {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}

export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  const sortedDates = [...dates].sort().reverse();
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const dateStr of sortedDates) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (daysDiff === 1) {
      streak++;
      currentDate = new Date(date);
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function getWeekStats(habits) {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const stats = {};

  habits.forEach((habit) => {
    const completedThisWeek = (habit.completedDates || []).filter((dateStr) => {
      const date = new Date(dateStr);
      return date >= weekStart && date < weekEnd;
    }).length;

    stats[habit.id] = {
      name: habit.name,
      completed: completedThisWeek,
      total: 7,
      percentage: Math.round((completedThisWeek / 7) * 100),
    };
  });

  return stats;
}
