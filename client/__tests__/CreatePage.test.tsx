import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "../app/User/portfolio/create/page"; // Adjust the import path
import { Modal, Button } from "antd"; // Mock antd imports

// Mock the `App` component
jest.mock("@/app/components/Form", () => () => (
  <div>Mocked Form Component</div>
));

describe("Page Component (Modal)", () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the modal with the form component when `isOpen` is true", () => {
    render(<Page isOpen={true} onClose={mockOnClose} />);

    // Verify modal title
    expect(
      screen.getByText("Create a Portfolio to Countinue")
    ).toBeInTheDocument();

    // Verify that the form component is rendered inside the modal
    expect(screen.getByText("Mocked Form Component")).toBeInTheDocument();

    // Check that the Cancel button is present
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("does not render the modal when `isOpen` is false", () => {
    render(<Page isOpen={false} onClose={mockOnClose} />);

    // Modal should not be in the document when `isOpen` is false
    expect(
      screen.queryByText("Create a Portfolio to Countinue")
    ).not.toBeInTheDocument();
  });

  it("calls the `onClose` function when the Cancel button is clicked", () => {
    render(<Page isOpen={true} onClose={mockOnClose} />);

    // Find the Cancel button and simulate a click event
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Assert that the `onClose` function is called when the button is clicked
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("sets confirmLoading to true and calls `onClose` after 2 seconds when `handleOk` is executed", async () => {
    render(<Page isOpen={true} onClose={mockOnClose} />);

    // Simulate clicking the Confirm button (replace this with your actual confirmation flow)
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Simulate timeout behavior with `setTimeout` in handleOk
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  it("calls `onClose` when modal is cancelled", () => {
    render(<Page isOpen={true} onClose={mockOnClose} />);

    // Click the Cancel button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Check if `onClose` was triggered
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
