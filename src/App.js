import "./styles.css";
import React from "react";
import Login from "./Login";

export default function App() {
  const [title, setTitle] = React.useState(null);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button data-testid="click-btn" onClick={() => setTitle("hello")}>
        Click
      </button>

      <div data-testid="title-info">{title}</div>
      <Login />
    </div>
  );
}
