import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className=" flex justify-center gap-10 my-3">
        <div className="flex h-fit justify-center ">
          <div className="card bg-gray-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Update your profile</h2>
              <div className="">
                <div className="flex gap-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text text-gray-500">
                        First Name
                      </span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="first name"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text text-gray-500">
                        Last Name
                      </span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="last name"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-500">
                      Your profile pic
                    </span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Drop your photo here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <div className=" flex gap-2">
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text text-gray-500">Age</span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs my-2">
                    <div className="label">
                      <span className="label-text text-gray-500">Gender</span>
                    </div>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option selected>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </label>
                </div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-gray-500">About</span>
                  </div>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="textarea textarea-bordered"
                    placeholder="Describe about yourself"
                  ></textarea>
                </label>
              </div>
              <p className=" text-red-700 text-lg font-medium">{error} </p>
              <div className="card-actions justify-center">
                <button
                  className="bg-teal-700 hover:bg-teal-800  text-white rounded-md text-xl px-4 py-2"
                  onClick={saveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success ">
            <span className=" text-gray-900">Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}
