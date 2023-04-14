import axios from "axios";
import jwtDecoder from "jwt-decode";


const USER_BASE_URL = "http://localhost:8082/api/v1/user";
const APP_BASE_URL = "http://localhost:8082/api/v1";

const UserService = (function () {
  const _fetchBooks = async (params) => {
    const response = await axios.get(USER_BASE_URL + "/books"/*, {
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

  const _searchBooks = async (params) => {
    const response = await axios.get(USER_BASE_URL + `/books/${params.title}`,params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response;
  };

  const _fetchFavBooks = async () => {

    const decoded = jwtDecoder(localStorage.getItem("token"));

    const response = await axios.get(USER_BASE_URL + `/books/fav/${decoded.sub}`);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _addFavBook = async (title) => {

    const decoded = jwtDecoder(localStorage.getItem("token"));

    const params = {
      bookTitle: title 
    }

    const response = await axios.put(USER_BASE_URL + `/books/fav/${decoded.sub}` + `?${Object.keys(params)[0]}=${title}`) //Add book's title as a param

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response;
  };

  const _removeFavBook = async (title) => {

    const decoded = jwtDecoder(localStorage.getItem("token"));

    const params = {
      bookTitle: title 
    }

    const response = await axios.delete(USER_BASE_URL + `/books/fav/${decoded.sub}` + `?${Object.keys(params)[0]}=${title}`) //Add book's title as a param

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _fetchReadBooks = async () => {

    const decoded = jwtDecoder(localStorage.getItem("token"));

    const response = await axios.get(USER_BASE_URL + `/books/read/${decoded.sub}`);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _addReadBook = async (title) => {

    const decoded = jwtDecoder(localStorage.getItem("token"));

    const params = {
      bookTitle: title 
    }

    const response = await axios.put(USER_BASE_URL + `/books/read/${decoded.sub}` + `?${Object.keys(params)[0]}=${title}`) //Add book's title as a param

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _removeReadBook = async (title) => {

    const decoded = jwtDecoder(localStorage.getItem("token"));

    const params = {
      bookTitle: title 
    }

    const response = await axios.delete(USER_BASE_URL + `/books/read/${decoded.sub}` + `?${Object.keys(params)[0]}=${title}`) //Add book's title as a param

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }
    
    return response.data;
  };

  const _fetchAuthors = async (params) => {
    const response = await axios.get(USER_BASE_URL + "/authors");

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

    return response.data;
  };

  const _searchAuthors = async (params) => {
    const response = await axios.get(USER_BASE_URL + "/authors" + `/${params.name}`, params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

    return response;
  };

  const _login = async (params) => {
    const response = await axios.post(APP_BASE_URL + "/login", params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

    //console.log("SERVICE " + response.data.jwtToken)

    localStorage.setItem("token", response.data.jwtToken)

    //console.log("SERVICE " + localStorage.getItem("token"))

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.jwtToken}`;

    //console.log(axios.defaults.headers.common['Authorization']);

    return response;
  };

  const _register = async (params) => {
    const response = await axios.post("http://localhost:8082/api/v1/register", params);

    if (!response) {
      console.log("Bir hata oluştu");
      //ToDo: Display error message to user not just log it
      //Ex: https://www.npmjs.com/package/react-toastify
      return;
    }

  };


  return {
    fetchBooks: _fetchBooks,
    searchBooks: _searchBooks,
    fetchFavBooks: _fetchFavBooks,
    addFavBook: _addFavBook,
    removeFavBook:_removeFavBook,
    addReadBook: _addReadBook,
    fetchReadBooks: _fetchReadBooks,
    removeReadBook: _removeReadBook,
    fetchAuthors: _fetchAuthors,
    searchAuthors: _searchAuthors,
    login: _login,
    register: _register
  };
})();

export default UserService;
