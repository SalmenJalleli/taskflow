//this component displays an individual task.
//we can use for drag and drop events the useDraggable from @dnd-kit/core.
import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function KanbanCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: String(task.id),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <article
      className="kanban-card"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h3>{task.title}</h3>
    </article>
  );
}
export default KanbanCard;
