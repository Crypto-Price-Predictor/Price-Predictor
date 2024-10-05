"use client";

import App from "@/app/components/Form";
import React, { useState } from "react";
import { Modal, Button } from "antd";

interface popupProps {
  isOpen: boolean;
  onClose: () => void;
}

const page: React.FC<popupProps> = ({ isOpen, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      onClose;
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    onClose;
  };
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [coins] = useState(["BTC", "USD", "USDT", "GOLD"]);
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     user: "",
  //     refreceCoin: "",
  //   });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  //   const handleCreate = async () => {
  //     const res = await prisma.portfolioUser.create({
  //       data: {
  //         name: formData.name,
  //         User_ID: Number(sessionStorage.getItem("id")),
  //       },
  //     });
  //   };

  //   const handleCancel = () => {
  //     window.location.href = "/User";
  //   };

  return (
    <>
      <Modal
        title="Create a Portfolio to Countinue"
        open={isOpen}
        footer={
          <Button type="primary" onClick={onClose}>
            Cancel
          </Button>
        }
        confirmLoading={confirmLoading}
        onCancel={onClose}
      >
        <section className="bg-white w-full h-36 rounded-2xl">
          <div className="items-center justify-center py-2 pl-px px-28">
            <App />
          </div>
        </section>
      </Modal>
    </>
  );
};

export default page;
