import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminService from "../../service/AdminService";

export default function AddUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = user; // deconstruct the object

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // URL'e girilen bilgilerin gelmemesi için yazılır
    console.log(user);
    try {
      await AdminService.addUser(user); // bu işlemi önce bir yapsın (await yaz) sonra push olsun
      navigate("/admin/users/view");
    } catch (error) {
      if (error.response.status === 500) {
        alert(
          "User " +
            "'" +
            user.userName +
            "'" +
            " has already exists. Type another username!"
        );
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: 50, height: "75vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Add an User</h2>

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
            <button type="submit" className="btn btn-outline-primary">
              Add Now!
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
