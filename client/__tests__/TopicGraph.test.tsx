// TopicGraph.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import TopicGraph from "../app/components/TopicGraph"; // Adjust import path accordingly

// Mock the dynamic import for the ApexChart
jest.mock("react-apexcharts", () => () => <div data-testid="apex-chart" />);

describe("TopicGraph Component", () => {
  const mockSeries = [
    {
      name: "Sample Series",
      data: [10, 20, 30, 40, 50],
    },
  ];
  const mockCategories = ["Jan", "Feb", "Mar", "Apr", "May"];

  it("renders the TopicGraph component correctly", () => {
    const { getByTestId } = render(
      <TopicGraph
        series={mockSeries}
        categories={mockCategories}
        value={false}
      />
    );

    // Ensure the chart component is rendered
    expect(getByTestId("apex-chart")).toBeInTheDocument();
  });

  it("sets the correct theme for light mode", () => {
    const { container } = render(
      <TopicGraph
        series={mockSeries}
        categories={mockCategories}
        value={false}
      />
    );

    // Check for light mode background color
    expect(container.firstChild).toHaveClass("bg-white");
  });

  it("sets the correct theme for dark mode", () => {
    const { container } = render(
      <TopicGraph
        series={mockSeries}
        categories={mockCategories}
        value={true}
      />
    );

    // Check for dark mode background color
    expect(container.firstChild).toHaveClass("bg-gray-700");
  });

  it("passes correct options to the ApexChart", () => {
    const { getByTestId } = render(
      <TopicGraph
        series={mockSeries}
        categories={mockCategories}
        value={true}
      />
    );

    const chart = getByTestId("apex-chart");
    expect(chart).toBeInTheDocument();

    // Check if the options object contains the expected properties
    expect(chart).toHaveAttribute("options", expect.stringContaining("dark"));
    expect(chart).toHaveAttribute(
      "options",
      expect.stringContaining(mockCategories[0])
    );
  });
});
