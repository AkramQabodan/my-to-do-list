import { atomWithStorage } from "jotai/utils";

export const usersAtom = atomWithStorage<User[]>("users", []);
export const currentUserAtom = atomWithStorage<User | undefined>(
  "user",
  undefined
);

export type User = {
  username: string;
  password: string;
};
