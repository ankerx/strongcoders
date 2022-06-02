import { useDispatch } from "react-redux";
import RegisterForm from "./modules/auth/register/RegisterForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setUser } from "./redux/features/auth/authSlice";
import Home from "./Home";
import Navbar from "./components/Navbar";
import LoginForm from "./modules/auth/login/LoginForm";
import { Route, Routes, HashRouter } from "react-router-dom";
import React, { useEffect } from "react";
import Profile from "./modules/profile/Profile";
import CreatePost from "./modules/posts/CreatePost";
import ProfileInfo from "./modules/profile/ProfileInfo";
import UserPosts from "./modules/profile/UserPosts";
import PostDetails from "./modules/posts/post/PostDetails";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/log-in" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-info" element={<ProfileInfo />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/users" element={<UserPosts />} />
        <Route path="/workout/:id" element={<PostDetails />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </HashRouter>
  );
}

export default App;
