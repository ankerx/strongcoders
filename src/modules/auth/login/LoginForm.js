import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/features/auth/authSlice";
import { Input } from "../../../components/Input";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => ({ ...state.auth }));
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message && toast.error(message);
  }, [message]);
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formData, navigate, toast }));
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
    <div className="flex flex-col justify-center items-center h-100v overflow-hidden ">
      <form
        onSubmit={handleSubmit}
        className="flex bg-dark-purple flex-col justify-center mt-20 rounded-3xl text-center items-center p-8 md:p-32 shadow-2xl "
      >
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          label="Email"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          label="Password"
        />

        <input
          className="bg-none border border-light-orange text-light-orange md:text-xl my-4 py-2 px-5 md:py-3 md:px-6 rounded cursor-pointer"
          type="submit"
          value="Login"
        />
        <Link className="text-light-orange mt-4 md:text-lg" to="/sign-up">
          <p className="text-gray-300  ">Don't have an account yet?</p>
          <p>Sign up!</p>
        </Link>
      </form>
    </div>
  );
}

export default Form;
