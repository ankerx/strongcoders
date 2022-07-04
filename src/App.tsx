import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setUser } from "./redux/features/auth/authSlice";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { AnimatedRoutes } from "./core/routes/AnimatedRoutes";

export const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile") || "");

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
};
