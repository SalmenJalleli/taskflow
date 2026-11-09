// PROPS
function SummaryCard({ completedTasksCount, activeCount }) {
  return (
    <div className="summary-card">
      <h2>Summary</h2>
      <p>Welcome to TaskFlow! See your tasks and progress at a glance.</p>
      <p>Total completed tasks: {completedTasksCount}</p>
      <p>Total active tasks: {activeCount}</p>
    </div>
  );
}
export default SummaryCard;