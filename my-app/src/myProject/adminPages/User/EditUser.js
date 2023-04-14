import React from "react";
import AdminService from "../../service/AdminService";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();

  const { userId } = useParams(); // URL'den id'yi al

  const [user, setUser] = useState({
    id: userId,
    userName: "",
  });

  const { userName, id } = user; // deconstruct the object

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // URL'e girilen bilgilerin gelmemesi için yazılır

    try {
      await AdminService.updateUser(user);

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
          <h2 className="text-center m-4">Edit an User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new username"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)} // parametre geçebilmek için arrow function yazmalısın
                required={true}
                autoFocus
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Change Now!
            </button>
            <Link className="btn btn-outline-danger mx-4" to="/admin/users/view">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
