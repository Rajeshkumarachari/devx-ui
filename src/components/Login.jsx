import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      return navigate("/");
    } catch (err) {
      dispatch(removeUser());
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-5 pb-20">
      <div className="card bg-gray-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign up"}
          </h2>
          <div className="">
            {!isLoginForm && (
              <div className="flex gap-2">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-500">
                      First Name{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>{" "}
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-500">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
            )}
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text text-gray-500">Email ID </span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type your email id here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text text-gray-500">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <p className=" text-red-700 text-lg font-medium">{error} </p>
          <div className="card-actions justify-center">
            <button
              className="bg-teal-700 hover:bg-teal-800  text-white rounded-md text-xl px-4 py-2"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <p className="m-auto cursor-pointer py-2">
            {isLoginForm ? "New User? Signup " : "Existing User? Login "}{" "}
            <span
              onClick={() => setIsLoginForm((value) => !value)}
              className=" font-medium text-blue-900 hover:text-blue-950 hover:bg-gray-200 p-2 rounded-md"
            >
              here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
