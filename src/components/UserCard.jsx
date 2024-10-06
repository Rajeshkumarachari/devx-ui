import { IoFemaleOutline } from "react-icons/io5";
import { IoIosMale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/FeedSlice";

export default function UserCard({ user }) {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    user && (
      <div className="card bg-base-100 w-96 shadow-xl mb-20">
        <figure>
          <img
            src={photoUrl}
            alt={firstName}
            className="rounded-full size-[270px] object-cover  "
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">
            {firstName + " " + lastName}
          </h2>
          <div className="flex justify-between text-lg gap-9">
            {age && <p>{"Age : " + age} </p>}
            {gender && (
              <p className=" flex items-center gap-1">
                {gender == "male" ? (
                  <IoIosMale className=" size-6" />
                ) : gender == "female" ? (
                  <IoFemaleOutline className=" size-6 " />
                ) : gender == "others" ? (
                  <IoMaleFemaleOutline className=" size-6" />
                ) : null}
                {gender}
              </p>
            )}
          </div>
          <p className="  line-clamp-3">{about} </p>
          <div className="card-actions mx-2 my-4 justify-between">
            <button
              className="px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    )
  );
}
