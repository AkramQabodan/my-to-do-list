"use client";
import CreateToDoForm from "@/components/createToDoForm";
import { newTodoAtom, todosAtom } from "@/stateManagement/atom";
import { useAtom } from "jotai";

export default function ToDoListPage() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [newTodo, setNewTodo] = useAtom(newTodoAtom);
  return (
    <div className="flex flex-col items-center h-full w-full pt-10">
      <CreateToDoForm />
    </div>
  );
}
