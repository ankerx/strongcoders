import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import heroImg from "./assets/images/heroSMALL.jpg";
import {
  getPostsBySearch,
  getAllPosts,
} from "./redux/features/posts/postsSlice";
import AllPosts from "./modules/posts/AllPosts";
import useDebounce from "./core/hooks/useDebounce";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SelectInput } from "./components/SelectInput";

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  const handleQuery = (e) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (level === "all" && search.length === 0) {
      dispatch(getAllPosts());
    } else {
      dispatch(getPostsBySearch({ debouncedSearch, level }));
    }
  }, [level, dispatch, debouncedSearch]);

  return (
    <>
      <header className="flex flex-col text-center justify-center items-center overflow-x-hidden">
        <div
          style={{ backgroundImage: `url(${heroImg})` }}
          className="h-100v w-full flex flex-col items-center justify-center relative bg-no-repeat bg-fixed bg-cover bg-top"
        >
          <div className="w-full h-full absolute top-0 left-0 bg-black opacity-60"></div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ from: 0, duration: 1 }}
            className="absolute  text-white"
          >
            <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl md:my-12 my-6">
              Welcome on <span className="text-dark-orange">Strong Coders</span>
            </h1>
            <h2
              animate={{ opacity: 1 }}
              transition={{ from: 0, duration: 1, delay: 0.5 }}
              initial={{ opacity: 0 }}
              className="text-md  mx-10 md:text-2xl lg:text-3xl md:my-14 md:mx-0 m-6"
            >
              Place where programmers are getting their best shape
            </h2>
            {user ? (
              <Link to="/create-post">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className=" bg-dark-orange rounded-md px-4 py-2 md:px-7  md:py-3 xl:text-2xl text-white"
                >
                  Add workout!
                </motion.button>
              </Link>
            ) : (
              <Link to="/sign-up">
                <button className="bg-dark-orange  rounded-md px-4 py-2 md:px-7  md:py-3 xl:text-2xl text-white">
                  Join us!
                </button>
              </Link>
            )}
          </motion.div>
        </div>
      </header>
      <div className="flex flex-col xs:flex-row items-center mx-10 mt-5 ">
        <SelectInput handleChange={handleChange} />
        <input
          className="shadow appearance-none border rounded w-46 md:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1  focus:border-black"
          placeholder="Search for workout"
          value={search}
          onChange={(e) => handleQuery(e)}
        />
      </div>
      <section className="min-h-[80vh] text-center mx-4 md:mx-10">
        <AllPosts />
      </section>
    </>
  );
};
