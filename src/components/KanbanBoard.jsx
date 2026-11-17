//KanbanBoard organizes the columns.
import KanbanColumn from "./KanbanColumn";
import { DndContext } from "@dnd-kit/core";
const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function KanbanBoard({ tasks, onMoveTask }) {
  function handleDragEnd(event) {
    const { active, over } = event;
    if (over === null) {
      return;
    } else {
      onMoveTask(active.id, over.id);
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            title={column.title}
            status={column.id}
            tasks={tasks}
          />
        ))}
      </div>
    </DndContext>
  );
}
export default KanbanBoard;
