import { userExists } from "@/Utilities/userUtils";
import { atom } from "jotai";
import { RESET } from "jotai/utils";
import { currentUserAtom, User, usersAtom } from "./usersAtom";

export const addUserAtom = atom(null, (get, set, newUser: User) => {
  const currentUsers = get(usersAtom);
  if (userExists(newUser.username, currentUsers)) {
    return true;
  } else {
    set(usersAtom, [...currentUsers, newUser]);
    return false;
  }
});

export const setCurrentUserAtom = atom(null, (_get, set, user: User) => {
  set(currentUserAtom, user);
});

export const removeCurrentUserAtom = atom(null, (_get, set) => {
  set(currentUserAtom, RESET);
});
