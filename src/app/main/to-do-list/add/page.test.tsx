import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddToDoPage from "./page";
import useLoggedInGuard from "../../../../hooks/useloggedInGuardHook";

// Mock the CreateToDoForm component
jest.mock("../../../../components/createToDoForm/index", () => {
  return jest.fn(() => (
    <div data-testid="create-to-do-form">CreateToDoForm</div>
  ));
});

// Mock the useLoggedInGuard hook
jest.mock("../../../../hooks/useloggedInGuardHook");

// Mock the next/link component to render children without wrapping in an anchor tag
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

describe("AddToDoPage", () => {
  it("calls useLoggedInGuard hook", () => {
    render(<AddToDoPage />);
    expect(useLoggedInGuard).toHaveBeenCalled();
  });

  it("renders the CreateToDoForm component", () => {
    render(<AddToDoPage />);
    const createToDoForm = screen.getByTestId("create-to-do-form");
    expect(createToDoForm).toBeInTheDocument();
  });

  it("renders the 'Back To List' button with the correct link", () => {
    render(<AddToDoPage />);
    const backButton = screen.getByText("Back To List");
    expect(backButton).toBeInTheDocument();
  });

  it("applies the correct class names to the container", () => {
    const { container } = render(<AddToDoPage />);
    expect(container.firstChild).toHaveClass(
      "flex flex-col items-center h-full w-full pt-10 gap-5"
    );
  });
});
