import axios from "axios";

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}
});

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}