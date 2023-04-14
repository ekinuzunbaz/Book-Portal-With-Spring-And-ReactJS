import React, { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";

import UserService from "../../service/UserService";

export default function SearchBook() {
  //let navigate = useNavigate();
  const navigate = useNavigate();

  const [author, setAuthor] = useState({
    name: "",
  });

  const { name } = author;

  const onInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(book);

    try {
      const response = await UserService.searchAuthors(author);
      if (response.status === 200) {
        const path = "/user/authors/detail/" + author.name;
        navigate(path, { state: { author: response.data } });
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Author " + "'" + author.name + "'" + " is not found");
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: 50, height: "75vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Search an Author</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter name of author"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required={true}
                autoFocus
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
            <Link className="btn btn-outline-danger mx-4" to="/user">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
