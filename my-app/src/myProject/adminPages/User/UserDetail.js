import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

const {Content} = Layout

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    sorter: true,
    width: "8%",
  },
  {
    title: "Username",
    dataIndex: "username",
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

export default function UserDetail() {
  const location = useLocation();

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 20, height:595 }}
    >
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 380 }}
      >
        <Table
          columns={columns}
          rowKey={(user) => user.id}
          dataSource={[location.state.user]}
        />
        <Link className="btn btn-outline-danger mx-4" to="/admin">
          Home Page
        </Link>
        <Link className="btn btn-outline-primary mx-4" to="/admin/users/search">
          Search More
        </Link>
      </div>
    </Content>
  );
}
