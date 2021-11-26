import { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity(`Password don't match`);
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="loginInput"
              ref={username}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              minLength="6"
              ref={password}
              required
            />
            <input
              type="password"
              placeholder="Password Again"
              className="loginInput"
              minLength="6"
              ref={passwordAgain}
              required
            />
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Log into Account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
