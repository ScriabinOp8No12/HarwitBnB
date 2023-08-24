import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeModal } from "../store/modal";
import * as sessionActions from "../store/session";
import "./styles/LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        dispatch(closeModal());
        history.push("/"); // Redirect user to home page after successful login
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleDemoLogin = () => {
    const demoCredential = "test1@gmail.com";
    const demoPassword = "password";

    return dispatch(
      sessionActions.login({
        credential: demoCredential,
        password: demoPassword,
      })
    )
      .then(() => {
        dispatch(closeModal());
      })
      .catch(async (res) => {
        const data = await res.json();
        // console.log(data);
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    // add modal className to this LoginFormModal as well as the SignupFormModal
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h1 className="loginText">Log In</h1>
        {errors.credential && (
          <div className="errorMessage">
            <p>{errors.credential}</p>
          </div>
        )}
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
        <button
          type="submit"
          className={`loginButton ${
            credential.length < 4 || password.length < 6 ? "disabledButton" : ""
          }`}
          disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
        <button onClick={handleDemoLogin} className="demoLoginButton">
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;

// The error messages from the backend are being handled in the catch block of the promise returned by the sessionActions.login dispatch. Here's how it works:
// Dispatching the Login Action: When the form is submitted, the handleSubmit function is called, which dispatches the sessionActions.login action with the provided credentials.
// Handling Success: If the login is successful, the .then block is executed, closing the modal and redirecting the user to the home page.
// Handling Errors: If there's an error (e.g., incorrect credentials), the .catch block is executed. Inside this block, the response from the server is converted to JSON, and the errors are extracted.
// Setting Errors in State: The errors are then set in the component's local state using setErrors(data.errors). This will cause the component to re-render.
// Displaying Errors: In the JSX, there's a conditional rendering block that checks if there are any errors related to the credential field:

// {errors.credential && (
//   <div className="errorMessage">
//     <p>{errors.credential}</p>
//   </div>
// )}

// If there are errors for the credential field, they will be displayed inside a <div> with the class errorMessage.
// The backend should be structured to return errors in a specific format that the frontend expects. Typically, this would be a JSON object where the keys correspond to the fields that have errors, and the values are the error messages.
// For example, if the username or email is incorrect, the backend might return a response like this:

// {
//   "errors": {
//     "credential": "Incorrect username or email."
//   }
// }

// This structure allows the frontend to easily map the errors to the corresponding form fields and display the messages to the user.
