// Portfolio.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Portfolio from "../app/User/portfolio/page"; // Adjust the import path
import { useRouter } from "next/navigation";

// Mock necessary modules
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ children }: any) => children;
});

describe("Portfolio Component", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
  });

  it("renders the loading spinner while loading", () => {
    render(<Portfolio value={true} />);

    // Check that the loading spinner is present
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("redirects to login if no user ID is found in sessionStorage", async () => {
    sessionStorage.clear();
    render(<Portfolio value={true} />);

    await waitFor(() => expect(mockRouterPush).toHaveBeenCalledWith("/"));
  });

  it("fetches portfolio data when user ID exists", async () => {
    sessionStorage.setItem("userId", "test-user-id");

    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ portfolio: "mockPortfolio" }),
    });

    render(<Portfolio value={true} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/portfolio?userID=test-user-id",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });

    // Ensure the loading spinner is no longer visible
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("opens CreatePortfolio when portfolio data is not found (404)", async () => {
    sessionStorage.setItem("userId", "test-user-id");

    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
      json: jest.fn(),
    });

    render(<Portfolio value={true} />);

    await waitFor(() => {
      // Ensure that CreatePortfolio is rendered
      expect(screen.getByText("Create Portfolio")).toBeInTheDocument();
    });
  });

  it("handles fetch errors and stops loading", async () => {
    sessionStorage.setItem("userId", "test-user-id");

    global.fetch = jest.fn().mockRejectedValue(new Error("Fetch error"));

    render(<Portfolio value={true} />);

    await waitFor(() => {
      // Ensure fetch error is handled and spinner is removed
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching portfolio:",
        expect.any(Error)
      );
    });
  });

  it("navigates back when handleCancel is called", () => {
    render(<Portfolio value={true} />);

    // Simulate the cancellation
    const cancelButton = screen.getByText("Cancel"); // Adjust this based on your actual button text
    fireEvent.click(cancelButton);

    expect(window.location.href).toBe("/User"); // Ensure it navigates to /User
  });
});
