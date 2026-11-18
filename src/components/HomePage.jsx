import PageHeader from "./PageHeader.jsx";
import SummaryCard from "./SummaryCard.jsx";
import { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList.jsx";
import useTaskFilters from "../hooks/useTaskFilters.jsx";
import KanbanBoard from "./KanbanBoard.jsx";
import Panel from "./Panel.jsx";
import TaskForm from "./TaskForm.jsx";
import FilterBar from "./FilterBar.jsx";
function HomePage({
  tasks,
  onToggle,
  onDelete,
  onAddTask,
  completedTasksCount,
  activeCount,
  onMoveTask,
  onReorderTasks,
}) {
  // CHILDREN / COMPOSITION
  const { search, setSearch, status, setStatus, filteredTasks } =
    useTaskFilters(tasks);
  const boardTasks = tasks.map((task) => ({
    ...task,
    status: task.status ?? (task.completed ? "done" : "todo"),
  }));
  useEffect(() => {
    console.log(search);
  });
  // LOCAL STATE AND EVENT HANDLING
  function Counter() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>Count: {count}</p>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setCount((currentCount) => currentCount + 1)}
        >
          Increment
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setCount((currentCount) => currentCount - 1)}
        >
          Decrement
        </button>
      </div>
    );
  }
  return (
    <main>
      <PageHeader />
      <SummaryCard
        completedTasksCount={completedTasksCount}
        activeCount={activeCount}
      />
      <Panel title="Your Tasks">
        <KanbanBoard
          tasks={boardTasks}
          onMoveTask={onMoveTask}
          onReorderTasks={onReorderTasks}
        />
        <TaskForm onAddTask={onAddTask} />
        <div className="task-list-section">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
          />
          <TaskList className="task-list"
            tasks={filteredTasks}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      </Panel>
      {/*<Counter />*/}
    </main>
  );
}
export default HomePage;
