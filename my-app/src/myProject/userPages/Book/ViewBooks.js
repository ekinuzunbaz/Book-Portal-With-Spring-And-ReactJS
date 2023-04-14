import React from "react";
import "antd/dist/antd.css";
import { Table, Layout } from "antd";
import UserService from "../../service/UserService";

const { Content } = Layout;

const disabler = [false, false];

const disable = async (title) => {
  try {
    await UserService.addFavBook(title);
  } catch (error) {
    if (error.response.status === 500) {
      disabler[0] = true;
    }
  }

  try {
    await UserService.addReadBook(title);
  } catch (error) {
    if (error.response.status === 500) {
      disabler[1] = true;
    }
  }
};

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: true,
    width: "20%",
  },
  {
    title: "Type",
    dataIndex: "type",
    sorter: true,
    width: "20%",
  },
  {
    title: "Author Name",
    dataIndex: "authorName",
    width: "20%",
  },
  {
    title: "Actions",
    key: "key",
    dataIndex: "key",
    render: (text, record) => (
      <div>
        <button
          className="btn btn-outline-danger"
          onClick={() => addFavBook(record.title)}
          style={{ marginRight: 5 }}
        >
          Add Fav
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={() => addReadBook(record.title)}
          style={{ marginRight: 5 }}
        >
          Add Read
        </button>
      </div>
    ),
  },
];

const addFavBook = async (title) => {
  try {
    await UserService.addFavBook(title);
  } catch (error) {
    if (error.response.status === 500) {
      alert("Book " + "'" + title + "'" + " is already in favorite list");
    }
  }
};

const addReadBook = async (title) => {
  try {
    await UserService.addReadBook(title);
  } catch (error) {
    if (error.response.status === 500) {
      alert("Book " + "'" + title + "'" + " is already in read list");
    }
  }
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

    const data = await UserService.fetchBooks();

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

export default BookList;
