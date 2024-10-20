// Popup.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Popup from "../app/components/Popup"; // Adjust the import path accordingly

describe("Popup Component", () => {
  it("renders the modal content when open", () => {
    render(<Popup isOpen={true} onClose={jest.fn()} />);

    // Check if the modal content is rendered when isOpen is true
    expect(screen.getByText("Content of the modal")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("calls onClose when the Cancel button is clicked", () => {
    const handleClose = jest.fn();
    render(<Popup isOpen={true} onClose={handleClose} />);

    // Click on the Cancel button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Check if onClose function is called
    expect(handleClose).toHaveBeenCalled();
  });

  it("displays loading state when OK button is clicked", () => {
    render(<Popup isOpen={true} onClose={jest.fn()} />);

    // Click on the OK button
    const okButton = screen.getByText("OK");
    fireEvent.click(okButton);

    // Check if the confirm loading state is triggered
    expect(
      screen.getByText("The modal will be closed after two seconds")
    ).toBeInTheDocument();
  });

  it("closes modal after loading finishes", async () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();

    render(<Popup isOpen={true} onClose={handleClose} />);

    // Click on the OK button
    const okButton = screen.getByText("OK");
    fireEvent.click(okButton);

    // Move time forward by 2 seconds
    jest.advanceTimersByTime(2000);

    // Check if the onClose function was called after timeout
    expect(handleClose).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
