import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecoder from "jwt-decode";

import UserService from "../service/UserService";

const Login = (props) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials; // deconstruct the object

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  let response;

  const { checkLoggedIn } = props;

  const onSubmit = async (e) => {
    e.preventDefault(); // URL'e girilen bilgilerin gelmemesi için yazılır

    try {
      response = await UserService.login(credentials);
      checkLoggedIn();

      const decoded = jwtDecoder(localStorage.getItem("token"));
      console.log("LOGIN DECODED " + decoded.role);

      if (decoded.role.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (decoded.role.includes("ROLE_USER")) {
        navigate("/user");
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("Bad request");
      } else if (error.response.status === 406) {
        alert("Wrong username or password!");
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
          <h2 className="text-center m-4">Welcome to Book Portal</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)} // parametre geçebilmek için arrow function yazmalısın
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
            <div style={{ alignContent: "center" }}>
              <button type="submit" className="btn btn-outline-primary">
                Sign In!
              </button>
            </div>
            <br></br>
            <div>
              <Link
                style={{ textDecorationLine: "underline", color: "GrayText" }}
                to="/register"
              >
                Don't have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
