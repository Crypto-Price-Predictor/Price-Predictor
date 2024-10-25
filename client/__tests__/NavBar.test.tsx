import { render, screen } from "@testing-library/react";
import NavBar from "../app/components/navigation/NavBar";
import "@testing-library/jest-dom";

jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt="mocked-image" />;
  },
}));

jest.mock("../app/components/navigation/Login", () => () => (
  <div>Mocked Login</div>
));

describe("NavBar", () => {
  it("renders the logo", () => {
    render(<NavBar />);
    const logo = screen.getByAltText("mocked-image");
    expect(logo).toBeInTheDocument();
  });

  it("renders the Login component", () => {
    render(<NavBar />);
    const loginComponent = screen.getByText("Mocked Login");
    expect(loginComponent).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<NavBar />);
    const homeLink = screen.getByText("Home");
    const featuresLink = screen.getByText("Features");
    const howItWorksLink = screen.getByText("How it works");
    const aboutUsLink = screen.getByText("About us");
    const disclaimerLink = screen.getByText("Disclaimer");

    expect(homeLink).toBeInTheDocument();
    expect(featuresLink).toBeInTheDocument();
    expect(howItWorksLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
    expect(disclaimerLink).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<NavBar />);
    const mobileMenuButton = screen.getByRole("button", {
      name: /toggle menu/i,
    });
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
