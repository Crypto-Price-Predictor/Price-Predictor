import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../app/components/Form"; // Adjust the path to your App component
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("App Form", () => {
  it("renders the form elements", () => {
    render(<App />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coin/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Fill form/i })
    ).toBeInTheDocument();
  });

  it("validates form submission with empty inputs", async () => {
    render(<App />);

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error creating user/i)).toBeInTheDocument();
    });
  });

  it("submits the form with valid inputs", async () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const coinSelect = screen.getByLabelText(/coin/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    // Fill out the form
    userEvent.type(nameInput, "John Doe");
    userEvent.selectOptions(coinSelect, ["USD"]);

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText(/user created successfully/i)
      ).toBeInTheDocument();
    });
  });

  it("resets the form on clicking reset button", () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const coinSelect = screen.getByLabelText(/coin/i);
    const resetButton = screen.getByRole("button", { name: /Reset/i });

    // Fill out the form
    userEvent.type(nameInput, "John Doe");
    userEvent.selectOptions(coinSelect, ["USD"]);

    // Reset the form
    fireEvent.click(resetButton);

    // Ensure the form is reset
    expect(nameInput).toHaveValue("");
    expect(coinSelect).toHaveValue(undefined);
  });

  it("fills the form on clicking fill button", () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const coinSelect = screen.getByLabelText(/coin/i);
    const fillButton = screen.getByRole("button", { name: /Fill form/i });

    // Click fill button
    fireEvent.click(fillButton);

    // Ensure the form is filled
    expect(nameInput).toHaveValue("Helloworld");
    expect(coinSelect).toHaveValue("USD");
  });

  it("displays loading spinner on submit and disables buttons", async () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const coinSelect = screen.getByLabelText(/coin/i);
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    // Fill out the form
    userEvent.type(nameInput, "John Doe");
    userEvent.selectOptions(coinSelect, ["USD"]);

    // Submit the form
    fireEvent.click(submitButton);

    // Ensure the loading spinner appears
    await waitFor(() => {
      //   expect(screen.getByRole("button", { name: /Submit/i })).toHaveAttribute(
      //     "aria-disabled",
      //     "true"
      //   );
      expect(screen.getByRole("status")).toBeInTheDocument();
      //   expect(screen.getByRole("img", { name: /loading/i })).toBeInTheDocument(); // If you have a loading icon with alt text
    });
    expect(submitButton).toBeDisabled();
  });
});
