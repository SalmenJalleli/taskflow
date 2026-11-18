import { BrowserRouter, Routes, Route } from "react-router";
import useLocalStorageState from "./hooks/useLocalStorageState.jsx";
import HomePage from "./components/HomePage.jsx";
import TaskDetailPage from "./components/TaskDetailPage.jsx";
import NotFoundPage from "./components/NotFoundpage.jsx";
import RemoteTasksPage from "./components/RemoteTasksPage.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./App.css";

function toTaskArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  const ids = value?.allIds ?? value?.ids;
  const tasksById = value?.byId ?? value?.entities;

  if (Array.isArray(ids) && tasksById) {
    return ids.map((id) => tasksById[id]).filter(Boolean);
  }

  return [];
}

function App() {
  const [storedTasks, setStoredTasks] = useLocalStorageState("tasks", []);
  const tasks = toTaskArray(storedTasks);

  function setTasks(update) {
    setStoredTasks((currentValue) => update(toTaskArray(currentValue)));
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (String(task.id) !== String(id)) {
          return task;
        }

        const completed = !task.completed;

        return {
          ...task,
          completed,
          status: completed ? "done" : "todo",
        };
      }),
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => String(task.id) !== String(id)),
    );
  }

  function addTask(newTask) {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function updateTask(taskId, changes) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        String(task.id) === String(taskId) ? { ...task, ...changes } : task,
      ),
    );
  }

  function moveTask(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        String(task.id) === String(taskId)
          ? {
              ...task,
              status: newStatus,
              completed: newStatus === "done",
            }
          : task,
      ),
    );
  }

  function reorderTasks(reorderedTasks) {
    if (Array.isArray(reorderedTasks)) {
      setStoredTasks(reorderedTasks);
    }
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedTasksCount;

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onAddTask={addTask}
                onMoveTask={moveTask}
                onReorderTasks={reorderTasks}
                completedTasksCount={completedTasksCount}
                activeCount={activeCount}
              />
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <TaskDetailPage tasks={tasks} onUpdateTask={updateTask} />
            }
          />
          <Route path="/remote-tasks" element={<RemoteTasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;