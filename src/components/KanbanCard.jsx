//this component displays an individual task.

function KanbanCard({ task }) {
  function handleDragStart(event) {
    console.log("dragging task:", task.id);
    event.dataTransfer.setData("text/plain", String(task.id));
    event.dataTransfer.effectAllowed = "move";
  }
  return (
    <article className="kanban-card" draggable onDragStart={handleDragStart}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Priority: {task.priority}</small>
    </article>
  );
}

export default KanbanCard;
