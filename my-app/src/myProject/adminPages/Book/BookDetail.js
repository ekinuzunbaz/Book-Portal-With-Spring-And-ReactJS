import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import AdminService from "../../service/AdminService";
import { Link, useLocation } from "react-router-dom";

const { Content } = Layout;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    sorter: true,
    width: "8%",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: true,
    width: "13%",
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: true,
    width: "13%",
  },
  {
    title: "CreateDate",
    dataIndex: "createDate",
  },
  {
    title: "UpdateDate",
    dataIndex: "updateDate",
  },
  {
    title: "Author Name",
    dataIndex: "author",
    render: (author) => author.name,
  },
];

export default function BookDetail() {
  const location = useLocation();
  console.log(location);
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
        <Link className="btn btn-outline-danger mx-4" to="/admin">
          Home Page
        </Link>
        <Link className="btn btn-outline-primary mx-4" to="/admin/books/search">
          Search More
        </Link>
      </div>
    </Content>
  );
}
