import React from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import UserService from "../../service/UserService";

const { Content } = Layout;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: true,
  },
  {
    title: "Author Name",
    dataIndex: "authorName",
  },
  {
    title: "Actions",
    key: "key",
    dataIndex: "key",
    render: (text, record) => (
      <div>
        <button
          className="btn btn-outline-danger"
          onClick={() => deleteReadBook(record.title)}
        >
          Remove Read
        </button>
      </div>
    ),
  },
];

const deleteReadBook = async (title) => {
  await UserService.removeReadBook(title);
};

class BookList extends React.Component {
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

    const data = await UserService.fetchReadBooks();

    //console.log(JSON.stringify(data));

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

export default BookList;
