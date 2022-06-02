import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/auth/authSlice";
import { setUser } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state.auth }));
  const logout = () => {
    dispatch(setLogout());
    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);
  const [open, setOpen] = useState(false);

  return (
    <nav className="shadow-md w-full absolute z-10 top-0 left-0">
      <div className="md:flex items-center bg-black justify-between py-4 md:px-10 px-7">
        <div
          className="font-bold  cursor-pointer flex items-center 
      text-gray-800"
        >
          <span className="text-2xl text-orange-500 mr-1 pt-2">
            <Link to="/"> Strong Coders</Link>
          </span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-5 top-5 cursor-pointer md:hidden"
        >
          {open ? (
            <IoClose className="text-white" />
          ) : (
            <FiMenu className="text-white" />
          )}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static text-white bg-black md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-10" : "top-[-490px]"
          }`}
        >
          <li
            onClick={() => setOpen(false)}
            className="md:ml-8 text-xl md:my-0 my-7"
          >
            <Link
              to="/"
              className=" cursor-pointer hover:text-orange-500 ease-in-out duration-200"
            >
              Home
            </Link>
          </li>
          {user && (
            <>
              <li
                onClick={() => setOpen(false)}
                className="md:ml-8 text-xl md:my-0 my-7"
              >
                <Link
                  to="/profile"
                  className="cursor-pointer hover:text-orange-500 ease-in-out duration-200"
                >
                  Profile
                </Link>
              </li>
            </>
          )}

          <li
            onClick={() => setOpen(false)}
            className="md:ml-8 text-xl md:my-0 my-7 mr-10 "
          >
            <Link
              to="/users"
              className=" cursor-pointer hover:text-orange-500 ease-in-out duration-200"
            >
              Coders
            </Link>
          </li>

          {user ? (
            <>
              <button
                onClick={() => setOpen(false)}
                className="md:ml-8 text-xl md:my-0 my-7 bg-orange-600 py-2 px-4 rounded-md text-white cursor-pointer hover:scale-90 ease-in-out duration-200"
              >
                <Link to="/create-post">Add post</Link>
              </button>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="md:ml-8 text-xl md:my-0 my-7 text-white cursor-pointer hover:text-orange-500 ease-in-out duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="md:ml-8 text-xl md:my-0 my-7 text-white cursor-pointer hover:text-orange-500 ease-in-out duration-200"
            >
              <Link to="/log-in">Login</Link>
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
