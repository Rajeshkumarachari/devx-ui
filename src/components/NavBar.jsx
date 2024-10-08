import { useDispatch, useSelector } from "react-redux";
import { PiHandsPrayingDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
export default function NavBar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-gray-100">
      <div className="flex-1">
        <Link to="/">
          <a className="  text-sky-800 mx-20 hover:bg-gray-300 px-2 py-1 rounded-md font-semibold cursor-pointer text-2xl">
            DevX
          </a>
        </Link>
      </div>
      {user ? (
        <div className="flex-none gap-2">
          <div className="form-control"></div>

          <div className="dropdown dropdown-end mx-10 flex justify-center">
            <p className=" text-lg  mx-4 items-center flex">
              Welcome{"   "}
              <PiHandsPrayingDuotone className=" text-yellow-600 size-8" />
              <span className=" font-medium cursor-pointer hover:bg-gray-300  px-3 py-2  rounded-md">
                {user?.firstName}
              </span>
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">
                  <a className="justify-between text-lg">Profile</a>
                </Link>
              </li>
              <li>
                <Link to="connection">
                  <a className="text-lg">Connections</a>
                </Link>
              </li>
              <li>
                <Link to="requests">
                  <a className="text-lg"> Requests </a>
                </Link>
              </li>
              <li>
                <a
                  className="text-lg hover:bg-red-400 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
