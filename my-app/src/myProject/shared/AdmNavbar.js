import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Layout, Menu, Space, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../../styles.css";
const { Header } = Layout;

export default function AdmNavbar(props) {
  const userMenu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        {" "}
        <Link to="/admin/users/add">Add User</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/admin/users/view">View Users</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/admin/users/search">Search User</Link>
      </Menu.Item>
    </Menu>
  );

  const bookMenu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        {" "}
        <Link to="/admin/books/add">Add Book</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/admin/books/view">View Books</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/admin/books/search">Search Book</Link>
      </Menu.Item>
    </Menu>
  );

  const authorMenu = (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        {" "}
        <Link to="/admin/authors/add">Add Author</Link>
      </Menu.Item>
      <Menu.Item key="2">
        {" "}
        <Link to="/admin/authors/view">View Authors</Link>
      </Menu.Item>
      <Menu.Item key="3">
        {" "}
        <Link to="/admin/authors/search">Search Author</Link>
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
      <div className="logo" />
      <Space>
        <Link to="/admin">Home</Link>

        <Dropdown overlay={userMenu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Users <DownOutlined />
          </a>
        </Dropdown>

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
