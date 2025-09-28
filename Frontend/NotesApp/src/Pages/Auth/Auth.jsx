import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";

const backend = "http://localhost:8000/api/";

const Auth = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUser) {
        const response = await axios.post(`${backend}token/`, {
          username,
          password,
        });
        console.log(response.data);
        
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        setToken(response.data.access);
      } else {
        const response = await axios.post(`${backend}register/`, {
          username,
          email,
          password,
        });
        alert("Registration successful! Please login.");
        setUser(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="notes-container">
      {isUser ? (
        <form className="form-page">
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            New User? <a onClick={() => setUser(!isUser)}>Register</a>
          </p>
          <button type="submit" onClick={handleSubmit}>Login</button>
        </form>
      ) : (
        <form className="form-page">
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            Already have an account? <a onClick={() => setUser(!isUser)}>Login</a>
          </p>
          <button type="submit" onClick={handleSubmit}>
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;
