//displays tasks belonging to a particular status.

import KanbanCard from "./KanbanCard";

function KanbanColumn({ title, status, tasks, onMoveTask }) {
  // 1. Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    return task.status === status;
  });
  const count = filteredTasks.length;
  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }
  function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    if (!taskId) return;
    onMoveTask(taskId, status);
  }
  return (
    <section
      className="kanban-column"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2>
        {title} ({count})
      </h2>
      {count === 0 ? (
        <p>No Tasks</p>
      ) : (
        filteredTasks.map((task) => <KanbanCard key={task.id} task={task} />)
      )}
    </section>
  );
}

export default KanbanColumn;
