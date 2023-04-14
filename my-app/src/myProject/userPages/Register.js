import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

export default function Register() {

  const { userName, password } = user;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      await UserService.register(user);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 500) {
        alert(
          "User '" + user.userName + "' has already exists. Type another username!"
        );
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: 50, height: "83vh" }}>
      <div className="row">
        <div
          className="col-md-6 offset-md-3 border rounded p-4 mt-5 shadow"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h2 className="text-center m-4">Join Us</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)}
                required={true}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <br></br>
            <div>
              <button type="submit" className="btn btn-outline-primary">
                Sign Up!
              </button>
            </div>
            <br></br>
            <div>
              <Link
                style={{ textDecorationLine: "underline", color: "GrayText" }}
                to="/login"
              >
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
