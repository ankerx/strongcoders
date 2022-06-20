import { Route, Routes, useLocation } from "react-router-dom";
import { LoginForm } from "../../modules/auth/login/LoginForm";
import { Profile } from "../../modules/profile/Profile";
import { AddPost } from "../../modules/posts/post/createPost/AddPost";
import { Home } from "../../Home";
import { Users } from "../../modules/profile/Users";
import { PostDetails } from "../../modules/posts/post/PostDetails";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";
import RedirectRoute from "./RedirectRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../../redux/features/auth/authSlice";
import { UserProfile } from "../../modules/profile/UserProfile";
import { RegisterForm } from "../../modules/auth/register/RegisterForm";

export const AnimatedRoutes = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-up"
          element={
            <RedirectRoute user={user}>
              <RegisterForm />
            </RedirectRoute>
          }
        />
        <Route
          path="/log-in"
          element={
            <RedirectRoute user={user}>
              <LoginForm />
            </RedirectRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute user={user}>
              <AddPost />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/workout/:id" element={<PostDetails />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </AnimatePresence>
  );
};
