import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Dashboard from "../app/User/Home/page"; // Adjust the import path
import axios from "axios";
import { message } from "antd";
import "@testing-library/jest-dom";

jest.mock("axios");
// jest.mock("../app/components/TopicGraph", () => () => (
//   <div>Mocked TopicGraph</div>
// ));
jest.mock("../../components/TopicGraph", () => () => (
  <div data-testid="topic-graph">Mocked TopicGraph</div>
));
jest.mock(
  "../app/components/CurrSelecter",
  () =>
    ({ handleChange }: { handleChange: (curr: string) => void }) =>
      <button onClick={() => handleChange("BTC")}>Mocked CurrSelecter</button>
);
jest.mock("../app/components/TimeSelecter", () => () => (
  <div>Mocked TimeSelecter</div>
));
jest.mock("../app/components/AboutPred", () => () => (
  <div>Mocked AboutPred</div>
));
jest.mock("../app/components/AboutStability", () => () => (
  <div>Mocked AboutStability</div>
));

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading spinner while fetching data", () => {
    render(<Dashboard value={true} />);

    // Expect the loading spinner to be present initially
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays TopicGraph when data is fetched successfully", async () => {
    const mockData = {
      future_predictions: [[100, 200, 300]],
      actual: [[90, 190, 290]],
      history: [80, 180, 280],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<Dashboard value={true} />);

    // await waitFor(() =>
    //   expect(screen.getByText("Mocked TopicGraph")).toBeInTheDocument()
    // );

    await waitFor(() =>
      expect(screen.getByTestId("topic-graph")).toBeInTheDocument()
    );

    // Ensure TopicGraph component is rendered after the data is fetched
    // expect(screen.getByText("Mocked TopicGraph")).toBeInTheDocument();
  });

  it("displays an error message if API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<Dashboard value={true} />);

    // Wait for the error message to appear
    await waitFor(() =>
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument()
    );
  });

  it("handles currency change by re-fetching data", async () => {
    const mockData = {
      future_predictions: [[100, 200, 300]],
      actual: [[90, 190, 290]],
      history: [80, 180, 280],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(<Dashboard value={true} />);

    // Simulate currency change
    const currencySelectorButton = screen.getByText("Mocked CurrSelecter");
    fireEvent.click(currencySelectorButton);

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        "http://127.0.0.1:5000/predict?coin=BTC"
      )
    );
  });

  it("displays AboutPred and AboutStability components", () => {
    render(<Dashboard value={true} />);

    expect(screen.getByText("Mocked AboutPred")).toBeInTheDocument();
    expect(screen.getByText("Mocked AboutStability")).toBeInTheDocument();
  });
});
