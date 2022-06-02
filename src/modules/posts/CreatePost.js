import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "./components/Input";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/features/posts/postsSlice";

function CreatePost() {
  const { user } = useSelector((state) => ({ ...state.auth }));
  console.log(user);
  const username = user?.name;
  console.log(username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    level: "easy",
    username: username,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addPost = async (e) => {
    e.preventDefault();
    dispatch(createPost(formData));
    navigate("/");
  };
  return (
    <div className="flex flex-col justify-center mt-10">
      <h2 className="text-center mb-4 text-xl">Create workout</h2>
      <form className="flex flex-col items-center m-2">
        <Input
          type="text"
          name="name"
          placeholder="Workout name"
          onChange={handleChange}
        />
        <label>Workout level</label>

        <select
          className="shadow appearance-none border  rounded w-80 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  my-3 focus:border-black"
          name="level"
          value={formData.level}
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="pro">Pro</option>
        </select>
        <label>Description</label>
        <textarea
          placeholder="Describe your workout"
          onChange={handleChange}
          value={formData.desc}
          name="desc"
          className="shadow appearance-none border   rounded w-80 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-3  focus:border-black"
        />
        <Button onClick={addPost}>Add workout</Button>
      </form>
    </div>
  );
}

export default CreatePost;
