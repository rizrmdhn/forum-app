import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";

function ThemeButton({ theme, toggleTheme }) {
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

ThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ThemeButton;
