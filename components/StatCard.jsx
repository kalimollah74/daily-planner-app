'use client';

export default function StatCard({ title, value, subtitle, icon, trend }) {
  return (
    <div className="card smooth-gradient border-primary-200 dark:border-primary-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
            {title}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white">
              {value}
            </span>
            {trend && (
              <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-secondary-500'}`}>
                {trend > 0 ? '↑' : '→'} {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-3xl sm:text-4xl opacity-20">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
