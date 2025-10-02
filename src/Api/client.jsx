import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/", // 👈 same port as json-server
  timeout: 10000
});
