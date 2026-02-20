import './globals.css';

export const metadata = {
  title: 'Smart Daily Planner',
  description: 'Modern SaaS-style daily planner for tasks and habits',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75" font-weight="bold" fill="%236366f1">✓</text></svg>',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
