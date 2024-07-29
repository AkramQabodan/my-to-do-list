import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { useSetAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { EtodoStatus } from "@/stateManagement/auth/Users/usersAtom";
import {
  addTodoAtom,
  updateTodoAtom,
} from "@/stateManagement/auth/Users/todosActions";
import CreateToDoForm from ".";
import dayjs from "dayjs";

// Mock the hooks and atoms
jest.mock("jotai", () => ({
  useAtomValue: jest.fn(),
  useSetAtom: jest.fn(),
  atom: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CreateToDoForm Component", () => {
  const mockAddToDo = jest.fn();
  const mockUpdateToDo = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useSetAtom as jest.Mock).mockImplementation((atom) => {
      if (atom === addTodoAtom) return mockAddToDo;
      if (atom === updateTodoAtom) return mockUpdateToDo;
    });
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useAtomValue as jest.Mock).mockReturnValue([
      {
        title: "Test Todo",
        description: "This is a test todo",
        dueDate: dayjs(),
        status: EtodoStatus.pending,
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form fields", () => {
    render(<CreateToDoForm />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/basic date picker/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });
});
