import axios from "axios";

// baseURL: "http://caiu.com.br/gdEkantika/",
// https://api.h.gd.ekore.com.br/

export const baseURL = process.env.REACT_APP_URL;

const api = axios.create({
  baseURL,
  timeout: 60 * 1000, // Timeout
});

export default api;
