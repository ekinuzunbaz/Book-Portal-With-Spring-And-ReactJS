import React from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import AdminService from "../../service/AdminService";
import { Link } from "react-router-dom";

const { Content } = Layout;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    sorter: true,
    width: "10%",
  },
  {
    title: "Username",
    dataIndex: "username",
    sorter: true,
    width: "15%",
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
    title: "Roles",
    dataIndex: "roles",
    //render: roles => roles.name
  },
  {
    title: "Actions",
    key: "key",
    dataIndex: "key",
    render: (text, record) => (
      <div>
        <button className="btn btn-outline-primary" style={{ marginRight: 6 }}>
          <Link to={`/admin/users/edit/${record.id}`}>Edit</Link>
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteUser(record.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];

const deleteUser = (id) => {
  AdminService.removeUser(id);
};

class UserList extends React.Component {
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

    const data = await AdminService.fetchUsers();

    //console.log(JSON.stringify(data));
    console.log(data.roles);

    columns[4].dataIndex = data.toString();
    console.log(columns[4].dataIndex);

    this.setState({
      loading: false,
      data: data,
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

export default UserList;
