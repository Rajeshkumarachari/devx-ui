import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

export default function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1> No Connections found</h1>;
  return (
    <div className=" flex flex-col items-center">
      <h1 className=" text-center font-semibold text-3xl my-4">
        Your Connections
      </h1>
      <div className="flex flex-col  justify-center my-2 w-[50%]   ">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, _id } = connection;
          return (
            <div
              key={_id}
              className="flex m-2 p-4 border rounded-lg hover:bg-blue-50"
            >
              <div className="w-1/4">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="size-40  object-cover rounded-full      transition-all duration-300 hover:scale-110 "
                />
              </div>
              <div className=" w-3/4 px-5 ">
                <h1 className=" text-left mt-3 text-xl font-medium">
                  {firstName + " " + lastName}
                </h1>
                <p className="  line-clamp-3 text-gray-500">{about} </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
