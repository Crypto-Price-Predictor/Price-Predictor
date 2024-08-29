"use client";

import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface loginButtonProps {
  name: string;
}

const loginButton: React.FC<loginButtonProps> = ({ name }) => {
  //   const session = await getServerSession();

  //   const handleClick = () => {
  //     if (session) {
  //       redirect("/User");
  //     } else {
  //       signIn("google");
  //     }
  //   };

  return (
    <div>
      <button
        className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
        onClick={() => signIn("google")}
      >
        {name}
      </button>
    </div>
  );
};

export default loginButton;
