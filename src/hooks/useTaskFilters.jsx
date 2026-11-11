import { useState } from "react";

function useTaskFilters(tasks) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const filteredTasks = tasks.filter((task) => {
    const matchesText = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      status === "all" ||
      (status === "active" && !task.completed) ||
      (status === "completed" && task.completed);
    return matchesText && matchesStatus;
  });
  return {
    search,
    setSearch,
    status,
    setStatus,
    filteredTasks,
  };
}
export default useTaskFilters;
