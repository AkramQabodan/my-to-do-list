import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DashboardLayout from "./layout";
import MenuAppBar from "../../components/navBar/index";

// Mock the MenuAppBar component
jest.mock("../../components/navBar/index", () => {
  return jest.fn(() => <div data-testid="menu-app-bar">MenuAppBar</div>);
});

describe("DashboardLayout", () => {
  it("renders the MenuAppBar", () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    const menuAppBar = screen.getByTestId("menu-app-bar");
    expect(menuAppBar).toBeInTheDocument();
  });

  it("renders the children content", () => {
    render(
      <DashboardLayout>
        <div data-testid="child-content">Test Content</div>
      </DashboardLayout>
    );

    const childContent = screen.getByTestId("child-content");
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent("Test Content");
  });

  it("applies the correct class names to the container", () => {
    const { container } = render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );

    expect(container.firstChild).toHaveClass("dark:bg-stone-800 w-full h-full");
  });
});
