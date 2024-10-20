// Home.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import Home from "../app/page"; // Adjust the import path as needed
// import NavBar from "../app/components/navigation/NavBar";
// import Section1 from "../app/components/homeComponents/Section1";
// import Section2 from "../app/components/homeComponents/Section2";
// import Section3 from "../app/components/homeComponents/Section3";
// import Section4 from "../app/components/homeComponents/Section4";
// import Section5 from "../app/components/homeComponents/Section5";

// Mock the child components
jest.mock("../app/components/navigation/NavBar", () => () => (
  <div data-testid="navbar" />
));
jest.mock("../app/components/homeComponents/Section1", () => () => (
  <div data-testid="section1" />
));
jest.mock("../app/components/homeComponents/Section2", () => () => (
  <div data-testid="section2" />
));
jest.mock("../app/components/homeComponents/Section3", () => () => (
  <div data-testid="section3" />
));
jest.mock("../app/components/homeComponents/Section4", () => () => (
  <div data-testid="section4" />
));
jest.mock("../app/components/homeComponents/Section5", () => () => (
  <div data-testid="section5" />
));

describe("Home Component", () => {
  it("renders the NavBar component", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders all sections", () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId("section1")).toBeInTheDocument();
    expect(getByTestId("section2")).toBeInTheDocument();
    expect(getByTestId("section3")).toBeInTheDocument();
    expect(getByTestId("section4")).toBeInTheDocument();
    expect(getByTestId("section5")).toBeInTheDocument();
  });

  it("renders the video with correct attributes", () => {
    const { container } = render(<Home />);
    const videoElement = container.querySelector("video");

    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("autoPlay");
    expect(videoElement).toHaveAttribute("muted");
    expect(videoElement).toHaveAttribute("loop");
  });

  it("renders the background image", () => {
    const { container } = render(<Home />);
    const imageElement = container.querySelector("img");

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/background2.jpg");
  });

  it("has the correct structure and classes", () => {
    const { container } = render(<Home />);
    const mainElement = container.querySelector("main");

    expect(mainElement).toHaveClass(
      "flex min-h-screen flex-col items-start justify-between"
    );
    expect(mainElement).toContainHTML('<div class="bg-black h-screen"></div>');
    expect(mainElement).toContainHTML('<div class="bg-black h-64"></div>');
  });
});
