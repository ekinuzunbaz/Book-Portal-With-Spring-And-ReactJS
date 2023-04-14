import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminService from "../../service/AdminService";

export default function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    type: "",
    authorName: "",
  });

  const { title, type, authorName } = book;

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(book);

    try {
      await AdminService.addBook(book);
      navigate("/admin/books/view");
    } catch (error) {
      if (error.response.status === 500) {
        alert(
          "Book " +
            "'" +
            book.title +
            "'" +
            " with type " +
            "'" +
            book.type +
            "'" +
            " has already exists."
        );
      }
    }
  };

  return (
    <div className="container" style={{marginBottom:50 , height: "75vh"}}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Add a Book</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Title
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter title of book"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
                required={true}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Type" className="form-label">
                Type
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter type of book"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Author Name" className="form-label">
                Author Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter author name of book"
                name="authorName"
                value={authorName}
                onChange={(e) => onInputChange(e)}
                required={true}
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Create Book
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
