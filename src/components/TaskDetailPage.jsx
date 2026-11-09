import { Link, useParams } from "react-router";
function TaskDetailPage({ tasks }) {
  const { taskId } = useParams();
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return <p>Task not found</p>;
  return (
    <article>
      <Link to="/">Back to Task List</Link>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.completed ? "Completed" : "Active"}</p>
    </article>
  );
}
export default TaskDetailPage;