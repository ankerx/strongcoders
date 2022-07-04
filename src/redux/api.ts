import axios from "axios";
import { ILoginData, IRegisterData, IWorkoutData } from "../interfaces/global";
const heroku = "http://localhost:5000";

// "https://strongcoders.herokuapp.com";
export const API = axios.create({
  baseURL: heroku,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    if (!req.headers) return;
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "").token
    }`;
  }
  return req;
});

export const loginUser = (loginData: ILoginData) =>
  API.post("/user/log-in", loginData);

export const registerUser = (registerData: IRegisterData) =>
  API.post("/user/sign-up", registerData);

export const getUsers = () => API.get("/user/all");

export const getAllPosts = () => API.get("/workout");

export const getPost = (id: string) => API.get(`/workout/${id}`);

export const getUserPosts = (userID: string) =>
  API.get(`/workout/user/${userID}`);

export const getPostsBySearch = (searchQuery: {
  debouncedSearch: string;
  level: string;
}) =>
  API.get(
    `/workout/workouts/search?searchQuery=${
      searchQuery.debouncedSearch || "none"
    }&level=${searchQuery.level}`
  );

export const createPost = (workoutData: IWorkoutData) =>
  API.post(`/workout/create-workout`, workoutData);

export const deletePost = (postID: string) => API.delete(`/workout/${postID}`);

export const likePost = (postID: string) => API.put(`/workout/${postID}/like`);
