import axios from "axios";

const API = axios.create({
  baseURL: "https://bookhaven-server.vercel.app/api"
});

export default API;