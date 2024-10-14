"use client";

import React, { useState } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { PrismaClient } from "@prisma/client";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { NoticeType } from "antd/es/message/interface";

const { Option } = Select;

const prisma = new PrismaClient();

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const coins = ["BTC", "USD", "USDT", "GOLD"];
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
            }),
          });
          console.log(res);

          if (res.ok) {
            const data = await res.json();
            // console.log("User created:", data);
            success("success", "User created successfully");
            window.location.href = "/User/portfolio";
          } else {
            console.error("Error creating user");
            success("error", "Error creating user");
            setIsLoading(false);
          }
        } else {
          console.error("Error creating user");
          success("error", "Error creating user");
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        success("error", "Error creating user");
        setIsLoading(false);
      }
    }, 2400);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ name: "Helloworld", coin: "USD" });
  };

  return (
    <Form
      {...layout}
      form={form}
      onSubmitCapture={onSubmit}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      {contextHolder}
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="coin" label="Coin" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          //   onChange={onGenderChange}
          allowClear
        >
          {coins.map((coin) => (
            <Option value={coin}>{coin}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit" aria-disabled={isLoading}>
            {isLoading ? (
              <Flex align="center" gap="middle">
                <Spin indicator={<LoadingOutlined spin />} />
              </Flex>
            ) : (
              "Submit"
            )}
          </Button>
          <Button htmlType="button" onClick={onReset} aria-disabled={isLoading}>
            Reset
          </Button>
          <Button
            type="link"
            htmlType="button"
            onClick={onFill}
            aria-disabled={isLoading}
          >
            Fill form
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default App;
