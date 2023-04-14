import axios from "axios";

const ADMIN_BASE_URL = "http://localhost:8082/api/v1/admin"

const AdminService = (function () {

  const _addUser = async (params) => {
    const response = await axios.post(ADMIN_BASE_URL + "/users", params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

  };

  const _addBook = async (params) => {
    const response = await axios.post(ADMIN_BASE_URL + "/books", params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

  };

  const _addAuthor = async (params) => {
    const response = await axios.post(ADMIN_BASE_URL + "/authors", params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

  };


  const _fetchUsers = async (/*params*/) => {
    const response = await axios.get(ADMIN_BASE_URL + "/users"/*, {
      params: {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params
      }
    }*/);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

    return response.data;
  };



  const _fetchBooks = async (params) => {
    const response = await axios.get(ADMIN_BASE_URL + "/books"/*, {
      params: {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params
      }
    }*/);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

    return response.data;
  };

  const _fetchAuthors = async () => {
    const response = await axios.get(ADMIN_BASE_URL + "/authors");

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _searchUsers = async (params) => {
    const response = await axios.get(ADMIN_BASE_URL + `/users/${params.username}`, params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

    return response;
  };

  const _searchBooks = async (params) => {
    const response = await axios.get(ADMIN_BASE_URL + `/books/${params.title}`, params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response;
  };

  const _searchAuthors = async (params) => {
    const response = await axios.get(ADMIN_BASE_URL + `/authors/${params.name}`,params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response;
  };

  const _updateUser = async (params) => {
    const response = await axios.put(ADMIN_BASE_URL + `/users/${params.id}`, params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _updateBook = async (params) => {
    const response = await axios.put(ADMIN_BASE_URL + `/books/${params.id}`, params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _updateAuthor = async (params) => {
    const response = await axios.put(ADMIN_BASE_URL + `/authors/${params.id}`, params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response;
  };


  const _removeUser = async (userId) => {
    const response = await axios.delete(ADMIN_BASE_URL + `/users/${userId}`);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _removeBook = async (bookId) => {
    const response = await axios.delete(ADMIN_BASE_URL + `/books/${bookId}`);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _removeAuthor = async (authorId) => {
    const response = await axios.delete(ADMIN_BASE_URL + `/authors/${authorId}`);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };


  return {
    addUser: _addUser,
    addBook: _addBook,
    addAuthor: _addAuthor,
    fetchUsers: _fetchUsers,
    fetchBooks: _fetchBooks,
    fetchAuthors: _fetchAuthors,
    searchUsers: _searchUsers,
    searchBooks: _searchBooks,
    searchAuthors: _searchAuthors,
    updateUser: _updateUser,
    updateBook: _updateBook,
    updateAuthor: _updateAuthor,
    removeUser: _removeUser,
    removeBook: _removeBook,
    removeAuthor: _removeAuthor
  };
})();

export default AdminService;
