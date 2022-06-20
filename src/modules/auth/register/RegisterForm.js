import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../../redux/features/auth/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Transition } from "../../../components/Transition";
const schema = yup.object().shape({
  name: yup.string().min(3).max(12).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const RegisterForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    message && toast.error(message);
  }, [message]);

  const onSubmit = (formData) => {
    console.log(formData);
    dispatch(registerUser({ formData, navigate, toast }));
  };

  return (
    <Transition>
      <div className="flex flex-col justify-center items-center h-100v overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex bg-dark-purple flex-col justify-center mt-20 rounded-3xl text-center items-center p-8 md:px-32 md:py-14 shadow-2xl "
        >
          <label className="block text-gray-300 text-md mt-4 md:text-lg font-bold ">
            Username
          </label>
          <input
            className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   mx-4 mt-2  "
            type="text"
            placeholder="Username"
            name="name"
            {...register("name")}
          />
          <p className="text-red-500 mt-1 mb-2">{errors.name?.message}</p>
          <label className="block text-gray-300 text-md mt-4 md:text-lg font-bold ">
            Email
          </label>
          <input
            className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   mx-4 mt-2 "
            type="text"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
          <p className="text-red-500 mt-1 mb-2">{errors.email?.message}</p>
          <label className="block text-gray-300 mt-4 text-md md:text-lg font-bold ">
            Password
          </label>
          <input
            className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg   mx-4 mt-2 "
            type="password"
            placeholder="Password"
            name="password"
            {...register("password")}
          />
          <p className="text-red-500 mt-1 mb-2">{errors.password?.message}</p>
          <input
            className="bg-none border border-light-orange text-light-orange md:text-xl my-4 py-2 px-5 md:py-3 md:px-6 rounded cursor-pointer"
            type="submit"
            value="Sign up"
          />
          <Link className="text-light-orange mt-2 md:text-lg" to="/log-in">
            <p className="text-gray-300  ">Already have an account?</p>
            <p>Log in!</p>
          </Link>
        </form>
      </div>
    </Transition>
  );
};
