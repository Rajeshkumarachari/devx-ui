import { IoFemaleOutline } from "react-icons/io5";
import { IoIosMale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";

export default function UserCard({ user }) {
  const { firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    user && (
      <div className="card bg-base-100 w-96 shadow-xl mb-20">
        <figure>
          <img
            src={photoUrl}
            alt={firstName}
            className="rounded-full size-[320px] object-cover  "
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
            <button className="px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600">
              Ignore
            </button>
            <button className="px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
              Send Request
            </button>
          </div>
        </div>
      </div>
    )
  );
}
