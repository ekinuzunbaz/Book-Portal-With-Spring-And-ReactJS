import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
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
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "13%",
  },
  {
    title: "Active",
    dataIndex: "active",
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
];

export default function AuthorDetail() {
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
          rowKey={(author) => author.id}
          dataSource={[location.state.author]}
        />
        <Link className="btn btn-outline-danger mx-4" to="/admin">
          Home Page
        </Link>
        <Link
          className="btn btn-outline-primary mx-4"
          to="/admin/authors/search"
        >
          Search More
        </Link>
      </div>
    </Content>
  );
}
