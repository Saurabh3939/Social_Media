import axios from "axios";

const API = axios.create({
  baseURL: "https://social-media-app-y4fk.onrender.com/api",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});

export const signIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);

export const fetchPosts = () => API.get("/posts/all");
export const createPost = (newPost) => API.post("/posts/create", newPost);

export const likePost = (id) => API.patch(`/posts/like/${id}`);

export const addComment = (id, commentData) =>
  API.post(`/posts/comment/${id}`, commentData);

export const deletePost = (id) => API.delete(`/posts/delete/${id}`);
