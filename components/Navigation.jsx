'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ children }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Tasks', href: '/tasks', icon: '✓' },
    { name: 'Habits', href: '/habits', icon: '🔄' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 flex items-center gap-2 ${
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-secondary-200'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
