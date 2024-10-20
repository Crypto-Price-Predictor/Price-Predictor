import React from "react";
import Image from "next/image";
import Dashboard from "./../User/page";

interface navBarProps {
  image: string;
}

const NavBar: React.FC<navBarProps> = ({ image }) => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex">
          <a className="btn text-xl">
            <Image
              src="/logo3.svg"
              alt="Logo"
              // className="light:invert"
              width={250}
              height={40}
              // role="img"
              priority
            />
          </a>
        </div>
        <div className="flex">
          <div className="text-3xl pl-10">|</div>
        </div>
        <div className="flex-grow">
          <div className="text-2xl pl-3">Dashboard</div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-100 h-100 rounded-full">
                <Image
                  src={image || "/Profile.jpg"} // Fallback to a default image
                  alt="User Avatar"
                  layout="fill"
                  className="rounded-full"
                  objectFit="cover"
                  role="img"
                  priority
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
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
    </div>
  );
};

export default NavBar;
