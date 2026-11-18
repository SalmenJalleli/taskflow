//this component displays an individual task.
//we can use for drag and drop events the useDraggable from @dnd-kit/core.
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router";

function KanbanCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setActivatorNodeRef,
  } = useSortable({
    id: String(task.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article className="kanban-card" ref={setNodeRef} style={style}>
      <button
        type="button"
        {...listeners}
        {...attributes}
        ref={setActivatorNodeRef}
        aria-label={`Drag ${task.title}`}
      >
        ⠿
      </button>
      <Link to={`/tasks/${task.id}`} className="kanban-card-link">
        <h3>{task.title}</h3>
      </Link>
    </article>
  );
}
export default KanbanCard;
