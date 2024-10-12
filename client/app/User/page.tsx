"use client";

import NavBar from "./../components/NavBar";
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Switch } from "antd";
import HomeContent from "./Home/page"; // Example component for Home
import ListContent from "./portfolio/page"; // Example component for List
import type { MenuProps, MenuTheme } from "antd";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

const { Header, Content, Sider } = Layout;

const items2 = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Home",
  },
  {
    key: "2",
    icon: <LaptopOutlined />,
    label: "Portfolio",
  },
  // {
  //   key: '3',
  //   icon: <NotificationOutlined />,
  //   label: 'App',
  // },
  // {
  //   key: '4',
  //   icon: <LaptopOutlined />,
  //   label: 'Laptop',
  // },
  // {
  //   key: '5',
  //   icon: <NotificationOutlined />,
  //   label: 'Notifications',
  // },
];

const AppLayout: React.FC = () => {
  const { data: session } = useSession();
  const [selectedMenu, setSelectedMenu] = useState<string>("1"); // Keep track of selected menu
  const [theme, setTheme] = useState<MenuTheme>();
  const [background, setBackground] = useState("#1f1f1f");
  const [contentBackground, setContentBackground] = useState("black");
  const [value, setValue] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      // Store the user ID in sessionStorage
      sessionStorage.setItem("userId", session.user.id);
      // console.log("User ID stored in sessionStorage:", session.user.id);
    }
  }, [session]);

  useEffect(() => {
    setTimeout(() => {
      const value = sessionStorage.getItem("theme");
      const Theme = value === "false" ? false : true;
      setValue(Theme);
      changeColor(Theme);
      setIsLoading(false);
    }, 800);
  }, []);

  const changeTheme = (value: boolean) => {
    setValue(value);
    sessionStorage.setItem("theme", String(value));
    changeColor(value);
  };

  const changeColor = (value: boolean) => {
    setTheme(value ? "dark" : "light");
    setBackground(value ? "#1f1f1f" : "white");
    setContentBackground(value ? "black" : "#fafaf9");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "1":
        return <HomeContent value={value} />; // Render HomeContent component
      case "2":
        return <ListContent value={value} />; // Render ListContent component
      case "3":
        return <div>Laptop Content</div>; // Render AppContent component
      case "4":
        return <div>Laptop Content</div>; // You can replace this with a component
      case "5":
        return <div>Notifications Content</div>; // You can replace this with a component
      default:
        return <div>Select a menu item</div>;
    }
  };

  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key); // Update the selected menu state
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Layout
      style={{
        background: contentBackground,
        maxHeight: "fit-content",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Layout
        style={{ height: "100%", margin: "5px", background: contentBackground }}
        className="bg-o"
      >
        <Sider
          width={200}
          style={{ background: background, border: 2, borderRadius: "8px" }}
        >
          <Switch
            checked={theme === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
          <br />
          <br />
          <Menu
            theme={theme}
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              height: "auto",
              borderRight: 2,
              borderRadius: "6px",
            }}
            items={items2}
            onClick={handleMenuClick} // Handle menu click to update content
          />
        </Sider>
        <Layout
          style={{ padding: "0 24px 24px", background: contentBackground }}
        >
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "100%",
              background: contentBackground,
              borderRadius: "6px",
            }}
          >
            {renderContent()}
            {/* Dynamically render content based on menu selection */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;