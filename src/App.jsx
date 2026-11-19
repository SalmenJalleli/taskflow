import { BrowserRouter, Routes, Route } from "react-router";
import useLocalStorageState from "./hooks/useLocalStorageState.jsx";
import HomePage from "./components/HomePage.jsx";
import TaskDetailPage from "./components/TaskDetailPage.jsx";
import NotFoundPage from "./components/NotFoundpage.jsx";
import RemoteTasksPage from "./components/RemoteTasksPage.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./App.css";
import { useReducer, useEffect } from "react";

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

  const [{ tasks, lastDeleted }, dispatch] = useReducer(
    taskReducer,
    storedTasks,
    (initialValue) => ({
      tasks: toTaskArray(initialValue),
      lastDeleted: null,
    }),
  );
  useEffect(() => {
    if (!lastDeleted) return;
    const timeoutId = setTimeout(() => {
      dispatch({ type: "DISMISS_UNDO" });
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [lastDeleted, dispatch]);
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  useEffect(() => {
    if (lastDeleted) {
      console.log("Deleted task:", lastDeleted.task);
      console.log("Original index:", lastDeleted.index);
    }
  }, [lastDeleted]);

  function taskReducer(state, action) {
    switch (action.type) {
      case "UPDATE_TASKS":
        return {
          ...state,
          tasks: action.update(state.tasks),
        };

      case "DELETE_TASK": {
        const index = state.tasks.findIndex(
          (task) => String(task.id) === String(action.id),
        );

        if (index === -1) return state;

        return {
          ...state,
          tasks: state.tasks.filter(
            (task) => String(task.id) !== String(action.id),
          ),
          lastDeleted: {
            task: state.tasks[index],
            index,
          },
        };
      }
      case "UNDO_DELETE": {
        if (!state.lastDeleted) return state;

        const { task, index } = state.lastDeleted;
        const tasks = [...state.tasks];

        tasks.splice(index, 0, task);

        return {
          ...state,
          tasks,
          lastDeleted: null,
        };
      }
      case "DISMISS_UNDO":
        return {
          ...state,
          lastDeleted: null,
        };
      default:
        return state;
    }
  }
  function setTasks(update) {
    dispatch({ type: "UPDATE_TASKS", update });
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
    dispatch({ type: "DELETE_TASK", id });
    console.log(lastDeleted);
  }

  function reorderTasks(reorderedTasks) {
    if (Array.isArray(reorderedTasks)) {
      setTasks(() => reorderedTasks);
    }
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
  function onUndo() {
    dispatch({ type: "UNDO_DELETE" });
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
              <>
                {lastDeleted && (
                  <div className="alert alert-info d-flex align-items-center gap-2">
                    <span role="status">
                      Deleted “{lastDeleted.task.title}”.
                    </span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary"
                      onClick={onUndo}
                    >
                      Undo
                    </button>
                  </div>
                )}
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
              </>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={<TaskDetailPage tasks={tasks} onUpdateTask={updateTask} />}
          />
          <Route path="/remote-tasks" element={<RemoteTasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
