import React from "react";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useLocale from "../hooks/useLocale";

function LoginPage() {
  const [email, onChangeEmail, password, onChangePassword, onSubmitHandler] =
    useLogin();

  const { textLogin, textRegister, textNeedAccount } = useLocale();

  return (
    <div className="login-page-container">
      <div className="page-title">
        <h1>LOGIN</h1>
      </div>
      <div className="email-input">
        <input
          type="email"
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
          {textLogin}
        </button>
      </div>
      <div className="message-container">
        <p className="message">
          {textNeedAccount} <Link to="/register">{textRegister}</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
