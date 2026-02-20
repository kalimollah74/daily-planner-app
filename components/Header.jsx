'use client';

import { useTheme } from '@/lib/hooks';

export default function Header() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  if (!isLoaded) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
            📋
          </div>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
              Smart Daily Planner
            </h1>
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              Stay organized and productive
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="btn-icon p-3"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <span className="text-xl">🌙</span>
          ) : (
            <span className="text-xl">☀️</span>
          )}
        </button>
      </div>
    </header>
  );
}
