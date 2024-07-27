import dayjs from "dayjs";
import { atomWithStorage } from "jotai/utils";

export const usersAtom = atomWithStorage<User[]>("users", []);
export const loggedInUserAtom = atomWithStorage<string | undefined>(
  "user",
  undefined
);

export type User = {
  username: string;
  password: string;
  ProfilePicture?: string;
  todos: Todo[];
};

export type Todo = {
  title: string;
  description: string;
  dueDate: dayjs.Dayjs;
  status: EtodoStatus;
};

export enum EtodoStatus {
  pending = "pending",
  doing = "doing",
  completed = "completed",
}
