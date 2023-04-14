import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminService from "../../service/AdminService";

export default function AddBook() {
  const navigate = useNavigate();

  const [author, setAuthor] = useState({});

  //const {name} = author;

  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await AdminService.addAuthor(author);

      navigate("/admin/authors/view");
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
    <div className="container" style={{marginBottom:50, height: "75vh"}}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Add an Author</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the name of author"
                name="name"
                value={author.name}
                onChange={(e) => onInputChange(e)}
                required={true}
                autoFocus
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Create Author
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
