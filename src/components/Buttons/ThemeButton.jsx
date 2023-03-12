import React, { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";
import "./styles/styles.css";

export default function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} className="btn-theme-toggler">
      {theme === "light" ? (
        <i className="bi bi-moon"></i>
      ) : (
        <i className="bi bi-brightness-low"></i>
      )}
    </button>
  );
}
