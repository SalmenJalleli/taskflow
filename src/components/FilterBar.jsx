function FilterBar({ search, onSearchChange, status, onStatusChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="task-search">Search tasks</label>
      <input
        id="task-search"
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <label htmlFor="task-status">Status</label>
      <select
        id="task-status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">All tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  );
}

export default FilterBar;