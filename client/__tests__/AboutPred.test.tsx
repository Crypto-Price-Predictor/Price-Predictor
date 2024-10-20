import { render, screen } from "@testing-library/react";
import AboutPred from "../app/components/AboutPred"; // Adjust the path as necessary
import "@testing-library/jest-dom";

describe("AboutPred", () => {
  const parameters = ["Accuracy", "Precision", "Recall"];
  const values = ["95%", "90%", "85%"];

  it("renders the table with correct parameters and values", () => {
    render(<AboutPred parameters={parameters} values={values} value={false} />);

    // Check that the correct table headers and data are rendered
    expect(screen.getByText("Accuracy Parameters")).toBeInTheDocument();
    expect(screen.getByText("Accuracy")).toBeInTheDocument();
    expect(screen.getByText("95%")).toBeInTheDocument();
    expect(screen.getByText("Precision")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("Recall")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("applies correct classes when value is false", () => {
    render(<AboutPred parameters={parameters} values={values} value={false} />);

    const table = screen.getByRole("table");
    expect(table).toHaveClass("bg-stone-200 text-black");
    expect(screen.getByText("Accuracy Parameters")).toHaveClass("text-black");
  });

  it("applies correct classes when value is true", () => {
    render(<AboutPred parameters={parameters} values={values} value={true} />);

    const table = screen.getByRole("table");
    expect(table).toHaveClass("bg-gray-700 text-white");
    expect(screen.getByText("Accuracy Parameters")).toHaveClass("text-white");
  });

  it("renders with default values when no props are provided", () => {
    render(<AboutPred parameters={[]} values={[]} value={false} />);

    expect(screen.getAllByRole("cell")[0]).toHaveTextContent("");
    expect(screen.getAllByRole("cell")[1]).toHaveTextContent("");
  });
});
