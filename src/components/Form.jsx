import { useState } from "react";
import "./App.css";

const Form = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="ui main">
      <div className="ui input">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />
        <button
          className="ui button orange"
          onClick={() => handleClick(email, pass)}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export { Form };
