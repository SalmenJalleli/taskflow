import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Title is required");
      return;
    }

    onAddTask({
      id: crypto.randomUUID(),
      title: cleanTitle,
      description: "",
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
      status: "todo",
    });

    setTitle("");
    setPriority("medium");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={80}
      />

      <label htmlFor="priority">Priority:</label>
      <select
        id="priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
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
export default TaskForm;
