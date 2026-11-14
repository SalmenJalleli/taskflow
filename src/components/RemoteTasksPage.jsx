import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { fetchTasks } from "../services/tasksApi";

function RemoteTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const data = await fetchTasks(controller.signal);
        setTasks(data);
        setStatus("success");
      } catch (err) {
        if (err.name == "AbortError") return;
        setError(err.message);
        setStatus("error");
      }
    }
    load();
    return () => controller.abort();
  }, []);
  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "error") return <p role="alert">{error}</p>;
  return <TaskList tasks={tasks} />;
}
//The AbortController prevents an obsolete request from continuing after the component is no longer using it.
//In a larger production app, a data-fetching library or framework-level data APIs can handle caching, retries and request deduplication.
export default RemoteTasksPage;
