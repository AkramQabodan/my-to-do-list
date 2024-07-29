import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ToDoListPage from "./page";
import ToDoList from "../../../components/toDoList/index";
import useLoggedInGuard from "../../../hooks/useloggedInGuardHook";

// Mock the ToDoList component
jest.mock("../../../components/toDoList/index", () => {
  return jest.fn(() => <div data-testid="to-do-list">ToDoList</div>);
});

// Mock the useLoggedInGuard hook
jest.mock("../../../hooks/useloggedInGuardHook");

describe("ToDoListPage", () => {
  it("calls useLoggedInGuard hook", () => {
    render(<ToDoListPage />);
    expect(useLoggedInGuard).toHaveBeenCalled();
  });

  it("renders the ToDoList component", () => {
    render(<ToDoListPage />);
    const toDoList = screen.getByTestId("to-do-list");
    expect(toDoList).toBeInTheDocument();
  });

  it("applies the correct class names to the container", () => {
    const { container } = render(<ToDoListPage />);
    expect(container.firstChild).toHaveClass(
      "flex flex-col items-center h-full w-full pt-10 gap-5"
    );
  });
});
