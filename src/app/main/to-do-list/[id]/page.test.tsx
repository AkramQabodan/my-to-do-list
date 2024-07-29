import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EditToDoPage from "./page";
import useLoggedInGuard from "../../../../hooks/useloggedInGuardHook";

// Mock the CreateToDoForm component
jest.mock("../../../../components/createToDoForm/index", () => {
  return jest.fn(({ toDoId }) => (
    <div data-testid="create-to-do-form" data-todo-id={toDoId}>
      CreateToDoForm
    </div>
  ));
});

// Mock the useLoggedInGuard hook
jest.mock("../../../../hooks/useloggedInGuardHook");

// Mock the next/link component to render children without wrapping in an anchor tag
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

describe("EditToDoPage", () => {
  const mockParams = { id: 1 };

  it("calls useLoggedInGuard hook", () => {
    render(<EditToDoPage params={mockParams} />);
    expect(useLoggedInGuard).toHaveBeenCalled();
  });

  it("renders the CreateToDoForm component with the correct toDoId", () => {
    render(<EditToDoPage params={mockParams} />);
    const createToDoForm = screen.getByTestId("create-to-do-form");
    expect(createToDoForm).toBeInTheDocument();
    expect(createToDoForm).toHaveAttribute("data-todo-id", "1");
  });

  it("renders the 'Back To List' button", () => {
    render(<EditToDoPage params={mockParams} />);
    const backButton = screen.getByText("Back To List");
    expect(backButton).toBeInTheDocument();
  });

  it("applies the correct class names to the container", () => {
    const { container } = render(<EditToDoPage params={mockParams} />);
    expect(container.firstChild).toHaveClass(
      "flex flex-col items-center h-full w-full pt-10 gap-5"
    );
  });
});
