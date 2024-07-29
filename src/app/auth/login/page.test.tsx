import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "./page";
import { useRouter } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";

// Mocking the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking Jotai hooks
jest.mock("jotai", () => ({
  useAtomValue: jest.fn(),
  useSetAtom: jest.fn(),
  atom: jest.fn(),
}));

jest.mock("../../../Utilities/userUtils", () => ({
  validateLogin: jest.fn(),
}));

describe("Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useAtomValue as jest.Mock).mockReturnValue([]);
    (useSetAtom as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders username and password fields", () => {
    render(<Page />);

    const usernameLabel = screen.getByText("username");
    const passwordLabel = screen.getByText("password");

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  it("shows validation errors when inputs are empty", async () => {
    render(<Page />);

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);

    const usernameError = await screen.findByText("please enter username");
    const passwordError = await screen.findByText("please enter password");

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
