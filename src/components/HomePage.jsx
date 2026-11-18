import PageHeader from "./PageHeader.jsx";
import SummaryCard from "./SummaryCard.jsx";
import { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList.jsx";
import useTaskFilters from "../hooks/useTaskFilters.jsx";
import KanbanBoard from "./KanbanBoard.jsx";
import Panel from "./Panel.jsx";
function HomePage({
  tasks,
  onToggle,
  onDelete,
  onAddTask,
  completedTasksCount,
  activeCount,
  onMoveTask,
  onReorderTasks
}) {
  // CHILDREN / COMPOSITION
  const { search, setSearch, status, setStatus, filteredTasks } =
    useTaskFilters(tasks);
  const boardTasks = tasks.map((task) => ({
    ...task,
    status: task.status ?? (task.completed ? "done" : "todo"),
  }));
  useEffect(() => {
    console.log(search);
  });
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
        status: "todo"
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
        <p>Search:</p>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        ></input>
        <KanbanBoard tasks={boardTasks} onMoveTask={onMoveTask} onReorderTasks={onReorderTasks} />
        <TaskList
          tasks={filteredTasks}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      </Panel>
      <TaskForm onAddTask={onAddTask} />
      <p>Filters:</p>
      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="all">All tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <Counter />
    </main>
  );
}
export default HomePage;
