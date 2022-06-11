import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Home";
import { AddPost } from "../modules/posts/post/createPost/AddPost";
import PostDetails from "../modules/posts/post/PostDetails";
import Profile from "../modules/profile/Profile";
import Users from "../modules/profile/Users";
import RegisterForm from "../modules/auth/register/RegisterForm";
import LoginForm from "../modules/auth/login/LoginForm";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/log-in" element={<LoginForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<AddPost />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workout/:id" element={<PostDetails />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
