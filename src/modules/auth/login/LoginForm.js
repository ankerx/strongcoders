import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Transition } from "../../../components/Transition";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => ({ ...state.auth }));
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    message && toast.error(message);
  }, [message]);

  const onSubmit = (formData) => {
    console.log(formData);
    dispatch(login({ formData, navigate, toast }));
  };

  return (
    <Transition>
      <div className="flex flex-col justify-center items-center h-100v overflow-hidden ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex bg-dark-purple flex-col justify-center mt-20 rounded-3xl text-center items-center p-8 md:p-32 shadow-2xl "
        >
          <label className="block text-gray-300 text-md md:text-lg font-bold ">
            Email
          </label>
          <input
            className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg mb-1  mx-4 mt-2  "
            type="text"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
          <p className="text-red-500 mb-4">{errors.email?.message}</p>
          <label className="block text-gray-300 text-md md:text-lg font-bold ">
            Password
          </label>
          <input
            className="shadow w-60 max-w-sm appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 md:text-lg mb-1 mx-4 mt-2  "
            type="password"
            placeholder="Password"
            name="password"
            {...register("password")}
          />
          <p className="text-red-500 mb-4">{errors.password?.message}</p>

          <input
            className="bg-none border border-light-orange text-light-orange md:text-xl my-3 py-2 px-5 md:py-3 md:px-6 rounded cursor-pointer"
            type="submit"
            value="Login"
          />
          <Link className="text-light-orange mt-3 md:text-lg" to="/sign-up">
            <p className="text-gray-300  ">Don't have an account yet?</p>
            <p>Sign up!</p>
          </Link>
        </form>
      </div>
    </Transition>
  );
}

export default Form;
