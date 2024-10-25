import { render, screen, waitFor } from "@testing-library/react";
import ErrorModel from "../app/components/ErrorModel"; // Adjust the path if necessary
import "@testing-library/jest-dom";

describe("ErrorModel", () => {
  jest.useFakeTimers();

  it("renders the error message when isOpen is true", () => {
    const mockOnClose = jest.fn();
    render(
      <ErrorModel
        isOpen={true}
        onClose={mockOnClose}
        massage="Test error message"
      />
    );

    // Check if the error message is in the document
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("does not render the error message when isOpen is false", () => {
    const mockOnClose = jest.fn();
    render(
      <ErrorModel
        isOpen={false}
        onClose={mockOnClose}
        massage="Test error message"
      />
    );

    // Check that the alert is not in the document
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("calls onClose after 5 seconds", async () => {
    const mockOnClose = jest.fn();
    render(
      <ErrorModel
        isOpen={true}
        onClose={mockOnClose}
        massage="Test error message"
      />
    );

    // Fast-forward the timer by 5 seconds
    jest.advanceTimersByTime(5000);

    // Check if onClose was called
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
