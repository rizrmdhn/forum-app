import React from "react";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function LoginPage() {
  const [email, onChangeEmail, password, onChangePassword, onSubmitHandler] =
    useLogin();

  return (
    <div className="login-page-container">
      <div className="page-title">
        <h1>LOGIN</h1>
      </div>
      <div className="email-input">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="password-input">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="login-container-action-button">
        <button
          className="login-button"
          type="submit"
          onClick={onSubmitHandler}
        >
          Login
        </button>
      </div>
      <div className="message-container">
        <p className="message">
          Need an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
