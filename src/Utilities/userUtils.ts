import { User } from "@/stateManagement/auth/Users/usersAtom";

export const userExists = (username: string, users: User[]): boolean => {
  return users.some((user) => user.username === username);
};

export const validateLogin = (
  username: string,
  password: string,
  users: User[]
): boolean => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};
