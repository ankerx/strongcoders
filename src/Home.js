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
function Home() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");
  const handleChange = (e) => {
    setLevel(e.target.value);
  };
  const user = JSON.parse(localStorage.getItem("profile"));
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
          <div className="absolute  text-white">
            <h1 className="font-bold text-2xl md:text-3xl xl:text-5xl md:my-12 my-6">
              Welcome on <span className="text-dark-orange">Strong Coders</span>
            </h1>
            <h2 className="text-md  mx-10 md:text-2xl lg:text-3xl md:my-14 md:mx-0 m-6">
              Place where programmers are getting their best shape
            </h2>
            {user ? (
              <Link to="/create-post">
                <button className="bg-dark-orange  rounded-md px-4 py-2 md:px-7  md:py-3 xl:text-2xl text-white">
                  Add workout!
                </button>
              </Link>
            ) : (
              <Link to="/sign-up">
                <button className="bg-dark-orange  rounded-md px-4 py-2 md:px-7  md:py-3 xl:text-2xl text-white">
                  Join us!
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="flex flex-col xs:flex-row items-center mx-4 mt-5 ">
        <label className="text-gray-300 ">Workouts level</label>
        <select
          className="shadow appearance-none border w-28 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  m-3 focus:border-black"
          name="level"
          onChange={(e) => handleChange(e)}
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="pro">Pro</option>
        </select>
        <input
          className="shadow appearance-none border rounded w-46 md:w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1  focus:border-black"
          placeholder="Search for workout"
          value={search}
          onChange={(e) => handleQuery(e)}
        />
      </div>
      <section className="min-h-[80vh] text-center mx-8">
        <AllPosts />
      </section>
    </>
  );
}

export default Home;
