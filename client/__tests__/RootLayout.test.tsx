// RootLayout.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import RootLayout from "../app/layout"; // Adjust the import path as needed
import { SessionProvider } from "next-auth/react";

// Mock the SessionProvider to isolate tests
jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

describe("RootLayout Component", () => {
  it("renders children correctly", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div data-testid="child">Child Component</div>
      </RootLayout>
    );
    expect(getByTestId("child")).toBeInTheDocument();
  });

  it("renders the SessionProvider", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByTestId("session-provider")).toBeInTheDocument();
  });

  it("renders meta tags with correct content", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    // Check for title
    expect(document.title).toBe("CoinVision");

    // Check for meta tags
    const metaDescription = container.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute(
      "content",
      "Your website description"
    );

    const metaKeywords = container.querySelector('meta[name="keywords"]');
    expect(metaKeywords).toHaveAttribute(
      "content",
      "keywords, for, your, website"
    );

    const metaViewport = container.querySelector('meta[name="viewport"]');
    expect(metaViewport).toHaveAttribute(
      "content",
      "width=device-width, initial-scale=1"
    );
  });

  it("renders favicon link", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const faviconLink = container.querySelector('link[rel="icon"]');
    expect(faviconLink).toHaveAttribute("href", "/favicon.ico");
  });

  it("renders the correct HTML structure", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(container.querySelector("html")).toHaveAttribute("lang", "en");
    expect(container.querySelector("body")).toBeInTheDocument();
  });
});
