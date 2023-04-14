import React from "react";
import AdminService from "../../service/AdminService";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const history = useNavigate();
  const { authorId } = useParams();

  const [author, setAuthor] = useState({
    id: authorId,
    name: "",
  });

  const { id, name } = author; // deconstruct the object

  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // URL'e girilen bilgilerin gelmemesi için yazılır

    try {
      await AdminService.updateAuthor(author);
      history.push("/admin/authors/view");
    } catch (error) {
      if (error.response.status === 500) {
        alert(
          "Author " +
            "'" +
            author.name +
            "'" +
            " has already exists. Type another name!"
        );
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: 50, height: "75vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Edit an Author</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Enter the new name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)} // parametre geçebilmek için arrow function yazmalısın
                required={true}
                autoFocus
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Change Now!
            </button>
            <Link className="btn btn-outline-danger mx-4" to="/admin/authors/view">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
