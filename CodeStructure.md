# CodeStructure.md

This file tracks the structure of the AfterSunriseAI project and the purpose of each file. Each file contains no more than 100 lines, and all functions and components are documented to ensure the project is GPT-maintainable.

## src/
- **Sidebar.js**: Manages the sidebar navigation. Contains links to different views such as Todos, History, Planning, and Analytics.
- **Header.js**: Displays the date selector and tab navigation (Today, Tomorrow, Rest of the week, Later).
- **TaskCategories.js**: Manages the "Work" and "Personal" sections. Allows users to add new tasks dynamically, delete tasks, and mark tasks as completed using a checkbox. The tasks are stored in state, and new tasks are added via text inputs. Tasks are persisted using `AsyncStorage` so they are available even after the app is closed and reopened. Deletion and completion status are also synced to local storage. Tasks are animated when added or deleted using `LayoutAnimation`. Each task has a checkbox to toggle its completion status.
- **DayPlanner.js**: Displays a timeline with hourly slots, allowing users to plan their tasks for specific times during the day.
- **Footer.js**: Contains buttons like "Plan My Day," "Start Break," and "Shutdown the Day," placed at the bottom of the screen.
