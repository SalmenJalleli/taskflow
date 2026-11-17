//this component displays an individual task.
//we can use for drag and drop events the useDraggable from @dnd-kit/core.
import { useDraggable } from "@dnd-kit/core";

function KanbanCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: String(task.id),
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <article
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