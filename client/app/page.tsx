"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import Section1 from "./components/components/home_components/Section1";
import Section2 from "./components/components/home_components/Section2";
import { useEffect, useState } from "react";

export default function Home() {
  const [ischange, setIsChange] = useState(false);
  const handleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/User" });

    // Check if the sign-in was successful
    if (result?.error) {
      console.error("Login failed:", result.error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition: number = window.scrollY;
      if (scrollPosition > 100) {
        setIsChange(true);
      } else {
        setIsChange(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-start justify-between">
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"> */}
      <header className="bg-black w-full">
        <div className="mx-2 flex h-16 max-w-screen-2xl items-center justify-between gap-8 px-0 sm:px-6 lg:px-0">
          <a className="block text-teal-600" href="#">
            <span className="sr-only">Home</span>
            <Image
              src="/logo3.svg"
              alt="Logo"
              width={250}
              height={50}
              priority
            />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Careers{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    History{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Services{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Projects{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Blog{" "}
                  </a>
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
        <div className="flex flex-col">
          {!ischange ? (
            <div>
              <video autoPlay muted loop className="opacity-30 h-full ">
                <source src="/video1.mp4" type="video/mp4" />
              </video>
            </div>
          ) : (
            <div className="opacity-30 min-h-screen">
              <Image
                src="/background2.jpg"
                alt="Background"
                sizes="cover"
                // layout="fill"
                // objectFit="cover"
                layout="responsive"
                width={1000}
                height={1000}
                priority
              />
            </div>
          )}
        </div>

        <div className="absolute top-32">
          <div className="flex-1 w-full">
            <Section1 />
          </div>
          <div className="flex-2 w-full ">
            <Section2 />
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
