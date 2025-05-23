import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: "var(--text-color)", // Gunakan variabel CSS
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
