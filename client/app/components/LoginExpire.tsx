"use client";

import React, { useState } from "react";
import { Modal, Button, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";

interface loginExpireProps {
  isOpen: boolean;
}

const LoginExpire: React.FC<loginExpireProps> = ({ isOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("User Session Expired");

  const handleLogin = () => {
    setConfirmLoading(true);
    setTimeout(async () => {
      const result = await signIn("google", { callbackUrl: "/User" });
      // Check if the sign-in was successful
      if (result?.error) {
        console.error("Login failed:", result.error);
      }
      // setConfirmLoading(false);
    }, 1200);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    window.location.href = "/";
  };

  return (
    <>
      <Modal
        title="Login Expired"
        className=" rounded-2xl w-40 h-fit"
        open={isOpen}
        onOk={handleLogin}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <section className="bg-white w-auto h-16 rounded-2xl">
          <div className="flex flex-col items-center justify-center py-2">
            {confirmLoading ? (
              <div className="flex flex-col justify-center items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-xl font-semibold">
                <p>{modalText}</p>
                <p>Please Login again</p>
              </div>
            )}
          </div>
        </section>
      </Modal>
    </>
  );
};

export default LoginExpire;
