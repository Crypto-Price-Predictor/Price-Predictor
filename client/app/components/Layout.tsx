// components/Layout.tsx
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";

const { Header, Content, Sider } = Layout;

const items2 = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Home",
    href: "/", // Map to homepage
  },
  {
    key: "2",
    icon: <LaptopOutlined />,
    label: "List",
    href: "/list", // Map to list page
  },
  {
    key: "3",
    icon: <NotificationOutlined />,
    label: "App",
    href: "/app", // Map to app page
  },
];

interface appLayOutProps {
  children: any;
}

const AppLayout: React.FC<appLayOutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[router.pathname]} // Auto-select the menu based on the route
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[router.pathname]} // Highlight the active route
            style={{ height: "100%", borderRight: 0 }}
          >
            {items2.map((item) => (
              <Menu.Item key={item.href} icon={item.icon}>
                <Link href={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children} {/* This will render the dynamic page content */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
