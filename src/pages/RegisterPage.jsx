import React from "react";
import useRegister from "../hooks/useRegister";
import "./styles/styles.css";

function RegisterPage() {
  const [
    name,
    onChangeName,
    email,
    onChangeEmail,
    password,
    onChangePassword,
    onSubmitHandler,
  ] = useRegister();

  return (
    <div className="register-page-container">
      <div className="page-title">
        <h1>REGISTER</h1>
      </div>
      <div className="name-input">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={onChangeName}
        />
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
      <div className="register-container-action-button">
        <button
          className="register-button"
          type="submit"
          onClick={onSubmitHandler}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
