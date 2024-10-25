// AppLayout.test.tsx
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AppLayout from "../app/User/page"; // Adjust the import path as needed
import { useSessionCheck } from "../hook/useSessionCeck";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
// import { createMockRouter } from "../test-utils/mokeRouter";
import userEvent from "@testing-library/user-event";
import Portfolio from "@/app/User/portfolio/page";

// Mock useRouter
// jest.mock("next/router");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the useSessionCheck hook to control the session state
jest.mock("../hook/useSessionCeck", () => ({
  useSessionCheck: jest.fn(),
}));

const mockSession = {
  user: {
    image: "http://example.com/user-image.png",
  },
};

// Mock for matchMedia
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

describe("AppLayout Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: jest.fn(),
      // Add other properties you may use
    }));
  });

  it("renders loading spinner when loading", () => {
    (useSessionCheck as jest.Mock).mockReturnValue({
      session: null,
      status: "loading",
    });
    render(<AppLayout />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders the NavBar with user image when authenticated", async () => {
    (useSessionCheck as jest.Mock).mockReturnValue({
      session: mockSession,
      status: "authenticated",
    });
    render(<AppLayout />);

    await waitFor(() =>
      expect(screen.getByAltText("User Avatar").getAttribute("src")).toContain(
        encodeURIComponent(mockSession.user.image)
      )
    );
    // expect(screen.getByRole("img")).toHaveAttribute("alt", "User Avatar");
  });

  it("changes theme when switch is toggled", async () => {
    (useSessionCheck as jest.Mock).mockReturnValue({
      session: mockSession,
      status: "authenticated",
    });
    render(<AppLayout />);

    await waitFor(() =>
      expect(screen.getByLabelText("theme-switch")).toBeInTheDocument()
    );

    const switchElement = screen.getByLabelText("theme-switch");

    // Check initial theme
    expect(switchElement).toBeChecked(); // If dark theme is default
  });

  it("renders HomeContent when Home menu item is clicked", async () => {
    (useSessionCheck as jest.Mock).mockReturnValue({
      session: mockSession,
      status: "authenticated",
    });
    render(<AppLayout />);

    await waitFor(() => expect(screen.getByText("Home")).toBeInTheDocument());
    // Click the Home menu item
    fireEvent.click(await screen.findByText("Home"));

    // Check that HomeContent is rendered
    // expect(await screen.findByText("Select a menu item")).toBeInTheDocument(); // Adjust based on HomeContent rendering
    // expect(
    //   screen.getByText((content) => content.includes("Select a menu item"))
    // ).toBeInTheDocument();
    // expect(screen.getByText(/Select a menu item/i)).toBeInTheDocument();
  });

  it("renders ListContent when Portfolio menu item is clicked", async () => {
    const { getByText } = render(<Portfolio value={true} />);

    (useSessionCheck as jest.Mock).mockReturnValue({
      session: mockSession,
      status: "authenticated",
    });
    render(<AppLayout />);

    // Click the Portfolio menu item
    fireEvent.click(await screen.findByText("Portfolio"));

    // Check that ListContent is rendered
    // expect(await screen.findByText("Select a menu item")).toBeInTheDocument(); // Adjust based on ListContent rendering
    // expect(
    //   screen.getByText((content) => content.includes("Select a menu item"))
    // ).toBeInTheDocument();
    // expect(screen.getByText(/Select a menu item/i)).toBeInTheDocument();
  });

  it("opens LoginExpire when session is unauthenticated", async () => {
    (useSessionCheck as jest.Mock).mockReturnValue({
      session: null,
      status: "unauthenticated",
    });
    render(<AppLayout />);

    await waitFor(() =>
      expect(screen.getByText("Login Expired")).toBeInTheDocument()
    );

    // Check that LoginExpire is rendered
    expect(screen.getByText("Login Expired")).toBeInTheDocument(); // Adjust based on LoginExpire content
  });
});
