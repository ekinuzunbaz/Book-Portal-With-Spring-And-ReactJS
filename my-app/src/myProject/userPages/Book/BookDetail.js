import React from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Content } = Layout;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Author Name",
    dataIndex: "authorName",
  },
];

export default function BookDetail() {
  const location = useLocation();

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 20, height: 595 }}
    >
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 380 }}
      >
        <Table
          columns={columns}
          rowKey={(book) => book.id}
          dataSource={[location.state.book]}
        />
        <Link className="btn btn-outline-danger mx-4" to="/user">
          Home Page
        </Link>
        <Link className="btn btn-outline-primary mx-4" to="/user/books/search">
          Search More
        </Link>
      </div>
    </Content>
  );
}
