import React, { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";

import AdminService from "../../service/AdminService";

export default function SearchUser() {
  //let navigate = useNavigate();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
  });

  const { username } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(book);

    try {
      const response = await AdminService.searchUsers(user);
      if (response.status === 200) {
        navigate("/admin/users/detail", { state: { user: response.data } });
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("User " + "'" + username + "'" + " is not found!");
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: 50, height: "75vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Search an User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
                required={true}
                autoFocus
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
            <Link className="btn btn-outline-danger mx-4" to="/admin">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
