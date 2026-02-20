# Smart Daily Planner

A modern web application to help you manage your daily tasks and build sustainable habits. Stay organized, track your progress, and achieve your goals with ease.

## Features

- **Task Management**: Create, manage, and track your daily tasks
- **Habit Tracking**: Build and monitor your daily habits
- **Statistics Dashboard**: View your progress with visual stats cards
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface with Tailwind CSS

## Project Structure

```
smart_daily_planner/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.jsx         # Root layout component
│   ├── page.jsx           # Home page
│   ├── habits/
│   │   └── page.jsx       # Habits management page
│   └── tasks/
│       └── page.jsx       # Tasks management page
├── components/            # Reusable React components
│   ├── HabitForm.jsx      # Form for adding habits
│   ├── HabitItem.jsx      # Habit item display
│   ├── Header.jsx         # Header component
│   ├── Navigation.jsx     # Navigation menu
│   ├── StatCard.jsx       # Statistics display card
│   ├── TaskForm.jsx       # Form for adding tasks
│   └── TaskItem.jsx       # Task item display
├── lib/                   # Utility functions and custom hooks
│   ├── hooks.js          # Custom React hooks
│   └── utils.js          # Helper functions
├── package.json           # Project dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── jsconfig.json          # JavaScript configuration
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kalimollah74/daily-planner-app.git
cd smart_daily_planner
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Managing Tasks
- Navigate to the Tasks page to create and manage your daily tasks
- Add new tasks using the task form
- Mark tasks as complete or delete them as needed

### Building Habits
- Go to the Habits page to add and track your daily habits
- Monitor your habit completion
- View statistics on your habit-building progress

### Dashboard
- The home page displays your overall statistics and progress
- See at-a-glance information about your tasks and habits

## Technologies Used

- **Next.js** - React framework for production
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Programming language

## Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Data persistence with database
- [ ] Recurring tasks and habits
- [ ] Notifications and reminders
- [ ] Dark mode support
- [ ] Export reports
- [ ] Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository.

---

**Author**: Kalimollah74  
**Repository**: https://github.com/kalimollah74/daily-planner-app.git
