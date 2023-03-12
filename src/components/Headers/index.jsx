import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ThemeButton from "../Buttons/ThemeButton";
import "./styles/styles.css";

function Headers({ authUser }) {
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
        />
      </div>
      <div className="menu-container">
        <div className="theme">
          <ThemeButton />
        </div>
        <div className="user">
          {authUser !== null ? (
            <>
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
            </>
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
};

Headers.defaultProps = {
  authUser: null,
};

export default Headers;
