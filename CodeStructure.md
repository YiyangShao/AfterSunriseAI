# CodeStructure.md

This file tracks the structure of the AfterSunriseAI project and the purpose of each file. Each file contains no more than 100 lines, and all functions and components are documented to ensure the project is GPT-maintainable.

## src/
- **Sidebar.js**: Manages the sidebar navigation. Contains links to different views such as Todos, History, Planning, and Analytics.
- **Header.js**: Displays the date selector and tab navigation (Today, Tomorrow, Rest of the week, Later), now placed above both DayPlanner and TaskCategories.
- **TaskCategories.js**: Manages both the "Work" and "Personal" task lists. It passes data and functions to the `TaskList` component, which handles displaying the tasks and their respective operations.
- **TaskList.js**: Displays a list of tasks for a specific category (Work or Personal). It handles adding new tasks, task input, and renders individual `TaskItem` components.
- **TaskItem.js**: Responsible for rendering an individual task item, including the checkbox for completion, the task text, and the delete button.
- **DayPlanner.js**: Displays a timeline with hourly slots and fetches time block assignments from the backend. If fetching fails, the component uses placeholder data and displays an error message. Tasks are passed from `TaskCategories`, and the frontend reads the time blocks from the backend and renders them accordingly.
- **Footer.js**: Contains buttons like "Plan My Day," "Start Break," and "Shutdown the Day," placed at the bottom of the screen.
- **dataStructures.json**: Defines the JSON structure for task data and time block assignments between the frontend and backend.
