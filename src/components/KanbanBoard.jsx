//KanbanBoard organizes the columns.
import KanbanColumn from "./KanbanColumn";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function KanbanBoard({ tasks, onMoveTask, onReorderTasks }) {
  function moveTaskPosition(activeId, overId) {
    const oldIndex = tasks.findIndex((task) => {
      return String(activeId) === String(task.id);
    });
    const newIndex = tasks.findIndex((task) => {
      return String(overId) === String(task.id);
    });
    if (oldIndex === -1 || newIndex === -1) {
      return tasks;
    }
    return arrayMove(tasks, oldIndex, newIndex);
  }
  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    //Dropped over a column
    const targetColumn = columns.find(
      (column) => column.id === over.id
    );
    if (targetColumn) {
      onMoveTask(active.id, targetColumn.id);
      return;
    }
    //Dropped over another task
    const targetTask = tasks.find(
      (task) => String(task.id) === String(over.id)
    );
    if(targetTask) {
      const reorderedTasks = moveTaskPosition(active.id, over.id);
      onReorderTasks(reorderedTasks)
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