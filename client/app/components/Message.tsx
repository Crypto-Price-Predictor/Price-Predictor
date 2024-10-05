import React from "react";
import { Button, message, Space } from "antd";
import { NoticeType } from "antd/es/message/interface";

interface messageProps {
  type: NoticeType;
  content: string;
}

const Message: React.FC<messageProps> = ({ type, content }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  //   const error = () => {
  //     messageApi.open({
  //       type: "error",
  //       content: "This is an error message",
  //     });
  //   };

  //   const warning = () => {
  //     messageApi.open({
  //       type: "warning",
  //       content: "This is a warning message",
  //     });
  //   };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={success}>Success</Button>
        {/* <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button> */}
      </Space>
    </>
  );
};

export default Message;
