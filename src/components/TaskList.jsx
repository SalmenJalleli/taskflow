import TaskCard from "./TaskCard.jsx";
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
export default TaskList;
