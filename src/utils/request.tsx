import axios from "axios";

export const userRequest = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const publicRequest = axios.create({
  baseURL: "https://upskilling-egypt.com:3000/api/v0",
});
