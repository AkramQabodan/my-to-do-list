import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("next/navigation", () => {
  return {
    useRouter: () => {},
  };
});

describe("Page", () => {
  it("renders a username", () => {
    render(<Page />);

    const username = screen.getByText("username");

    expect(username).toBeInTheDocument();
  });
});
