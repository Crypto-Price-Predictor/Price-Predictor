import React from "react";
import { Avatar, List, Space, Collapse, Pagination } from "antd";

interface listProps {
  value: boolean; // value true: dark mode, false: light mode
}

const data = Array.from({ length: 23 }).map((_, i) => ({
  title: `My Portfolio ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description: `This is my Portfolio ${i}, created ${new Date().toLocaleDateString()}. Base currency USD`,
  content:
    "We supply a series of design principles, practical patterns, and high-quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const PortfolioList: React.FC<listProps> = ({ value }) => {
  const backgroundColor = value ? "#1f1f1f" : "#fff"; // Dark mode: darker background
  const listBackground = value ? "#333" : "#fff"; // Dark mode for list background
  const borderColor = value ? "#555" : "#f0f0f0"; // Adjust border for dark/light mode
  const textColor = value ? "#fff" : "#000"; // Dark mode: white, Light mode: black
  const linkColor = value ? "#4FC3F7" : "#007BFF"; // Blue tones for links
  const collapseContentBackground = value ? "#2e2e2e" : "#fafafa"; // Set collapse content background

  return (
    <>
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
                  backgroundColor: backgroundColor, // Adjust collapse background
                  borderColor: borderColor, // Adjust border color
                  color: textColor,
                }}
                items={[
                  {
                    key: "1",
                    label: <a style={{ color: textColor }}>{item.title}</a>,
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
                          avatar={<Avatar src={item.avatar} />}
                          description={
                            <span style={{ color: textColor }}>
                              {item.description}
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
    </>
  );
};

export default PortfolioList;
