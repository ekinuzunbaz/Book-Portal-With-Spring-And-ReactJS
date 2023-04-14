import React from "react";
import AdminService from "../../service/AdminService";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [book, setBook] = useState({
    id: bookId,
    title: "",
    type: "",
  });

  const { title, type } = book; // deconstruct the object

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // URL'e girilen bilgilerin gelmemesi için yazılır

    try {
      await AdminService.updateBook(book);
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
    <div className="container" style={{ marginBottom: 50, height: "75vh" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
          <h2 className="text-center m-4">Edit a Book</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Title
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)} // parametre geçebilmek için arrow function yazmalısın
                required={true}
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Type
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new type"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)} // parametre geçebilmek için arrow function yazmalısın
                required={true}
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-outline-primary">
              Change Now!
            </button>
            <Link className="btn btn-outline-danger mx-4" to="/admin/books/view">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
