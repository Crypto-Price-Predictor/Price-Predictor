import React from "react";
import Image from "next/image";
import Login from "./Login";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <header className="bg-black w-full fixed top-0 z-50">
      <div className="mx-2 flex h-16 max-w-screen-2xl items-center justify-between gap-8 px-0 sm:px-6 lg:px-0">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <Image
            src="/logo3.svg"
            alt="Logo"
            // className="light:invert"
            width={250}
            height={50}
            priority
          />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#home"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#features"
                >
                  {" "}
                  Features{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#working"
                >
                  {" "}
                  How it works{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#about"
                >
                  {" "}
                  About us{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#disclaimer"
                >
                  {" "}
                  Disclaimer{" "}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-end gap-4">
            <Login />

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
