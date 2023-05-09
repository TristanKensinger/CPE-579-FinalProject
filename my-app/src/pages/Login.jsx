import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";

const LOGIN_URL = "/login";

function Login() {
  const [success, setSuccess] = useState(false);

  const userRef = useRef();
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [username, setUsername] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = user.length > 0;
    const v2 = pwd.length > 0;
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      console.log("axios call");
      const response = await axios.post(
        LOGIN_URL,
        { user, pwd },
        { headers: { "Content-Type": "application/json" } }
      );
      setUsername(response.data.username);
      setSuccess(true);
      // clear input fields
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = user.length > 0;
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = pwd.length > 0;
    setValidPwd(result);
  }, [pwd]);

  return (
    <>
      {success ? (
        <section>
          <h1 className="successMessage">Successful Log In!</h1>
          <div className="variableDiv">
            <p>Username:</p>
            <p className="variable">{username}</p>
          </div>
          <p>
            <br />
            <span className="line">
              <Link to="/">Home</Link>
            </span>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            {/* username input */}
            <label htmlFor="username">Username:</label> <br />
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
            />
            {/* password input */}
            <label htmlFor="password">Password:</label> <br />
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
            />
            {/* submit button */}
            <button disabled={!validName || !validPwd ? true : false}>
              Log in
            </button>
          </form>
          <p>
            Don't have an account?
            <br />
            <span className="line">
              <Link to="/register">Register</Link>
            </span>
          </p>
          <p>
            <Link to="/">Home</Link>
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
