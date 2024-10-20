import { render, screen, fireEvent } from "@testing-library/react";
import CurrSelecter from "../app/components/CurrSelecter"; // Adjust the path if necessary
import "@testing-library/jest-dom";

describe("CurrSelecter", () => {
  it("renders the CurrSelecter component", () => {
    const handleChange = jest.fn();
    render(<CurrSelecter handleChange={handleChange} value={false} />);

    // Check if the options are rendered
    expect(screen.getByText("Bitcoin (BTC)")).toBeInTheDocument();
    expect(screen.getByText("TRON (TRX)")).toBeInTheDocument();
    expect(screen.getByText("Dogecoin (Doge)")).toBeInTheDocument();
    expect(screen.getByText("Shiba-inu (SHIB)")).toBeInTheDocument();
  });

  it("calls handleChange when a different currency is selected", () => {
    const handleChange = jest.fn();
    render(<CurrSelecter handleChange={handleChange} value={false} />);

    // Simulate selecting an option
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "TRX" },
    });

    // Assert that handleChange has been called with "TRX"
    expect(handleChange).toHaveBeenCalledWith("TRX");
  });

  it("applies the correct class when value is false", () => {
    const handleChange = jest.fn();
    render(<CurrSelecter handleChange={handleChange} value={false} />);

    // Check if the select element has the class "bg-white text-black"
    expect(screen.getByRole("combobox")).toHaveClass("bg-white text-black");
  });

  it("applies the correct class when value is true", () => {
    const handleChange = jest.fn();
    render(<CurrSelecter handleChange={handleChange} value={true} />);

    // Check if the select element has the class "bg-gray-600 text-white"
    expect(screen.getByRole("combobox")).toHaveClass("bg-gray-600 text-white");
  });
});
