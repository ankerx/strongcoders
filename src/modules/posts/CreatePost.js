import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { stepOne } from "../../redux/features/posts/postsSlice";
import { Input } from "./components/Input";
function CreatePost({ setFormData, formData }) {
  // const { user } = useSelector((state) => ({ ...state.auth }));
  // const { post } = useSelector((state) => ({ ...state.posts }));
  // console.log(post);
  // const username = user?.user?.name;
  // console.log(username);
  // const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   desc: "",
  //   level: "easy",
  //   username: user?.user?.name,
  // });
  // useEffect(() => {
  //   setFormData({ ...formData, username: user?.user?.name });
  // }, [user, formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  // const addPost = async (e) => {
  //   e.preventDefault();
  //   dispatch(stepOne(formData));
  // };
  return (
    // <div className="flex flex-col justify-center mt-10">
    <form className="flex flex-col items-center mt-2 lg:p-20  bg-dark-purple py-8 px-12 rounded-md">
      <Input
        label="Workout name"
        value={formData.name}
        type="text"
        name="name"
        placeholder="Workout name"
        onChange={handleChange}
      />
      <label className="text-gray-300 text-sm md:text-lg m-2 mb-1 font-bold">
        Workout level
      </label>
      <select
        className="shadow appearance-none border  rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1 mb-3 focus:border-black"
        name="level"
        value={formData.level}
        onChange={handleChange}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="pro">Pro</option>
      </select>
      <label className="text-gray-300 text-sm md:text-lg m-2 mb-1 font-bold">
        Description
      </label>
      <textarea
        placeholder="Describe your workout"
        onChange={handleChange}
        value={formData.desc}
        name="desc"
        className="shadow appearance-none border max-w-sm w-full  rounded  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-1  focus:border-black"
      />
    </form>
    // </div>
  );
}

export default CreatePost;
