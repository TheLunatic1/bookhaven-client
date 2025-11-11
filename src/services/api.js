import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookhaven-server-drlru7ov5-salman-tohas-projects.vercel.app"
});

export default API;