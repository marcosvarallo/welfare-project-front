import axios from "axios";

const api = axios.create({
  baseURL: "https://welfare-46ef9eb7f9c2.herokuapp.com",
});

export default api;
