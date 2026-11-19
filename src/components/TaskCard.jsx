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
        <strong>Status: </strong>
        {task.status ?? "todo"}
      </p>
      {task.dueDate && (
        <p>
          Due date:{" "}
          {new Date(task.dueDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      )}
      <div className="task-actions">
        <button
          className="task-action"
          type="button"
          onClick={() => onToggleComplete(task.id)}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button type="button" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
export default TaskCard;
