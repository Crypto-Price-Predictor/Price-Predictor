// __tests__/AppLayout.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import AppLayout from "../app/components/Layout";
import { createMockRouter } from "../test-utils/createMokeRouter"; // We'll create this utility later

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("AppLayout Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(
      createMockRouter({ pathname: "/" })
    );
  });

  it("renders layout with navigation items", () => {
    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    // Check if "Home", "List", and "App" menu items are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("App")).toBeInTheDocument();
  });

  it("renders child content", () => {
    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    // Check if child content is rendered inside the layout
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("highlights active route in the sidebar", () => {
    // Simulate being on the "List" page
    (useRouter as jest.Mock).mockReturnValue(
      createMockRouter({ pathname: "/list" })
    );

    render(
      <AppLayout>
        <div>Test Child</div>
      </AppLayout>
    );

    // The "List" item should be highlighted as the active route
    const listMenuItem = screen.getByText("List").closest("li");
    expect(listMenuItem).toHaveClass("ant-menu-item-selected");
  });
});
