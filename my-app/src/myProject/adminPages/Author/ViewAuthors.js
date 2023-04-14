import React from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import AdminService from "../../service/AdminService";
import { Link } from "react-router-dom";

const {Content} = Layout;

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
  {
    title: "Actions",
    key: "key",
    dataIndex: "key",
    render: (text, record) => (
      <div>
        <button className="btn btn-outline-primary" style={{ marginRight: 5 }}>
          <Link to={`/admin/authors/edit/${record.id}`}>Edit</Link>
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteAuthor(record.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

const deleteAuthor = (id) => {
  AdminService.removeAuthor(id);
};

class AuthorList extends React.Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (filters, sorter) => {
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = async () => {
    this.setState({ loading: true });

    const data = await AdminService.fetchAuthors();

    this.setState({
      loading: false,
      data,
    });
  };

  render() {
    const { data, loading } = this.state;
    return (
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 20 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Table
            columns={columns}
            rowKey={data.id}
            dataSource={data}
            loading={loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Content>
    );
  }
}

export default AuthorList;
