import { useDispatch } from "react-redux";
import RegisterForm from "./modules/auth/register/RegisterForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setUser } from "./redux/features/auth/authSlice";
import Home from "./Home";
import Navbar from "./components/Navbar";
import LoginForm from "./modules/auth/login/LoginForm";
import { Route, Routes, HashRouter, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Profile from "./modules/profile/Profile";
import PostDetails from "./modules/posts/post/PostDetails";
import Users from "./modules/profile/Users";
import { AddPost } from "./modules/posts/post/createPost/AddPost";
import { AnimatePresence } from "framer-motion";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { Tranistion } from "./components/Transition";
function App() {
  // const location = useLocation();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <HashRouter>
      <Navbar />
      <div className="bg-light-purple ">
        <AnimatedRoutes />
      </div>
      <ToastContainer autoClose={2000} />
    </HashRouter>
  );
}

export default App;
