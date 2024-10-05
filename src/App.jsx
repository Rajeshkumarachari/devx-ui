const App = () => {
  return (
    <div>
      <div className="navbar bg-gray-200">
        <div className="flex-1">
          <a className="  text-sky-800 mx-20 hover:bg-gray-300 px-2 py-1 rounded-md font-semibold cursor-pointer text-2xl">
            DevX
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          <div className="dropdown dropdown-end mx-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className=" text-blue-950" />
      <h1 className="text-red-300"> rajesh</h1>
    </div>
  );
};

export default App;
