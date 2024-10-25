// NavBar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../app/components/NavBar"; // Adjust the import path accordingly

describe("NavBar Component", () => {
  it("renders the logo correctly", () => {
    render(<NavBar image="/test-image.jpg" />);

    // Check if the logo is rendered
    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/logo3.svg");
  });

  it("displays the user image when provided", () => {
    render(<NavBar image="/user-image.jpg" />);

    // Check if the provided user image is displayed
    const userAvatar = screen.getByAltText("User Avatar");
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute("src", "/user-image.jpg");
  });

  it("displays the fallback image when no image is provided", () => {
    render(<NavBar image="" />);

    // Check if the fallback image is displayed
    const fallbackAvatar = screen.getByAltText("User Avatar");
    expect(fallbackAvatar).toBeInTheDocument();
    expect(fallbackAvatar).toHaveAttribute("src", "/Profile.jpg");
  });

  it("displays the dropdown when the avatar is clicked", () => {
    render(<NavBar image="/user-image.jpg" />);

    // Click on the avatar to open the dropdown
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);

    // Check if dropdown items are displayed
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("does not display the dropdown initially", () => {
    render(<NavBar image="/user-image.jpg" />);

    // Check that the dropdown menu is not visible initially
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });
});
