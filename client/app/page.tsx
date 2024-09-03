"use client";

import Image from "next/image";
import loginButton from "./components/loginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Section1 from "./components/homeComponents/Section1";
import Section2 from "./components/homeComponents/Section2";
import Section3 from "./components/homeComponents/Section3";
import Section4 from "./components/homeComponents/Section4";
import Section5 from "./components/homeComponents/Section5";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const handleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/User" });

    // Check if the sign-in was successful
    if (result?.error) {
      console.error("Login failed:", result.error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start justify-between">
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"> */}
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
              <div className="sm:flex sm:gap-4">
                <button
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <a
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  href="/api/auth/signin"
                >
                  Register
                </a>
              </div>

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
      <div>
        <div id='home' className="flex flex-col">
          <div className="flex-1">
            <video autoPlay muted loop className="opacity-30 h-full ">
              <source src="/video1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex-2 opacity-30">
            <Image
              src="/background2.jpg"
              alt=""
              // layout="fill"
              // objectFit="cover"
              layout="responsive"
              width={500}
              height={500}
              priority
            />
          </div>
          <div className="bg-black h-screen"></div>
          <div className="bg-black h-64"></div>
        </div>

        <div className="absolute top-32">
          <div className="flex-1 w-full">
            <Section1 handleClick={handleLogin} />
          </div>
          <div className="flex-2 w-full">
            <Section2 />
          </div>
          <div className="flex-2 w-full">
            <Section3 />
          </div>
          <div className="flex-2 w-full">
            <Section4 />
          </div>
          <div className="flex-2 w-full ">
            <Section5 />
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
