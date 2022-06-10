import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/auth/authSlice";
import { setUser } from "../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import strong from "../assets/images/logo.png";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genericHamburgerLine = `h-1 w-7 my-1 rounded-full bg-white transition ease transform duration-300 z-20`;
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
    <nav className="shadow-md w-full z-10 absolute top-0 left-0 ">
      <div className="flex items-center bg-black justify-between md:px-10  px-7">
        <div
          className="font-bold  cursor-pointer flex items-center 
      text-gray-800"
        >
          <div className="w-20 md:w-24">
            <Link to="/">
              <img src={strong} />
            </Link>
          </div>
          {/* <span className="text-2xl text-dark-orange mr-1 pt-2">
            <Link to="/"> Strong Coders</Link>
          </span> */}
        </div>
        <button
          className="flex cursor-pointer md:hidden  flex-col h-12 w-12 justify-center items-center group"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`${genericHamburgerLine} ${
              open
                ? "rotate-45 translate-y-3 group-hover:opacity-100"
                : " group-hover:opacity-100"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              open ? "opacity-0" : " group-hover:opacity-100"
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              open
                ? "-rotate-45 -translate-y-3  group-hover:opacity-100"
                : "group-hover:opacity-100"
            }`}
          />
        </button>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static text-white bg-black md:z-auto  left-0 w-full mt-5 sm:mt-0 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in -z-10 ${
            open ? "top-10" : "top-[-380px]"
          }`}
        >
          <li
            onClick={() => setOpen(false)}
            className="md:ml-8 lg:text-xl md:my-0 my-7"
          >
            <Link
              to="/"
              className=" cursor-pointer hover:text-dark-orange ease-in-out duration-200"
            >
              Home
            </Link>
          </li>
          {user && (
            <>
              <li
                onClick={() => setOpen(false)}
                className="md:ml-8 lg:text-xl md:my-0 my-7"
              >
                <Link
                  to="/profile"
                  className="cursor-pointer hover:text-dark-orange ease-in-out duration-200"
                >
                  Profile
                </Link>
              </li>
            </>
          )}

          <li
            onClick={() => setOpen(false)}
            className="md:ml-8 lg:text-xl md:my-0 my-7 mr-10 "
          >
            <Link
              to="/users"
              className=" cursor-pointer hover:text-dark-orange ease-in-out duration-200"
            >
              Coders
            </Link>
          </li>

          {user ? (
            <>
              <div>
                <Link to="/create-post">
                  <button
                    onClick={() => setOpen(false)}
                    className="md:ml-8 lg:text-xl md:my-0  bg-dark-orange py-2 px-4 rounded-md text-white cursor-pointer hover:scale-90 ease-in-out duration-200"
                  >
                    {" "}
                    Add post
                  </button>
                </Link>
              </div>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="md:ml-8 lg:text-xl md:my-0 my-7 text-white cursor-pointer hover:text-dark-orange ease-in-out duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpen(false)}
              className="md:ml-8 lg:text-xl md:my-0 my-7 text-white cursor-pointer hover:text-dark-orange ease-in-out duration-200"
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
