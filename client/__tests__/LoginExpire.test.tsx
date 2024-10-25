// LoginExpire.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginExpire from "../app/components/LoginExpire"; // Adjust the import path accordingly
import { signIn } from "next-auth/react";
import "@testing-library/jest-dom";

// Mock the signIn function from next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("LoginExpire Component", () => {
  it("renders the modal with the correct text when isOpen is true", () => {
    render(<LoginExpire isOpen={true} />);

    // Check if modal text is rendered
    expect(screen.getByText(/User Session Expired/i)).toBeInTheDocument();
    expect(screen.getByText(/Please Login again/i)).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    const { queryByText } = render(<LoginExpire isOpen={false} />);

    // Modal content should not be present when isOpen is false
    expect(queryByText(/User Session Expired/i)).not.toBeInTheDocument();
    expect(queryByText(/Please Login again/i)).not.toBeInTheDocument();
  });

  it("shows the loading spinner when login is clicked", async () => {
    render(<LoginExpire isOpen={true} />);

    // Click the OK button to trigger login
    const loginButton = screen.getByRole("button", { name: /OK/i });
    // fireEvent.click(screen.getByText("OK"));

    fireEvent.click(loginButton);

    expect(screen.getByRole("status")).toBeInTheDocument();

    // Wait for the spinner to show up
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /OK/i })).toBeInTheDocument();
    });

    // Check if the signIn function is called
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/User" });
    });
  });

  it("redirects to the homepage when cancel is clicked", () => {
    // Mock window.location.href to avoid actual redirects in the test
    delete (window as any).location;
    window.location = { href: "" } as any;

    render(<LoginExpire isOpen={true} />);

    // Click the cancel button
    fireEvent.click(screen.getByText("Cancel"));

    // Check if the window location was set to "/"
    expect(window.location.href).toBe("/");
  });
});
