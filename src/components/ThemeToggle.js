import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="text-2xl">
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
