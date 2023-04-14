import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "../styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwtDecoder from "jwt-decode";

import Login from "./userPages/Login";
import Register from "./userPages/Register";
import AdmMainPage from "./adminPages/AdmMainPage";
import UserMainPage from "./userPages/UserMainPage";

import AddUser from "./adminPages/User/AddUser";
import EditUser from "./adminPages/User/EditUser";
import ViewUsers from "./adminPages/User/ViewUsers";
import SearchUser from "./adminPages/User/SearchUser";
import UserDetail from "./adminPages/User/UserDetail";

import AddBook from "./adminPages/Book/AddBook";
import EditBook from "./adminPages/Book/EditBook";
import AdmViewBooks from "./adminPages/Book/ViewBooks";
import AdmSearchBook from "./adminPages/Book/SearchBook";
import AdmBookDetail from "./adminPages/Book/BookDetail";

import AddAuthor from "./adminPages/Author/AddAuthor";
import EditAuthor from "./adminPages/Author/EditAuthor";
import AdmViewAuthors from "./adminPages/Author/ViewAuthors";
import AdmSearchAuthor from "./adminPages/Author/SearchAuthor";
import AdmAuthorDetail from "./adminPages/Author/AuthorDetail";

import ViewBooks from "./userPages/Book/ViewBooks";
import SearchBook from "./userPages/Book/SearchBook";
import BookDetail from "./userPages/Book/BookDetail";
import FavBooks from "./userPages/Book/FavBooks";
import ReadBooks from "./userPages/Book/ReadBooks";

import ViewAuthors from "./userPages/Author/ViewAuthors";
import SearchAuthor from "./userPages/Author/SearchAuthor";
import AuthorDetail from "./userPages/Author/AuthorDetail";

import AdmNavbar from "./shared/AdmNavbar";
import Navbar from "./shared/Navbar";
import MyFooter from "./shared/Footer";

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState(false); // true=ADMIN, false=USER

  useEffect(() => {
    localStorage.getItem("token") == null
      ? setIsLogged(false)
      : setIsLogged(true);
    console.log("islogged " + isLogged);

    console.log("token " + localStorage.getItem("token"));
  }, []);

  const checkLoggedIn = () => {
    localStorage.getItem("token") == null
      ? setIsLogged(false)
      : setIsLogged(true);

    console.log("isLOGGED " + isLogged);

    if (localStorage.getItem("token") != null) {
      const decoded = jwtDecoder(localStorage.getItem("token"));
      console.log("APP CHECK ROLE " + decoded.role);

      decoded.role == "ROLE_ADMIN" ? setRole(true) : setRole(false);
    }
  };

  return (
    <div>
      <div>
        <Router>
          {isLogged && role && <AdmNavbar checkLoggedIn={checkLoggedIn} />}
          {isLogged && !role && <Navbar checkLoggedIn={checkLoggedIn} />}
          <Routes>
            <Route
              path="/login"
              element={<Login checkLoggedIn={checkLoggedIn} />}
            />
            <Route path="/register" element={<Register />} />
            <Route exact path="/admin" element={<AdmMainPage />} />
            <Route exact path="/user" element={<UserMainPage />} />

            <Route path="/about" element={<About />}></Route>
            <Route path="/admin/users/add" element={<AddUser />} />
            <Route path="/admin/users/edit/:userId" element={<EditUser />} />
            <Route path="/admin/users/view" element={<ViewUsers />} />
            <Route path="/admin/users/search" element={<SearchUser />} />
            <Route path="/admin/users/detail" element={<UserDetail />} />
            <Route path="/admin/books/add" element={<AddBook />} />
            <Route path="/admin/books/edit/:bookId" element={<EditBook />} />
            <Route path="/admin/books/view" element={<AdmViewBooks />} />
            <Route path="/admin/books/search" element={<AdmSearchBook />} />
            <Route path="/admin/books/detail" element={<AdmBookDetail />} />
            <Route path="/admin/authors/add" element={<AddAuthor />} />
            <Route
              path="/admin/authors/edit/:authorId"
              element={<EditAuthor />}
            />
            <Route path="/admin/authors/view" element={<AdmViewAuthors />} />
            <Route path="/admin/authors/search" element={<AdmSearchAuthor />} />
            <Route path="/admin/authors/detail" element={<AdmAuthorDetail />} />

            <Route path="/user/books/view" element={<ViewBooks />} />
            <Route path="/user/books/search" element={<SearchBook />} />
            <Route path="/user/books/detail/:title" element={<BookDetail />} />
            <Route path="/user/books/fav" element={<FavBooks />} />
            <Route path="/user/books/read" element={<ReadBooks />} />

            <Route path="/user/authors/view" element={<ViewAuthors />}></Route>
            <Route
              path="/user/authors/search"
              element={<SearchAuthor />}
            ></Route>
            <Route
              path="/user/authors/detail/:name"
              element={<AuthorDetail />}
            ></Route>
          </Routes>
        </Router>
      </div>
      <MyFooter />
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}
