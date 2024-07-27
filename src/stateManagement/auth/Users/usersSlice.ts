import dayjs from "dayjs";
import { atom } from "jotai";
import { EtodoStatus, loggedInUserAtom, usersAtom } from "./usersAtom";

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

export const todosStatusAtom = atom((get) => {
  return get(listOfTodosAtom).reduce(
    (acc, current) => {
      if (current.status === EtodoStatus.pending) {
        acc.pending += 1;
      } else if (current.status === EtodoStatus.doing) {
        acc.doing += 1;
      } else if (current.status === EtodoStatus.completed) {
        acc.completed += 1;
      }
      return acc;
    },
    { pending: 0, doing: 0, completed: 0 }
  );
});

export const userProfilePictureAtom = atom((get) => {
  const loggedInUser = get(loggedInUserAtom);
  if (!loggedInUser) {
    return null;
  }
  const users = get(usersAtom);
  const user = users.find((user) => user.username === loggedInUser);
  return user?.ProfilePicture;
});
