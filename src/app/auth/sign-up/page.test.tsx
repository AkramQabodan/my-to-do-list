import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { atom, useSetAtom } from "jotai";
import SignUpPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("jotai", () => ({
  useSetAtom: jest.fn(),
  useAtomValue: jest.fn(),
  atom: jest.fn(),
}));

describe("SignUpPage", () => {
  const mockPush = jest.fn();
  const mockAddUser = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useSetAtom as jest.Mock).mockReturnValue(mockAddUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders username, password, and confirm password fields", () => {
    render(<SignUpPage />);

    const usernameLabel = screen.getByLabelText("username");
    const passwordLabel = screen.getByLabelText("password");
    const confirmPasswordLabel = screen.getByLabelText("confirm password");

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it("shows validation errors when inputs are invalid", async () => {
    render(<SignUpPage />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.click(submitButton);

    const usernameError = await screen.findByText("please enter username");
    const passwordError = await screen.findByText("please enter password");
    const confirmPasswordError = await screen.findByText(
      "please confirm password"
    );

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(confirmPasswordError).toBeInTheDocument();
  });
});
