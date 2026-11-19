import { useState } from "react";
import { Link, useParams } from "react-router";
function TaskDetailPage({ tasks, onUpdateTask }) {
  const { taskId } = useParams();
  const [draft, setDraft] = useState(null);
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return <p>Task not found</p>;
  function editTask() {
    setDraft({
      title: task.title,
      priority: task.priority,
      completed: task.completed,
    });
  }
  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }
  function saveChanges(event) {
    //event.preventDefault();
    const cleanTitle = draft.title.trim();
    if (!cleanTitle) return;
    onUpdateTask(task.id, { ...draft, cleanTitle });
    setDraft(null);
  }
  return (
    <article>
      <Link to="/">Back to Task List</Link>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? "Completed" : "Active"}</p>
      <p>Due date: {task.dueDate}</p>
      {draft === null ? (
        <button onClick={editTask}>Edit Task</button>
      ) : (
        <form onSubmit={saveChanges}>
          <label>
            Title
            <input
              value={draft.title}
              onChange={(event) => updateDraft("title", event.target.value)}
              required
            ></input>
          </label>
          <label>
            Priority
            <select
              value={draft.priority}
              onChange={(event) => updateDraft("priority", event.target.value)}
            >
              <option value="low">Low</option>
              <option value="meduim">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              checked={draft.completed}
              onChange={(event) =>
                updateDraft("completed", event.target.checked)
              }
            />
            Completed
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setDraft(null)}>
            Cancel
          </button>
        </form>
      )}
    </article>
  );
}
export default TaskDetailPage;
