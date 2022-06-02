import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../redux/features/auth/authSlice";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => ({ ...state.auth }));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    message && toast.error(message);
  }, [message]);
  const { name, email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(register({ formData, navigate, toast }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden mt-20">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mt-3"
      >
        <label className="block text-gray-700 mt-4 text-sm font-bold ">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2"
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <label className="block text-gray-700 text-sm mt-4 font-bold ">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <label className="block text-gray-700 text-sm font-bold mt-4">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <input
          className="bg-black  text-white my-5 py-2 px-5 rounded cursor-pointer"
          type="submit"
          value="Sign up"
        />
        <Link to="/log-in">Already have an account?</Link>
      </form>
    </div>
  );
}

export default Form;
