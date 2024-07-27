import dayjs from "dayjs";
import { atom } from "jotai";
import { loggedInUserAtom, Todo, usersAtom } from "./usersAtom";

const listOfTodosAtom = atom((get) => {
  const user = get(loggedInUserAtom);
  if (user) {
    return (
      get(usersAtom).find((userObject) => userObject.username === user)
        ?.todos || []
    );
  }
  return [];
});

export const modifiedListOfTodosAtom = atom((get) =>
  get(listOfTodosAtom).map((todo) => {
    return { ...todo, dueDate: dayjs(todo.dueDate) };
  })
);

export const addTodoAtom = atom(null, (get, set, todo: Todo) => {
  const loggedInUser = get(loggedInUserAtom);
  if (!loggedInUser) {
    console.error("No logged-in user found");
    return;
  }
  const users = get(usersAtom);
  const updatedUsers = users.map((user) => {
    if (user.username === loggedInUser) {
      return { ...user, todos: [...user.todos, todo] };
    }
    return user;
  });
  set(usersAtom, updatedUsers);
});

export const updateTodoAtom = atom(
  null,
  (get, set, index: number, todo: Todo) => {
    const loggedInUser = get(loggedInUserAtom);
    if (!loggedInUser) {
      console.error("No logged-in user found");
      return;
    }
    const users = get(usersAtom);
    const updatedUsers = users.map((user) => {
      if (user.username === loggedInUser) {
        user.todos[index] = todo;
        return { ...user, todos: [...user.todos] };
      }
      return user;
    });
    set(usersAtom, updatedUsers);
  }
);

export const removeToDoAtom = atom(null, (get, set, index: number) => {
  const loggedInUser = get(loggedInUserAtom);
  if (!loggedInUser) {
    console.error("No logged-in user found");
    return;
  }
  const users = get(usersAtom);
  const updatedUsers = users.map((user) => {
    if (user.username === loggedInUser) {
      const updatedTodos = user.todos.filter(
        (_todo, todoIndex) => todoIndex !== index
      );
      return { ...user, todos: updatedTodos };
    }
    return user;
  });

  set(usersAtom, updatedUsers);
});
