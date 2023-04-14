import React, { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import BookDetails from "./BookDetail";

import AdminService from "../../service/AdminService";

export default function SearchBook() {
  //let navigate = useNavigate();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
  });

  const { title } = book;

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(book);

    try {
      const response = await AdminService.searchBooks(book);
      console.log("SEARCH RESPONSE " + response.data);
      if (response.status === 200) {
        navigate("/admin/books/detail", { state: { book: response.data } });
      }
    } catch (error) {
      if (error.response.status === 404) {
        alert("Book " + "'" + book.title + "'" + " is not found");
      }
    }
  };

  return (
    <div className="container" style={{ marginBottom: 50, height: "75vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Search a Book</h2>

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
