import PageHeader from "./PageHeader.jsx";
import SummaryCard from "./SummaryCard.jsx";
import { useState } from "react";
import TaskList from "./TaskList.jsx";
function HomePage({
  tasks,
  onToggle,
  onDelete,
  onAddTask,
  completedTasksCount,
  activeCount,
}) {
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
  return (
    <main>
      <PageHeader />
      <SummaryCard
        completedTasksCount={completedTasksCount}
        activeCount={activeCount}
      />
      <Panel title="Your Tasks">
        <TaskList tasks={tasks} onToggle={onToggle} onDelete={onDelete} />
      </Panel>
      <TaskForm onAddTask={onAddTask} />
      <Counter />
    </main>
  );
}
export default HomePage;
