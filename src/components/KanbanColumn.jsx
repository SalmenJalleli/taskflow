//displays tasks belonging to a particular status.

import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
function KanbanColumn({ title, status, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  // 1. Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    return task.status === status;
  });
  const count = filteredTasks.length;
  /*function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }
  function handleDrop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
    if (!taskId) return;
    onMoveTask(taskId, status);
  }*/
  return (
    <section
      className={`kanban-column ${isOver ? "drag-over" : ""}`}
      //onDrop={handleDrop}
      //onDragOver={handleDragOver}
      ref={setNodeRef}
    >
      <h2>
        {title} ({count})
      </h2>
      <SortableContext items={filteredTasks.map((task) => String(task.id))}>
        {count === 0 ? (
          <p>No Tasks</p>
        ) : (
          filteredTasks.map((task) => <KanbanCard key={task.id} task={task} />)
        )}
      </SortableContext>
    </section>
  );
}

export default KanbanColumn;
