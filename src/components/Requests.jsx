import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addRequest } from "../utils/requestSlice";
import { IoFemaleOutline } from "react-icons/io5";
import { IoIosMale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { removeUser } from "../utils/userSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className=" text-center mt-4"> No Requests Found</h1>;

  return (
    <div className="text-center mt-4 pb-20">
      <h1 className="text-bold  text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="  justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-[27%] mx-auto"
          >
            <div className=" flex justify-center ">
              <img
                alt="photo"
                className="rounded-full size-48 object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className=" font-semibold text-xl text-center my-2">
                {firstName + " " + lastName}
              </h2>
              <div className="flex justify-between text-lg my-2">
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
              <p className=" line-clamp-3">{about}</p>
            </div>
            <div className=" flex justify-between mx-10 my-5">
              <button
                className="px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
