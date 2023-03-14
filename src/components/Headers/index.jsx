import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ThemeButton from "../Buttons/ThemeButton";
import "./styles/styles.css";
import { asyncUnsetAuthUser } from "../../states/authUser/action";
import { setLocaleActionCreator } from "../../states/locale/action";
import { setThemeActionCreator } from "../../states/theme/action";

function Headers({ authUser, searchQuery, setSearchQuery }) {
  const { locale = "id", theme = "light" } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.locale) {
      dispatch(setLocaleActionCreator(localStorage.locale));
    } else {
      localStorage.setItem("locale", "id");
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const onChangeTheme = () => {
    dispatch(setThemeActionCreator(theme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  const onChangeLanguage = (lang) => {
    dispatch(setLocaleActionCreator(lang));
    localStorage.setItem("locale", lang);
  };
  const setLogout = () => {
    dispatch(asyncUnsetAuthUser());

    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="title-container">
        <h1 className="title">
          <Link to="/" className="title-link">
            Forum APP
          </Link>
        </h1>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search thread ..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>
      <div className="menu-container">
        <div className="theme">
          <ThemeButton theme={theme} toggleTheme={() => onChangeTheme()} />
        </div>
        <div className="user">
          {authUser !== null ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={
                    authUser.avatar !== null
                      ? authUser.avatar
                      : "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="user"
                  className="user-image"
                />
                <div className="user-name">{authUser.name}</div>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => setLogout()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

Headers.propTypes = {
  authUser: PropTypes.object,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
};

Headers.defaultProps = {
  authUser: null,
  searchQuery: "",
};

export default Headers;
