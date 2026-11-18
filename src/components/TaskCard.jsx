import { Link } from "react-router";
// INDIVIDUAL TASK COMPONENT
function TaskCard({ task, onToggleComplete, onDeleteTask }) {
  return (
    <article className="task-card">
      <h2>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </h2>

      <p>{task.description}</p>

      <small>Priority: {task.priority}</small>

      <p>Status: {task.completed ? "Completed" : "Active"}</p>
      <p>
        <strong>Status:</strong>
        {task.status ?? "todo"}
      </p>
      <button type="button" onClick={() => onToggleComplete(task.id)}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>

      <button type="button" onClick={() => onDeleteTask(task.id)}>
        Delete
      </button>
    </article>
  );
}
export default TaskCard;
