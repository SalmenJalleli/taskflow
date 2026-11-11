import { useTheme } from "../context/ThemeContext";
// COMPONENT COMPOSITION
function PageHeader() {
  const {theme, toggleTheme} = useTheme();
  console.log("Current theme:", theme);
  return (
    <header>
      <h1>TaskFlow</h1>
      <p>Plan clearly. Finish confidently.</p>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}
export default PageHeader;
