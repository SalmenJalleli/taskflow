import { useState, useEffect } from "react";
import useLocalStorageState from "./hooks/useLocalStorageState.jsx";
import "./App.css";

// Initial task data
const sampleTasks = [
  {
    id: 1,
    title: "Learn JSX",
    description: "Build the first screen",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Create components",
    description: "Split the UI",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Style the app",
    description: "Add spacing and colour",
    priority: "low",
    completed: true,
  },
];
//Task to add
let taskToAdd = {
  id: 4,
  title: "Add a new task",
  description: "Implement the add task feature",
  priority: "medium",
  completed: false,
};
function App() {
  // STATE: App owns the tasks state
  const [tasks, setTasks] = useLocalStorageState("tasks", []);

  // Toggle task completion
  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // Delete a task
  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  // Add a new task
  function addTask(newTask) {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  // Derived state: calculate task statistics
  const completedTasksCount = tasks.filter((task) => task.completed).length;

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <main>
      <PageHeader />

      <SummaryCard
        completedTasksCount={completedTasksCount}
        activeCount={activeCount}
      />

      <Panel title="Your Tasks">
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </Panel>
      <TaskForm onAddTask={addTask} />
      <Counter />
    </main>
  );
}

// COMPONENT COMPOSITION
function PageHeader() {
  return (
    <header>
      <h1>TaskFlow</h1>
      <p>Plan clearly. Finish confidently.</p>
    </header>
  );
}

// PROPS
function SummaryCard({ completedTasksCount, activeCount }) {
  return (
    <div className="summary-card">
      <h2>Summary</h2>
      <p>Welcome to TaskFlow! See your tasks and progress at a glance.</p>
      <p>Total completed tasks: {completedTasksCount}</p>
      <p>Total active tasks: {activeCount}</p>
    </div>
  );
}

// INDIVIDUAL TASK COMPONENT
function TaskCard({ task, onToggleComplete, onDeleteTask }) {
  return (
    <article className="task-card">
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <small>Priority: {task.priority}</small>

      <p>Status: {task.completed ? "Completed" : "Active"}</p>

      <button type="button" onClick={() => onToggleComplete(task.id)}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>

      <button type="button" onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </article>
  );
}

// LIST RENDERING
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <section>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggle}
          onDeleteTask={onDelete}
        />
      ))}
    </section>
  );
}

// CHILDREN / COMPOSITION
function Panel({ title, children }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// LOCAL STATE AND EVENT HANDLING
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setCount((currentCount) => currentCount + 1)}
      >
        Increment
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setCount((currentCount) => currentCount - 1)}
      >
        Decrement
      </button>
    </div>
  );
}

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      return;
    }
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Title cannot be empty");
      return;
    }
    onAddTask({
      id: crypto.randomUUID(),
      title: cleanTitle,
      description: "",
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={80}
      />
      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Add Task</button>
    </form>
  );
}
export default App;
