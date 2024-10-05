"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session.user) {
      const userId = session.user.id || null;
      if (userId) {
        // sessionStorage.setItem("userId", userId);
        sessionStorage.removeItem("userId");
      } else {
        console.error("User ID is not available in session.");
      }
    }
  }, [session, status]);

  const handleLogin = () => {
    setTimeout(async () => {
      const result = await signIn("google", { callbackUrl: "/User" });

      // Check if the sign-in was successful
      if (result?.error) {
        console.error("Login failed:", result.error);
      }
    }, 1000);
  };
  return (
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
  );
};

export default Login;
