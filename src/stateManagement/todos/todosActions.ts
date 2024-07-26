import { atom } from "jotai";
import { Todo, todosAtom } from "./todosAtom";

export const addToDoAtom = atom(null, (get, set, todo: Todo) => {
  const todosList = get(todosAtom);
  set(todosAtom, [...todosList, todo]);
});

export const updateToDoAtom = atom(
  null,
  (get, set, index: number, newToDo: Todo) => {
    const todosList = get(todosAtom);
    set(
      todosAtom,
      todosList.map((item, todoIndex) => {
        return todoIndex === index ? newToDo : item;
      })
    );
  }
);
export const removeToDoAtom = atom(null, (get, set, index: number) => {
  const todosList = get(todosAtom);
  set(
    todosAtom,
    todosList.filter((_todo, todoIndex) => todoIndex !== index)
  );
});
