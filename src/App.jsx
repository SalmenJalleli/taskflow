import useLocalStorageState from "./hooks/useLocalStorageState.jsx";
import useTaskFilters from "./hooks/useTaskFilters.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import TaskDetailPage from "./components/TaskDetailPage.jsx";
import HomePage from "./components/HomePage.jsx";
import NotFoundPage from "./components/NotFoundpage.jsx";
import CompA from "./components/CompA.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useReducer } from "react";
import RemoteTasksPage from "./components/RemoteTasksPage.jsx";

// Initial task data
const sampleTasks = [
  {
    id: 1,
    title: "Learn JSX",
    description: "Build the first screen",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Create components",
    description: "Split the UI",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Style the app",
    description: "Add spacing and colour",
    priority: "low",
    completed: true,
  },
];
//Task to add
let taskToAdd = {
  id: 4,
  title: "Add a new task",
  description: "Implement the add task feature",
  priority: "medium",
  completed: false,
};
const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      state;
  }
  console.log(state);
  return { count: state.count + 1 };
}
function App() {
  // STATE: App owns the tasks state
  const [tasks, setTasks] = useLocalStorageState("tasks", []);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  function increment() {
    dispatch({ type: ACTIONS.INCREMENT });
  }
  function decrement() {
    dispatch({ type: ACTIONS.DECREMENT });
  }
  // Toggle task completion
  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  // Delete a task
  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  // Add a new task
  function addTask(newTask) {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  // Derived state: calculate task statistics
  const completedTasksCount = tasks.filter((task) => task.completed).length;

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <>
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
                  completedTasksCount={completedTasksCount}
                  activeCount={activeCount}
                />
              }
            />
            <Route
              path="/tasks/:taskId"
              element={<TaskDetailPage tasks={tasks} />}
            />
            <Route path="/remote-tasks" element={<RemoteTasksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <button onClick={increment}>increase</button>
      <p>{state.count}</p>
      <button onClick={decrement}>decrease</button>
      <CompA />
    </>
  );
}
export default App;
