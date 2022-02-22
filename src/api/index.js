import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/dtl-mvp/us-central1/api/",
});

export const addAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const removeAuthHeader = () => {
  delete api.defaults.headers.common["Authorization"];
};
