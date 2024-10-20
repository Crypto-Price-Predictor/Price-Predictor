// __tests__/Login.test.tsx
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../app/components/navigation/Login";
import { signIn, SignInResponse, useSession } from "next-auth/react";

// Mock the next-auth/react module
jest.mock("next-auth/react");

describe("Login Component", () => {
  const mockSignIn = jest.fn();
  const mockUseSession = useSession as jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    mockSignIn.mockClear();
    mockUseSession.mockClear();
  });

  it("renders the login and register buttons", () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    const { getByText } = render(<Login />);

    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
  });

  it("calls signIn when the login button is clicked", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    jest
      .mocked(signIn)
      .mockImplementation(() => Promise.resolve({}) as Promise<SignInResponse>);

    const { getByText } = render(<Login />);
    const loginButton = getByText("Login");

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("google", {
        callbackUrl: "/User",
      });
    });
  });

  it("shows an error message if login fails", async () => {
    mockUseSession.mockReturnValue({ data: null, status: "unauthenticated" });
    jest
      .mocked(signIn)
      .mockImplementation(
        () =>
          Promise.resolve({ error: "Login failed" }) as Promise<SignInResponse>
      );

    const { getByText } = render(<Login />);
    const loginButton = getByText("Login");

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        "Login failed:",
        "Login failed"
      );
    });
  });

  it("removes userId from sessionStorage if user is authenticated", async () => {
    // Mock a successful authenticated session with a user ID
    mockUseSession.mockReturnValue({
      data: { user: { id: "12345" } },
      status: "authenticated",
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    render(<Login />);

    await waitFor(() => {
      expect(removeItemSpy).toHaveBeenCalledWith("userId");
    });
  });

  it("shows an error if session user does not have an ID", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    // Mock an authenticated session but without a user ID
    mockUseSession.mockReturnValue({
      data: { user: {} },
      status: "authenticated",
    });

    render(<Login />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "User ID is not available in session."
      );
    });
  });
});
