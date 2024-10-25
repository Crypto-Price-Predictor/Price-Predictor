// PortfolioList.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PortfolioList from "../app/components/PortfolioList"; // Adjust the import path accordingly

describe("PortfolioList Component", () => {
  it("renders list items correctly", () => {
    render(<PortfolioList value={false} />);

    // Ensure the list is rendered with some content
    const listItem = screen.getByText(/My Portfolio 0/i);
    expect(listItem).toBeInTheDocument();
  });

  it("applies light mode styles correctly", () => {
    render(<PortfolioList value={false} />);

    // Ensure the light mode styles are applied (checking background color)
    const firstItem = screen.getByText(/My Portfolio 0/i).closest("div");
    expect(firstItem).toHaveStyle("background-color: #fff");
  });

  it("applies dark mode styles correctly", () => {
    render(<PortfolioList value={true} />);

    // Ensure the dark mode styles are applied (checking background color)
    const firstItem = screen.getByText(/My Portfolio 0/i).closest("div");
    expect(firstItem).toHaveStyle("background-color: #333");
  });

  it("renders pagination and handles page change", () => {
    render(<PortfolioList value={false} />);

    // Ensure pagination is rendered and has correct number of pages
    const paginationElement = screen.getByText("2");
    expect(paginationElement).toBeInTheDocument();

    // Simulate page change by clicking on the second page
    fireEvent.click(paginationElement);

    // Ensure the next set of items (for page 2) are rendered
    const newListItem = screen.getByText(/My Portfolio 4/i);
    expect(newListItem).toBeInTheDocument();
  });

  it("renders and toggles collapse content", () => {
    render(<PortfolioList value={false} />);

    // Ensure collapse is initially rendered with the first title visible
    const collapseHeader = screen.getByText(/My Portfolio 0/i);
    expect(collapseHeader).toBeInTheDocument();

    // Simulate collapse click to open it
    fireEvent.click(collapseHeader);

    // Ensure collapse content is shown (checking the description text)
    const collapseContent = screen.getByText(/This is my Portfolio 0/i);
    expect(collapseContent).toBeInTheDocument();
  });

  it("renders avatar images", () => {
    render(<PortfolioList value={false} />);

    // Ensure the avatar image is rendered
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute(
      "src",
      "https://api.dicebear.com/7.x/miniavs/svg?seed=0"
    );
  });

  it("renders 'edit' and 'more' actions", () => {
    render(<PortfolioList value={false} />);

    // Ensure the "edit" and "more" actions are rendered
    const editAction = screen.getByText(/edit/i);
    const moreAction = screen.getByText(/more/i);
    expect(editAction).toBeInTheDocument();
    expect(moreAction).toBeInTheDocument();
  });
});
