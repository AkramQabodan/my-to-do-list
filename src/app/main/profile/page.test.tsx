import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  todosStatusAtom,
  userProfilePictureAtom,
} from "../../../stateManagement/auth/Users/usersSlice";
import Profile from "./page";
import { loggedInUserAtom } from "@/stateManagement/auth/Users/usersAtom";

jest.mock("../../../hooks/useloggedInGuardHook");
jest.mock("jotai", () => ({
  useAtomValue: jest.fn(),
  useSetAtom: jest.fn(),
  atom: jest.fn(),
}));

describe("Profile Component", () => {
  const mockLoggedInUser = "testUser";
  const mockStatus = { pending: 1, doing: 2, completed: 3 };
  const mockUserProfilePicture = "/mock/path/to/avatar.jpg";
  const mockUpdateProfilePicture = jest.fn();

  beforeEach(() => {
    (useAtomValue as jest.Mock).mockImplementation((atom) => {
      if (atom === loggedInUserAtom) return mockLoggedInUser;
      if (atom === todosStatusAtom) return mockStatus;
      if (atom === userProfilePictureAtom) return mockUserProfilePicture;
      return null;
    });
    (useSetAtom as jest.Mock).mockReturnValue(mockUpdateProfilePicture);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the user's profile information", () => {
    render(<Profile />);
    expect(screen.getByText(mockLoggedInUser)).toBeInTheDocument();
  });

  it("renders status chips", () => {
    render(<Profile />);
    expect(screen.getByText("1 pending")).toBeInTheDocument();
    expect(screen.getByText("2 doing")).toBeInTheDocument();
    expect(screen.getByText("3 completed")).toBeInTheDocument();
  });

  it("opens the dialog when the edit button is clicked", () => {
    render(<Profile />);
    fireEvent.click(screen.getByLabelText("edit"));
    expect(screen.getByText("Update Profile Picture")).toBeInTheDocument();
  });
});
