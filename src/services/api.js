// bookhaven-client/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://bookhaven-server-drlru7ov5-salman-tohas-projects.vercel.app/"
});

export default API;