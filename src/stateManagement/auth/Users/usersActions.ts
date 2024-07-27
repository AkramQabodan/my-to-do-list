import { userExists } from "@/Utilities/userUtils";
import { atom } from "jotai";
import { RESET } from "jotai/utils";
import { loggedInUserAtom, User, usersAtom } from "./usersAtom";

export const addUserAtom = atom(null, (get, set, newUser: User) => {
  const users = get(usersAtom);
  if (userExists(newUser.username, users)) {
    return true;
  } else {
    set(usersAtom, [...users, newUser]);
    return false;
  }
});

export const setCurrentUserAtom = atom(null, (_get, set, email: string) => {
  set(loggedInUserAtom, email);
});

export const removeCurrentUserAtom = atom(null, (_get, set) => {
  set(loggedInUserAtom, RESET);
});
