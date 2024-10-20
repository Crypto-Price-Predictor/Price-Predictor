// TimeSelecter.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TimeSelecter from "../app/components/TimeSelecter"; // Adjust import path accordingly

describe("TimeSelecter Component", () => {
  it("renders the select dropdown with all options", () => {
    render(<TimeSelecter value={false} />);

    // Ensure the dropdown is rendered
    const selectDropdown = screen.getByRole("combobox");
    expect(selectDropdown).toBeInTheDocument();

    // Check that the options are rendered correctly
    expect(screen.getByText("Hourly")).toBeInTheDocument();
    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("applies light mode styles when value is false", () => {
    render(<TimeSelecter value={false} />);

    // Check for the light mode class (bg-white and text-black)
    const selectDropdown = screen.getByRole("combobox");
    expect(selectDropdown).toHaveClass("bg-white", "text-black");
  });

  it("applies dark mode styles when value is true", () => {
    render(<TimeSelecter value={true} />);

    // Check for the dark mode class (bg-gray-600 and text-white)
    const selectDropdown = screen.getByRole("combobox");
    expect(selectDropdown).toHaveClass("bg-gray-600", "text-white");
  });

  it("allows user to change the selected option", () => {
    render(<TimeSelecter value={false} />);

    const selectDropdown = screen.getByRole("combobox");

    // Select "Daily"
    userEvent.selectOptions(selectDropdown, ["Daily"]);
    const selectedOption = screen.getByRole("option", {
      name: "Daily",
    }) as HTMLOptionElement;
    expect(selectedOption.selected).toBe(true);

    // Select "Monthly"
    userEvent.selectOptions(selectDropdown, ["Monthly"]);
    const monthlyOption = screen.getByRole("option", {
      name: "Monthly",
    }) as HTMLOptionElement;
    expect(monthlyOption.selected).toBe(true);
  });
});
