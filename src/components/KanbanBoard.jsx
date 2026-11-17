//KanbanBoard organizes the columns.
import KanbanColumn from "./KanbanColumn";

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function KanbanBoard({ tasks, onMoveTask }) {
  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          status={column.id}
          tasks={tasks}
          onMoveTask={onMoveTask}
        />
      ))}
    </div>
  );
}
export default KanbanBoard;