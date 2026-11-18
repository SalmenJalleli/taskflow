# TaskFlow — React Task Management Application

TaskFlow is a task management web application built with **React, JavaScript, and Vite**. It provides an interactive environment for creating, organizing, tracking, and managing tasks through a traditional task list and a Kanban-style board.

The project was developed as a hands-on learning experience to explore modern frontend development, React architecture, component composition, state management, client-side routing, asynchronous operations, testing, and drag-and-drop interactions.

TaskFlow demonstrates how fundamental React concepts can be combined to build a practical, interactive single-page application.

## Features

### 1. Task Management (CRUD)

TaskFlow provides essential task management functionality.

- **Create tasks:** Add new tasks with a title, description, and priority.
- **View tasks:** Display existing tasks through reusable React components.
- **Edit tasks:** Update task information using a dedicated task details page.
- **Delete tasks:** Remove tasks from the application.
- **Complete tasks:** Mark tasks as completed or incomplete.
- **Task priorities:** Categorize tasks using priority levels such as High, Medium, and Low.

Task updates are handled using immutable state operations, including JavaScript's `map()`, `filter()`, and spread syntax.

### 2. Interactive Kanban Board

TaskFlow includes a Kanban board that organizes tasks into three workflow stages:

| Column | Description |
|---|---|
| To Do | Tasks that have not been started |
| In Progress | Tasks currently being worked on |
| Done | Completed tasks |

The Kanban implementation uses three reusable components:

- `KanbanBoard` — Organizes the workflow columns and coordinates drag-and-drop operations.
- `KanbanColumn` — Displays tasks belonging to a specific status and registers a droppable area.
- `KanbanCard` — Represents an individual draggable and sortable task.

Each column dynamically filters tasks based on their status and displays a task counter and an empty-state message when applicable.

### 3. Drag-and-Drop Task Management

TaskFlow integrates **dnd-kit**, a React drag-and-drop toolkit, to support interactive task organization.

Implemented capabilities include:

- Dragging tasks between Kanban columns.
- Updating a task's status when moved to another column.
- Automatically synchronizing the `completed` property with the Done status.
- Reordering tasks within the same column.
- Visual feedback while dragging.
- Highlighting active drop targets.
- Smooth task-position transitions.
- Persisting task changes and ordering through localStorage.

The implementation uses:

| Tool | Purpose |
|---|---|
| `DndContext` | Coordinates drag-and-drop interactions |
| `useDroppable()` | Registers Kanban columns as drop targets |
| `SortableContext` | Defines ordered groups of tasks |
| `useSortable()` | Makes individual task cards draggable and sortable |
| `arrayMove()` | Creates reordered task arrays |
| `CSS.Transform.toString()` | Converts drag transforms into CSS styles |

The drag-and-drop logic distinguishes between dropping a task onto a column and dropping it onto another task.

### 4. Persistent Task Storage

TaskFlow uses the browser's **localStorage API** to persist task data between sessions.

A custom React hook, `useLocalStorageState`, encapsulates the logic for managing state backed by localStorage.

This allows task information, completion status, workflow status, and ordering to remain available after refreshing the page.

Benefits include:

- No backend required for local task persistence.
- Reusable storage logic.
- State synchronization with React components.
- A foundation for future backend integration.

### 5. Task Filtering and Progress Tracking

TaskFlow includes task filtering and derived-state functionality.

The application calculates information such as:

- Total active tasks.
- Total completed tasks.
- Task completion status.
- Tasks belonging to each Kanban workflow stage.

A custom hook, `useTaskFilters`, encapsulates task-filtering logic and demonstrates how reusable behavior can be extracted from components.

Derived values are calculated from existing state rather than maintained as unnecessary duplicate state.

### 6. Light and Dark Theme Support

TaskFlow implements a theme-switching system using the React Context API.

The theme architecture includes:

- `ThemeContext` for sharing theme information.
- `ThemeProvider` for providing theme state to components.
- A custom `useTheme()` hook for consuming theme context.
- A theme toggle for switching between light and dark appearance.
- CSS-based styling for theme-dependent visual elements.

This demonstrates how React Context can share application-wide state without passing props through every intermediate component.

### 7. Client-Side Routing

TaskFlow uses **React Router** to implement navigation within a single-page application.

The routing architecture includes:

| Route | Description |
|---|---|
| `/` | Main task management interface |
| `/tasks/:taskId` | Individual task details and editing |
| `/remote-tasks` | Remote task data demonstration |
| `*` | Fallback page for unknown routes |

React Router concepts explored include:

- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- Dynamic URL parameters
- Route-based component rendering
- Navigation between application views

The dedicated task details page allows users to access and update individual tasks.

### 8. Forms and Event Handling

TaskFlow demonstrates controlled forms and React event handling through task creation and editing.

Concepts include:

- Controlled form inputs.
- React `useState()` for form values.
- `onChange` handlers.
- `onSubmit` handlers.
- `event.preventDefault()`.
- Form submission and validation logic.
- Updating parent state through callback props.

These patterns illustrate React's declarative approach to handling user input.

### 9. API Integration and Asynchronous Data

TaskFlow includes a `RemoteTasksPage` component that demonstrates fetching task data from an external API.

The implementation explores:

- JavaScript `async` and `await`.
- The Fetch API.
- Promises and asynchronous operations.
- `useEffect()` for synchronizing with external systems.
- Loading, success, and error states.
- `AbortController` for cancelling obsolete requests.
- Separation of API communication into a service module.

The `tasksApi` service separates network requests from presentation components.

This provides a foundation for connecting TaskFlow to a backend API in the future.

### 10. Component-Based Architecture

TaskFlow is organized into reusable React components with distinct responsibilities.

Examples include:

| Component | Responsibility |
|---|---|
| `HomePage` | Main application interface |
| `PageHeader` | Application header and theme controls |
| `SummaryCard` | Task overview and summary |
| `TaskList` | Renders a collection of tasks |
| `TaskCard` | Displays an individual task |
| `TaskDetailPage` | Displays and edits task details |
| `KanbanBoard` | Organizes Kanban workflow columns |
| `KanbanColumn` | Displays tasks by status |
| `KanbanCard` | Provides sortable task interactions |
| `RemoteTasksPage` | Demonstrates API-based data fetching |
| `NotFoundPage` | Handles unmatched routes |

The architecture emphasizes separation of concerns, reusable components, and predictable data flow.

### 11. React Hooks and State Management

TaskFlow uses several React hooks and related patterns.

**`useState()`**

Manages local component state, including form inputs and interactive UI elements.

**`useEffect()`**

Handles synchronization with external systems, including asynchronous data fetching.

**`useContext()`**

Allows components to access shared theme state.

**`useReducer()`**

Demonstrates reducer-based state management through a separate counter example, using dispatched actions and a reducer function.

**Custom Hooks**

Reusable application logic is extracted into hooks such as:

- `useLocalStorageState`
- `useTaskFilters`
- `useTheme`

The main task collection is currently managed through `useLocalStorageState`, while the reducer example demonstrates an alternative approach to state management.

### 12. Testing with Vitest and React Testing Library

The project includes work on component testing using:

- **Vitest** — JavaScript testing framework.
- **React Testing Library** — Tests components through their rendered behavior.
- **@testing-library/user-event** — Simulates user interactions.

Testing concepts explored include:

- Rendering React components in tests.
- Querying elements by accessible roles.
- Simulating button clicks.
- Creating mock functions with `vi.fn()`.
- Checking callback invocations.
- Testing components that depend on React Router context.

For example, a task-card test can verify that clicking a completion button calls the appropriate callback with the task ID.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| JavaScript (ES6+) | Application logic |
| JSX | Declarative UI syntax |
| Vite | Development server and build tooling |
| React Router | Client-side navigation |
| dnd-kit Core | Drag-and-drop coordination |
| dnd-kit Sortable | Sortable task interactions |
| dnd-kit Utilities | Drag transforms and styling |
| CSS3 | Layout, themes, and responsive styling |
| Bootstrap | UI styling utilities |
| Browser localStorage | Client-side task persistence |
| Fetch API | External API communication |
| AbortController | Request cancellation |
| Vitest | Automated testing |
| React Testing Library | Component behavior testing |
| Git and GitHub | Version control and source hosting |

## Project Structure

The following illustrates the main modules and components used in TaskFlow. Exact paths may vary according to the current repository organization.

```text
taskflow/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── PageHeader.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskDetailPage.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── KanbanColumn.jsx
│   │   ├── KanbanCard.jsx
│   │   ├── RemoteTasksPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorageState.jsx
│   │   └── useTaskFilters.jsx
│   ├── services/
│   │   └── tasksApi.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── index.html
└── README.md
```

## Getting Started

### Prerequisites

Ensure that you have the following installed:

- Node.js (a version supported by your installed Vite release)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/SalmenJalleli/taskflow.git
```

**2. Navigate into the project**

```bash
cd taskflow
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit the local URL displayed by Vite in your terminal, typically:

```text
http://localhost:5173
```

### Run Tests

```bash
npx vitest run
```

For interactive test development:

```bash
npx vitest
```

### Production Build

```bash
npm run build
```

The production-ready output is generated in the `dist` directory.

## Key React Concepts Demonstrated

This project provides practical experience with:

- JSX and component rendering.
- Functional components.
- Props and one-way data flow.
- Component composition and the `children` prop.
- Conditional rendering.
- Rendering lists with `.map()` and stable keys.
- Immutable state updates.
- State lifting and callback props.
- Controlled forms.
- Event handling.
- React hooks and custom hooks.
- Context-based shared state.
- Reducer patterns and action dispatching.
- Effect cleanup.
- Asynchronous data fetching.
- Client-side routing.
- Dynamic route parameters.
- Drag-and-drop interactions.
- Sortable lists.
- Component testing.
- Browser persistence.
- Separation of concerns.

## Application Architecture

TaskFlow follows React's unidirectional data flow.

The main application owns the task collection and passes data and callbacks to child components.

For example, moving a task through the Kanban board follows this sequence:

```text
User drags a Kanban card
          |
          v
      KanbanCard
      useSortable()
          |
          v
       DndContext
       onDragEnd()
          |
          v
       KanbanBoard
          |
          +--> onMoveTask()
          |
          +--> onReorderTasks()
          |
          v
        App.jsx
          |
          v
       setTasks()
          |
          v
   useLocalStorageState
          |
          v
   React re-renders the UI
```

This design keeps drag-and-drop interaction logic separate from the task state and persistence logic.

## Future Improvements

Potential enhancements include:

- Cross-column sorting with insertion at a specific task position.
- A drag handle for individual Kanban cards.
- Improved keyboard and touch drag-and-drop interactions.
- Enhanced accessibility and focus management.
- More comprehensive unit and integration tests.
- TypeScript migration.
- Backend integration with persistent database storage.
- User authentication and personal workspaces.
- Task due dates and reminders.
- Search and advanced filtering.
- Task categories, labels, and tags.
- Responsive layout improvements for mobile devices.
- Performance optimization for larger task collections.
- Deployment to a hosting platform.

## Project Motivation

TaskFlow was created to strengthen practical frontend development skills by applying React concepts to a real application rather than studying them only in isolation.

The project builds on prior Java, Kotlin, and Android development experience while exploring JavaScript, browser APIs, React's declarative UI model, component architecture, and modern frontend tooling.

Each feature represents an opportunity to understand not only how React works, but also how to structure maintainable applications and solve realistic frontend engineering problems.

## License

See the `LICENSE` file for the license terms.

---

**TaskFlow — Plan clearly. Finish confidently.**
