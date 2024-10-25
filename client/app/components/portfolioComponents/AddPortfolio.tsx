import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  Space,
  message,
  Spin,
  Flex,
} from "antd";
import { NoticeType } from "antd/es/message/interface";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

interface addPortfolioprops {
  isOpen: boolean;
  onClose: () => void;
}

const AddPortfolio: React.FC<addPortfolioprops> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const coins = ["BTC", "USD", "USDT", "GOLD"];
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        if (form.getFieldValue("name") && form.getFieldValue("coin")) {
          const res = await fetch("/api/createPortfolio", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.getFieldValue("name"),
              userId: sessionStorage.getItem("userId"), // Get user ID from sessionStorage
              Description: form.getFieldValue("Description"),
            }),
          });

          if (res.ok) {
            const data = await res.json();
            // console.log("User created:", data);
            success("success", "Portfolio created successfully");
            window.location.href = "/User";
          } else {
            console.error("Error creating portfolio");
            success("error", "Error creating portfolio");
            setIsLoading(false);
          }
        } else {
          console.error("Error creating portfolio");
          success("error", "Error creating portfolio");
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        success("error", "Error creating portfolio");
        setIsLoading(false);
      }
    }, 2400);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <h1 className="flex items-center justify-center mb-4">
            Create a Portfolio
          </h1>
        }
        open={isOpen}
        footer={
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              aria-disabled={isLoading}
              onClick={onSubmit}
            >
              {isLoading ? (
                <Flex align="center" gap="middle">
                  <Spin
                    indicator={<LoadingOutlined spin role="status" />}
                    className="text-white"
                  />
                </Flex>
              ) : (
                "Submit"
              )}
            </Button>
            <Button type="primary" onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
        confirmLoading={confirmLoading}
        onCancel={onClose}
      >
        <Form
          name="wrap"
          form={form}
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="coin" label="Base coin" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              {coins.map((coin) => (
                <Option value={coin}>{coin}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
            // rules={[{ required: true, message: "Please input!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPortfolio;
