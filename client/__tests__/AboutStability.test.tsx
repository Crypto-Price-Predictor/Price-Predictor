import { render, screen } from "@testing-library/react";
import AboutStability from "../app/components/AboutStability"; // Adjust the path if necessary
import "@testing-library/jest-dom";

describe("AboutStability", () => {
  it("renders the AboutStability component", () => {
    render(<AboutStability value={false} />);

    // Check if the text "AboutStability" is rendered
    expect(screen.getByText("AboutStability")).toBeInTheDocument();
  });

  it("applies the correct class when value is false", () => {
    render(<AboutStability value={false} />);

    // Check if the class "text-black" is applied
    expect(screen.getByText("AboutStability")).toHaveClass("text-black");
  });

  it("applies the correct class when value is true", () => {
    render(<AboutStability value={true} />);

    // Check if the class "text-white" is applied
    expect(screen.getByText("AboutStability")).toHaveClass("text-white");
  });
});
