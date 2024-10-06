import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
export default function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  return (
    feed && (
      <div className=" flex justify-center my-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
}
