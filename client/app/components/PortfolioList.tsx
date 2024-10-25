import React, { useEffect, useState } from "react";
import { Avatar, List, Space, Collapse, Button, ConfigProvider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PortfolioMain from "./portfolioComponents/portfolioMain";
import { createStyles } from "antd-style";
import AddPortfolio from "./portfolioComponents/AddPortfolio";

interface listProps {
  value: boolean; // value true: dark mode, false: light mode
  data: any[];
}

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   title: `My Portfolio ${i}`,
//   avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//   description: `This is my Portfolio ${i}, created ${new Date().toLocaleDateString()}. Base currency USD`,
//   content:
//     "We supply a series of design principles, practical patterns, and high-quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
// }));

const PortfolioList: React.FC<listProps> = ({ value, data }) => {
  const { styles } = useStyle();
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [addPortfolio, setAddPortfolio] = useState(false);
  const [key, setKey] = useState<String>("");

  const backgroundColor = value ? "#1f1f1f" : "#fff"; // Dark mode: darker background
  const listBackground = value ? "#333" : "#9999"; // Dark mode for list background
  const borderColor = value ? "#555" : "#f0f0f0"; // Adjust border for dark/light mode
  const textColor = value ? "#fff" : "#000"; // Dark mode: white, Light mode: black
  const linkColor = value ? "#4FC3F7" : "#007BFF"; // Blue tones for links
  const collapseContentBackground = value ? "#2e2e2e" : "#fafafa"; // Set collapse content background

  useEffect(() => {
    const fetchPortfolio = async () => {
      const userID = sessionStorage.getItem("userId"); // Retrieve userID from sessionStorage

      if (!userID) {
        console.error("User ID not found in session storage");
        return;
      }

      const res = await fetch(`/api/getPortfolio?userID=${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    fetchPortfolio();
  }, []);

  const handleMoreClick = (rowkey: String) => {
    setKey(rowkey);
    setShowPortfolio(true); // Set to show the ABC component
  };

  if (showPortfolio) {
    return <PortfolioMain rowkey={key} value={value} />;
  }
  return (
    <>
      <h1
        className={`${
          value ? "text-white" : "text-black"
        } align-middle text-center font-bold text-xl mb-2`}
      >
        My Portfolios
      </h1>
      <ConfigProvider
        button={{
          className: styles.linearGradientButton,
        }}
      >
        <Space className=" flex items-center justify-end mb-4">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setAddPortfolio(true)}
          >
            Portfolio
          </Button>
        </Space>
      </ConfigProvider>
      <List
        itemLayout="horizontal"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4, // Adjust as per requirement
          style: {
            backgroundColor: backgroundColor, // Dark background for pagination
            color: textColor,
          },
          itemRender: (current, type, originalElement) => {
            if (type === "page") {
              return (
                <a
                  style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  {current}
                </a>
              );
            }
            return originalElement;
          },
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit" style={{ color: textColor }}>
                edit
              </a>,
              <a
                key="list-loadmore-more"
                onClick={() => handleMoreClick(item.id)}
                style={{ color: linkColor }} // Blue tones for both themes
              >
                more
              </a>,
            ]}
            style={{
              backgroundColor: listBackground,
              border: `1px solid ${borderColor}`,
              borderRadius: "8px", // Rounded corners for aesthetics
              marginBottom: "10px", // Space between items
              padding: "16px", // Add some padding
              color: textColor,
            }}
          >
            <Space
              direction="vertical"
              style={{
                width: "100%",
                backgroundColor: backgroundColor,
                color: textColor,
                // padding: "8px", // Padding inside Space
                borderRadius: "8px",
              }}
            >
              <Collapse
                accordion={false}
                collapsible="header"
                defaultActiveKey={["1"]}
                style={{
                  backgroundColor: value ? "#1f1f1f" : "#fff", // Adjust collapse background
                  borderColor: borderColor, // Adjust border color
                  color: textColor,
                }}
                items={[
                  {
                    key: item.id,
                    label: <a style={{ color: textColor }}>{item.name}</a>,
                    children: (
                      <div
                        style={{
                          backgroundColor: collapseContentBackground, // Fixing the white background issue
                          // padding: "16px", // Add some padding
                          // borderRadius: "8px",
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "8px",
                        }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
                            />
                          }
                          description={
                            <span style={{ color: textColor }}>
                              {item.Description}
                            </span>
                          }
                          style={{
                            backgroundColor: backgroundColor, // Ensure dark mode color
                            padding: "8px", // Padding inside the meta section
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </Space>
          </List.Item>
        )}
      />
      <AddPortfolio
        isOpen={addPortfolio}
        onClose={() => setAddPortfolio(false)}
      />
    </>
  );
};

export default PortfolioList;
