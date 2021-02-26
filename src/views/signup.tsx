import "../assets/styles/login.scss";
import supabase from "../supabase";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signUpLocal = async (event) => {
    event.preventDefault();
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setErrorMessage((current) => (current = error));
    } else {
      setSuccessMessage(
        (current) =>
          (current =
            "Success! Please check your email for a confirmation link.")
      );
    }
  };

  return (
    <div className="container">
      {successMessage ? <div className="alert">{successMessage}</div> : null}
      {errorMessage ? <div className="alert">{errorMessage}</div> : null}
      <h2>Signup</h2>
      <form onSubmit={(event) => signUpLocal(event)}>
        <div className="container">
          <label htmlFor="uname">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="uname"
            value={email}
            onChange={(event) => {
              setErrorMessage((current) => (current = ""));
              setEmail((current) => (current = event.target.value));
            }}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            value={password}
            onChange={(event) => {
              setErrorMessage((current) => (current = ""));
              setPassword((current) => (current = event.target.value));
            }}
            required
          />

          <button type="submit">Login</button>
        </div>

        <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
          {/* <button type="button" className="cancelbtn">Cancel</button> */}
          <span className="psw">
            {" "}
            <Link to="/signup"> Sign Up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
