import axios from "axios";
const heroku = "http://localhost:5000";
// "https://strongcoders.herokuapp.com";
export const API = axios.create({
  baseURL: heroku,
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
export const loginUser = (formData) => API.post("/user/log-in", formData);
export const registerUser = (formData) => API.post("/user/sign-up", formData);
export const getUsers = () => API.get("/user/all");
export const getAllPosts = () => API.get("/workout");
export const getPost = (id) => API.get(`/workout/${id}`);
export const getUserPosts = (userID) => API.get(`/workout/user/${userID}`);
export const getPostsBySearch = (searchQuery) =>
  API.get(
    `/workout/workouts/search?searchQuery=${
      searchQuery.debouncedSearch || "none"
    }&level=${searchQuery.level}`
  );
export const uploadImage = (userID, img) =>
  API.post(`user/uploadImg/${userID}`, img);
export const createPost = (formData) =>
  API.post(`/workout/create-workout`, formData);
export const deletePost = (postID) => API.delete(`/workout/${postID}`);
export const likePost = (postID) => API.put(`/workout/${postID}/like`);
