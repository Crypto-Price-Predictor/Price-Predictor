import React, { useState } from "react";
import { Modal } from "antd";
import App from "./Form";

interface popupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<popupProps> = ({ isOpen, onClose }) => {
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

  return (
    <>
      <Modal
        title="Title"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <App />
      </Modal>
    </>
  );
};

export default Popup;
