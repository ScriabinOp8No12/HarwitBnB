import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../store/modal";
import * as sessionActions from "../store/session";
import "./styles/LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        dispatch(closeModal());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    // add modal className to this LoginFormModal as well as the SignupFormModal
    <div className="modal">
      <h1 className="loginText">Log In for HarwitBnB</h1>
      <form onSubmit={handleSubmit}>
        <label className="usernameLabel">
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="usernameField"
          />
        </label>
        <label className="passwordLabel">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="passwordField"
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button type="submit" className="loginButton">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
