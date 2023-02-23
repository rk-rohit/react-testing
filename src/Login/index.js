import React, { useState } from "react";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (userName && password) {
      try {
        setLoading(true);
        const result = await window
          .fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: userName, //"kminchelle",
              password: password //"0lelplR"
              // expiresInMins: 60, // optional
            })
          })
          .then((res) => res.json());
        if (result?.token) {
          setError("");
          setResult(result);
        } else {
          setResult(null);
          setError(result.message);
        }
        setLoading(false);
      } catch (e) {
        setError(e?.message);
        setLoading(false);
        console.log("error", e);
      }
    } else {
      setError("Please enter the user name and passord");
    }
  };

  if (loading) {
    return <div date-testid="loading">Login...</div>;
  }

  return (
    <div>
      <p>User Name</p>
      <input
        type="text"
        name="userName"
        data-testid="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <p>Password</p>
      <input
        type="password"
        name="password"
        value={password}
        data-testid="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button
        data-testid="login-btn"
        type="button"
        name="submit"
        onClick={login}
      >
        Login
      </button>
      {error && <p data-testid="error-msg">{error}</p>}
      <br />
      <br />
      {result?.token && <p data-testid="result">{result?.token}</p>}
    </div>
  );
};

export default Login;
