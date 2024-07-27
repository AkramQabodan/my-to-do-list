"use client";

import Button from "@mui/material/Button";
import Link from "next/link";
import ToDo from "./toDo";
import { useAtomValue } from "jotai";
import { modifiedListOfTodosAtom } from "@/stateManagement/auth/Users/usersSlice";

export default function ToDoList() {
  const todoList = useAtomValue(modifiedListOfTodosAtom);
  return (
    <div className="rounded p-5 flex flex-col gap-5 drop-shadow shadow w-1/2 lg:w-1/3 md:w-1/2 min-w-80 overflow-auto max-h-fit pb-32">
      <Button variant="contained" color="success" className="self-end">
        <Link href="/main/to-do-list/add">Add To Do</Link>
      </Button>
      {todoList.map((example, index) => (
        <ToDo
          key={index}
          title={example.title}
          description={example.description}
          dueDate={example.dueDate}
          status={example.status}
          index={index}
        />
      ))}
    </div>
  );
}
