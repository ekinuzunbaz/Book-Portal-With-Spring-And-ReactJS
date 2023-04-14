import React from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import UserService from "../../service/UserService";

const { Content } = Layout;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "13%",
  },
];

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

    const data = await UserService.fetchAuthors();

    console.log(JSON.stringify(data));

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
