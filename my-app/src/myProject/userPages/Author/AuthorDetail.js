import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import AdminService from "../../service/AdminService";
import { Link, useLocation } from "react-router-dom";

const { Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
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
          rowKey={(author) => author.name}
          dataSource={[location.state.author]}
        />
        <Link className="btn btn-outline-danger mx-4" to="/user">
          Home Page
        </Link>
        <Link
          className="btn btn-outline-primary mx-4"
          to="/user/authors/search"
        >
          Search More
        </Link>
      </div>
    </Content>
  );
}
