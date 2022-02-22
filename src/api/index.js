import axios from "axios";

export const api = axios.create({
  baseUrl: "",
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
