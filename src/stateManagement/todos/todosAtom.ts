import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

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

export const todosAtom = atomWithStorage<Todo[]>("todos", []);
export const processedTodosAtom = atom((get) =>
  get(todosAtom).map((item) => {
    return { ...item, dueDate: dayjs(item.dueDate) };
  })
);
