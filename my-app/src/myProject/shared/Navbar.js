import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Layout, Menu, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../../styles.css";
const { Header } = Layout;

export default function Navbar(props) {
  const bookMenu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        {" "}
        <Link to="/user/books/view">View Books</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/user/books/search">Search Book</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/user/books/fav">Favorite Books</Link>
      </Menu.Item>
      <Menu.Item key="4">
        {" "}
        <Link to="/user/books/read">Read Books</Link>
      </Menu.Item>
    </Menu>
  );

  const authorMenu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        {" "}
        <Link to="/user/authors/view">View Authors</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/user/authors/search">Search Author</Link>
      </Menu.Item>
    </Menu>
  );

  const { checkLoggedIn } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    checkLoggedIn();
    navigate("/login");
  };

  return (
    <Header style={{ zIndex: 1, width: "100%" }}>
      <div className="logo">
        <image src="/public/bookPortal.png" alt="bookPortal" />
      </div>
      <Space>
        <Link to="/user">Home</Link>

        <Dropdown overlay={bookMenu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Books <DownOutlined />
          </a>
        </Dropdown>

        <Dropdown overlay={authorMenu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Authors <DownOutlined />
          </a>
        </Dropdown>

        <Button
          style={{
            backgroundColor: "#001529",
            color: "#1890ff",
            borderColor: "#001529",
          }}
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Space>
    </Header>
  );
}
