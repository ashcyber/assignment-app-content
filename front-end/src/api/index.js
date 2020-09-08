import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 15000,
  headers: {},
});

export default instance;
