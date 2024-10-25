// loginButton.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginButton from "../app/components/LoginButton"; // Adjust path based on your structure
import { signIn } from "next-auth/react";

// Mock the signIn function from next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("loginButton Component", () => {
  it("renders the button with the correct name", () => {
    render(<LoginButton name="Sign in with Google" />);

    // Check if the button is rendered with the correct name
    const buttonElement = screen.getByRole("button", {
      name: /Sign in with Google/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls signIn('google') when the button is clicked", () => {
    render(<LoginButton name="Sign in with Google" />);

    const buttonElement = screen.getByRole("button", {
      name: /Sign in with Google/i,
    });

    // Simulate button click
    fireEvent.click(buttonElement);

    // Check if the signIn function was called with 'google'
    expect(signIn).toHaveBeenCalledWith("google");
  });
});
