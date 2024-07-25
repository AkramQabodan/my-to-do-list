import dayjs from "dayjs";
import { atom } from "jotai";

export type Todo = {
  title: string;
  description: string;
  dueDate: dayjs.Dayjs;
  status: todoStatus;
};

export enum todoStatus {
  pending = "pending",
  doing = "doing",
  completed = "completed",
}

export const todosAtom = atom<Todo[]>([]);
export const newTodoAtom = atom<Todo>({
  title: "",
  description: "",
  dueDate: dayjs(),
  status: todoStatus.pending,
});
